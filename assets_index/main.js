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
        tech_card1_desc: "Advanced neural networks built for edge intelligence, predictive analytics, and autonomous decision making.",
        tech_card1_detail: "Advanced neural networks built for edge intelligence. Deep learning logic, predictive analytics, and autonomous decision making. We develop and optimize neural networks for deployment on resource-constrained devices, allowing real-time processing and decision-making directly at the edge.",
        tech_card2_title: "Autonomous Drones",
        tech_card2_desc: "Intelligent UAVs with swarm capabilities, real-time mapping, and precision collision avoidance.",
        tech_card2_detail: "Intelligent UAVs with swarm capabilities. Real-time scanning, collision avoidance, and precision navigation. Our drone fleets operate autonomously using decentralized coordination algorithms, making them ideal for mapping, industrial inspections, search and rescue, and complex surveillance missions.",
        tech_card3_title: "Robotics Integration",
        tech_card3_desc: "Mechanical systems fused with cognitive intelligence, interactive robotics, and dynamic systems.",
        tech_card3_detail: "Mechanical systems fused with cognitive intelligence. Interactive robots (Labubu style integration) and dynamic systems. We bridge the gap between AI and physical actuation, building robotic platforms that understand and interact with their surroundings using computer vision, force sensing, and adaptive control systems.",
        tech_card4_title: "Real-time Data Systems",
        tech_card4_desc: "High-performance streams connecting global IoT sensors and processing telemetry with massive scalability.",
        tech_card4_detail: "High-performance streams connecting global IoT sensors. Processing massive telemetry with zero-downtime scalability. Our architectures handle millions of events per second with ultra-low latency, ensuring seamless synchronization, data integrity, and real-time visualization for large-scale industrial deployments.",
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
        project3_tag1: "Autonomous Drones",
        project3_tag2: "Mission Control",
        project3_title: "AeroExplorer",
        project3_desc: "A high-fidelity drone mission control simulator. Take command of an autonomous UAV drone equipped with real-time telemetry, battery logistics, flight altitude diagnostics, and live wind sensors, navigating between critical industrial points of interest across Colombia.",
        project3_btn: "Launch Mission Control",
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
        course3_title: "Algorithmic Trading",
        course3_desc: "Master the creation of automated trading systems. Learn to leverage machine learning, real-time data streaming, and quantitative analysis to build autonomous financial engines.",
        course4_title: "Basic Trading",
        course4_desc: "Learn trading from scratch to an intermediate-advanced level. Master chart types, indicators, chart patterns, and build your execution discipline.",
        course5_title: "Machine Learning from Scratch",
        course5_desc: "Learn machine learning basics interactively. Master linear and logistic regression, decision trees, perceptrons, and clustering algorithms with hands-on visual tools.",
        course_view_syllabus: "View Syllabus",
        telemetry_mesh: "MESH ONLINE",
        course6_title: "Industrial IoT & Edge AI",
        course6_desc: "Learn to connect physical sensors in real-time and run lightweight machine learning models directly on edge devices (Edge Computing).",
        course7_title: "ROS2 Robotics Fundamentals",
        course7_desc: "Master the industry standard software framework for autonomous robots. Learn topics, nodes, simulation, and path planning fundamentals.",
        cat_all_filter: "All Projects",
        cat_ai_filter: "AI Systems",
        cat_robotics_filter: "Robotics",
        cat_data_filter: "Data & Simulators",
        course_level_all: "All Levels",
        course_level_beginner_filter: "Beginner",
        course_level_advanced_filter: "Advanced",
        course_level_master_filter: "Master",
        project1_btn: "Launch Cognitive Demo",
        terminal_command_not_found: "Command not found. Type 'help' for options.",
        terminal_help_desc: "Available commands:<br>- help: list commands<br>- about: info about us<br>- projects: list innovations<br>- courses: list academy courses<br>- status: diagnostic report<br>- clear: clear screen<br>- secret: operator level authentication",
        terminal_about_desc: "AutoNovations: Deep-tech engineering lab. Physical-digital systems. AI, Robotics, and IIoT convergence.",
        terminal_projects_desc: "Current Projects:<br>- Railytics (Railway intelligence)<br>- Cognitive Companions (Mechatronics)<br>- AI Trading Core (Machine learning yield)<br>- AeroExplorer (Drone simulator)",
        terminal_courses_desc: "Academy Courses:<br>1. Basic Trading<br>2. Algorithmic Trading<br>3. Basic Electronics<br>4. UAV Electronic Engineering<br>5. Machine Learning<br>6. Industrial IoT & Edge AI<br>7. ROS2 Robotics",
        terminal_status_desc: "SYSTEM STATUS: ACTIVE<br>IoT Mesh: Connected (1,420,892 nodes)<br>Swarm Coordination: Online<br>Telemetry Flow: Stable (24.8 GB/s)<br>AI Engine Temp: 42°C | Load: 14.5%",
        terminal_secret_desc: "DEEP MINDS CREATE THE FUTURE. Welcome to the core, operator.",
        contact_title_1: "Join AutoNovations",
        contact_step_1_text: "Select your primary interest:",
        contact_interest_academy: "Academy (Learn)",
        contact_interest_collab: "Collaboration (Build)",
        contact_interest_team: "Join the Core Team",
        contact_step_2_text: "Enter your name and email:",
        contact_placeholder_name: "Name",
        contact_placeholder_email: "Email",
        contact_invalid_email: "Please enter a valid email address.",
        contact_invalid_name: "Name must be at least 2 characters.",
        contact_simulating: "Encrypting payload...",
        contact_connecting: "Connecting to Core Nodes...",
        contact_success_title: "Connection Established",
        contact_success_text: "Your request has been registered in our neural core. We will contact you soon.",
        contact_btn_next: "Next",
        contact_btn_cancel: "Cancel",
        contact_btn_submit: "Connect"
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
        tech_card1_desc: "Redes neuronales avanzadas creadas para inteligencia de borde, analítica predictiva y toma de decisiones autónoma.",
        tech_card1_detail: "Redes neuronales avanzadas creadas para inteligencia de borde. Lógica de aprendizaje profundo, analítica predictiva y toma de decisiones autónoma. Desarrollamos y optimizamos redes neuronales para su despliegue en dispositivos con recursos limitados, permitiendo procesamiento y toma de decisiones en tiempo real directamente en el borde.",
        tech_card2_title: "Drones Autónomos",
        tech_card2_desc: "UAVs inteligentes con capacidades de enjambre, mapeo en tiempo real y evitación de colisiones.",
        tech_card2_detail: "UAVs inteligentes con capacidades de enjambre. Escaneo en tiempo real, evitación de colisiones y navegación de precisión. Nuestras flotas de drones operan de forma autónoma utilizando algoritmos de coordinación descentralizada, ideales para cartografía, inspecciones industriales, búsqueda y rescate, y misiones de vigilancia complejas.",
        tech_card3_title: "Integración Robótica",
        tech_card3_desc: "Sistemas mecánicos fusionados con inteligencia cognitiva, robótica interactiva y sistemas dinámicos.",
        tech_card3_detail: "Sistemas mecánicos fusionados con inteligencia cognitiva. Robots interactivos y sistemas dinámicos. Cerramos la brecha entre la IA y la actuación física, construyendo plataformas robóticas que comprenden e interactúan con su entorno mediante visión computacional, sensores de fuerza y sistemas de control adaptativo.",
        tech_card4_title: "Sistemas de Datos en Tiempo Real",
        tech_card4_desc: "Flujos de alto rendimiento que conectan sensores IoT globales y procesan telemetría con escalabilidad masiva.",
        tech_card4_detail: "Flujos de alto rendimiento que conectan sensores IoT globales. Procesamiento de telemetría masiva con escalabilidad sin tiempo de inactividad. Nuestras arquitecturas manejan millones de eventos por segundo con latencia ultra baja, asegurando una sincronización perfecta, integridad de datos y visualización en tiempo real para despliegues industriales a gran escala.",
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
        project3_tag1: "Drones Autónomos",
        project3_tag2: "Control de Misión",
        project3_title: "AeroExplorer",
        project3_desc: "Un simulador de control de misión de drones de alta fidelidad. Toma el control de un UAV autónomo equipado con telemetría en tiempo real, logística de batería, altitud de vuelo y sensores de viento, navegando entre puntos de interés industrial críticos en Colombia.",
        project3_btn: "Iniciar Control de Misión",
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
        course3_title: "Trading Algorítmico",
        course3_desc: "Domina la creación de sistemas de trading automatizados. Aprende a aprovechar el aprendizaje automático, la transmisión de datos en tiempo real y el análisis cuantitativo para crear motores financieros autónomos.",
        course4_title: "Trading Básico",
        course4_desc: "Aprende trading desde cero hasta un nivel medio-avanzado. Domina los tipos de gráficos, indicadores, patrones técnicos y construye tu disciplina operativa.",
        course5_title: "Machine Learning desde Cero",
        course5_desc: "Aprende los fundamentos de aprendizaje automático de forma interactiva. Domina regresión lineal/logística, árboles de decisión, perceptrones y clustering con simuladores visuales en tiempo real.",
        course_view_syllabus: "Ver Plan de Estudios",
        telemetry_mesh: "RED ONLINE",
        course6_title: "Industrial IoT y Edge AI",
        course6_desc: "Aprende a conectar sensores físicos en tiempo real y a ejecutar modelos ligeros de aprendizaje automático directamente en dispositivos de borde (Edge Computing).",
        course7_title: "Fundamentos de Robótica ROS2",
        course7_desc: "Domina el marco de trabajo de software estándar de la industria para robots autónomos. Aprende sobre nodos, tópicos, simulación y planificación de rutas.",
        cat_all_filter: "Todos los Proyectos",
        cat_ai_filter: "Sistemas de IA",
        cat_robotics_filter: "Robótica",
        cat_data_filter: "Datos y Simuladores",
        course_level_all: "Todos los Niveles",
        course_level_beginner_filter: "Principiante",
        course_level_advanced_filter: "Avanzado",
        course_level_master_filter: "Master",
        project1_btn: "Iniciar Demo Cognitiva",
        terminal_command_not_found: "Comando no encontrado. Escribe 'help' para ver opciones.",
        terminal_help_desc: "Comandos disponibles:<br>- help: lista comandos<br>- about: información sobre nosotros<br>- projects: lista innovaciones<br>- courses: lista cursos de academia<br>- status: reporte de diagnóstico<br>- clear: limpiar pantalla<br>- secret: autenticación de operador",
        terminal_about_desc: "AutoNovations: Laboratorio de ingeniería deep-tech. Sistemas físico-digitales. Convergencia de IA, Robótica e IIoT.",
        terminal_projects_desc: "Proyectos Actuales:<br>- Railytics (Inteligencia ferroviaria)<br>- Compañeros Cognitivos (Mecatrónica)<br>- Núcleo de Trading IA (Rendimiento ML)<br>- AeroExplorer (Simulador de Dron)",
        terminal_courses_desc: "Cursos de la Academia:<br>1. Trading Básico<br>2. Trading Algorítmico<br>3. Electrónica Básica<br>4. Ingeniería Electrónica de UAV<br>5. Machine Learning<br>6. IoT Industrial y Edge AI<br>7. Robótica ROS2",
        terminal_status_desc: "ESTADO DEL SISTEMA: ACTIVO<br>Malla IoT: Conectada (1,420,892 nodos)<br>Coordinación de Enjambre: Online<br>Flujo de Telemetría: Estable (24.8 GB/s)<br>Temp de IA: 42°C | Carga: 14.5%",
        terminal_secret_desc: "LAS MENTES PROFUNDAS CREAN EL FUTURO. Bienvenido al núcleo, operador.",
        contact_title_1: "Únete a AutoNovations",
        contact_step_1_text: "Selecciona tu interés principal:",
        contact_interest_academy: "Academia (Aprender)",
        contact_interest_collab: "Colaboración (Construir)",
        contact_interest_team: "Unirse al Equipo Core",
        contact_step_2_text: "Ingresa tu nombre y correo:",
        contact_placeholder_name: "Nombre",
        contact_placeholder_email: "Correo",
        contact_invalid_email: "Por favor, ingresa un correo electrónico válido.",
        contact_invalid_name: "El nombre debe tener al menos 2 caracteres.",
        contact_simulating: "Cifrando payload...",
        contact_connecting: "Conectando con Nodos Core...",
        contact_success_title: "Conexión Establecida",
        contact_success_text: "Tu solicitud ha sido registrada en nuestro núcleo neuronal. Nos contactaremos pronto.",
        contact_btn_next: "Siguiente",
        contact_btn_cancel: "Cancelar",
        contact_btn_submit: "Conectar"
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

    // Initialize interactive tech cards
    initTechCards();

    // Start Live Telemetry Update
    initLiveTelemetry();

    // Setup interactive filters
    initFilters();

    // Setup SweetAlert2 Contact Form
    initContactForm();
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
    line.innerHTML = `<span class="terminal-prompt text-neon mr-2">></span><input type="text" id="terminalInput" class="bg-transparent border-none outline-none text-white font-mono text-sm w-full" autofocus autocomplete="off" />`;
    terminalContent.appendChild(line);
    terminalContent.scrollTop = terminalContent.scrollHeight;

    const input = document.getElementById('terminalInput');
    input.focus();

    // Re-focus on click anywhere inside terminal content
    terminalContent.addEventListener('click', () => {
        input.focus();
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
