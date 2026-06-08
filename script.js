/* =====================================================
   SCRIPT.JS — Arseni Shabanau Portfolio
   ===================================================== */

/* ── Scroll Reveal ─────────────────────────────────────
   Watches every .reveal element; adds .visible when it
   enters the viewport. Staggered delays for siblings.
   ─────────────────────────────────────────────────── */
(function initReveal() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // fire once
                }
            });
        }, { threshold: 0.08 }
    );

    // Observe every .reveal element
    document.querySelectorAll('.reveal').forEach((el) => {
        observer.observe(el);
    });

    // Add stagger delay to siblings inside the same parent
    // so they cascade in one after another
    document.querySelectorAll(
        '.projects-stack, .skills-grid, .stats-row, .contact-row, .hero-cta'
    ).forEach((parent) => {
        parent.querySelectorAll(':scope > *').forEach((child, i) => {
            child.style.transitionDelay = `${i * 0.07}s`;
        });
    });
})();


/* ── Active nav link on scroll ─────────────────────────
   Highlights the matching nav link as sections scroll
   into view.
   ─────────────────────────────────────────────────── */
(function initActiveNav() {
    const sections = document.querySelectorAll('section[id], footer[id]');
    const navLinks = document.querySelectorAll('.header-nav .nav-link');

    if (!sections.length || !navLinks.length) return;

    const HEADER_H = 70; // approx fixed header height in px

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    navLinks.forEach((link) => {
                        link.classList.toggle(
                            'nav-active',
                            link.getAttribute('href') === `#${id}`
                        );
                    });
                }
            });
        }, {
            rootMargin: `-${HEADER_H}px 0px -55% 0px`,
            threshold: 0,
        }
    );

    sections.forEach((s) => observer.observe(s));
})();


/* ── Header background on scroll ──────────────────────
   Adds .scrolled class to <header> once the user scrolls
   past 20px — triggers the CSS background transition.
   ─────────────────────────────────────────────────── */
(function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const THRESHOLD = 20;

    function update() {
        header.classList.toggle('scrolled', window.scrollY > THRESHOLD);
    }

    window.addEventListener('scroll', update, { passive: true });
    update(); // run once on load
})();


/* ── Avatar onerror fallback ───────────────────────────
   The img onerror in HTML already shows the initials span,
   but we also handle the case where onerror fires before
   this script loads (defensive belt-and-suspenders).
   ─────────────────────────────────────────────────── */
(function initAvatarFallback() {
    const img = document.querySelector('.avatar');
    if (!img) return;

    function showFallback() {
        img.style.display = 'none';
        const fallback = document.querySelector('.avatar-fallback');
        if (fallback) fallback.style.display = 'flex';
    }

    // If already broken by load time
    if (img.complete && img.naturalWidth === 0) showFallback();
    img.addEventListener('error', showFallback);
})();

// const video = document.querySelector('.video-player');
// if (video) {
//     video.addEventListener('play', () => {
//         video.removeAttribute('poster');
//     });
// }