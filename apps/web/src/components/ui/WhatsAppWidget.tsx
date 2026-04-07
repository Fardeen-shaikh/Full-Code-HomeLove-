export default function WhatsAppWidget() {
  return (
    <a
      href="https://wa.me/60102323620"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-5 z-40 bg-dark text-white flex items-center gap-2.5 pl-4 pr-5 py-3 rounded-full shadow-lg hover:bg-gray-800 hover:scale-105 transition-all duration-300 animate-chat-float"
      aria-label="Chat with us on WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
      <span className="text-sm font-semibold tracking-wide">CHAT WITH US</span>
    </a>
  )
}
