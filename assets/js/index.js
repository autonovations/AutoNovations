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
const sections = ['about', 'technologies', 'projects', 'courses', 'contact'];
const navLinks = document.querySelectorAll('nav div.hidden.md\\:flex a[href^="#"]');
const mobileNavLinks = document.querySelectorAll('#mobileMenu a.menu-link[href^="#"]');

function updateActiveNavLink() {
    let current = "";
    const scrollPos = window.scrollY + 150; // Offset for better detection

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
        if (href === `#${current}`) {
            link.classList.add('text-neon');
            link.classList.remove('text-gray-400', 'text-white');
            if (link.classList.contains('menu-link')) {
                 link.classList.add('font-bold');
            }
        } else {
            if (!link.classList.contains('glow-button')) {
                link.classList.remove('text-neon', 'font-bold');
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

// Terminal Simulation Logic
const terminalContent = document.getElementById('terminalContent');
const commands = [
    { text: 'Initializing Neural Core v2.0.4...', delay: 1000 },
    { text: 'Status: ONLINE', color: '#00D9FF', delay: 500 },
    { text: 'Connecting to global IoT mesh...', delay: 1200 },
    { text: 'Nodes found: 1,420,892', delay: 400 },
    { text: 'Executing: SwarmIntelligence.deploy()', delay: 1500 },
    { text: 'Analyzing real-world telemetry...', delay: 800 },
    { text: 'Pattern detected: Autonomous convergence', delay: 1000 },
    { text: 'Action: Optimization protocol active', color: '#00D9FF', delay: 600 },
    { text: 'Waiting for operator command...', delay: 2000, isPrompt: true }
];

let commandIndex = 0;

function typeTerminal() {
    if (commandIndex >= commands.length) {
        appendTerminalInput();
        return;
    }

    const cmd = commands[commandIndex];
    const line = document.createElement('div');
    line.className = 'terminal-line';
    if (cmd.color) line.style.color = cmd.color;

    if (cmd.isPrompt) {
        line.innerHTML = `<span class="terminal-prompt">></span>${cmd.text}<span class="terminal-cursor"></span>`;
    } else {
        line.innerHTML = `<span class="terminal-prompt">></span>${cmd.text}`;
    }

    terminalContent.appendChild(line);
    terminalContent.scrollTop = terminalContent.scrollHeight;

    commandIndex++;
    setTimeout(typeTerminal, cmd.delay);
}

const heroSection = document.getElementById('home');
const terminalElement = document.querySelector('.terminal-window');

if (heroSection && terminalElement) {
    const heroObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && window.getComputedStyle(terminalElement).display !== 'none') {
            typeTerminal();
            heroObserver.disconnect();
        }
    }, { threshold: 0.5 });

    heroObserver.observe(heroSection);
}

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

// Tech Cards Interactivity with SweetAlert2
function initTechCards() {
    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach(card => {
        card.addEventListener('click', () => {
            const titleEl = card.querySelector('h4');
            const descEl = card.querySelector('p');
            const iconEl = card.querySelector('[data-lucide]');
            
            if (!titleEl || !descEl || !iconEl) return;
            
            const title = titleEl.innerText;
            const techId = card.getAttribute('data-tech-id');
            const currentLang = localStorage.getItem('preferredLang') || 'en';
            const detailKey = `tech_card${techId}_detail`;
            const desc = (translations[currentLang] && translations[currentLang][detailKey]) ? translations[currentLang][detailKey] : descEl.innerText;
            const iconName = iconEl.getAttribute('data-lucide');
            const closeText = currentLang === 'es' ? 'Cerrar' : 'Close';
            
            Swal.fire({
                background: 'var(--color-panel)',
                color: 'var(--text-color)',
                showConfirmButton: true,
                confirmButtonText: closeText,
                buttonsStyling: false,
                customClass: {
                    popup: 'autonovations-swal-popup p-6 md:p-8 text-center max-w-lg',
                    confirmButton: 'px-8 py-3 bg-neon text-dark font-bold font-tech rounded-full transition-all duration-300 hover:scale-105 glow-button cursor-pointer mt-4',
                },
                html: `
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 rounded-xl bg-neon/10 flex items-center justify-center mb-6 text-neon border border-neon/20 shadow-[0_0_15px_rgba(0,217,255,0.2)]">
                            <i data-lucide="${iconName}" class="w-9 h-9"></i>
                        </div>
                        <h3 class="text-2xl font-bold font-tech text-white mb-4 tracking-wider">${title}</h3>
                        <p class="text-gray-400 text-sm md:text-base leading-relaxed max-w-md">${desc}</p>
                    </div>
                `,
                didOpen: () => {
                    // Initialize Lucide icons inside the modal
                    if (window.lucide) {
                        window.lucide.createIcons();
                    }
                }
            });
        });
    });
}

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

    // Initialize interactive tech cards
    initTechCards();

    // Start Live Telemetry Update
    initLiveTelemetry();

    // Setup interactive filters
    initFilters();

    // Setup SweetAlert2 Contact Form
    initContactForm();

    // Setup Language Dropdowns (Click/Tap interaction)
    initLangDropdowns();
});

// Live Telemetry Simulation
function initLiveTelemetry() {
    const telemetryNodes = document.getElementById('telemetryNodes');
    const telemetryUav = document.getElementById('telemetryUav');
    const telemetryCpu = document.getElementById('telemetryCpu');
    if (!telemetryNodes || !telemetryUav || !telemetryCpu) return;

    let baseNodes = 1420892;
    let baseCpu = 32;
    const uavStatuses = ['IDLE', 'FLIGHT', 'MAPPING', 'CHARGING', 'SEARCHING'];

    setInterval(() => {
        // Dynamic node count
        baseNodes += Math.floor(Math.random() * 15) - 7;
        telemetryNodes.innerText = `NODES: ${baseNodes.toLocaleString()}`;

        // Dynamic CPU temperature
        baseCpu = (30 + Math.random() * 8).toFixed(1);
        telemetryCpu.innerText = `CPU: ${baseCpu}°C`;

        // Dynamic UAV status
        const status = uavStatuses[Math.floor(Math.random() * uavStatuses.length)];
        const currentLang = localStorage.getItem('preferredLang') || 'en';
        let statusText = status;
        if (currentLang === 'es') {
            if (status === 'IDLE') statusText = 'INACTIVO';
            else if (status === 'FLIGHT') statusText = 'EN VUELO';
            else if (status === 'MAPPING') statusText = 'MAPEANDO';
            else if (status === 'CHARGING') statusText = 'CARGANDO';
            else if (status === 'SEARCHING') statusText = 'BUSCANDO';
        }
        telemetryUav.innerText = `UAV-01: ${statusText}`;
    }, 3000);
}

// Interactive Filters Logic
function initFilters() {
    // Project Filters
    const projectFilterBtns = document.querySelectorAll('#projectFilters .filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    projectFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            projectFilterBtns.forEach(b => b.classList.remove('active', 'border-neon', 'text-neon', 'bg-neon/10'));
            projectFilterBtns.forEach(b => b.classList.add('border-white/10', 'text-gray-400'));
            
            btn.classList.add('active');
            btn.classList.remove('border-white/10', 'text-gray-400');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.classList.remove('card-hidden');
                } else {
                    card.classList.add('card-hidden');
                }
            });
        });
    });

    // Course Filters
    const courseFilterBtns = document.querySelectorAll('#courseFilters .course-filter-btn');
    const courseCards = document.querySelectorAll('.course-card');

    courseFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            courseFilterBtns.forEach(b => b.classList.remove('active', 'border-neon', 'text-neon', 'bg-neon/10'));
            courseFilterBtns.forEach(b => b.classList.add('border-white/10', 'text-gray-400'));
            
            btn.classList.add('active');
            btn.classList.remove('border-white/10', 'text-gray-400');

            const filterValue = btn.getAttribute('data-filter');

            courseCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.classList.remove('card-hidden');
                } else {
                    card.classList.add('card-hidden');
                }
            });
        });
    });
}

// SweetAlert2 Interactive Contact Form
function initContactForm() {
    const contactButtons = [
        document.getElementById('navJoinBtn'),
        document.getElementById('mobileNavJoinBtn'),
        document.getElementById('ctaJoinBtn'),
        document.getElementById('heroBuildBtn')
    ];

    contactButtons.forEach(btn => {
        if (!btn) return;
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openInteractiveContactModal();
        });
    });
}

function openInteractiveContactModal() {
    const lang = localStorage.getItem('preferredLang') || 'en';
    const t = translations[lang];

    // Step 1: Select Interest
    Swal.fire({
        title: t.contact_title_1,
        background: 'var(--color-panel)',
        color: 'var(--text-color)',
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: t.contact_btn_cancel,
        buttonsStyling: false,
        customClass: {
            popup: 'autonovations-swal-popup p-6 md:p-8',
            cancelButton: 'px-6 py-2.5 border border-white/20 text-gray-400 font-tech rounded-full hover:bg-white/5 transition-all text-sm cursor-pointer mt-4'
        },
        html: `
            <div class="flex flex-col items-center">
                <p class="text-gray-400 text-sm mb-6">${t.contact_step_1_text}</p>
                <div class="flex flex-col gap-3 w-full max-w-xs">
                    <button class="interest-btn px-4 py-3 bg-white/5 border border-white/10 hover:border-neon hover:text-neon rounded-xl text-sm font-tech text-white transition-all duration-300" data-val="academy">${t.contact_interest_academy}</button>
                    <button class="interest-btn px-4 py-3 bg-white/5 border border-white/10 hover:border-neon hover:text-neon rounded-xl text-sm font-tech text-white transition-all duration-300" data-val="collaboration">${t.contact_interest_collab}</button>
                    <button class="interest-btn px-4 py-3 bg-white/5 border border-white/10 hover:border-neon hover:text-neon rounded-xl text-sm font-tech text-white transition-all duration-300" data-val="career">${t.contact_interest_team}</button>
                </div>
            </div>
        `,
        didOpen: () => {
            const btns = Swal.getPopup().querySelectorAll('.interest-btn');
            btns.forEach(b => {
                b.addEventListener('click', () => {
                    const selectedInterest = b.getAttribute('data-val');
                    openContactDataModal(selectedInterest);
                });
            });
        }
    });
}

function openContactDataModal(interest) {
    const lang = localStorage.getItem('preferredLang') || 'en';
    const t = translations[lang];

    Swal.fire({
        title: t.contact_title_1,
        background: 'var(--color-panel)',
        color: 'var(--text-color)',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: t.contact_btn_submit,
        cancelButtonText: t.contact_btn_cancel,
        buttonsStyling: false,
        customClass: {
            popup: 'autonovations-swal-popup p-6 md:p-8',
            confirmButton: 'px-8 py-3 bg-neon text-dark font-bold font-tech rounded-full transition-all duration-300 hover:scale-105 glow-button cursor-pointer mr-3',
            cancelButton: 'px-6 py-3 border border-white/20 text-gray-400 font-tech rounded-full hover:bg-white/5 transition-all cursor-pointer'
        },
        html: `
            <div class="flex flex-col items-center">
                <p class="text-gray-400 text-sm mb-6">${t.contact_step_2_text}</p>
                <div class="flex flex-col gap-4 w-full max-w-sm">
                    <input type="text" id="swalName" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neon/50 transition-all" placeholder="${t.contact_placeholder_name}" autocomplete="off" />
                    <input type="email" id="swalEmail" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neon/50 transition-all" placeholder="${t.contact_placeholder_email}" autocomplete="off" />
                </div>
            </div>
        `,
        preConfirm: () => {
            const name = document.getElementById('swalName').value.trim();
            const email = document.getElementById('swalEmail').value.trim();
            
            if (name.length < 2) {
                Swal.showValidationMessage(t.contact_invalid_name);
                return false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                Swal.showValidationMessage(t.contact_invalid_email);
                return false;
            }

            return { name, email, interest };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            simulateConnectionPayload(result.value);
        }
    });
}

function simulateConnectionPayload(data) {
    const lang = localStorage.getItem('preferredLang') || 'en';
    const t = translations[lang];

    Swal.fire({
        title: t.contact_simulating,
        background: 'var(--color-panel)',
        color: 'var(--text-color)',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
            setTimeout(() => {
                Swal.update({
                    title: t.contact_connecting
                });
                setTimeout(() => {
                    Swal.fire({
                        title: t.contact_success_title,
                        text: t.contact_success_text,
                        icon: 'success',
                        background: 'var(--color-panel)',
                        color: 'var(--text-color)',
                        confirmButtonText: 'OK',
                        buttonsStyling: false,
                        customClass: {
                            popup: 'autonovations-swal-popup p-6 md:p-8 text-center',
                            confirmButton: 'px-8 py-3 bg-neon text-dark font-bold font-tech rounded-full transition-all duration-300 hover:scale-105 glow-button cursor-pointer'
                        }
                    });
                }, 1500);
            }, 1200);
        }
    });
}

// Modify typeTerminal() to append input logic at the end
// Let's rewrite the terminal commands processing and input append
function appendTerminalInput() {
    if (document.getElementById('terminalInput')) return;

    const line = document.createElement('div');
    line.className = 'terminal-line flex items-center';
    line.innerHTML = `<span class="terminal-prompt text-neon mr-2">></span><input type="text" id="terminalInput" class="bg-transparent border-none outline-none text-white font-mono text-sm w-full" autocomplete="off" />`;
    terminalContent.appendChild(line);
    terminalContent.scrollTop = terminalContent.scrollHeight;

    const input = document.getElementById('terminalInput');
    input.focus({ preventScroll: true });

    // Re-focus on click anywhere inside terminal content
    terminalContent.addEventListener('click', () => {
        input.focus({ preventScroll: true });
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const val = input.value.trim().toLowerCase();
            processTerminalCommand(val);
        }
    });
}

function processTerminalCommand(cmd) {
    const inputLine = document.getElementById('terminalInput').parentElement;
    if (inputLine) inputLine.remove();

    // Append executed command line to log
    const cmdLine = document.createElement('div');
    cmdLine.className = 'terminal-line text-white';
    cmdLine.innerHTML = `<span class="terminal-prompt text-neon mr-2">></span>${cmd}`;
    terminalContent.appendChild(cmdLine);

    const lang = localStorage.getItem('preferredLang') || 'en';
    const t = translations[lang];

    let outputHtml = '';

    if (cmd === '') {
        // Empty command does nothing
    } else if (cmd === 'help') {
        outputHtml = t.terminal_help_desc;
    } else if (cmd === 'about') {
        outputHtml = t.terminal_about_desc;
    } else if (cmd === 'projects') {
        outputHtml = t.terminal_projects_desc;
    } else if (cmd === 'courses') {
        outputHtml = t.terminal_courses_desc;
    } else if (cmd === 'status') {
        outputHtml = t.terminal_status_desc;
    } else if (cmd === 'secret') {
        outputHtml = `<span class="text-neon font-bold">${t.terminal_secret_desc}</span>`;
    } else if (cmd === 'clear') {
        terminalContent.innerHTML = '';
    } else {
        outputHtml = `<span class="text-red-500">${t.terminal_command_not_found}</span>`;
    }

    if (outputHtml && cmd !== 'clear') {
        const outLine = document.createElement('div');
        outLine.className = 'terminal-line text-gray-400 mt-1 leading-relaxed';
        outLine.innerHTML = outputHtml;
        terminalContent.appendChild(outLine);
    }

    terminalContent.scrollTop = terminalContent.scrollHeight;

    // Append new input line
    setTimeout(appendTerminalInput, 100);
}

// Language Dropdowns (Click/Tap active toggling)
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

