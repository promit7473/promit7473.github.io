// --- MAIN JAVASCRIPT FILE ---

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuIcon = mobileMenuBtn.querySelector('i');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            const isHidden = mobileMenu.classList.contains('hidden');
            mobileMenuIcon.className = isHidden ? 'fas fa-bars' : 'fas fa-times';
        });
    }

    // Close mobile menu when a link is clicked
    if (mobileMenu) {
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenuIcon.className = 'fas fa-bars';
            });
        });
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Dynamic text typing effect
    const dynamicText = document.getElementById('dynamic-text');
    if (dynamicText) {
        const titles = [
            "Robotics System Researcher",
            "Robotics Software Engineer",
            "Autonomous Systems Developer",
            "Deep Learning Enthusiast"
        ];
        let titleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeText() {
            const currentTitle = titles[titleIndex];
            
            if (isDeleting) {
                dynamicText.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                dynamicText.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentTitle.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                typingSpeed = 500; // Pause before typing new title
            }

            setTimeout(typeText, typingSpeed);
        }

        typeText();
    }

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced scroll animations with stagger effect
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger delay based on element index
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    entry.target.classList.add('animated');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation with enhanced initial state
    const animateElements = document.querySelectorAll('.project-card, .education-card, .blog-post, .timeline-item, .skill-card, .stat-card');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(40px) scale(0.95)';
        element.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(element);
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-bg');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = heroSection.querySelector('.hero-overlay');
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }

    // Form validation and submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-600');
                    
                    // Remove error class on input
                    field.addEventListener('input', function() {
                        this.classList.remove('border-red-600');
                    });
                }
            });
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'bg-green-900 border border-green-600 text-green-300 px-4 py-3 rounded-lg mb-4';
                successMessage.innerHTML = `
                    <div class="flex items-center">
                        <i class="fas fa-check-circle mr-2"></i>
                        <span>Message sent successfully! I'll get back to you soon.</span>
                    </div>
                `;
                
                form.parentNode.insertBefore(successMessage, form);
                form.reset();
                
                // Remove message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    });

    // Add hover effect to cards
    const cards = document.querySelectorAll('.project-card, .education-card, .blog-post');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Current time display (if element exists)
    const currentTimeEl = document.getElementById('current-time');
    if (currentTimeEl) {
        function updateTime() {
            const now = new Date();
            currentTimeEl.textContent = now.toLocaleString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit', 
                timeZoneName: 'short' 
            });
        }
        
        updateTime();
        setInterval(updateTime, 1000);
    }

    // Custom cursor (for desktop only)
    if (window.innerWidth > 1024) {
        const cursorDot = document.createElement('div');
        const cursorOutline = document.createElement('div');
        
        cursorDot.className = 'cursor-dot';
        cursorOutline.className = 'cursor-outline';
        
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorOutline);
        
        document.body.classList.add('cursor-custom');
        
        document.addEventListener('mousemove', function(e) {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        });
    }

    // Performance optimization: Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.classList.add('lazy');
        imageObserver.observe(img);
    });

    // Theme toggle (if implemented)
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const htmlElement = document.documentElement;
        const currentTheme = localStorage.getItem('theme') || 'dark';
        
        function setTheme(theme) {
            htmlElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            
            const iconHtml = theme === 'dark' 
                ? '<i class="fas fa-sun"></i>' 
                : '<i class="fas fa-moon"></i>';
            themeToggle.innerHTML = iconHtml;
        }
        
        setTheme(currentTheme);
        
        themeToggle.addEventListener('click', function() {
            const newTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenuIcon.className = 'fas fa-bars';
        }
        
        // Ctrl+K for quick search (if implemented)
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            // Focus search input if exists
            const searchInput = document.querySelector('input[type="search"]');
            if (searchInput) {
                searchInput.focus();
            }
        }
    });

    // Print styles
    const printButton = document.querySelector('.print-button');
    if (printButton) {
        printButton.addEventListener('click', function() {
            window.print();
        });
    }

    // Copy to clipboard functionality
    const copyButtons = document.querySelectorAll('.copy-button');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.dataset.copy || this.previousElementSibling.textContent;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                this.classList.add('text-green-400');
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.classList.remove('text-green-400');
                }, 2000);
            });
        });
    });

    // Initialize tooltips
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
    tooltipTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'absolute bg-gray-900 text-white px-2 py-1 rounded text-sm z-50';
            tooltip.textContent = this.dataset.tooltip;
            tooltip.style.top = `${this.offsetTop - 30}px`;
            tooltip.style.left = `${this.offsetLeft}px`;
            
            document.body.appendChild(tooltip);
            
            this.addEventListener('mouseleave', function() {
                tooltip.remove();
            }, { once: true });
        });
    });

    // Smooth scroll with momentum for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.getAttribute('href') !== '#') {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });

    // Magnetic button effect for primary buttons
    const magneticButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .floating-cv-btn');
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });

    // Enhanced parallax effect for sections
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;

                // Parallax for mesh gradient
                const meshGradient = document.querySelector('.mesh-gradient');
                if (meshGradient) {
                    meshGradient.style.transform = `translateY(${scrolled * 0.3}px)`;
                }

                // Parallax for particles
                const particles = document.querySelectorAll('.particle');
                particles.forEach((particle, index) => {
                    const speed = 0.1 + (index * 0.02);
                    particle.style.transform = `translateY(${scrolled * speed}px)`;
                });

                ticking = false;
            });
            ticking = true;
        }
    });

    // Add hover tilt effect to cards
    const tiltCards = document.querySelectorAll('.project-card, .skill-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });

    // Reveal animation for text elements
    const revealText = document.querySelectorAll('h1, h2, h3, p');
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                textObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealText.forEach(text => {
        text.style.opacity = '0';
        textObserver.observe(text);
    });

    // Progress indicator on scroll
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #00d4ff, #4dd0e1, #81d4fa);
        width: 0%;
        z-index: 9999;
        transition: width 0.2s ease;
        box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // Add ripple effect on button clicks
    document.querySelectorAll('button, .btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                animation: rippleEffect 0.6s ease-out;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add CSS animation for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            from {
                transform: scale(0);
                opacity: 1;
            }
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    console.log('🚀 Portfolio website initialized with icy enhancements!');
});