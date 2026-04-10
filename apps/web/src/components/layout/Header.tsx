"use client";
import { useEffect } from "react";

const HEADER_HTML = `    <a href="#main-content" class="skip-link">Skip to content</a>

    <!-- Header -->
    <header class="header" id="header">
        <div class="header-top">
            <div class="container">
                <span>🏠 Malaysia's Premier Home & Living Exhibition</span>
                <span>📞 010-232 3620 | ✉️ info@homelove.com.my</span>
            </div>
        </div>
        <div class="header-main">
            <div class="container">
                <div class="logo">
                    <img src="logos/homelove/homelove-blue.png" alt="HOMElove Home & Living Expo" style="height:60px;width:auto;">
                </div>
                <nav class="nav">
                    <a href="#">Home</a>
                    <a href="#">Exhibitions</a>
                    <a href="#">Home Tips</a>
                    <a href="#">Contact Us</a>
                    <a href="#">Exhibit With Us</a>
                    <a href="#">About Us</a>
                </nav>
                <div class="header-actions">
                    <a href="#" class="btn btn-primary">Home Checklist</a>
                </div>
                <button class="mobile-menu-btn" onclick="document.getElementById('mobileMenu').classList.add('open')" aria-label="Open menu">
                    <span></span><span></span><span></span>
                </button>
            </div>
        </div>
    </header>

    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu-overlay" id="mobileMenu">
        <button class="mobile-close-btn" onclick="this.parentElement.classList.remove('open')" aria-label="Close menu">✕</button>
        <a href="#" onclick="this.parentElement.classList.remove('open')">Home</a>
        <a href="#" onclick="this.parentElement.classList.remove('open')">Exhibitions</a>
        <a href="#" onclick="this.parentElement.classList.remove('open')">Home Tips</a>
        <a href="#" onclick="this.parentElement.classList.remove('open')">Contact Us</a>
        <a href="#" onclick="this.parentElement.classList.remove('open')">Exhibit With Us</a>
        <a href="#" onclick="this.parentElement.classList.remove('open')">About Us</a>
        <a href="#" onclick="this.parentElement.classList.remove('open')" style="color:var(--primary);font-weight:700;">Home Checklist</a>
    </div>

`;

const LAYOUT_JS = `
// Header scroll effect + Back to Top visibility
const btt = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    if (btt) {
        if (window.scrollY > 400) { btt.classList.add('show'); }
        else { btt.classList.remove('show'); }
    }
});

// FAQ toggle
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('active');
    });
});

// Mobile menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        document.getElementById('mobileMenu').classList.add('open');
    });
}
`;

export default function Header() {
  useEffect(() => {
    try {
      const fn = new Function(LAYOUT_JS);
      fn();
    } catch (e) {
      console.warn("Layout JS error:", e);
    }
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: HEADER_HTML }} />;
}
