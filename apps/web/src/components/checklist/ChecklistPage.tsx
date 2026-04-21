'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { ChecklistProfile, ChecklistCategory } from '@/lib/api'
import { getChecklistCategories, getExhibitions, createSession, getSession, updateSession, mediaUrl } from '@/lib/api'
import type { Exhibition } from '@/lib/api'
import './checklist.css'
import '../exhibitions/exhibitions.css'

function formatMonth(date: string) {
  return new Date(date).toLocaleDateString('en-MY', { month: 'short' }).toUpperCase()
}
function formatDay(date: string) {
  return new Date(date).getDate()
}
function formatDateRange(start: string, end: string) {
  const s = new Date(start)
  const e = new Date(end)
  const month = s.toLocaleDateString('en-MY', { month: 'short' })
  const year = s.getFullYear()
  return `${s.getDate()} – ${e.getDate()} ${month} ${year}`
}
function daysUntil(date: string) {
  const diff = new Date(date).getTime() - Date.now()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}
function isLive(start: string, end: string) {
  const now = Date.now()
  const endOfDay = new Date(end)
  endOfDay.setHours(23, 59, 59, 999)
  const startOfDay = new Date(start)
  startOfDay.setHours(0, 0, 0, 0)
  return startOfDay.getTime() <= now && endOfDay.getTime() >= now
}

const COMPARE_ITEMS = [
  { icon: '💰', title: 'Product Price', hint: 'Compare prices across different booths before deciding' },
  { icon: '🛡️', title: 'Warranty Period', hint: 'Longer warranty usually means better value long-term' },
  { icon: '🔧', title: 'Installation Cost', hint: 'Ask if installation is included or charged separately' },
  { icon: '🚚', title: 'Delivery Time', hint: 'Confirm expected delivery window before purchasing' },
  { icon: '🎁', title: 'Bundle Deals / Free Gifts', hint: 'Look for bundled offers that add extra value' },
]

const PROFILE_ICONS: Record<string, string> = {
  'first-home': '🏠',
  'home-renovation': '🔨',
  'rental-airbnb': '🏢',
}

function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  let id = document.cookie.match(/homelove_session=([^;]+)/)?.[1]
  if (!id) {
    id = crypto.randomUUID()
    document.cookie = `homelove_session=${id};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`
  }
  return id
}

export default function ChecklistPage({ profiles }: { profiles: ChecklistProfile[] }) {
  const [activeProfile, setActiveProfile] = useState<ChecklistProfile | null>(profiles[0] || null)
  const [categories, setCategories] = useState<ChecklistCategory[]>([])
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(false)
  const [sessionDbId, setSessionDbId] = useState<string | null>(null)
  const [totalChecked, setTotalChecked] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const [upcomingEvents, setUpcomingEvents] = useState<Exhibition[]>([])
  const [generatingPdf, setGeneratingPdf] = useState(false)
  const [sparkleOn, setSparkleOn] = useState<string | null>(null)
  const printRef = useRef<HTMLDivElement>(null)

  // Load session
  useEffect(() => {
    const sid = getSessionId()
    if (!sid) return
    getSession(sid).then((session) => {
      if (session) {
        setSessionDbId(session.id)
        if (session.checklistSelections) setChecked(session.checklistSelections)
        if (session.checklistProfile) {
          const p = profiles.find((pr) => pr.profileSlug === session.checklistProfile)
          if (p) setActiveProfile(p)
        }
      } else {
        createSession(sid).then((res) => setSessionDbId(res.doc.id))
      }
    }).catch(() => {})
  }, [profiles])

  // Load categories when profile changes
  useEffect(() => {
    if (!activeProfile) return
    setLoading(true)
    getChecklistCategories(activeProfile.id)
      .then((res) => {
        setCategories(res.docs)
        const total = res.docs.reduce((sum, cat) => sum + cat.items.length, 0)
        setTotalItems(total)
      })
      .catch(() => setCategories([]))
      .finally(() => setLoading(false))

    // Save profile choice to session
    if (sessionDbId) {
      updateSession(sessionDbId, { checklistProfile: activeProfile.profileSlug }).catch(() => {})
    }
  }, [activeProfile, sessionDbId])

  // Count checked items
  useEffect(() => {
    const count = Object.values(checked).filter(Boolean).length
    setTotalChecked(count)
  }, [checked])

  // Fetch upcoming exhibitions for recommendations
  useEffect(() => {
    getExhibitions({ upcoming: true, limit: 3 })
      .then((res) => setUpcomingEvents(res.docs))
      .catch(() => {})
  }, [])

  // Generate branded PDF
  function handleDownloadPdf() {
    setGeneratingPdf(true)
    const { items, total } = getCheckedItemsList()
    const profileName = activeProfile?.name || 'Home'
    const date = new Date().toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' })

    // Group items by room
    const rooms: Record<string, { checked: string[]; unchecked: string[] }> = {}
    categories.forEach(cat => {
      rooms[cat.room] = { checked: [], unchecked: [] }
      cat.items.forEach(item => {
        const key = item.id || item.label
        if (checked[key]) rooms[cat.room].checked.push(item.label)
        else rooms[cat.room].unchecked.push(item.label)
      })
    })

    const roomsHtml = Object.entries(rooms).map(([room, { checked: ch, unchecked: unch }]) => `
      <div class="room">
        <div class="room-hdr">
          <span class="room-name">${room}</span>
          <span class="room-count">${ch.length}/${ch.length + unch.length}</span>
        </div>
        <div class="room-items">
          ${ch.map(l => `<div class="item done"><span class="cb done">✓</span><span>${l}</span></div>`).join('')}
          ${unch.map(l => `<div class="item"><span class="cb"></span><span>${l}</span></div>`).join('')}
        </div>
      </div>
    `).join('')

    const compareHtml = COMPARE_ITEMS.map(item => {
      const cKey = 'compare-' + item.title
      const isDone = checked[cKey]
      return '<div class="item' + (isDone ? ' done' : '') + '"><span class="cb' + (isDone ? ' done' : '') + '">' + (isDone ? '✓' : '') + '</span><span>' + item.title + '</span></div>'
    }).join('')

    const upcomingHtml = upcomingEvents.length > 0 ? `
      <div class="events">
        <h3>Upcoming HOMElove Expos</h3>
        <div class="events-list">
          ${upcomingEvents.map(evt => `
            <div class="evt">
              <div class="evt-date">${new Date(evt.startDate).getDate()} ${new Date(evt.startDate).toLocaleDateString('en-MY', { month: 'short' })}</div>
              <div class="evt-info">
                <strong>${evt.title}</strong>
                <span>${evt.venue}, ${evt.state}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''

    const html = `<!DOCTYPE html>
<html><head>
<title>HOMElove Checklist — ${profileName}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Poppins', 'Segoe UI', sans-serif; color: #1F2937; background: white; }

  /* Header */
  .header { background: #014B98; color: white; padding: 28px 40px; display: flex; align-items: center; justify-content: space-between; }
  .header-left { display: flex; align-items: center; gap: 16px; }
  .header-logo-img { height: 44px; width: auto; display: block; }
  .header-right { text-align: right; }
  .header-right div:first-child { font-size: 18px; font-weight: 800; }
  .header-right div:last-child { font-size: 11px; opacity: 0.7; margin-top: 2px; }

  /* Profile bar */
  .profile-bar { background: #F3F4F6; padding: 14px 40px; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #014B98; }
  .profile-bar .profile { font-size: 14px; font-weight: 700; color: #014B98; }
  .profile-bar .meta { font-size: 11px; color: #6B7280; }

  /* Content */
  .content { padding: 24px 40px 20px; }

  /* Rooms grid */
  .rooms { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .room { border: 1.5px solid #E5E7EB; border-radius: 10px; overflow: hidden; break-inside: avoid; }
  .room-hdr { background: #014B98; color: white; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; }
  .room-name { font-size: 13px; font-weight: 700; }
  .room-count { font-size: 11px; background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 20px; }
  .room-items { padding: 8px 12px; }

  /* Items */
  .item { display: flex; align-items: center; gap: 8px; padding: 5px 4px; font-size: 12px; border-bottom: 1px solid #F3F4F6; }
  .item:last-child { border-bottom: none; }
  .item.done span:last-child { color: #6B7280; }
  .cb { width: 16px; height: 16px; border: 1.5px solid #D1D5DB; border-radius: 4px; display: inline-flex; align-items: center; justify-content: center; font-size: 10px; flex-shrink: 0; color: transparent; }
  .cb.done { background: #014B98; border-color: #014B98; color: white; }

  /* Compare */
  .compare { margin-top: 20px; background: #F8FAFC; border: 1.5px solid #E5E7EB; border-radius: 10px; padding: 16px; }
  .compare h3 { font-size: 13px; font-weight: 700; color: #014B98; margin-bottom: 10px; }
  .compare .item { border-bottom-color: #E5E7EB; }

  /* Events */
  .events { margin-top: 20px; background: #EEF4FB; border: 1.5px solid #B9D1EA; border-radius: 10px; padding: 16px; }
  .events h3 { font-size: 13px; font-weight: 700; color: #014B98; margin-bottom: 10px; }
  .events-list { display: flex; flex-direction: column; gap: 8px; }
  .evt { display: flex; align-items: center; gap: 12px; }
  .evt-date { width: 50px; height: 40px; background: #014B98; color: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; flex-shrink: 0; text-align: center; line-height: 1.2; }
  .evt-info strong { font-size: 12px; display: block; color: #1F2937; }
  .evt-info span { font-size: 11px; color: #6B7280; }

  /* Footer */
  .footer { margin-top: 24px; border-top: 2px solid #014B98; padding: 16px 40px; display: flex; justify-content: space-between; align-items: center; }
  .footer-left { font-size: 10px; color: #6B7280; line-height: 1.6; }
  .footer-right { text-align: right; }
  .footer-cta { font-size: 12px; font-weight: 700; color: #014B98; }
  .footer-url { font-size: 10px; color: #6B7280; }

  /* Print */
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .header, .room-hdr, .cb.done, .evt-date { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
  @page { margin: 0; size: A4; }
</style>
</head><body>

<div class="header">
  <div class="header-left">
    <img src="${window.location.origin}/logos/homelove/homelove-white.png" alt="HOMElove" class="header-logo-img" />
  </div>
  <div class="header-right">
    <div>Home Checklist</div>
    <div>${date}</div>
  </div>
</div>

<div class="profile-bar">
  <span class="profile">Profile: ${profileName}</span>
  <span class="meta">${total} items selected out of ${totalItems} • ${progress}% complete</span>
</div>

<div class="content">
  <div class="rooms">
    ${roomsHtml}
  </div>

  <div class="compare">
    <h3>Things to Compare at the Expo</h3>
    ${compareHtml}
  </div>

  ${upcomingHtml}
</div>

<div class="footer">
  <div class="footer-left">
    HOMElove — Malaysia's Premier Home &amp; Living Exhibition<br>
    Organised by Empire Asia Events Marketing Sdn. Bhd. (1102402-K)<br>
    info@homelove.com.my | +603-7620 2672
  </div>
  <div class="footer-right">
    <div class="footer-cta">Bring this checklist to the expo!</div>
    <div class="footer-url">homelove.com.my</div>
  </div>
</div>

</body></html>`

    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(html)
      printWindow.document.close()
      setTimeout(() => {
        printWindow.print()
        setGeneratingPdf(false)
      }, 500)
    } else {
      setGeneratingPdf(false)
    }
  }

  // Get checked items as structured list
  function getCheckedItemsList() {
    const items: { room: string; label: string }[] = []
    categories.forEach(cat => {
      cat.items.forEach(item => {
        const key = item.id || item.label
        if (checked[key]) items.push({ room: cat.room, label: item.label })
      })
    })
    return { items, total: items.length }
  }

  // Share via WhatsApp
  function handleShareWhatsApp() {
    const { items } = getCheckedItemsList()
    if (items.length === 0) return

    const profileName = activeProfile?.name || 'Home'
    let msg = `🏠 *My HOMElove Home Checklist*\n📋 Profile: ${profileName}\n\n`

    // Group by room
    const rooms: Record<string, string[]> = {}
    items.forEach(({ room, label }) => {
      if (!rooms[room]) rooms[room] = []
      rooms[room].push(label)
    })

    Object.entries(rooms).forEach(([room, labels]) => {
      msg += `*${room}:*\n`
      labels.forEach(l => { msg += `✅ ${l}\n` })
      msg += '\n'
    })

    msg += `📍 Visit homelove.com.my/exhibitions to find an expo near you!\n`
    msg += `\n_Generated from HOMElove Home Checklist_`

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const toggleItem = useCallback((itemId: string) => {
    setChecked((prev) => {
      const wasChecked = !!prev[itemId]
      const next = { ...prev, [itemId]: !wasChecked }
      if (!wasChecked) {
        setSparkleOn(itemId)
        setTimeout(() => setSparkleOn((curr) => (curr === itemId ? null : curr)), 600)
      }
      if (sessionDbId) {
        updateSession(sessionDbId, { checklistSelections: next }).catch(() => {})
      }
      return next
    })
  }, [sessionDbId])

  const selectProfile = (profile: ChecklistProfile) => {
    setActiveProfile(profile)
    // Don't reset checked — user might switch between profiles
  }

  const progress = totalItems > 0 ? Math.round((totalChecked / totalItems) * 100) : 0

  const milestoneMessage =
    totalChecked === 0 ? null :
    progress >= 100 ? '🎉 Ready for the expo!' :
    progress >= 75 ? 'Almost done — nearly there!' :
    progress >= 50 ? 'Halfway there!' :
    progress >= 25 ? 'Great start — keep going!' :
    null

  return (
    <>
      {/* Hero */}
      <section className="cl-hero">
        <div className="cl-hero-overlay" />
        <div className="container">
          <div className="cl-hero-content">
            <h1>HOMElove Home Checklist</h1>
            <p className="cl-hero-sub">Tick What You Need for Your Home</p>
            <p className="cl-hero-desc">
              Whether you are setting up your first home, renovating your current space, or furnishing a rental or Airbnb unit, this checklist helps you stay organized, so you can compare products, prices, and deals more efficiently at the expo.
            </p>
            {!activeProfile && (
              <a href="#profiles" className="btn btn-secondary">Start My Checklist ↓</a>
            )}
          </div>
        </div>
      </section>

      {/* Profile Selection */}
      <section className="cl-profiles" id="profiles">
        <div className="container">
          <div className="cl-profiles-header">
            <h2>Choose Your Profile</h2>
            <p>Your checklist appears below. Click any profile to switch and see a different list.</p>
          </div>
          <div className="cl-profiles-grid">
            {profiles.map((profile) => (
              <button
                key={profile.id}
                type="button"
                className={`cl-profile-card${activeProfile?.id === profile.id ? ' active' : ''}`}
                onClick={() => selectProfile(profile)}
              >
                <div className="cl-profile-icon">{PROFILE_ICONS[profile.profileSlug] || '📋'}</div>
                <h3>{profile.name}</h3>
                <p>{profile.description}</p>
                {profile.topPriorities && (
                  <div className="cl-profile-priorities">
                    <strong>Top priorities:</strong> {profile.topPriorities}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist */}
      {activeProfile && (
        <section className="cl-checklist" id="checklist">
          <div className="container">
            {/* Progress bar */}
            <div className="cl-progress-bar">
              <div className="cl-progress-header">
                <h2>Your Checklist — {activeProfile.name}</h2>
                <span className="cl-progress-count">{totalChecked} / {totalItems} items</span>
              </div>
              <div className="cl-progress-track">
                <div className="cl-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="cl-progress-percent">{progress}% on list</div>
              {milestoneMessage && (
                <div key={milestoneMessage} className="cl-progress-milestone">{milestoneMessage}</div>
              )}
            </div>

            {loading ? (
              <div className="cl-loading">Loading checklist...</div>
            ) : (
              <div className="cl-rooms-grid">
                {categories.map((cat) => {
                  const roomChecked = cat.items.filter((item) => checked[item.id || item.label]).length
                  return (
                    <div key={cat.id} className="cl-room-card">
                      <div className="cl-room-header">
                        <h3>{cat.room}</h3>
                        <span className="cl-room-count">{roomChecked}/{cat.items.length}</span>
                      </div>
                      <div className="cl-items">
                        {cat.items.map((item) => {
                          const itemKey = item.id || item.label
                          return (
                            <label key={itemKey} className={`cl-item${checked[itemKey] ? ' checked' : ''}`}>
                              <input
                                type="checkbox"
                                checked={!!checked[itemKey]}
                                onChange={() => toggleItem(itemKey)}
                              />
                              <span className="cl-checkbox">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                                {sparkleOn === itemKey && (
                                  <span className="cl-sparkle" aria-hidden="true">
                                    <i style={{ ['--a' as string]: '0deg' }} />
                                    <i style={{ ['--a' as string]: '60deg' }} />
                                    <i style={{ ['--a' as string]: '120deg' }} />
                                    <i style={{ ['--a' as string]: '180deg' }} />
                                    <i style={{ ['--a' as string]: '240deg' }} />
                                    <i style={{ ['--a' as string]: '300deg' }} />
                                  </span>
                                )}
                              </span>
                              <span className="cl-item-label">{item.label}</span>
                            </label>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Compare section — Pro tips to use at the expo */}
            <div className="cl-compare">
              <div className="cl-compare-header">
                <h3>Things to Compare at the Expo</h3>
                <p>Take this with you to make smarter decisions while browsing the booths.</p>
              </div>
              <div className="cl-compare-grid">
                {COMPARE_ITEMS.map((item, i) => (
                  <div key={item.title} className="cl-tip-card">
                    <div className="cl-tip-num">{String(i + 1).padStart(2, '0')}</div>
                    <div className="cl-tip-icon" aria-hidden="true">{item.icon}</div>
                    <h4 className="cl-tip-title">{item.title}</h4>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons — PDF + WhatsApp */}
            {totalChecked > 0 && (
              <div className="cl-actions">
                <div className="cl-actions-header">
                  <h3>Your checklist is ready!</h3>
                  <p>{totalChecked} item{totalChecked > 1 ? 's' : ''} selected — save or share your list</p>
                </div>
                <div className="cl-actions-btns">
                  <button type="button" className="cl-action-btn cl-pdf-btn" onClick={handleDownloadPdf} disabled={generatingPdf}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    {generatingPdf ? 'Generating...' : 'Download PDF'}
                  </button>
                  <button type="button" className="cl-action-btn cl-wa-btn" onClick={handleShareWhatsApp}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Share via WhatsApp
                  </button>
                  <button type="button" className="cl-action-btn cl-copy-btn" onClick={() => {
                    const { items } = getCheckedItemsList()
                    const text = items.map(i => `${i.room}: ${i.label}`).join('\n')
                    navigator.clipboard.writeText(text).then(() => alert('Checklist copied!'))
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                    </svg>
                    Copy List
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Upcoming Events Recommendations */}
      {activeProfile && upcomingEvents.length > 0 && (
        <section className="cl-events">
          <div className="container">
            <div className="cl-events-header">
              <h2>Shop Your Checklist at These Expos</h2>
              <p>Based on your checklist, visit these upcoming HOMElove expos to find everything you need</p>
            </div>
            <div className="exh-grid">
              {upcomingEvents.map((exh) => (
                <Link href={`/exhibitions/${exh.slug}`} key={exh.id} className="exh-card upcoming">
                  <div className="exh-card-image">
                    <Image
                      src={mediaUrl(exh.bannerImage) || '/images/events/event-kuching.png'}
                      alt={exh.bannerImage?.alt || exh.title}
                      width={640}
                      height={360}
                      sizes="(max-width: 768px) 100vw, 400px"
                      quality={75}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="exh-card-status-bar">
                    {isLive(exh.startDate, exh.endDate) ? (
                      <div className="exh-status-live">
                        <span className="live-dot" />LIVE NOW
                      </div>
                    ) : (
                      <div className="exh-status-countdown">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {daysUntil(exh.startDate)} days to go
                      </div>
                    )}
                    <span className="exh-status-state">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                      {exh.state}
                    </span>
                  </div>
                  <div className="exh-card-body">
                    <div className="exh-card-date-strip">
                      <div className="date-block">
                        <span className="date-month">{formatMonth(exh.startDate)}</span>
                        <span className="date-day">{formatDay(exh.startDate)}</span>
                      </div>
                      <div className="date-details">
                        <div className="exh-card-dates">{formatDateRange(exh.startDate, exh.endDate)}</div>
                        <div className="exh-card-location">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                          </svg>
                          {exh.state}
                        </div>
                      </div>
                    </div>
                    <h3>{exh.title}</h3>
                    <p className="exh-card-venue">{exh.venue}</p>
                    <div className="exh-card-footer">
                      {exh.brandCount && <span className="exh-brands-count">{exh.brandCount}+ brands</span>}
                      <span className="exh-card-cta">View Details →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="cl-bottom-cta">
        <div className="container">
          <h2>Complete Your Home Shopping List at HOMElove</h2>
          <p>From home essentials to smart upgrades, HOMElove brings together a wide range of brands, products, and ideas under one roof. Come with your checklist, compare options more easily, and find what fits your home, style, and budget.</p>
          <div className="cl-bottom-btns">
            <Link href="/exhibitions" className="btn btn-secondary">See Upcoming Events →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
