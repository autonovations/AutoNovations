// Tailwind Configuration
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
                tech: ['Space Grotesk', 'sans-serif'],
            },
            colors: {
                primary: '#00D9FF',
                secondary: '#0047AB',
                dark: 'var(--color-dark)',
                panel: 'var(--color-panel)',
                neon: '#00D9FF',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'fade-in': 'fadeIn 1s ease-out forwards',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' }
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                }
            }
        }
    }
}

// Initialize Icons
lucide.createIcons();

// Particles.js configuration
particlesJS('particles-js', {
    "particles": {
        "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#00D9FF" },
        "shape": {
            "type": "polygon",
            "polygon": { "nb_sides": 6 }
        },
        "opacity": {
            "value": 0.3,
            "random": true,
            "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false }
        },
        "size": {
            "value": 4,
            "random": true,
            "anim": { "enable": true, "speed": 4, "size_min": 0.3, "sync": false }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#00D9FF",
            "opacity": 0.2,
            "width": 1.5
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
            "bubble": { "distance": 200, "size": 8, "duration": 2, "opacity": 0.8, "speed": 3 },
            "push": { "particles_nb": 4 }
        }
    },
    "retina_detect": true
});

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
const sections = ['about', 'technologies', 'projects'];
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
        if (menuBtn) menuBtn.innerHTML = '<i data-lucide="x"></i>';
        document.body.style.overflow = 'hidden';
    } else {
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            }, 400);
        }
        if (menuBtn) menuBtn.innerHTML = '<i data-lucide="menu"></i>';
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
        if (menuBtn) menuBtn.innerHTML = '<i data-lucide="menu"></i>';
        document.body.style.overflow = '';
        lucide.createIcons();
    });
});

// i18n Translation Logic
const translations = {
    en: {
        nav_about: "About",
        nav_technologies: "Technologies",
        nav_projects: "Projects",
        nav_join: "Join Us",
        hero_badge: "The Future is Here",
        hero_title_1: "Autonomous Intelligence",
        hero_title_2: "Connected",
        hero_desc: "Bridging the gap between artificial intelligence and physical reality. We engineer the next generation of robotics, drones, and autonomous systems.",
        hero_btn_explore: "Explore Technology",
        hero_btn_build: "Start Building",
        about_subtitle: "Who we are",
        about_title: "Building the Future of Autonomous Intelligence",
        about_p1: "Autonovations is a deep-tech engineering lab focused on the seamless integration of Artificial Intelligence, Robotics, and Industrial IoT (IIoT).",
        about_p2: "We don't just build software; we build physical-digital systems that perceive, decide, and act in the real world. From intelligent drones mapping complex environments to robotic systems integrated with state-of-the-art AI.",
        about_stat1: "Unified",
        about_stat2: "Robotics",
        tech_subtitle: "Core Architecture",
        tech_title: "Technological Arsenal",
        tech_card1_title: "AI Systems",
        tech_card1_desc: "Advanced neural networks built for edge intelligence. Deep learning logic, predictive analytics, and autonomous decision making.",
        tech_card2_title: "Autonomous Drones",
        tech_card2_desc: "Intelligent UAVs with swarm capabilities. Real-time scanning, collision avoidance, and precision navigation.",
        tech_card3_title: "Robotics Integration",
        tech_card3_desc: "Mechanical systems fused with cognitive intelligence. Interactive robots (Labubu style integration) and dynamic systems.",
        tech_card4_title: "Real-time Data Systems",
        tech_card4_desc: "High-performance streams connecting global IoT sensors. Processing massive telemetry with zero-downtime scalability.",
        projects_subtitle: "Vision & Escalability",
        projects_title: "Innovation Projects",
        project_railytics_tag1: "Railway Intelligence",
        project_railytics_tag2: "Real-Time Data",
        project_railytics_title: "Railytics",
        project_railytics_desc: "High-precision railway detection and tracking system utilizing computer vision and edge IoT sensors. It provides real-time traffic monitoring, anomaly detection, and predictive maintenance metrics to guarantee structural safety and operational efficiency across high-density rail networks.",
        project_railytics_btn: "View Analytics",
        project1_tag1: "Interactive Robotics",
        project1_tag2: "AI Integration",
        project1_title: "Cognitive Companions",
        project1_desc: "Next-generation interactive entities. By combining emotive mechatronics with large language models, we're building deeply responsive interfaces that bridge the digital and physical divide seamlessly.",
        project1_btn: "View Capabilities",
        project2_tag1: "Autonomous Systems",
        project2_tag2: "Data",
        project2_title: "AI Trading Core",
        project2_desc: "Harnessing unsupervised machine learning to detect patterns in global data sets. Our intelligent systems act autonomously, optimizing yield with sub-millisecond precision analysis.",
        project2_btn: "View Architecture",
        cta_title: "Build the Future <br><span class=\"text-gradient\">With Us</span>",
        cta_desc: "Embrace the autonomous revolution. Connect with our engineering core to explore unparalleled technological synergies.",
        cta_btn: "Join the Movement",
        footer_copy: "&copy; 2026 Autonovations. Autonomous Intelligence Connected.",
        footer_privacy: "Privacy Policy",
        footer_terms: "Terms of Service",
        lang_en: "English",
        lang_es: "Spanish",
        nav_home: "Home",
        footer_tagline: "Innovating at the intersection of AI and physical reality. We engineer the next generation of autonomous systems for a connected world.",
        footer_links_title: "Links",
        footer_tech_title: "Specialties",
        footer_newsletter_title: "Intelligence Briefing",
        footer_newsletter_desc: "Subscribe to receive our latest breakthroughs in autonomous systems.",
        footer_newsletter_placeholder: "Enter your email",
        footer_newsletter_btn: "Subscribe",
        footer_location: "Silicon Valley | Remote Operations",
        footer_about_me: "Founder & CEO",
        nav_academy: "Academy",
        course1_title: "UAV Electronic Engineering",
        course1_desc: "Learn to design, build, and program autonomous aerial drones (UAVs). Master the integration of sensors, flight controllers, ESCs, and communication systems.",
        course2_title: "Basic Electronics",
        course2_desc: "Bridge the gap between hardware and software. Master circuit design, microcontrollers, basic electronic components, and physical computing.",
        course_view_syllabus: "View Syllabus"
    },
    es: {
        nav_about: "Nosotros",
        nav_technologies: "Tecnologías",
        nav_projects: "Proyectos",
        nav_join: "Únete",
        hero_badge: "El Futuro está Aquí",
        hero_title_1: "Inteligencia Autónoma",
        hero_title_2: "Conectada",
        hero_desc: "Cerrando la brecha entre la inteligencia artificial y la realidad física. Diseñamos la próxima generación de robótica, drones y sistemas autónomos.",
        hero_btn_explore: "Explorar Tecnología",
        hero_btn_build: "Empezar a Construir",
        about_subtitle: "Quiénes somos",
        about_title: "Construyendo el Futuro de la Inteligencia Autónoma",
        about_p1: "Autonovations es un laboratorio de ingeniería de tecnología profunda enfocado en la integración perfecta de Inteligencia Artificial, Robótica e IoT Industrial (IIoT).",
        about_p2: "No solo construimos software; construimos sistemas físico-digitales que perciben, deciden y actúan en el mundo real. Desde drones inteligentes que mapean entornos complejos hasta sistemas robóticos integrados con IA de vanguardia.",
        about_stat1: "Unificado",
        about_stat2: "Robótica",
        tech_subtitle: "Arquitectura Core",
        tech_title: "Arsenal Tecnológico",
        tech_card1_title: "Sistemas de IA",
        tech_card1_desc: "Redes neuronales avanzadas creadas para inteligencia de borde. Lógica de aprendizaje profundo, analítica predictiva y toma de decisiones autónoma.",
        tech_card2_title: "Drones Autónomos",
        tech_card2_desc: "UAVs inteligentes con capacidades de enjambre. Escaneo en tiempo real, evitación de colisiones y navegación de precisión.",
        tech_card3_title: "Integración Robótica",
        tech_card3_desc: "Sistemas mecánicos fusionados con inteligencia cognitiva. Robots interactivos y sistemas dinámicos.",
        tech_card4_title: "Sistemas de Datos en Tiempo Real",
        tech_card4_desc: "Flujos de alto rendimiento que conectan sensores IoT globales. Procesamiento de telemetría masiva con escalabilidad sin tiempo de inactividad.",
        projects_subtitle: "Visión y Escalabilidad",
        projects_title: "Proyectos de Innovación",
        project_railytics_tag1: "Inteligencia Ferroviaria",
        project_railytics_tag2: "Datos en Tiempo Real",
        project_railytics_title: "Railytics",
        project_railytics_desc: "Sistema de detección y monitoreo ferroviario de alta precisión que utiliza visión computacional y sensores IoT de borde. Proporciona control de tráfico en tiempo real, detección de anomalías y métricas de mantenimiento predictivo para garantizar la seguridad estructural y la eficiencia operativa en redes ferroviarias de alta densidad.",
        project_railytics_btn: "Ver Analíticas",
        project1_tag1: "Robótica Interactiva",
        project1_tag2: "Integración de IA",
        project1_title: "Compañeros Cognitivos",
        project1_desc: "Entidades interactivas de próxima generación. Al combinar mecatrónica emotiva con grandes modelos de lenguaje, estamos construyendo interfaces profundamente receptivas que cierran la brecha digital y física sin problemas.",
        project1_btn: "Ver Capacidades",
        project2_tag1: "Sistemas Autónomos",
        project2_tag2: "Datos",
        project2_title: "Núcleo de Trading IA",
        project2_desc: "Aprovechando el aprendizaje automático no supervisado para detectar patrones en conjuntos de datos globales. Nuestros sistemas inteligentes actúan de forma autónoma, optimizando el rendimiento con análisis de precisión de sub-milisegundos.",
        project2_btn: "Ver Arquitectura",
        cta_title: "Construye el Futuro <br><span class=\"text-gradient\">Con Nosotros</span>",
        cta_desc: "Abraza la revolución autónoma. Conéctate con nuestro núcleo de ingeniería para explorar sinergias tecnológicas sin precedentes.",
        cta_btn: "Únete al Movimiento",
        footer_copy: "&copy; 2026 Autonovations. Inteligencia Autónoma Conectada.",
        footer_privacy: "Política de Privacidad",
        footer_terms: "Términos de Servicio",
        lang_en: "Inglés",
        lang_es: "Español",
        nav_home: "Inicio",
        footer_tagline: "Innovando en la intersección de la IA y la realidad física. Diseñamos la próxima generación de sistemas autónomos para un mundo conectado.",
        footer_links_title: "Enlaces",
        footer_tech_title: "Especialidades",
        footer_newsletter_title: "Boletín de Inteligencia",
        footer_newsletter_desc: "Suscríbete para recibir nuestros últimos avances en sistemas autónomos.",
        footer_newsletter_placeholder: "Ingresa tu correo",
        footer_newsletter_btn: "Suscribirse",
        footer_location: "Silicon Valley | Operaciones Remotas",
        footer_about_me: "Fundador y CEO",
        nav_academy: "Academia",
        course1_title: "Ingeniería Electrónica de UAV",
        course1_desc: "Aprende a diseñar, construir y programar drones aéreos autónomos (UAVs). Domina la integración de sensores, controladores de vuelo, ESCs y sistemas de comunicación.",
        course2_title: "Electrónica Básica",
        course2_desc: "Cierra la brecha entre el hardware y el software. Domina el diseño de circuitos, microcontroladores, componentes electrónicos básicos y computación física.",
        course_view_syllabus: "Ver Plan de Estudios"
    }
};

function setLanguage(lang) {
    const flagUrl = lang === 'es' ? 'https://flagcdn.com/w40/co.png' : 'https://flagcdn.com/w40/us.png';

    const currentFlag = document.getElementById('currentFlag');
    if (currentFlag) currentFlag.src = flagUrl;
    
    const mobileCurrentFlag = document.getElementById('mobileCurrentFlag');
    if (mobileCurrentFlag) mobileCurrentFlag.src = flagUrl;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            el.setAttribute('placeholder', translations[lang][key]);
        }
    });

    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick').includes(`'${lang}'`)) {
            btn.classList.add('active');
        }
    });

    localStorage.setItem('preferredLang', lang);
}

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
}

function toggleTheme() {
    const isLight = document.documentElement.classList.contains('light');
    setTheme(isLight ? 'dark' : 'light');
}

window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    setLanguage(savedLang);

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
});
