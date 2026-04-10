"use client";

import { useEffect, useRef } from "react";

const HOMEPAGE_JS = `
    (function(){
        let active = 0;
        const cards = document.querySelectorAll('.venue-card');
        const markers = document.querySelectorAll('.map-marker');
        function setActive(idx) {
            cards.forEach(c => c.classList.remove('active'));
            markers.forEach(m => m.classList.remove('active'));
            if(cards[idx]) cards[idx].classList.add('active');
            if(markers[idx]) markers[idx].classList.add('active');
            active = idx;
        }
        cards.forEach((c, i) => {
            c.addEventListener('mouseenter', () => { setActive(i); clearInterval(timer); });
            c.addEventListener('mouseleave', () => { timer = setInterval(cycle, 3500); });
        });
        markers.forEach((m, i) => {
            m.addEventListener('mouseenter', () => { setActive(i); clearInterval(timer); });
            m.addEventListener('mouseleave', () => { timer = setInterval(cycle, 3500); });
        });
        function cycle() { active = (active + 1) % cards.length; setActive(active); }
        let timer = setInterval(cycle, 3500);
        setActive(0);
    })();
    

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Count-up animation for stats
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.querySelectorAll('.count-up').forEach(el => {
                    const target = parseInt(el.dataset.target);
                    const suffix = el.dataset.suffix || '';
                    const useComma = el.dataset.format === 'comma';
                    const duration = 1800;
                    const start = performance.now();
                    function tick(now) {
                        const p = Math.min((now - start) / duration, 1);
                        const ease = 1 - Math.pow(1 - p, 3);
                        const val = Math.round(target * ease);
                        el.textContent = (useComma ? val.toLocaleString() : val) + suffix;
                        if (p < 1) requestAnimationFrame(tick);
                    }
                    requestAnimationFrame(tick);
                });
                countObserver.unobserve(entry.target);
            });
        }, { threshold: 0.3 });
        const statsSection = document.querySelector('.stats');
        if (statsSection) countObserver.observe(statsSection);

        // Header scroll effect + Back to Top visibility
        const btt = document.getElementById('backToTop');
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
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

        // 3D tilt on stat cards — follows cursor
        document.querySelectorAll('.stat-card').forEach(card => {
            card.style.transition = 'transform 0.1s ease, background 0.3s, box-shadow 0.3s, border-color 0.3s';
            card.addEventListener('mousemove', e => {
                const r = card.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - 0.5;
                const y = (e.clientY - r.top) / r.height - 0.5;
                card.style.transform = 'translateY(-8px) perspective(600px) rotateY(' + (x * 18) + 'deg) rotateX(' + (-y * 18) + 'deg) scale(1.04)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transition = 'transform 0.4s ease, background 0.3s, box-shadow 0.3s, border-color 0.3s';
                card.style.transform = 'translateY(0) perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)';
            });
        });

        // 3D tilt on brand cards — follows cursor
        document.querySelectorAll('.brand-item').forEach(card => {
            card.addEventListener('mousemove', e => {
                const r = card.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - 0.5;
                const y = (e.clientY - r.top) / r.height - 0.5;
                card.style.transform = \`translateY(-8px) perspective(600px) rotateY(\${x * 20}deg) rotateX(\${-y * 20}deg) scale(1.08)\`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    

        // Carousel dots for exhibitions
        const grid = document.querySelector('.exhibitions-grid');
        const dots = document.querySelectorAll('.carousel-dots span');
        if (grid && dots.length) {
            grid.addEventListener('scroll', () => {
                const scrollLeft = grid.scrollLeft;
                const cardWidth = grid.querySelector('.exhibition-card').offsetWidth + 16;
                const index = Math.round(scrollLeft / cardWidth);
                dots.forEach((dot, i) => {
                    dot.style.background = i === index ? 'var(--primary)' : '#d1d5db';
                });
            });
        }

        // Carousel dots for blog
        const blogGrid = document.querySelector('.blog-magazine');
        const blogDots = document.querySelectorAll('.blog-dots span');
        if (blogGrid && blogDots.length) {
            blogGrid.addEventListener('scroll', () => {
                const scrollLeft = blogGrid.scrollLeft;
                const cardWidth = blogGrid.querySelector('.blog-card').offsetWidth + 16;
                const index = Math.round(scrollLeft / cardWidth);
                blogDots.forEach((dot, i) => {
                    dot.style.background = i === index ? 'var(--primary)' : '#d1d5db';
                });
            });
        }
    `;

const HOMEPAGE_HTML = `    <!-- Hero -->
    <section class="hero" id="main-content">
        <div class="container">
            <div class="hero-content">
                <div class="hero-badge">🏆 Malaysia's #1 Home & Living Expo</div>
                <h1>Transform Your<br><span>Dream Home</span><br>Into Reality</h1>
                <p>Discover upcoming HOMElove home expos across Malaysia and explore furniture, home appliances, renovation solutions, home essentials, and exclusive expo deals all in one place.</p>
                <div class="hero-buttons">
                    <a href="#" class="btn btn-secondary">Find Exhibitions →</a>
                </div>
            </div>
            <div class="hero-image">
                <div class="hero-card">
                    <div class="hero-card-header">
                        <h3>Upcoming Events</h3>
                        <div class="live-badge">LIVE</div>
                    </div>
                    <div class="event-list" style="display:flex;flex-direction:column;gap:10px;">
                        <!-- Event 1: Image LEFT, text right -->
                        <div style="display:flex;border-radius:12px;overflow:hidden;cursor:pointer;transition:transform 0.25s ease,box-shadow 0.25s ease;border:1px solid #eee;background:white;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.1)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                            <div style="width:200px;flex-shrink:0;background:#f0f4f8;display:flex;align-items:center;justify-content:center;"><img src="https://homelove.com.my/sites/default/files/paragraph/text-with-background/HL_BCCK_Q2_LandingPage-%26-MainPage_R1-02_1_1.png" alt="HOMElove Kuching" style="width:100%;height:100%;object-fit:contain;"></div>
                            <div style="flex:1;padding:12px 14px;display:flex;flex-direction:column;justify-content:center;">
                                <h4 style="font-size:14px;font-weight:700;color:var(--dark);margin-bottom:2px;">HOMElove Kuching</h4>
                                <p style="font-size:11px;color:#888;line-height:1.3;margin-bottom:5px;">Borneo Convention Centre Kuching (BCCK)<br>Sarawak</p>
                                <div style="background:var(--secondary);color:white;padding:4px 10px;border-radius:6px;font-size:12px;font-weight:700;display:inline-block;width:fit-content;">2 Apr – 5 Apr</div>
                            </div>
                        </div>
                        <!-- Event 2 -->
                        <div style="display:flex;border-radius:12px;overflow:hidden;cursor:pointer;transition:transform 0.25s ease,box-shadow 0.25s ease;border:1px solid #eee;background:white;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.1)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                            <div style="width:200px;flex-shrink:0;background:#f0f4f8;display:flex;align-items:center;justify-content:center;"><img src="https://homelove.com.my/sites/default/files/paragraph/text-with-background/Q1_SASICC_Event-responde_1920x1005.jpg_0.jpeg" alt="HOMElove Kuantan" style="width:100%;height:100%;object-fit:contain;"></div>
                            <div style="flex:1;padding:12px 14px;display:flex;flex-direction:column;justify-content:center;">
                                <h4 style="font-size:14px;font-weight:700;color:var(--dark);margin-bottom:2px;">HOMElove Kuantan</h4>
                                <p style="font-size:11px;color:#888;line-height:1.3;margin-bottom:5px;">Sultan Ahmad Shah Int'l Conv. Centre<br>Pahang</p>
                                <div style="background:var(--secondary);color:white;padding:4px 10px;border-radius:6px;font-size:12px;font-weight:700;display:inline-block;width:fit-content;">9 Apr – 12 Apr</div>
                            </div>
                        </div>
                        <!-- Event 3: Longer date -->
                        <div style="display:flex;border-radius:12px;overflow:hidden;cursor:pointer;transition:transform 0.25s ease,box-shadow 0.25s ease;border:1px solid #eee;background:white;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.1)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                            <div style="width:200px;flex-shrink:0;background:#f0f4f8;display:flex;align-items:center;justify-content:center;"><img src="https://homelove.com.my/sites/default/files/paragraph/text-with-background/Q1_SASICC_Event-responde_1920x1005.jpg_0.jpeg" alt="HOMElove Penang" style="width:100%;height:100%;object-fit:contain;"></div>
                            <div style="flex:1;padding:12px 14px;display:flex;flex-direction:column;justify-content:center;">
                                <h4 style="font-size:14px;font-weight:700;color:var(--dark);margin-bottom:2px;">HOMElove Penang</h4>
                                <p style="font-size:11px;color:#888;line-height:1.3;margin-bottom:5px;">Setia SPICE Convention Centre (SSCC)<br>Penang</p>
                                <div style="background:var(--secondary);color:white;padding:4px 10px;border-radius:6px;font-size:12px;font-weight:700;display:inline-block;width:fit-content;">30 Jul – 2 Aug</div>
                            </div>
                        </div>
                    </div>
                    <!-- View All link -->
                    <a href="#" style="display:block;text-align:center;margin-top:14px;font-size:13px;font-weight:700;color:var(--primary);text-decoration:none;">View All Exhibitions →</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Animated Scrolling Text Marquee -->
    <div class="marquee-section">
        <div class="marquee-track">
            <span class="marquee-item">Bathroom</span>
            <span class="marquee-item">Smart Living</span>
            <span class="marquee-item">Interior Design</span>
            <span class="marquee-item">Free Entry</span>
            <span class="marquee-item">Furniture</span>
            <span class="marquee-item">Home Appliances</span>
            <span class="marquee-item">Renovation</span>
            <span class="marquee-item">Kitchen</span>
            <span class="marquee-item">Bedroom</span>
            <span class="marquee-item">Mattresses</span>
            <span class="marquee-item">Home Security</span>
            <span class="marquee-item">Flooring</span>
            <!-- Duplicate for seamless loop -->
            <span class="marquee-item">Bathroom</span>
            <span class="marquee-item">Smart Living</span>
            <span class="marquee-item">Interior Design</span>
            <span class="marquee-item">Free Entry</span>
            <span class="marquee-item">Furniture</span>
            <span class="marquee-item">Home Appliances</span>
            <span class="marquee-item">Renovation</span>
            <span class="marquee-item">Kitchen</span>
            <span class="marquee-item">Bedroom</span>
            <span class="marquee-item">Mattresses</span>
            <span class="marquee-item">Home Security</span>
            <span class="marquee-item">Flooring</span>
        </div>
    </div>

    <!-- Stats - Modern Design -->
    <section class="stats">
        <div class="container">
            <div class="stats-header animate-on-scroll">
                <h2>Trusted by Millions of Malaysian Homeowners</h2>
                <p>Over a decade of connecting homeowners with the best home & living brands across 8 locations in Malaysia.</p>
            </div>
            <div class="stats-grid">
                <div class="stat-card animate-on-scroll delay-1">
                    <div class="stat-icon">🏆</div>
                    <div class="stat-number"><span class="count-up" data-target="141">0</span><span class="stat-suffix">+</span></div>
                    <div class="stat-label">Exhibitions Organized</div>
                </div>
                <div class="stat-card animate-on-scroll delay-2">
                    <div class="stat-icon">🏪</div>
                    <div class="stat-number"><span class="count-up" data-target="6173" data-format="comma">0</span><span class="stat-suffix">+</span></div>
                    <div class="stat-label">Trusted Exhibitors</div>
                </div>
                <div class="stat-card animate-on-scroll delay-3">
                    <div class="stat-icon">👥</div>
                    <div class="stat-number"><span class="count-up" data-target="5" data-suffix="M">0</span><span class="stat-suffix">+</span></div>
                    <div class="stat-label">Happy Visitors</div>
                </div>
                <div class="stat-card animate-on-scroll delay-4">
                    <div class="stat-icon">📍</div>
                    <div class="stat-number" style="font-size:clamp(1.6rem,3.5vw,2.4rem);">Since <span style="color:var(--orange);">2015</span></div>
                    <div class="stat-label">Year Founded · Trusted Since</div>
                </div>
            </div>
        </div>
    </section>

    <!-- What to Expect at the Expo -->
    <section class="expect-section">
        <div class="container">
            <div class="section-header" style="text-align:center;">
                <div class="section-badge animate-on-scroll" style="display:inline-flex;">🏠 Why HOMElove</div>
                <h2 class="animate-on-scroll">What to Expect at the Expo</h2>
                <p style="color:var(--gray);font-size:16px;max-width:560px;margin:8px auto 0;" class="animate-on-scroll">Every HOMElove exhibition is packed with value, inspiration, and hands-on expert guidance.</p>
            </div>
            <div class="expect-grid">
                <div class="expect-card animate-on-scroll delay-1">
                    <div class="expect-icon" style="background:#fff3e0;">🏷️</div>
                    <h4>Exclusive Expo Deals</h4>
                    <p>Unlock special pricing only available at the event — from furniture to renovation packages and appliances.</p>
                </div>
                <div class="expect-card animate-on-scroll delay-2">
                    <div class="expect-icon" style="background:#ffebee;">🎟️</div>
                    <h4>Free Entry for All</h4>
                    <p>No tickets, no registration. Walk in and explore hundreds of home brands completely at no cost.</p>
                </div>
                <div class="expect-card animate-on-scroll delay-3">
                    <div class="expect-icon" style="background:#e3f2fd;">🏪</div>
                    <h4>500+ Brand Exhibitors</h4>
                    <p>A carefully curated mix of local and international home brands all under one roof at each show.</p>
                </div>
                <div class="expect-card animate-on-scroll delay-1">
                    <div class="expect-icon" style="background:#e8f5e9;">💡</div>
                    <h4>Expert Consultations</h4>
                    <p>Speak directly with interior designers, renovation contractors, and product specialists on the floor.</p>
                </div>
                <div class="expect-card animate-on-scroll delay-2">
                    <div class="expect-icon" style="background:#fce4ec;">🎁</div>
                    <h4>Lucky Draws & Prizes</h4>
                    <p>Win exciting home products and vouchers at our exciting daily lucky draw sessions every day.</p>
                </div>
                <div class="expect-card animate-on-scroll delay-3">
                    <div class="expect-icon" style="background:#e0f7fa;">👨‍👩‍👧‍👦</div>
                    <h4>Family Friendly Events</h4>
                    <p>Bring the whole family — kids zone and safe activities and comfortable spaces for everyone to enjoy.</p>
                </div>
            </div>
        </div>
    </section>


    <!-- Exhibitions -->
    <section class="section exhibitions">
        <div class="container">
            <div class="section-header" style="text-align:center;">
                <h2 class="animate-on-scroll">Upcoming Home Expo</h2>
                <p style="color:var(--gray);font-size:15px;max-width:560px;margin:8px auto 0;" class="animate-on-scroll">Discover HOMElove home expos across Malaysia — furniture, renovation, home appliances, and exclusive deals. Free admission for everyone.</p>
            </div>
            <div class="exhibitions-grid">
                <div class="exhibition-card animate-on-scroll delay-1">
                    <div class="exhibition-image">
                        <img src="https://homelove.com.my/sites/default/files/paragraph/text-with-background/HL_BCCK_Q2_LandingPage-%26-MainPage_R1-02_1_1.png" alt="HOMElove Kuching">
                    </div>
                    <div class="exhibition-content">
                        <div class="exhibition-meta">
                            <span>Sarawak</span>
                            <span>4 Days</span>
                        </div>
                        <h3>HOMElove Home Expo</h3>
                        <p>Borneo Convention Centre Kuching (BCCK)</p>
                        <div class="exhibition-footer">
                            <span class="exhibition-date">2-5 Apr 2026</span>
                            <a href="#" class="btn btn-primary" style="padding: 10px 18px; font-size: 13px;">Learn More</a>
                        </div>
                    </div>
                </div>
                <div class="exhibition-card animate-on-scroll delay-2">
                    <div class="exhibition-image">
                        <img src="https://homelove.com.my/sites/default/files/paragraph/text-with-background/Q1_SASICC_Event-responde_1920x1005.jpg_0.jpeg" alt="HOMElove Kuantan">
                    </div>
                    <div class="exhibition-content">
                        <div class="exhibition-meta">
                            <span>Pahang</span>
                            <span>4 Days</span>
                        </div>
                        <h3>HOMElove Home Expo</h3>
                        <p>Sultan Ahmad Shah Int'l Conv. Centre</p>
                        <div class="exhibition-footer">
                            <span class="exhibition-date">9-12 Apr 2026</span>
                            <a href="#" class="btn btn-primary" style="padding: 10px 18px; font-size: 13px;">Learn More</a>
                        </div>
                    </div>
                </div>
                <div class="exhibition-card animate-on-scroll delay-3">
                    <div class="exhibition-image">
                        <img src="https://homelove.com.my/sites/default/files/paragraph/text-with-background/Q1_SASICC_Event-responde_1920x1005.jpg_0.jpeg" alt="HOMElove Penang">
                    </div>
                    <div class="exhibition-content">
                        <div class="exhibition-meta">
                            <span>Penang</span>
                            <span>3 Days</span>
                        </div>
                        <h3>HOMElove Home Expo</h3>
                        <p>Setia SPICE Convention Centre (SSCC)</p>
                        <div class="exhibition-footer">
                            <span class="exhibition-date">1-3 May 2026</span>
                            <a href="#" class="btn btn-primary" style="padding: 10px 18px; font-size: 13px;">Learn More</a>
                        </div>
                    </div>
                </div>
            </div>
            <span class="swipe-hint">Swipe to see more</span>
            <div class="carousel-dots" style="display:none;justify-content:center;gap:8px;margin-top:12px;">
                <span style="width:24px;height:4px;border-radius:2px;background:var(--primary);"></span>
                <span style="width:24px;height:4px;border-radius:2px;background:#d1d5db;"></span>
                <span style="width:24px;height:4px;border-radius:2px;background:#d1d5db;"></span>
            </div>
            <div style="text-align:center;margin-top:36px;" class="animate-on-scroll">
                <a href="#" style="display:inline-block;padding:14px 36px;background:var(--primary);color:white;border-radius:10px;text-decoration:none;font-size:15px;font-weight:700;transition:all 0.3s;" onmouseover="this.style.background='var(--primary-light)';this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(1,75,152,0.3)'" onmouseout="this.style.background='var(--primary)';this.style.transform='';this.style.boxShadow=''">View All Exhibitions →</a>
            </div>
        </div>
    </section>

    <!-- App Section -->
    <section class="app-section">
        <div class="container">
            <div class="app-content">
                <h2 class="animate-on-scroll">Download the HOMElove App</h2>
                <p class="animate-on-scroll">Get exclusive deals, event notifications, and manage your exhibition experience all in one place!</p>
                <div class="app-features">
                    <div class="app-feature animate-on-scroll delay-1">
                        <div class="app-feature-icon">🎁</div>
                        <span>Cash Vouchers & Gift Redemptions</span>
                    </div>
                    <div class="app-feature animate-on-scroll delay-2">
                        <div class="app-feature-icon">📢</div>
                        <span>Latest Event Promotions</span>
                    </div>
                    <div class="app-feature animate-on-scroll delay-3">
                        <div class="app-feature-icon">🧾</div>
                        <span>Keep Track of Receipts</span>
                    </div>
                    <div class="app-feature animate-on-scroll delay-4">
                        <div class="app-feature-icon">🏠</div>
                        <span>Home Ideas & Inspiration</span>
                    </div>
                </div>
                <div class="app-buttons animate-on-scroll">
                    <a href="#" class="app-button" style="padding:14px 28px;gap:14px;">
                        <svg style="width:32px;height:32px;flex-shrink:0;" viewBox="0 0 512 512">
                            <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z" fill="#32BBFF"/>
                            <path d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z" fill="#32BBFF"/>
                            <path d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z" fill="#32BBFF"/>
                            <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z" fill="#32BBFF"/>
                            <path d="M104.6 499l280.8-161.2-60.1-60.1L104.6 499z" fill="#2DCDAC"/>
                            <path d="M472.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8z" fill="#FFCF00"/>
                            <path d="M104.6 13L325.3 234.3l60.1-60.1L104.6 13z" fill="#F14F4C"/>
                        </svg>
                        <div class="app-button-text">
                            <small>GET IT ON</small>
                            <span>Google Play</span>
                        </div>
                    </a>
                    <a href="#" class="app-button" style="padding:14px 28px;gap:14px;">
                        <svg style="width:32px;height:32px;flex-shrink:0;" viewBox="0 0 384 512" fill="white"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                        <div class="app-button-text">
                            <small>Download on the</small>
                            <span>App Store</span>
                        </div>
                    </a>
                </div>
            </div>
            <!-- Mobile phone preview (hidden on desktop, shown on mobile) -->
            <div class="app-phone-preview">
                <div class="app-phone-header">
                    <img src="logos/homelove/homelove-white.png" alt="HOMElove">
                </div>
                <div class="app-phone-body">
                    <div class="app-phone-tiles">
                        <div class="app-phone-tile">
                            <div class="app-phone-tile-icon">🎁</div>
                            <span>Cash Vouchers & Gift Redemptions</span>
                        </div>
                        <div class="app-phone-tile">
                            <div class="app-phone-tile-icon">📢</div>
                            <span>Latest Event Promotions</span>
                        </div>
                        <div class="app-phone-tile">
                            <div class="app-phone-tile-icon">🧾</div>
                            <span>Keep Track of Receipts</span>
                        </div>
                        <div class="app-phone-tile">
                            <div class="app-phone-tile-icon">🏠</div>
                            <span>Home Ideas & Inspiration</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="app-mockup">
                <div class="phone-frame">
                    <div class="phone-screen">
                        <div class="phone-header">
                            <div class="phone-logo"><img src="https://homelove.com.my/sites/default/files/homelove-logo-2023.png" alt="HOMElove"></div>
                            <h4>HOMElove</h4>
                        </div>
                        <div class="phone-content">
                            <div class="phone-search">
                                🔍 Search exhibitions, exhibitors...
                            </div>
                            <div class="phone-menu">
                                <div class="phone-menu-item">
                                    <div class="phone-menu-icon">📅</div>
                                    <span>Events</span>
                                </div>
                                <div class="phone-menu-item">
                                    <div class="phone-menu-icon">🏪</div>
                                    <span>Exhibitors</span>
                                </div>
                                <div class="phone-menu-item">
                                    <div class="phone-menu-icon">🎁</div>
                                    <span>Rewards</span>
                                </div>
                                <div class="phone-menu-item">
                                    <div class="phone-menu-icon">🧾</div>
                                    <span>Receipts</span>
                                </div>
                                <div class="phone-menu-item">
                                    <div class="phone-menu-icon">📍</div>
                                    <span>Locations</span>
                                </div>
                                <div class="phone-menu-item">
                                    <div class="phone-menu-icon">💡</div>
                                    <span>Ideas</span>
                                </div>
                            </div>
                            <!-- Mobile-only: 4 app features inside phone -->
                            <div class="phone-features-mobile" style="display:none;">
                                <div class="phone-feat">
                                    <div class="phone-feat-icon">🎁</div>
                                    <span>Cash Vouchers & Gifts</span>
                                </div>
                                <div class="phone-feat">
                                    <div class="phone-feat-icon">📢</div>
                                    <span>Event Promotions</span>
                                </div>
                                <div class="phone-feat">
                                    <div class="phone-feat-icon">🧾</div>
                                    <span>Track Receipts</span>
                                </div>
                                <div class="phone-feat">
                                    <div class="phone-feat-icon">🏠</div>
                                    <span>Home Ideas & Inspiration</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Brands — Scrolling Marquee -->
    <section class="brands">
        <div class="container">
            <div class="section-header" style="text-align:center;">
                <h2 class="animate-on-scroll">Brands</h2>
                <p style="color:var(--gray);font-size:15px;max-width:480px;margin:8px auto 0;" class="animate-on-scroll">Over 6,000 quality brands trust HOMElove to connect them with Malaysian homeowners.</p>
            </div>
        </div>
        <div class="brands-marquee-wrapper">
                        <div class="brands-track">
                <img class="brand-logo" src="logos/brands/samsung.png" alt="Samsung" loading="lazy">
                <img class="brand-logo" src="logos/brands/lg.png" alt="LG" loading="lazy">
                <img class="brand-logo" src="logos/brands/panasonic.png" alt="Panasonic" loading="lazy">
                <img class="brand-logo" src="logos/brands/toshiba.png" alt="Toshiba" loading="lazy">
                <img class="brand-logo" src="logos/brands/hitachi.png" alt="Hitachi" loading="lazy">
                <img class="brand-logo" src="logos/brands/daikin.png" alt="Daikin" loading="lazy">
                <img class="brand-logo" src="logos/brands/dyson.png" alt="Dyson" loading="lazy">
                <img class="brand-logo" src="logos/brands/bosch.png" alt="Bosch" loading="lazy">
                <img class="brand-logo" src="logos/brands/electrolux.png" alt="Electrolux" loading="lazy">
                <img class="brand-logo" src="logos/brands/philips.png" alt="Philips" loading="lazy">
                <img class="brand-logo" src="logos/brands/hisense.png" alt="Hisense" loading="lazy">
                <img class="brand-logo" src="logos/brands/beko.png" alt="Beko" loading="lazy">
                <img class="brand-logo" src="logos/brands/haier.png" alt="Haier" loading="lazy">
                <img class="brand-logo" src="logos/brands/midea.png" alt="Midea" loading="lazy">
                <img class="brand-logo" src="logos/brands/sharp.png" alt="Sharp" loading="lazy">
                <img class="brand-logo" src="logos/brands/samsung.png" alt="Samsung" loading="lazy">
                <img class="brand-logo" src="logos/brands/lg.png" alt="LG" loading="lazy">
                <img class="brand-logo" src="logos/brands/panasonic.png" alt="Panasonic" loading="lazy">
                <img class="brand-logo" src="logos/brands/toshiba.png" alt="Toshiba" loading="lazy">
                <img class="brand-logo" src="logos/brands/hitachi.png" alt="Hitachi" loading="lazy">
                <img class="brand-logo" src="logos/brands/daikin.png" alt="Daikin" loading="lazy">
                <img class="brand-logo" src="logos/brands/dyson.png" alt="Dyson" loading="lazy">
                <img class="brand-logo" src="logos/brands/bosch.png" alt="Bosch" loading="lazy">
                <img class="brand-logo" src="logos/brands/electrolux.png" alt="Electrolux" loading="lazy">
                <img class="brand-logo" src="logos/brands/philips.png" alt="Philips" loading="lazy">
                <img class="brand-logo" src="logos/brands/hisense.png" alt="Hisense" loading="lazy">
                <img class="brand-logo" src="logos/brands/beko.png" alt="Beko" loading="lazy">
                <img class="brand-logo" src="logos/brands/haier.png" alt="Haier" loading="lazy">
                <img class="brand-logo" src="logos/brands/midea.png" alt="Midea" loading="lazy">
                <img class="brand-logo" src="logos/brands/sharp.png" alt="Sharp" loading="lazy">
            </div>
            <div class="brands-track">
                <img class="brand-logo" src="logos/brands/king-koil.png" alt="King Koil" loading="lazy">
                <img class="brand-logo" src="logos/brands/dunlopillo.png" alt="Dunlopillo" loading="lazy">
                <img class="brand-logo" src="logos/brands/getha.png" alt="Getha" loading="lazy">
                <img class="brand-logo" src="logos/brands/serta.png" alt="Serta" loading="lazy">
                <img class="brand-logo" src="logos/brands/slumberland.png" alt="Slumberland" loading="lazy">
                <img class="brand-logo" src="logos/brands/tefal.png" alt="Tefal" loading="lazy">
                <img class="brand-logo" src="logos/brands/nespresso.png" alt="Nespresso" loading="lazy">
                <img class="brand-logo" src="logos/brands/kitchenaid.png" alt="KitchenAid" loading="lazy">
                <img class="brand-logo" src="logos/brands/ogawa.png" alt="Ogawa" loading="lazy">
                <img class="brand-logo" src="logos/brands/coway.png" alt="Coway" loading="lazy">
                <img class="brand-logo" src="logos/brands/cuckoo.png" alt="Cuckoo" loading="lazy">
                <img class="brand-logo" src="logos/brands/rinnai.png" alt="Rinnai" loading="lazy">
                <img class="brand-logo" src="logos/brands/yale.png" alt="Yale" loading="lazy">
                <img class="brand-logo" src="logos/brands/karcher.png" alt="Karcher" loading="lazy">
                <img class="brand-logo" src="logos/brands/fotile.png" alt="Fotile" loading="lazy">
                <img class="brand-logo" src="logos/brands/king-koil.png" alt="King Koil" loading="lazy">
                <img class="brand-logo" src="logos/brands/dunlopillo.png" alt="Dunlopillo" loading="lazy">
                <img class="brand-logo" src="logos/brands/getha.png" alt="Getha" loading="lazy">
                <img class="brand-logo" src="logos/brands/serta.png" alt="Serta" loading="lazy">
                <img class="brand-logo" src="logos/brands/slumberland.png" alt="Slumberland" loading="lazy">
                <img class="brand-logo" src="logos/brands/tefal.png" alt="Tefal" loading="lazy">
                <img class="brand-logo" src="logos/brands/nespresso.png" alt="Nespresso" loading="lazy">
                <img class="brand-logo" src="logos/brands/kitchenaid.png" alt="KitchenAid" loading="lazy">
                <img class="brand-logo" src="logos/brands/ogawa.png" alt="Ogawa" loading="lazy">
                <img class="brand-logo" src="logos/brands/coway.png" alt="Coway" loading="lazy">
                <img class="brand-logo" src="logos/brands/cuckoo.png" alt="Cuckoo" loading="lazy">
                <img class="brand-logo" src="logos/brands/rinnai.png" alt="Rinnai" loading="lazy">
                <img class="brand-logo" src="logos/brands/yale.png" alt="Yale" loading="lazy">
                <img class="brand-logo" src="logos/brands/karcher.png" alt="Karcher" loading="lazy">
                <img class="brand-logo" src="logos/brands/fotile.png" alt="Fotile" loading="lazy">
            </div>
    </section>

    <!-- Blog -->
    <section class="section blog">
        <div class="container">
            <div class="section-header" style="text-align:center;margin-bottom:32px;">
                <h2 class="animate-on-scroll" style="margin-bottom:6px;">Home Tips</h2>
                <p style="color:var(--gray);font-size:15px;" class="animate-on-scroll">Expert tips and design ideas for every room in your home.</p>
                <a href="#" style="display:inline-block;margin-top:16px;padding:10px 22px;border:2px solid var(--primary);color:var(--primary);border-radius:8px;text-decoration:none;font-size:13px;font-weight:700;transition:all 0.2s;" onmouseover="this.style.background='var(--primary)';this.style.color='white'" onmouseout="this.style.background='transparent';this.style.color='var(--primary)'">View All Articles →</a>
            </div>
            <!-- Magazine layout: 1 big left + 2 small right -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;" class="animate-on-scroll blog-magazine">
                <!-- Big card left -->
                <div class="blog-card" style="grid-row:1/3;border-radius:16px;overflow:hidden;">
                    <div style="height:280px;overflow:hidden;position:relative;">
                        <img src="https://www.homelove.com.my/sites/default/files/styles/slide_type_a/public/node/trend-idea/image/2025-02/1.jpg" alt="Kitchen" style="width:100%;height:100%;object-fit:cover;">
                        <span style="position:absolute;top:12px;left:12px;background:var(--secondary);color:white;padding:5px 14px;border-radius:6px;font-size:11px;font-weight:700;text-transform:uppercase;">Kitchen</span>
                    </div>
                    <div class="blog-content" style="padding:20px;">
                        <h3 style="font-size:1.2rem;margin-bottom:8px;">10 Modern Kitchen Designs That Will Transform Your Cooking Space</h3>
                        <p style="font-size:0.85rem;color:#888;line-height:1.6;">From single bowl to double bowl, undermount to top-mount — everything you need to know about picking the perfect kitchen sink for your cooking style.</p>
                        <a href="#" style="display:inline-block;margin-top:12px;font-size:0.82rem;font-weight:700;color:var(--primary);text-decoration:none;">Read More →</a>
                    </div>
                </div>
                <!-- Top right card -->
                <div class="blog-card" style="display:grid;grid-template-columns:300px 1fr;border-radius:16px;overflow:hidden;">
                    <div style="overflow:hidden;position:relative;height:180px;">
                        <img src="https://www.homelove.com.my/sites/default/files/styles/slide_type_a/public/node/trend-idea/image/2022-02/sofa%2012.jpeg" alt="Furniture" style="width:100%;height:100%;object-fit:cover;object-position:center;">
                        <span style="position:absolute;top:10px;left:10px;background:var(--orange);color:white;padding:4px 12px;border-radius:5px;font-size:10px;font-weight:700;text-transform:uppercase;">Furniture</span>
                    </div>
                    <div class="blog-content" style="padding:16px;display:flex;flex-direction:column;justify-content:center;">
                        <h3 style="font-size:1rem;margin-bottom:6px;">How to Choose the Perfect Sofa for Your Malaysian Living Room</h3>
                        <p style="font-size:0.78rem;color:#888;line-height:1.5;">Everything you need to consider before making this long-term investment in your home.</p>
                        <a href="#" style="display:inline-block;margin-top:8px;font-size:0.78rem;font-weight:700;color:var(--primary);text-decoration:none;">Read More →</a>
                    </div>
                </div>
                <!-- Bottom right card -->
                <div class="blog-card" style="display:grid;grid-template-columns:300px 1fr;border-radius:16px;overflow:hidden;">
                    <div style="overflow:hidden;position:relative;height:180px;">
                        <img src="bathroom.png" alt="Bathroom" style="width:100%;height:100%;object-fit:cover;object-position:center;">
                        <span style="position:absolute;top:10px;left:10px;background:var(--primary);color:white;padding:4px 12px;border-radius:5px;font-size:10px;font-weight:700;text-transform:uppercase;">Bathroom</span>
                    </div>
                    <div class="blog-content" style="padding:16px;display:flex;flex-direction:column;justify-content:center;">
                        <h3 style="font-size:1rem;margin-bottom:6px;">Modern Bathroom Interior Design: Achieving Luxury on a Budget</h3>
                        <p style="font-size:0.78rem;color:#888;line-height:1.5;">Explore the defining bathroom trends — from freestanding tubs to minimalist fixtures.</p>
                        <a href="#" style="display:inline-block;margin-top:8px;font-size:0.78rem;font-weight:700;color:var(--primary);text-decoration:none;">Read More →</a>
                    </div>
                </div>
            </div>
            <span class="swipe-hint blog-swipe-hint">Swipe to see more</span>
            <div class="blog-dots" style="display:none;justify-content:center;gap:8px;margin-top:12px;">
                <span style="width:24px;height:4px;border-radius:2px;background:var(--primary);"></span>
                <span style="width:24px;height:4px;border-radius:2px;background:#d1d5db;"></span>
                <span style="width:24px;height:4px;border-radius:2px;background:#d1d5db;"></span>
            </div>
        </div>
    </section>

    <!-- NEWSLETTER -->
    <section id="newsletter" style="background:linear-gradient(135deg,var(--primary) 0%,var(--primary-light) 100%);padding:70px 0;">
        <div class="container" style="max-width:800px;text-align:center;">
            <h2 class="nl-title" style="color:white;font-size:40px;margin:0 0 8px;font-weight:800;letter-spacing:-0.02em;">Newsletter</h2>
            <p style="color:rgba(255,255,255,0.7);font-size:1rem;margin-bottom:32px;">Get Latest Deals & Event Updates</p>
            <form style="background:white;border-radius:16px;padding:32px;text-align:left;" onsubmit="event.preventDefault();alert('Thank you for subscribing!');">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
                    <div>
                        <label style="display:block;font-size:0.85rem;font-weight:600;color:var(--dark);margin-bottom:6px;">Name <span style="color:var(--secondary);">*</span></label>
                        <input type="text" required placeholder="Your full name" style="width:100%;padding:12px 16px;border:1.5px solid #E5E7EB;border-radius:8px;font-size:0.9rem;font-family:inherit;outline:none;transition:border 0.2s;" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#E5E7EB'">
                    </div>
                    <div>
                        <label style="display:block;font-size:0.85rem;font-weight:600;color:var(--dark);margin-bottom:6px;">Phone <span style="color:var(--secondary);">*</span></label>
                        <input type="tel" required placeholder="+60X-XXX XXXX" style="width:100%;padding:12px 16px;border:1.5px solid #E5E7EB;border-radius:8px;font-size:0.9rem;font-family:inherit;outline:none;transition:border 0.2s;" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#E5E7EB'">
                    </div>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
                    <div>
                        <label style="display:block;font-size:0.85rem;font-weight:600;color:var(--dark);margin-bottom:6px;">Email <span style="color:var(--secondary);">*</span></label>
                        <input type="email" required placeholder="your@email.com" style="width:100%;padding:12px 16px;border:1.5px solid #E5E7EB;border-radius:8px;font-size:0.9rem;font-family:inherit;outline:none;transition:border 0.2s;" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#E5E7EB'">
                    </div>
                    <div>
                        <label style="display:block;font-size:0.85rem;font-weight:600;color:var(--dark);margin-bottom:6px;">State</label>
                        <select style="width:100%;padding:12px 16px;border:1.5px solid #E5E7EB;border-radius:8px;font-size:0.9rem;font-family:inherit;outline:none;background:white;transition:border 0.2s;" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#E5E7EB'">
                            <option value="">Select state</option>
                            <option>Selangor</option><option>Kuala Lumpur</option><option>Johor</option>
                            <option>Penang</option><option>Perak</option><option>Sabah</option>
                            <option>Sarawak</option><option>Kedah</option><option>Pahang</option>
                            <option>Terengganu</option><option>Kelantan</option><option>Negeri Sembilan</option>
                            <option>Melaka</option><option>Perlis</option><option>Putrajaya</option>
                        </select>
                    </div>
                </div>
                <div style="margin-bottom:20px;">
                    <label style="display:flex;align-items:flex-start;gap:8px;font-size:0.78rem;color:var(--gray);cursor:pointer;">
                        <input type="checkbox" required style="margin-top:3px;">
                        I agree to receive promotional emails and updates from HOMElove. You can unsubscribe at any time.
                    </label>
                </div>
                <button type="submit" style="width:100%;padding:14px;background:var(--primary);color:white;border:none;border-radius:10px;font-size:1rem;font-weight:700;font-family:inherit;cursor:pointer;transition:background 0.2s;" onmouseover="this.style.background='var(--primary-light)'" onmouseout="this.style.background='var(--primary)'">Get Event Updates →</button>
            </form>
        </div>
    </section>

    <!-- What To Expect at the Exhibition -->
    <section style="background:var(--gray-light);padding:70px 0;">
        <div class="container">
            <div style="text-align:center;margin-bottom:40px;">
                <p style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--secondary);margin-bottom:8px;" class="animate-on-scroll">At The Exhibition</p>
                <h2 class="animate-on-scroll expect-title" style="font-size:40px;font-weight:800;margin-bottom:10px;color:var(--dark);">What To Expect</h2>
                <p style="color:var(--gray);font-size:15px;max-width:500px;margin:0 auto;" class="animate-on-scroll">From furniture to smart home tech — everything you need for your dream home, all in one place.</p>
            </div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;" class="expect-cards-grid">
                <div class="animate-on-scroll delay-1" style="background:linear-gradient(145deg,#ffffff,#f8faff);border-radius:18px;padding:36px 28px;text-align:center;transition:all 0.3s cubic-bezier(0.4,0,0.2,1);border:1px solid #e8eef5;box-shadow:0 4px 16px rgba(0,0,0,0.05);" onmouseover="this.style.transform='translateY(-6px)';this.style.boxShadow='0 14px 36px rgba(1,75,152,0.12)';this.style.borderColor='var(--primary)';this.style.background='linear-gradient(145deg,#ffffff,#f0f5ff)'" onmouseout="this.style.transform='';this.style.boxShadow='0 4px 16px rgba(0,0,0,0.05)';this.style.borderColor='#e8eef5';this.style.background='linear-gradient(145deg,#ffffff,#f8faff)'">
                    <div style="font-size:36px;margin-bottom:16px;">🛏️</div>
                    <h4 style="font-size:17px;font-weight:700;color:var(--dark);margin-bottom:8px;">Mattresses & Bedding</h4>
                    <p style="font-size:13px;color:var(--gray);line-height:1.6;">Premium mattresses from top brands at exclusive exhibition prices. Test before you buy.</p>
                </div>
                <div class="animate-on-scroll delay-2" style="background:linear-gradient(145deg,#ffffff,#f8faff);border-radius:18px;padding:36px 28px;text-align:center;transition:all 0.3s cubic-bezier(0.4,0,0.2,1);border:1px solid #e8eef5;box-shadow:0 4px 16px rgba(0,0,0,0.05);" onmouseover="this.style.transform='translateY(-6px)';this.style.boxShadow='0 14px 36px rgba(1,75,152,0.12)';this.style.borderColor='var(--primary)';this.style.background='linear-gradient(145deg,#ffffff,#f0f5ff)'" onmouseout="this.style.transform='';this.style.boxShadow='0 4px 16px rgba(0,0,0,0.05)';this.style.borderColor='#e8eef5';this.style.background='linear-gradient(145deg,#ffffff,#f8faff)'">
                    <div style="font-size:36px;margin-bottom:16px;">🍳</div>
                    <h4 style="font-size:17px;font-weight:700;color:var(--dark);margin-bottom:8px;">Kitchen & Appliances</h4>
                    <p style="font-size:13px;color:var(--gray);line-height:1.6;">Complete kitchen packages — hoods, hobs, ovens, sinks, and modern smart appliances.</p>
                </div>
                <div class="animate-on-scroll delay-3" style="background:linear-gradient(145deg,#ffffff,#f8faff);border-radius:18px;padding:36px 28px;text-align:center;transition:all 0.3s cubic-bezier(0.4,0,0.2,1);border:1px solid #e8eef5;box-shadow:0 4px 16px rgba(0,0,0,0.05);" onmouseover="this.style.transform='translateY(-6px)';this.style.boxShadow='0 14px 36px rgba(1,75,152,0.12)';this.style.borderColor='var(--primary)';this.style.background='linear-gradient(145deg,#ffffff,#f0f5ff)'" onmouseout="this.style.transform='';this.style.boxShadow='0 4px 16px rgba(0,0,0,0.05)';this.style.borderColor='#e8eef5';this.style.background='linear-gradient(145deg,#ffffff,#f8faff)'">
                    <div style="font-size:36px;margin-bottom:16px;">🛋️</div>
                    <h4 style="font-size:17px;font-weight:700;color:var(--dark);margin-bottom:8px;">Living & Dining</h4>
                    <p style="font-size:13px;color:var(--gray);line-height:1.6;">Sofas, dining tables, TV consoles, and coffee tables in every style and budget range.</p>
                </div>
                <div class="animate-on-scroll delay-1" style="background:linear-gradient(145deg,#ffffff,#f8faff);border-radius:18px;padding:36px 28px;text-align:center;transition:all 0.3s cubic-bezier(0.4,0,0.2,1);border:1px solid #e8eef5;box-shadow:0 4px 16px rgba(0,0,0,0.05);" onmouseover="this.style.transform='translateY(-6px)';this.style.boxShadow='0 14px 36px rgba(1,75,152,0.12)';this.style.borderColor='var(--primary)';this.style.background='linear-gradient(145deg,#ffffff,#f0f5ff)'" onmouseout="this.style.transform='';this.style.boxShadow='0 4px 16px rgba(0,0,0,0.05)';this.style.borderColor='#e8eef5';this.style.background='linear-gradient(145deg,#ffffff,#f8faff)'">
                    <div style="font-size:36px;margin-bottom:16px;">💡</div>
                    <h4 style="font-size:17px;font-weight:700;color:var(--dark);margin-bottom:8px;">Smart Home Tech</h4>
                    <p style="font-size:13px;color:var(--gray);line-height:1.6;">Automated curtains, smart locks, lighting systems, and air purifiers for the modern home.</p>
                </div>
                <div class="animate-on-scroll delay-2" style="background:linear-gradient(145deg,#ffffff,#f8faff);border-radius:18px;padding:36px 28px;text-align:center;transition:all 0.3s cubic-bezier(0.4,0,0.2,1);border:1px solid #e8eef5;box-shadow:0 4px 16px rgba(0,0,0,0.05);" onmouseover="this.style.transform='translateY(-6px)';this.style.boxShadow='0 14px 36px rgba(1,75,152,0.12)';this.style.borderColor='var(--primary)';this.style.background='linear-gradient(145deg,#ffffff,#f0f5ff)'" onmouseout="this.style.transform='';this.style.boxShadow='0 4px 16px rgba(0,0,0,0.05)';this.style.borderColor='#e8eef5';this.style.background='linear-gradient(145deg,#ffffff,#f8faff)'">
                    <div style="font-size:36px;margin-bottom:16px;">🎨</div>
                    <h4 style="font-size:17px;font-weight:700;color:var(--dark);margin-bottom:8px;">Interior Design</h4>
                    <p style="font-size:13px;color:var(--gray);line-height:1.6;">Consult with professional interior designers and get custom renovation quotes on-site.</p>
                </div>
                <div class="animate-on-scroll delay-3" style="background:linear-gradient(145deg,#ffffff,#f8faff);border-radius:18px;padding:36px 28px;text-align:center;transition:all 0.3s cubic-bezier(0.4,0,0.2,1);border:1px solid #e8eef5;box-shadow:0 4px 16px rgba(0,0,0,0.05);" onmouseover="this.style.transform='translateY(-6px)';this.style.boxShadow='0 14px 36px rgba(1,75,152,0.12)';this.style.borderColor='var(--primary)';this.style.background='linear-gradient(145deg,#ffffff,#f0f5ff)'" onmouseout="this.style.transform='';this.style.boxShadow='0 4px 16px rgba(0,0,0,0.05)';this.style.borderColor='#e8eef5';this.style.background='linear-gradient(145deg,#ffffff,#f8faff)'">
                    <div style="font-size:36px;margin-bottom:16px;">🏷️</div>
                    <h4 style="font-size:17px;font-weight:700;color:var(--dark);margin-bottom:8px;">Exclusive Deals</h4>
                    <p style="font-size:13px;color:var(--gray);line-height:1.6;">Show-only promotions, bundle packages, 0% installment plans, and free delivery offers.</p>
                </div>
            </div>
        </div>
    </section>
    <style>
        @media(max-width:768px) { .expect-cards-grid { grid-template-columns: 1fr 1fr !important; } }
        @media(max-width:480px) { .expect-cards-grid { grid-template-columns: 1fr 1fr !important; gap: 12px !important; } }
        @media(max-width:480px) { .expect-cards-grid > div { padding: 20px 16px !important; } }
        @media(max-width:768px) { .expect-cards-grid { grid-template-columns: 1fr 1fr !important; } }
        @media(max-width:480px) { .expect-cards-grid h4 { font-size: 14px !important; height: 40px !important; display: flex !important; align-items: center !important; justify-content: center !important; } }
        @media(max-width:480px) { .expect-cards-grid p { font-size: 11px !important; } }
        @media(max-width:768px) { .expect-title { font-size: 26px !important; } }
    </style>

    <!-- 3 Steps Before You Shop -->
    <section class="steps-section">
        <div class="container">
            <div style="text-align:center;">
                <h2 class="animate-on-scroll" style="color:white;font-size:40px;font-weight:800;margin-bottom:8px;">3 Important Steps Before You Shop the Expo</h2>
                <p class="animate-on-scroll" style="color:rgba(255,255,255,0.65);font-size:15px;max-width:560px;margin:0 auto;">A little preparation helps you shop smarter, compare better, and avoid missing the deals you actually want.</p>
            </div>
            <div class="steps-row">
                <div class="step-card animate-on-scroll delay-1">
                    <div class="step-num">1</div>
                    <h4>Bring Your Floor Plan & Home Checklist</h4>
                    <p>Bring your floor plan, space measurements, inspiration photos, and home checklist so you can stay focused on what your home really needs and shop more efficiently.</p>
                </div>
                <div class="step-card animate-on-scroll delay-2">
                    <div class="step-num">2</div>
                    <h4>Use the Floor Plan to Guide Your Visit</h4>
                    <p>Follow the expo floor plan to navigate by category or brand, save time, and make sure you don't miss the booths, products, or deals on your list.</p>
                </div>
                <div class="step-card animate-on-scroll delay-3">
                    <div class="step-num">3</div>
                    <h4>Compare Before You Commit</h4>
                    <p>Check prices, product features, package deals, and freebies across different booths before making your final decision.</p>
                </div>
            </div>
            <div style="text-align:center;margin-top:40px;" class="animate-on-scroll">
                <a href="/checklist" style="display:inline-block;padding:14px 32px;background:var(--orange);color:white;border-radius:10px;text-decoration:none;font-size:15px;font-weight:700;transition:all 0.3s;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(224,129,3,0.4)'" onmouseout="this.style.transform='';this.style.boxShadow=''">Use Our Home Checklist →</a>
            </div>
        </div>
    </section>

    <!-- Venues Nationwide — Split Map -->
    <section id="venues-map" style="background:var(--gray-light);padding:70px 0;color:var(--dark);overflow:hidden;position:relative;">
        <div class="container" style="position:relative;z-index:1;">
            <!-- Header -->
            <div style="text-align:center;margin-bottom:36px;">
                <div style="display:inline-block;background:rgba(1,75,152,0.1);border:1px solid rgba(1,75,152,0.2);padding:7px 20px;border-radius:50px;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--primary);margin-bottom:20px;">📍 8 Venues Across Malaysia</div>
                <h2 class="animate-on-scroll" style="color:var(--dark);font-size:40px;font-weight:800;margin-bottom:10px;">Find an Exhibition Near You</h2>
                <p style="color:var(--gray);font-size:15px;max-width:440px;margin:0 auto;line-height:1.55;" class="animate-on-scroll">World-class home exhibitions in major cities nationwide. Free admission at every venue.</p>
            </div>

            <!-- Map + Venues side by side -->
            <div class="map-venues-wrapper">
            <!-- Map with pins -->
            <div style="position:relative;max-width:100%;margin:0 auto;" class="map-container">
                <div style="position:relative;">
                    <img src="Blank_malaysia_map.png" alt="Malaysia Map" style="width:100%;height:auto;">
                    <!-- Penang pin -->
                    <div class="map-pin" style="left:4.5%;top:26%;">
                        <svg width="20" height="28" viewBox="0 0 24 32" fill="var(--primary)"><path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/></svg>
                        <div class="pin-label">
                            <strong>PENANG</strong>
                            <span>Setia SPICE Convention Centre</span>
                            <span>PICCA Butterworth Arena</span>
                        </div>
                    </div>
                    <!-- Selangor pin -->
                    <div class="map-pin pin-selangor" style="left:12.6%;top:51.6%;">
                        <svg width="20" height="28" viewBox="0 0 24 32" fill="var(--primary)"><path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/></svg>
                        <div class="pin-label pin-label-left">
                            <strong>SELANGOR</strong>
                            <span>Sunway Pyramid Convention Centre</span>
                            <span>The Starling Event Hall</span>
                            <span>IOI Grand Exhibition & Convention Centre</span>
                        </div>
                    </div>
                    <!-- KL pin -->
                    <div class="map-pin" style="left:13.6%;top:56.8%;">
                        <svg width="20" height="28" viewBox="0 0 24 32" fill="var(--primary)"><path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/></svg>
                        <div class="pin-label">
                            <strong>KUALA LUMPUR</strong>
                            <span>Mid Valley Exhibition Centre</span>
                            <span>Stadium Bukit Jalil (Car Park B)</span>
                            <span>World Trade Centre KL (WTCKL)</span>
                            <span>Pavilion Exhibition Centre (Bukit Jalil)</span>
                        </div>
                    </div>
                    <!-- Kuantan pin -->
                    <div class="map-pin" style="left:22.6%;top:47.8%;">
                        <svg width="20" height="28" viewBox="0 0 24 32" fill="var(--primary)"><path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/></svg>
                        <div class="pin-label">
                            <strong>KUANTAN</strong>
                            <span>SASICC</span>
                        </div>
                    </div>
                    <!-- Johor pin -->
                    <div class="map-pin" style="left:26.9%;top:79.6%;">
                        <svg width="20" height="28" viewBox="0 0 24 32" fill="var(--primary)"><path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/></svg>
                        <div class="pin-label">
                            <strong>JOHOR</strong>
                            <span>MVEC Southkey Johor Bahru</span>
                            <span>Persada Johor</span>
                        </div>
                    </div>
                    <!-- Miri pin -->
                    <div class="map-pin" style="left:65%;top:38.7%;">
                        <svg width="20" height="28" viewBox="0 0 24 32" fill="var(--primary)"><path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/></svg>
                        <div class="pin-label">
                            <strong>MIRI</strong>
                            <span>Boulevard Shopping Mall</span>
                        </div>
                    </div>
                    <!-- Kuching pin -->
                    <div class="map-pin" style="left:42.9%;top:80.4%;">
                        <svg width="20" height="28" viewBox="0 0 24 32" fill="var(--primary)"><path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/></svg>
                        <div class="pin-label">
                            <strong>KUCHING</strong>
                            <span>Borneo Convention Centre Kuching</span>
                        </div>
                    </div>
                    <!-- Kota Kinabalu pin -->
                    <div class="map-pin" style="left:79.1%;top:15.5%;">
                        <svg width="20" height="28" viewBox="0 0 24 32" fill="var(--primary)"><path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/></svg>
                        <div class="pin-label">
                            <strong>KOTA KINABALU</strong>
                            <span>Sabah International Convention Centre</span>
                        </div>
                    </div>

                </div>
            </div>

            <!-- Venue grid below map (desktop only, hidden when on-map labels active) -->
            <div class="venue-grid">
                <div class="venue-card">
                    <div class="venue-card-hdr">Penang</div>
                    <div class="venue-card-body">
                        <span>Setia SPICE Convention Centre</span>
                        <span>PICCA Butterworth Arena</span>
                    </div>
                </div>
                <div class="venue-card">
                    <div class="venue-card-hdr">Kuala Lumpur</div>
                    <div class="venue-card-body">
                        <span>Mid Valley Exhibition Centre</span>
                        <span>Stadium Bukit Jalil (Car Park B)</span>
                        <span>World Trade Centre KL (WTCKL)</span>
                        <span>Pavilion Exhibition Centre (Bukit Jalil)</span>
                    </div>
                </div>
                <div class="venue-card">
                    <div class="venue-card-hdr">Selangor</div>
                    <div class="venue-card-body">
                        <span>Sunway Pyramid Convention Centre</span>
                        <span>The Starling Event Hall</span>
                        <span>IOI Grand Exhibition & Convention Centre</span>
                    </div>
                </div>
                <div class="venue-card">
                    <div class="venue-card-hdr">Johor</div>
                    <div class="venue-card-body">
                        <span>MVEC Southkey Johor Bahru</span>
                        <span>Persada Johor</span>
                    </div>
                </div>
                <div class="venue-card">
                    <div class="venue-card-hdr">Kuantan</div>
                    <div class="venue-card-body">
                        <span>SASICC</span>
                    </div>
                </div>
                <div class="venue-card">
                    <div class="venue-card-hdr">Kuching</div>
                    <div class="venue-card-body">
                        <span>Borneo Convention Centre Kuching</span>
                    </div>
                </div>
                <div class="venue-card">
                    <div class="venue-card-hdr">Miri</div>
                    <div class="venue-card-body">
                        <span>Boulevard Shopping Mall</span>
                    </div>
                </div>
                <div class="venue-card">
                    <div class="venue-card-hdr">Kota Kinabalu</div>
                    <div class="venue-card-body">
                        <span>Sabah International Convention Centre</span>
                    </div>
                </div>
            </div>
            </div><!-- end map-venues-wrapper -->

            <!-- Mobile venue list (hidden on desktop) -->
            <div class="mobile-venue-list" style="display:none;margin-top:16px;">
                <div class="mobile-venue-grid">
                    <div class="m-venue-card">
                        <div class="m-venue-badge">
                            <svg width="12" height="16" viewBox="0 0 24 32" fill="var(--orange)"><path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/></svg>
                            Penang
                        </div>
                        <span>Setia SPICE Convention Centre</span>
                        <span>PICCA Butterworth Arena</span>
                    </div>
                    <div class="m-venue-card">
                        <div class="m-venue-badge">
                            <svg width="12" height="16" viewBox="0 0 24 32" fill="var(--orange)"><path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/></svg>
                            Kuala Lumpur
                        </div>
                        <span>Mid Valley Exhibition Centre</span>
                        <span>Stadium Bukit Jalil (Car Park B)</span>
                        <span>World Trade Centre KL (WTCKL)</span>
                        <span>Pavilion Exhibition Centre (Bukit Jalil)</span>
                    </div>
                    <div class="m-venue-card">
                        <div class="m-venue-badge">
                            <svg width="12" height="16" viewBox="0 0 24 32" fill="var(--orange)"><path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/></svg>
                            Selangor
                        </div>
                        <span>Sunway Pyramid Convention Centre</span>
                        <span>The Starling Event Hall</span>
                        <span>IOI Grand Exhibition & Convention Centre</span>
                    </div>
                    <div class="m-venue-card">
                        <div class="m-venue-badge">
                            <svg width="12" height="16" viewBox="0 0 24 32" fill="var(--orange)"><path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/></svg>
                            Johor
                        </div>
                        <span>MVEC Southkey Johor Bahru</span>
                        <span>Persada Johor</span>
                    </div>
                    <div class="m-venue-card">
                        <div class="m-venue-badge">
                            <svg width="12" height="16" viewBox="0 0 24 32" fill="var(--orange)"><path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/></svg>
                            Kuantan
                        </div>
                        <span>SASICC</span>
                    </div>
                    <div class="m-venue-card">
                        <div class="m-venue-badge">
                            <svg width="12" height="16" viewBox="0 0 24 32" fill="var(--orange)"><path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/></svg>
                            Kuching
                        </div>
                        <span>Borneo Convention Centre Kuching</span>
                    </div>
                    <div class="m-venue-card">
                        <div class="m-venue-badge">
                            <svg width="12" height="16" viewBox="0 0 24 32" fill="var(--orange)"><path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/></svg>
                            Miri
                        </div>
                        <span>Boulevard Shopping Mall</span>
                    </div>
                    <div class="m-venue-card">
                        <div class="m-venue-badge">
                            <svg width="12" height="16" viewBox="0 0 24 32" fill="var(--orange)"><path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/></svg>
                            Kota Kinabalu
                        </div>
                        <span>Sabah International Convention Centre</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <style>
        /* Map pins — location pin style */
        .map-pin {
            position: absolute;
            z-index: 5;
            transition: transform 0.2s ease;
        }
        .map-pin:hover {
            transform: scale(1.1);
            z-index: 10;
        }
        .map-pin svg {
            width: 24px;
            height: 34px;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
        }
        .pin-label {
            position: absolute;
            left: 24px;
            top: 0;
            display: flex;
            flex-direction: column;
            white-space: nowrap;
        }
        .pin-label-left {
            left: auto;
            right: 24px;
            text-align: right;
        }
        .pin-label strong {
            font-size: 13px;
            font-weight: 700;
            color: var(--primary);
            letter-spacing: 0.5px;
            text-transform: uppercase;
            line-height: 1.3;
        }
        /* Hide venue spans on map pins */
        .pin-label span {
            display: none;
        }

        /* Map + Venues layout */
        .map-venues-wrapper {
            display: block;
        }
        .venue-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-top: 30px;
        }
        .venue-card {
            border-radius: 8px;
            overflow: hidden;
            background: white;
            box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }
        .venue-card-hdr {
            background: #014B98;
            color: white;
            padding: 10px 14px;
            text-align: center;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }
        .venue-card-body {
            padding: 10px 12px;
        }
        .venue-card-body span {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 11px;
            color: var(--dark);
            line-height: 1.7;
        }
        .venue-card-body span::before {
            content: '';
            width: 10px;
            height: 14px;
            background: var(--primary);
            flex-shrink: 0;
            -webkit-mask: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z'/%3E%3C/svg%3E") no-repeat center;
            mask: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z'/%3E%3C/svg%3E") no-repeat center;
        }

        @media (max-width: 768px) {
            #venues-map { padding: 40px 0 30px !important; }
            #venues-map .container > * { opacity: 1 !important; transform: none !important; animation: none !important; }
            #venues-map h2 { font-size: 26px !important; }
            #venues-map p { font-size: 13px !important; }
            #venues-map .map-container { max-width: 100% !important; margin: 0 !important; padding: 0 !important; }
            #venues-map .map-container > div { padding: 0 !important; }
            .pin-label span { display: none !important; }
            .pin-label strong { font-size: 8px; letter-spacing: 0.3px; }
            .map-pin svg { width: 14px; height: 20px; }
            .pin-label { left: 16px !important; }
            .pin-label-left { left: auto !important; right: 16px !important; }
            .map-venues-wrapper { display: block !important; }
            .mobile-venue-list { display: block !important; }
            .venue-grid { display: none !important; }
            /* Mobile venue cards */
            .mobile-venue-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 8px;
            }
            .m-venue-card {
                background: white;
                border-radius: 8px;
                border: 1px solid #e5e7eb;
                padding: 0;
                overflow: hidden;
            }
            .m-venue-badge {
                background: var(--primary);
                color: white;
                padding: 6px 10px;
                font-size: 10px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.3px;
                display: flex;
                align-items: center;
                gap: 5px;
            }
            .m-venue-badge svg { display: none; }
            .m-venue-card span {
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 10px;
                color: var(--dark);
                line-height: 1.5;
                padding: 2px 10px;
            }
            .m-venue-card span:first-of-type {
                padding-top: 8px;
            }
            .m-venue-card span:last-of-type {
                padding-bottom: 8px;
            }
            .m-venue-card span::before {
                content: '';
                width: 8px;
                height: 11px;
                background: var(--primary);
                flex-shrink: 0;
                -webkit-mask: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z'/%3E%3C/svg%3E") no-repeat center;
                mask: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z'/%3E%3C/svg%3E") no-repeat center;
            }
        }

        /* Map markers — premium animated pins */
        .map-marker {
            position: absolute; transform: translate(-50%,-50%);
            cursor: pointer; z-index: 5;
            transition: transform 0.2s ease;
            will-change: transform;
        }
        .map-marker:hover, .map-marker.active { transform: translate(-50%,-50%) scale(1.2); z-index: 10; }
        .marker-dot {
            width: 14px; height: 14px; border-radius: 50%;
            background: var(--secondary); border: 2px solid white;
            position: relative; z-index: 2;
            box-shadow: 0 2px 6px rgba(203,21,16,0.4);
            transition: all 0.4s;
        }
        .map-marker.orange .marker-dot {
            background: var(--orange);
            box-shadow: 0 2px 6px rgba(224,129,3,0.4);
        }
        .map-marker:hover .marker-dot, .map-marker.active .marker-dot {
            background: #e83a2a;
            box-shadow: 0 2px 10px rgba(232,58,42,0.5);
            transform: scale(1.25);
        }
        /* Double ripple rings */
        .marker-ripple {
            position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
            width: 16px; height: 16px; border-radius: 50%;
            border: 1px solid var(--secondary); opacity: 0;
            animation: markerRipple 3.5s ease-in-out infinite;
        }
        .marker-ripple::after {
            content: ''; position: absolute; inset: -4px;
            border-radius: 50%; border: 1px solid var(--secondary);
            animation: markerRipple 3.5s ease-in-out infinite 1.2s;
        }
        .map-marker.orange .marker-ripple, .map-marker.orange .marker-ripple::after { border-color: var(--orange); }
        @keyframes markerRipple {
            0% { width:14px; height:14px; opacity:0; }
            15% { opacity:0.4; }
            60% { opacity:0.12; }
            100% { width:52px; height:52px; opacity:0; }
        }
        /* Tooltip with glass effect */
        .map-marker::after {
            content: attr(title); position: absolute; bottom: calc(100% + 14px); left: 50%;
            transform: translateX(-50%) translateY(6px) scale(0.95);
            background: rgba(8,12,28,0.92); backdrop-filter: blur(12px);
            color: rgba(255,255,255,0.95); padding: 8px 16px; border-radius: 10px;
            font-size: 11px; font-weight: 600; white-space: nowrap;
            opacity: 0; pointer-events: none;
            transition: all 0.35s cubic-bezier(0.25,0.1,0.25,1); z-index: 10;
            border: 1px solid rgba(255,255,255,0.08);
            box-shadow: 0 12px 32px rgba(0,0,0,0.5);
            letter-spacing: 0.02em;
        }
        .map-marker:hover::after, .map-marker.active::after {
            opacity: 1; transform: translateX(-50%) translateY(0) scale(1);
        }
        /* Ambient float animation */
        @keyframes ambientFloat {
            0%,100% { transform: translate(0,0); }
            50% { transform: translate(10px,-10px); }
        }

        /* Venue cards — kept for mobile venue list compatibility */
        .vc-dot {
            width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0;
            box-shadow: 0 0 10px currentColor;
            transition: all 0.3s;
        }
        .vc-content { flex: 1; }
        .vc-content h4 { font-size: 14px; font-weight: 700; color: var(--dark); margin-bottom: 2px; transition: color 0.3s; }
        .vc-content p { font-size: 11px; color: var(--gray); transition: color 0.3s; }
        .vc-arrow { font-size: 18px; color: var(--primary); opacity: 0; transform: translateX(-6px); transition: all 0.4s; }

        /* Map float animation */
        .map-container { animation: mapFloat 8s ease-in-out infinite; }
        @keyframes mapFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }

        /* Section fade-in on load */
        #venues-map .container > * {
            opacity: 0; transform: translateY(20px);
            animation: venuesFadeIn 0.8s ease forwards;
        }
        #venues-map .container > *:nth-child(1) { animation-delay: 0.1s; }
        #venues-map .container > *:nth-child(2) { animation-delay: 0.3s; }
        @keyframes venuesFadeIn {
            to { opacity: 1; transform: translateY(0); }
        }

        /* Background gradient shift */
        @keyframes bgShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        @media(max-width:768px) {
            .venues-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
            .map-container { animation: none; }
        }
    </style>
    

    <!-- FAQ -->
    <section class="faq">
        <div class="container">
            <div class="faq-header">
                <h2 class="animate-on-scroll">FAQs About Home Expo in Malaysia</h2>
            </div>
            <div class="faq-list">
                <div class="faq-item animate-on-scroll delay-1">
                    <div class="faq-question">What is a home expo?</div>
                    <div class="faq-answer">
                        <p>A home expo is a large-scale exhibition where various exhibitors showcase home-related products and services, from furniture to renovations.</p>
                    </div>
                </div>
                <div class="faq-item animate-on-scroll delay-2">
                    <div class="faq-question">What is the largest home expo in Malaysia?</div>
                    <div class="faq-answer">
                        <p>HOMElove is one of the largest home expos in Malaysia, hosting events across multiple cities with thousands of exhibitors.</p>
                    </div>
                </div>
                <div class="faq-item animate-on-scroll delay-3">
                    <div class="faq-question">What can I find at a home and living exhibition?</div>
                    <div class="faq-answer">
                        <p>You can find furniture, home appliances, renovation services, interior design solutions, mattresses, kitchenware, and much more.</p>
                    </div>
                </div>
                <div class="faq-item faq-extra animate-on-scroll delay-4">
                    <div class="faq-question">When is the next home expo?</div>
                    <div class="faq-answer">
                        <p>Check our exhibitions page for the latest schedule. We host events throughout the year across Penang, KL, Johor, and more.</p>
                    </div>
                </div>
                <div class="faq-item faq-extra animate-on-scroll">
                    <div class="faq-question">What are the tips to attend a home and living fair?</div>
                    <div class="faq-answer">
                        <p>Come early for the best deals, bring measurements of your space, set a budget, and download our app for exclusive vouchers!</p>
                    </div>
                </div>
                <div class="faq-item faq-extra animate-on-scroll">
                    <div class="faq-question">What makes HOMElove the best home expo in Malaysia?</div>
                    <div class="faq-answer">
                        <p>With over 141 exhibitions, 6,173+ exhibitors, and 5 million visitors, HOMElove is the trusted choice since 2015.</p>
                    </div>
                </div>
            </div>
            <div class="faq-view-all" style="text-align:center;margin-top:20px;">
                <button onclick="document.querySelectorAll('.faq-extra').forEach(el=>el.style.display='block');this.style.display='none';" style="padding:12px 28px;background:var(--primary);color:white;border:none;border-radius:10px;font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;transition:all 0.3s;" onmouseover="this.style.background='var(--primary-light)'" onmouseout="this.style.background='var(--primary)'">View All FAQs ↓</button>
            </div>
        </div>
    </section>

`;

export function WireframeHomepage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        const fn = new Function(HOMEPAGE_JS);
        fn();
      } catch (e) {
        console.warn("Homepage JS error:", e);
      }
    }
  }, []);

  return (
    <div ref={containerRef} dangerouslySetInnerHTML={{ __html: HOMEPAGE_HTML }} />
  );
}
