import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' })

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: CORS_HEADERS })
}

async function fetchCMSContext() {
  const payload = await getPayload({ config: configPromise })

  // Fetch live data from CMS
  const [exhibitions, blogPosts, checklistProfiles] = await Promise.all([
    payload.find({ collection: 'exhibitions', limit: 10, sort: 'startDate', depth: 0 }),
    payload.find({ collection: 'blog-posts', limit: 10, sort: '-publishedAt', depth: 0 }),
    payload.find({ collection: 'checklist-profiles', limit: 5, depth: 0 }),
  ])

  // Build context string
  const now = new Date()
  const exhContext = exhibitions.docs.map((e) => {
    const start = new Date(e.startDate as string)
    const end = new Date(e.endDate as string)
    const isLive = start <= now && end >= now
    const isUpcoming = start > now
    const status = isLive ? 'HAPPENING NOW' : isUpcoming ? 'UPCOMING' : 'PAST'
    return `- ${e.title} | ${start.toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' })} to ${end.toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' })} | ${e.venue}, ${e.state} | ${status} | ${e.brandCount || '100'}+ brands`
  }).join('\n')

  const blogContext = blogPosts.docs.map((b) =>
    `- "${b.title}" (${b.category}) — /home-tips/${b.slug}`
  ).join('\n')

  const checklistContext = checklistProfiles.docs.map((p) =>
    `- ${p.name}: ${p.description}`
  ).join('\n')

  return { exhContext, blogContext, checklistContext }
}

function buildSystemPrompt(ctx: { exhContext: string; blogContext: string; checklistContext: string }) {
  return `You are the HOMElove virtual assistant — a friendly, helpful chatbot for HOMElove, Malaysia's premier home & living exhibition.

ABOUT HOMELOVE:
- HOMElove organises home expos across Malaysia since 2015
- Over 141 exhibitions, 6,173+ exhibitors, 5 million+ visitors
- Free admission at all events
- Organised by Empire Asia Events Marketing Sdn. Bhd.
- Contact: info@homelove.com.my | +603-7620 2672 | WhatsApp: +6010-232 3620
- Website: homelove.com.my

CURRENT EXHIBITIONS:
${ctx.exhContext || 'No exhibitions currently listed.'}

LATEST HOME TIPS ARTICLES:
${ctx.blogContext || 'No articles currently.'}

HOME CHECKLIST PROFILES:
${ctx.checklistContext || 'Not available.'}

KEY PAGES:
- Exhibitions: /exhibitions
- Home Tips: /home-tips
- Contact Us: /contact-us
- Exhibit With Us: /exhibit-with-us (for brands wanting to exhibit)
- About Us: /about-us
- Home Checklist: /checklist

INSTRUCTIONS:
1. Be warm, friendly, and concise. Use simple language.
2. Answer questions about HOMElove events, locations, dates, what to expect, brands, deals, etc.
3. For exhibition questions, always provide the specific dates, venue, and location from the data above.
4. If someone asks about exhibiting, direct them to /exhibit-with-us or provide the contact details.
5. For home tips questions, suggest relevant articles from the list above.
6. Recommend the Home Checklist (/checklist) when someone is planning their home shopping.
7. LEAD CAPTURE: After 2-3 messages, naturally ask for the visitor's name and phone number so you can "send them event updates" or "notify them about deals". Do this conversationally, not pushily. If they provide contact info, include it in your response as: [LEAD:name|phone|email]
8. If you cannot answer a question, suggest contacting HOMElove directly via WhatsApp (+6010-232 3620) or email.
9. Keep responses under 150 words.
10. Do NOT make up information. Only use the data provided above.
11. Always respond in the same language the user writes in (English or Malay).`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { messages, sessionId } = body as {
      messages: { role: string; content: string }[]
      sessionId: string
    }

    if (!messages || !sessionId) {
      return NextResponse.json({ error: 'Missing messages or sessionId' }, { status: 400, headers: CORS_HEADERS })
    }

    // Fetch live CMS context
    const ctx = await fetchCMSContext()
    const systemPrompt = buildSystemPrompt(ctx)

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      ],
      temperature: 0.7,
      max_tokens: 300,
    })

    const reply = completion.choices[0]?.message?.content || 'Sorry, I could not process your request.'

    // Check for lead capture in reply
    let leadData: { name?: string; phone?: string; email?: string } | null = null
    const leadMatch = reply.match(/\[LEAD:([^|]*)\|([^|]*)\|([^\]]*)\]/)
    if (leadMatch) {
      leadData = {
        name: leadMatch[1]?.trim() || undefined,
        phone: leadMatch[2]?.trim() || undefined,
        email: leadMatch[3]?.trim() || undefined,
      }
    }

    // Also check user messages for contact info
    const lastUserMsg = messages[messages.length - 1]?.content || ''
    const phoneMatch = lastUserMsg.match(/(?:01[0-9][-\s]?\d{3,4}[-\s]?\d{4}|\+?60\d{8,10})/g)
    const emailMatch = lastUserMsg.match(/[^\s@]+@[^\s@]+\.[^\s@]+/g)
    if (phoneMatch || emailMatch) {
      leadData = leadData || {}
      if (phoneMatch) leadData.phone = phoneMatch[0]
      if (emailMatch) leadData.email = emailMatch[0]
    }

    // Clean the reply (remove LEAD tags before sending to user)
    const cleanReply = reply.replace(/\[LEAD:[^\]]*\]/g, '').trim()

    // Save conversation to DB (non-blocking — don't let DB errors kill the chat response)
    try {
      const payload = await getPayload({ config: configPromise })
      const allMessages = [
        ...messages,
        { role: 'assistant', content: cleanReply, timestamp: new Date().toISOString() },
      ]

      // Detect topic
      type Topic = 'general' | 'exhibition' | 'exhibitor' | 'home-tips' | 'checklist' | 'other'
      let topic: Topic = 'general'
      const fullText = messages.map((m) => m.content).join(' ').toLowerCase()
      if (fullText.includes('exhibit') || fullText.includes('booth') || fullText.includes('brand')) topic = 'exhibitor'
      else if (fullText.includes('exhibition') || fullText.includes('expo') || fullText.includes('event')) topic = 'exhibition'
      else if (fullText.includes('tip') || fullText.includes('blog') || fullText.includes('article')) topic = 'home-tips'
      else if (fullText.includes('checklist') || fullText.includes('shopping list')) topic = 'checklist'

      // Validate lead email format before saving
      const validEmail = leadData?.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadData.email)

      // Build lead fields safely
      const leadFields: Record<string, unknown> = {}
      if (leadData?.name) { leadFields.leadName = leadData.name; leadFields.leadCaptured = true }
      if (validEmail) { leadFields.leadEmail = leadData!.email; leadFields.leadCaptured = true }
      if (leadData?.phone) { leadFields.leadPhone = leadData.phone; leadFields.leadCaptured = true }

      // Find existing conversation or create new
      const existing = await payload.find({
        collection: 'chat-conversations',
        where: { sessionId: { equals: sessionId } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'chat-conversations',
          id: existing.docs[0].id,
          data: { messages: allMessages, topic, ...leadFields },
        })
      } else {
        await payload.create({
          collection: 'chat-conversations',
          data: { sessionId, messages: allMessages, topic, ...leadFields },
        })
      }

      // Also save as subscriber if lead captured (with valid required fields)
      if (leadData?.phone && validEmail) {
        try {
          await payload.create({
            collection: 'subscribers',
            data: {
              name: leadData.name || 'Chat Visitor',
              phone: leadData.phone,
              email: leadData.email!,
              state: 'Kuala Lumpur',
              source: 'contact',
            },
          })
        } catch {
          // Ignore duplicate subscriber errors
        }
      }
    } catch (dbError) {
      console.error('Chat DB save error (non-fatal):', dbError)
    }

    return NextResponse.json({ reply: cleanReply }, { headers: CORS_HEADERS })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500, headers: CORS_HEADERS })
  }
}
