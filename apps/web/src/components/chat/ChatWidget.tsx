'use client'

import { useState, useRef, useEffect } from 'react'
import './chat.css'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  let id = document.cookie.match(/homelove_chat=([^;]+)/)?.[1]
  if (!id) {
    id = crypto.randomUUID()
    document.cookie = `homelove_chat=${id};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`
  }
  return id
}

const QUICK_REPLIES = [
  'When is the next expo?',
  'Where are the venues?',
  'How do I exhibit?',
  'Is admission free?',
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasGreeted, setHasGreeted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (open && !hasGreeted) {
      setMessages([{
        role: 'assistant',
        content: "Hi there! Welcome to HOMElove. I can help you with upcoming exhibitions, home tips, exhibitor inquiries, or anything about our home expos. What would you like to know?"
      }])
      setHasGreeted(true)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open, hasGreeted])

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return

    const userMsg: Message = { role: 'user', content: text.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          sessionId: getSessionId(),
        }),
      })

      const data = await res.json()
      if (data.reply) {
        setMessages([...newMessages, { role: 'assistant', content: data.reply }])
      }
    } catch {
      setMessages([...newMessages, {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. You can reach us directly on WhatsApp at +6010-232 3620 or email info@homelove.com.my"
      }])
    } finally {
      setLoading(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      {/* Chat toggle button */}
      <button
        type="button"
        className={`chat-toggle${open ? ' active' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close chat' : 'Chat with us'}
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            <span className="chat-toggle-label">AI Assistant</span>
            <span className="chat-ai-badge">AI</span>
          </>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="chat-panel">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">
                <span>HL</span>
              </div>
              <div>
                <h4>HOMElove Assistant</h4>
                <span className="chat-status">
                  <span className="chat-status-dot" />
                  Online
                </span>
              </div>
            </div>
            <button type="button" className="chat-close" onClick={() => setOpen(false)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.role}`}>
                {msg.role === 'assistant' && (
                  <div className="chat-msg-avatar">HL</div>
                )}
                <div className="chat-bubble">
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="chat-msg assistant">
                <div className="chat-msg-avatar">HL</div>
                <div className="chat-bubble typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies (show only at start) */}
          {messages.length <= 1 && !loading && (
            <div className="chat-quick">
              {QUICK_REPLIES.map((q) => (
                <button key={q} type="button" className="chat-quick-btn" onClick={() => sendMessage(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form className="chat-input-form" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={loading}
            />
            <button type="submit" disabled={!input.trim() || loading} className="chat-send">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>

          {/* Footer */}
          <div className="chat-footer">
            <a href="https://wa.me/60102323620" target="_blank" rel="noopener noreferrer">
              Or chat on WhatsApp →
            </a>
          </div>
        </div>
      )}
    </>
  )
}
