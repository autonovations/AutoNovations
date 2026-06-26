// Initialize Icons
lucide.createIcons();

// Particles.js dynamic configuration based on theme
function initParticles(theme) {
    const container = document.getElementById('particles-js');
    if (!container) return;
    
    // Clear container to clean up any existing canvas instances safely
    container.innerHTML = '';
    
    const isLight = theme === 'light';
    const particleColor = '#00D9FF'; // Always keep the signature neon cyan for the nodes
    const lineColor = isLight ? '#0047AB' : '#00D9FF'; // High contrast lines in light mode (royal blue), neon cyan in dark mode
    const particleOpacity = isLight ? 0.8 : 0.55; // Higher opacity in light mode so the neon cyan nodes stand out clearly
    const minOpacity = isLight ? 0.4 : 0.2;
    const lineOpacity = isLight ? 0.35 : 0.4;
    const lineWidth = 1.8;
    const particleSize = 4.5;

    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": particleColor },
            "shape": {
                "type": "polygon",
                "polygon": { "nb_sides": 6 }
            },
            "opacity": {
                "value": particleOpacity,
                "random": true,
                "anim": { "enable": true, "speed": 1, "opacity_min": minOpacity, "sync": false }
            },
            "size": {
                "value": particleSize,
                "random": true,
                "anim": { "enable": true, "speed": 4, "size_min": 0.3, "sync": false }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": lineColor,
                "opacity": lineOpacity,
                "width": lineWidth
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "bubble" },
                "onclick": { "enable": true, "mode": "push" }
            },
            "modes": {
                "grab": { "distance": 200, "line_linked": { "opacity": 0.4 } },
                "bubble": { "distance": 200, "size": 8, "duration": 2, "opacity": 0.85, "speed": 3 },
                "push": { "particles_nb": 4 }
            }
        },
        "retina_detect": true
    });
}

// Mouse Glow Effect
const mouseGlow = document.getElementById('mouseGlow');
window.addEventListener('mousemove', (e) => {
    mouseGlow.style.left = e.clientX + 'px';
    mouseGlow.style.top = e.clientY + 'px';
});

// Scroll Animations (Reveal)
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
};

const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => revealObserver.observe(el));

// Navbar blur and scale on scroll
const navbar = document.getElementById('navbar');
const navContainer = navbar.querySelector('div');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-dark/60', 'md:bg-dark/80');
        navbar.classList.remove('bg-dark/30', 'md:bg-dark/50');
        navContainer.classList.add('py-2', 'md:py-2.5');
        navContainer.classList.remove('py-3', 'md:py-4');
    } else {
        navbar.classList.add('bg-dark/30', 'md:bg-dark/50');
        navbar.classList.remove('bg-dark/60', 'md:bg-dark/80');
        navContainer.classList.add('py-3', 'md:py-4');
        navContainer.classList.remove('py-2', 'md:py-2.5');
    }
});

// Scroll Spy for active nav links
const sections = ['projects', 'courses']; // Both projects and courses sections exist on this page
const navLinks = document.querySelectorAll('nav div.hidden.md\\:flex a');
const mobileNavLinks = document.querySelectorAll('#mobileMenu a.menu-link');

function updateActiveNavLink() {
    let current = "";
    const scrollPos = window.scrollY + 150;

    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = id;
            }
        }
    });

    const allLinks = [...navLinks, ...mobileNavLinks];
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Handle local hash links and Profile link
        if (href === `#${current}` || (current === "" && href === "about.html")) {
            link.classList.add('text-neon');
            link.classList.remove('text-gray-400', 'text-white');
            if (href === "about.html") {
                link.classList.add('border-b-2', 'border-neon', 'pb-1', 'font-bold');
            }
        } else {
            // Only reset if it's not the active page link (Profile) or if we are in a section
            if (href !== "about.html" || current !== "") {
                link.classList.remove('text-neon', 'border-b-2', 'border-neon', 'pb-1', 'font-bold');
                if (link.classList.contains('menu-link')) {
                    link.classList.add('text-white');
                } else {
                    link.classList.add('text-gray-400');
                }
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Mobile Menu logic
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuLinks = document.querySelectorAll('.menu-link');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
    if (menuOpen) {
        if (mobileMenu) {
            mobileMenu.classList.remove('hidden');
            setTimeout(() => {
                mobileMenu.classList.add('flex', 'active');
            }, 10);
        }
        if (menuBtn) {
            menuBtn.innerHTML = '<i data-lucide="x"></i>';
            menuBtn.setAttribute('aria-expanded', 'true');
        }
        document.body.style.overflow = 'hidden';
    } else {
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            }, 400);
        }
        if (menuBtn) {
            menuBtn.innerHTML = '<i data-lucide="menu"></i>';
            menuBtn.setAttribute('aria-expanded', 'false');
        }
        document.body.style.overflow = '';
    }
    lucide.createIcons();
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            }, 400);
        }
        menuOpen = false;
        if (menuBtn) {
            menuBtn.innerHTML = '<i data-lucide="menu"></i>';
            menuBtn.setAttribute('aria-expanded', 'false');
        }
        document.body.style.overflow = '';
        lucide.createIcons();
    });
});


// Animated Counters
const counters = document.querySelectorAll('.counter');
const counterOptions = {
    threshold: 1.0,
    rootMargin: "0px 0px -20px 0px"
};

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            const increment = target / (duration / 16);

            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current) + (counter.getAttribute('data-target') == '100' ? '%' : '+');
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target + (counter.getAttribute('data-target') == '100' ? '%' : '+');
                }
            };
            updateCounter();
            observer.unobserve(counter);
        }
    });
}, counterOptions);

counters.forEach(counter => counterObserver.observe(counter));





window.addEventListener('DOMContentLoaded', () => {
    // Initial theme set to handle lucide icons properly on load
    const savedTheme = localStorage.getItem('preferredTheme') || 'dark';
    setTheme(savedTheme);

    const desktopToggle = document.getElementById('themeToggleBtn');
    const mobileToggle = document.getElementById('mobileThemeToggleBtn');

    if (desktopToggle) {
        desktopToggle.addEventListener('click', toggleTheme);
    }
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleTheme);
    }
    
    // Initialize project filter listeners
    initProjectFilters();

    // Setup Language Dropdowns (Click/Tap interaction)
    initLangDropdowns();
});

// Theme Toggle Logic
function setTheme(theme) {
    if (theme === 'light') {
        document.documentElement.classList.add('light');
    } else {
        document.documentElement.classList.remove('light');
    }
    localStorage.setItem('preferredTheme', theme);
    // Refresh icons so Lucide switches between sun/moon SVGs correctly
    if (window.lucide) {
        window.lucide.createIcons();
    }
    // Re-initialize particles with the theme colors and contrast
    initParticles(theme);
}

function toggleTheme() {
    const isLight = document.documentElement.classList.contains('light');
    setTheme(isLight ? 'dark' : 'light');
}

// Project Portfolio Dynamic Filtering Logic
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const categoryWrappers = document.querySelectorAll('.project-category-wrapper');

    if (filterButtons.length === 0 || categoryWrappers.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            categoryWrappers.forEach(wrapper => {
                const category = wrapper.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    wrapper.classList.remove('hidden-filter');
                } else {
                    wrapper.classList.add('hidden-filter');
                }
            });
        });
    });
}

function initLangDropdowns() {
    const dropdowns = document.querySelectorAll('.lang-dropdown');
    
    dropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector('.lang-btn');
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                // Close other dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.classList.remove('active');
                        const otherBtn = other.querySelector('.lang-btn');
                        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                    }
                });
                const isActive = dropdown.classList.toggle('active');
                btn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
            const btn = dropdown.querySelector('.lang-btn');
            if (btn) btn.setAttribute('aria-expanded', 'false');
        });
    });
}

