// --- MAIN JAVASCRIPT ---
// Nav mobile toggle lives in components.js. This file: subtle reveal + footer clock.

document.addEventListener('DOMContentLoaded', function () {

    // Gentle fade-in for cards / entries as they enter the viewport
    const revealables = document.querySelectorAll('[data-reveal]');
    if (revealables.length && 'IntersectionObserver' in window) {
        const io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        revealables.forEach(function (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(14px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            io.observe(el);
        });
    }

    // Footer clock — visitor local time + Dhaka (GMT+6)
    function updateFooterClock() {
        const clocks = document.querySelectorAll('.footer-clock');
        if (!clocks.length) return;
        const now = new Date();
        const opts = { hour: 'numeric', minute: '2-digit', hour12: true };
        const local = now.toLocaleTimeString(undefined, opts);
        const dhaka = now.toLocaleTimeString('en-US', Object.assign({ timeZone: 'Asia/Dhaka' }, opts));
        clocks.forEach(function (el) {
            el.textContent = `Dhaka ${dhaka}  ·  your time ${local}  ·  © ${now.getFullYear()} Meraj Hossain Promit`;
        });
    }
    updateFooterClock();
    setInterval(updateFooterClock, 30000);
});
