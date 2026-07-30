// --- GLOBAL COMPONENTS: Nav + Footer ---
// Edit this file to update nav/footer across ALL pages simultaneously.

(function () {

    const CV_PATH = 'cv/Meraj_Hossain_Promit_CV.pdf';

    function getActivePage() {
        const path = window.location.pathname;
        if (/\/blog\//.test(path))         return 'blog';
        if (/\/about\.html/.test(path))    return 'about';
        if (/\/projects\.html/.test(path)) return 'projects';
        if (/\/blog\.html/.test(path))     return 'blog';
        if (/\/books\.html/.test(path))    return 'books';
        if (/\/contact\.html/.test(path))  return 'contact';
        return 'home';
    }

    function navLink(href, label, active, key) {
        const cls = active === key ? 'active' : '';
        return `<a href="${href}" class="${cls}">${label}</a>`;
    }

    function injectNav() {
        const placeholder = document.getElementById('nav-placeholder');
        if (!placeholder) return;

        const active = getActivePage();
        const sub = /\/blog\//.test(window.location.pathname) ? '../' : '';

        const links = [
            ['index.html',    'Home',     'home'],
            ['about.html',    'About',    'about'],
            ['projects.html', 'Projects', 'projects'],
            ['blog.html',     'Notes',    'blog'],
            ['books.html',    'Reading',  'books'],
            ['contact.html',  'Contact',  'contact'],
        ];

        const desktop = links
            .map(([href, label, key]) => navLink(sub + href, label, active, key))
            .join('\n                ');

        const mobile = links
            .map(([href, label, key]) => navLink(sub + href, label, active, key))
            .join('\n            ');

        const nav = `
    <header id="navbar">
        <div class="nav-inner">
            <a href="${sub}index.html" class="nav-brand">Meraj&nbsp;Hossain&nbsp;Promit</a>
            <nav class="nav-links">
                ${desktop}
                <a href="${sub}${CV_PATH}" target="_blank" rel="noopener" class="link-chip"><i class="fas fa-file-lines"></i> CV</a>
            </nav>
            <button class="nav-toggle" id="mobile-menu-btn" aria-label="Menu"><i class="fas fa-bars"></i></button>
        </div>
        <div id="mobile-menu">
            ${mobile}
            <a href="${sub}${CV_PATH}" target="_blank" rel="noopener">CV (PDF)</a>
        </div>
    </header>`;

        placeholder.outerHTML = nav;
        initMobileMenu();
    }

    function injectFooter() {
        const placeholder = document.getElementById('footer-placeholder');
        if (!placeholder) return;

        const sub = /\/blog\//.test(window.location.pathname) ? '../' : '';

        const footer = `
    <footer>
        <div class="footer-inner">
            <div>
                <div class="footer-brand">Meraj Hossain Promit</div>
                <div class="footer-tag">Robot learning &middot; Reinforcement learning &middot; Sim2Real</div>
            </div>
            <div class="footer-social">
                <a href="https://github.com/promit7473" target="_blank" rel="noopener" aria-label="GitHub"><i class="fab fa-github"></i></a>
                <a href="https://linkedin.com/in/mhpromit7473" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                <a href="mailto:merajhossainpromit@gmail.com" aria-label="Email"><i class="fas fa-envelope"></i></a>
                <a href="${sub}${CV_PATH}" target="_blank" rel="noopener" aria-label="CV"><i class="fas fa-file-lines"></i></a>
            </div>
        </div>
        <div class="footer-meta">
            <span class="footer-clock"></span>
        </div>
    </footer>`;

        placeholder.outerHTML = footer;
    }

    function initMobileMenu() {
        const btn  = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        if (!btn || !menu) return;
        const icon = btn.querySelector('i');

        btn.addEventListener('click', function () {
            const isOpen = menu.classList.toggle('open');
            if (icon) icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
        });
        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                menu.classList.remove('open');
                if (icon) icon.className = 'fas fa-bars';
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        injectNav();
        injectFooter();
    });

})();
