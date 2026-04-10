const FOOTER_HTML = `    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <!-- Main Footer Grid — 4 columns matching wireframe -->
            <div class="footer-grid" style="grid-template-columns:2.2fr 1fr 1fr 1.3fr;">
                <!-- Column 1: Brand + Description -->
                <div class="footer-brand">
                    <div class="logo" style="display:flex;align-items:center;gap:12px;">
                        <img src="logos/homelove/homelove-white.png" alt="HOMElove" style="height:64px;width:auto;">
                    </div>
                    <p style="margin-top:16px;">Malaysia's premier home & living exhibition, bringing together the best exhibitors and homeowners for over a decade. Organised by Empire Asia Events Marketing Sdn. Bhd. (1102402K).</p>
                </div>
                <!-- Column 2: Explore -->
                <div>
                    <h4>Quick Links</h4>
                    <ul class="footer-links">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Exhibitions</a></li>
                        <li><a href="#">Home Tips</a></li>
                        <li><a href="#">Checklist</a></li>
                    </ul>
                </div>
                <!-- Column 3: Contact -->
                <div>
                    <h4>Contact</h4>
                    <ul class="footer-links">
                        <li><a href="tel:+60376202672" style="display:inline-flex;align-items:center;gap:8px;justify-content:center;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg> +603-7620 2672</a></li>
                        <li><a href="mailto:info@homelove.com.my" style="display:inline-flex;align-items:center;gap:8px;justify-content:center;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> info@homelove.com.my</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Exhibit With Us</a></li>
                    </ul>
                </div>
                <!-- Column 4: Social & CTA -->
                <div>
                    <h4>Follow Us</h4>
                    <div class="footer-social">
                        <a href="#" title="Facebook" class="social-fb"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
                        <a href="#" title="Instagram" class="social-ig"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
                        <a href="#" title="TikTok" class="social-tt"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13.1a8.28 8.28 0 005.58 2.17V11.8a4.83 4.83 0 01-3.77-1.34V6.69z"/></svg></a>
                        <a href="#" title="Xiaohongshu" class="social-xhs"><span style="font-size:11px;font-weight:800;letter-spacing:-0.5px;">小红书</span></a>
                        <a href="#" title="YouTube" class="social-yt"><svg viewBox="0 0 24 24" fill="currentColor" style="width:20px;height:20px;"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z"/></svg></a>
                    </div>
                    <a href="#newsletter" style="display:inline-block;margin-top:20px;padding:10px 22px;border:1.5px solid rgba(255,255,255,0.4);border-radius:50px;color:white;font-size:13px;font-weight:600;text-decoration:none;transition:all 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='transparent'">Get Event Updates →</a>
                </div>
            </div>
            <!-- Bottom Bar — per client suggestion -->
            <div class="footer-bottom">
                <div class="footer-bottom-left">
                    <span>© 2026 <strong>Empire Asia Events Marketing Sdn. Bhd.</strong> All rights reserved. &nbsp;|&nbsp; <a href="#" style="color:rgba(255,255,255,0.7);text-decoration:none;">Privacy Policy</a> &nbsp;|&nbsp; <a href="#" style="color:rgba(255,255,255,0.7);text-decoration:none;">Terms of Use</a> &nbsp;|&nbsp; <a href="#" style="color:rgba(255,255,255,0.7);text-decoration:none;">Sitemap</a></span>
                </div>
                <div class="footer-bottom-right">
                    <span>Affiliated Expos</span>
                    <img src="logos/affiliated/concept-living.png" alt="Concept Living" class="aff-logo no-invert" style="height:42px;">
                    <img src="logos/affiliated/perfect-lifestyle.png" alt="Perfect Lifestyle" class="aff-logo" style="height:38px;">
                    <img src="logos/affiliated/myedu.png" alt="MyEdu" class="aff-logo" style="height:36px;">
                    <img src="logos/affiliated/family-health-lifestyle.png" alt="Family Health & Lifestyle" class="aff-logo" style="height:49px;">
                </div>
            </div>
        </div>
    </footer>

    <!-- Floating Buttons — side by side, bottom right -->
`;

export default function Footer() {
  return <div dangerouslySetInnerHTML={{ __html: FOOTER_HTML }} />;
}
