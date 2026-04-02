// --- GLOBAL COMPONENTS: Nav + Footer ---
// Edit this file to update nav/footer across ALL pages simultaneously.

(function () {

    // Detect which page is active based on URL
    function getActivePage() {
        const path = window.location.pathname;
        if (/\/blog\//.test(path))       return 'blog';      // blog post → highlight Blog
        if (/\/about\.html/.test(path))   return 'about';
        if (/\/projects\.html/.test(path))return 'projects';
        if (/\/blog\.html/.test(path))    return 'blog';
        if (/\/books\.html/.test(path))   return 'books';
        if (/\/contact\.html/.test(path)) return 'contact';
        return 'home';
    }

    // Build a single nav link
    function navLink(href, label, active, key, extraClass) {
        const isActive = active === key;
        const cls = (extraClass || '') + (isActive
            ? 'text-cyan-400'
            : 'text-white hover:text-cyan-400 transition-colors');
        return `<a href="${href}" class="${cls}">${label}</a>`;
    }

    // ── NAV ──────────────────────────────────────────────────────────────
    function injectNav() {
        const placeholder = document.getElementById('nav-placeholder');
        if (!placeholder) return;

        const active = getActivePage();
        const sub = /\/blog\//.test(window.location.pathname) ? '../' : '';

        const links = [
            ['index.html',    'Home',     'home'],
            ['about.html',    'About',    'about'],
            ['projects.html', 'Projects', 'projects'],
            ['blog.html',     'Blog',     'blog'],
            ['books.html',    'Books',    'books'],
            ['contact.html',  'Contact',  'contact'],
        ];

        const desktopLinks = links
            .map(([href, label, key]) => navLink(sub + href, label, active, key))
            .join('\n                    ');

        const mobileLinks = links
            .map(([href, label, key]) => navLink(sub + href, label, active, key, 'block '))
            .join('\n                ');

        const nav = `
    <header class="fixed top-0 w-full z-50 transition-all duration-300" id="navbar">
        <nav class="container mx-auto px-6 py-4">
            <div class="flex justify-between items-center">
                <a href="${sub}index.html" class="logo-glow">
                    <span class="text-2xl font-bold font-['Dancing_Script'] gradient-text icon-glow">Promit</span>
                </a>

                <div class="hidden md:flex space-x-8">
                    ${desktopLinks}
                </div>

                <button id="mobile-menu-btn" class="md:hidden text-white">
                    <i class="fas fa-bars text-xl"></i>
                </button>
            </div>
        </nav>

        <div id="mobile-menu" class="md:hidden">
            <div class="px-6 py-4 space-y-4">
                ${mobileLinks}
            </div>
        </div>
    </header>`;

        placeholder.outerHTML = nav;
        initMobileMenu();
    }

    // ── FOOTER ───────────────────────────────────────────────────────────
    function injectFooter() {
        const placeholder = document.getElementById('footer-placeholder');
        if (!placeholder) return;

        const footer = `
    <footer class="bg-black py-12 border-t border-gray-800">
        <div class="container mx-auto px-6">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <div class="mb-6 md:mb-0">
                    <div class="mb-2 logo-glow">
                        <span class="text-xl font-bold font-['Dancing_Script'] gradient-text icon-glow">Promit</span>
                    </div>
                    <p class="text-gray-400 font-['Roboto_Mono']">Robotics Engineer &amp; Researcher</p>
                </div>

                <div class="flex space-x-6">
                    <a href="https://github.com/promit7473" target="_blank" class="text-gray-400 hover:text-cyan-400 transition-colors">
                        <i class="fab fa-github text-2xl icon-glow"></i>
                    </a>
                    <a href="https://linkedin.com/in/mhpromit7473" target="_blank" class="text-gray-400 hover:text-cyan-400 transition-colors">
                        <i class="fab fa-linkedin text-2xl icon-glow"></i>
                    </a>
                    <a href="mailto:merajhossainpromit@gmail.com" class="text-gray-400 hover:text-cyan-400 transition-colors">
                        <i class="fas fa-envelope text-2xl icon-glow"></i>
                    </a>
                </div>
            </div>

            <div class="mt-8 pt-8 border-t border-gray-800 text-center">
                <p class="text-gray-500 font-['Roboto_Mono']">
                    <span class="footer-clock"></span>
                </p>
            </div>
        </div>
    </footer>

    <!-- Floating CV Download Button -->
    <a href="mailto:merajhossainpromit@gmail.com?subject=CV%20Request&body=Hi%20Meraj%2C%20I%20would%20like%20to%20request%20your%20CV." class="floating-cv-btn" title="Request CV via Email">
        <i class="fas fa-download"></i>
        <span>Request CV</span>
    </a>`;

        placeholder.outerHTML = footer;
    }

    // ── MOBILE MENU TOGGLE ───────────────────────────────────────────────
    function initMobileMenu() {
        const btn  = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        if (!btn || !menu) return;

        const icon = btn.querySelector('i');

        btn.addEventListener('click', function () {
            const isOpen = menu.classList.toggle('open');
            if (icon) icon.className = isOpen ? 'fas fa-times text-xl' : 'fas fa-bars text-xl';
        });

        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                menu.classList.remove('open');
                if (icon) icon.className = 'fas fa-bars text-xl';
            });
        });
    }

    // ── INIT ─────────────────────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', function () {
        injectNav();
        injectFooter();
    });

})();
