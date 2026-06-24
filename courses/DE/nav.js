document.addEventListener("DOMContentLoaded", () => {
    // Definición global de todos los capítulos
    const allChapters = [
        { file: "chapter-01-introduccion.html", num: "01", title: "Introducción" },
        { file: "chapter-02-fundamentos.html", num: "02", title: "Fundamentos" },
        { file: "chapter-03-modelado.html", num: "03", title: "Modelado" },
        { file: "chapter-04-sql.html", num: "04", title: "SQL Avanzado" },
        { file: "chapter-05-python.html", num: "05", title: "Python" },
        { file: "chapter-06-arquitecturas.html", num: "06", title: "Arquitecturas" },
        { file: "chapter-07-herramientas.html", num: "07", title: "Herramientas" },
        { file: "chapter-08-ecosistema-apache.html", num: "08", title: "Ecosistema Apache" },
        { file: "chapter-09-spark.html", num: "09", title: "Apache Spark" },
        { file: "chapter-10-kafka.html", num: "10", title: "Apache Kafka" },
        { file: "chapter-11-airflow.html", num: "11", title: "Apache Airflow" },
        { file: "chapter-12-cloud.html", num: "12", title: "Cloud Platforms" },
        { file: "chapter-13-devops.html", num: "13", title: "DevOps" },
        { file: "chapter-14-observabilidad.html", num: "14", title: "Observabilidad" },
        { file: "chapter-15-seguridad.html", num: "15", title: "Seguridad" },
        { file: "chapter-16-configuracion-windows.html", num: "16", title: "Configuración Windows" },
        { file: "chapter-17-roadmap.html", num: "17", title: "Roadmap" },
        { file: "chapter-18-portfolio.html", num: "18", title: "Portfolio" },
        { file: "chapter-19-proyecto-final.html", num: "19", title: "Proyecto Final" },
        { file: "chapter-20-entrevistas.html", num: "20", title: "Entrevistas" },
        { file: "chapter-21-mercado-laboral.html", num: "21", title: "Mercado Laboral" },
        { file: "chapter-22-buenas-practicas.html", num: "22", title: "Buenas Prácticas" }
    ];

    // Obtener nombre del archivo actual
    const currentPath = window.location.pathname;
    const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1) || "index.html";
    
    // Si estamos en el index.html, no renderizar la sidebar (a menos que se desee)
    if (currentFile === "index.html" || currentFile === "") {
        return;
    }

    const currentChapterMatch = currentFile.match(/chapter-(\d+)-/);
    const currentChapterNum = currentChapterMatch ? currentChapterMatch[1] : "";
    const currentChapterData = allChapters.find(ch => ch.file === currentFile) || { num: "XX", title: "Capítulo Actual" };

    // 1. Extraer los tags H2 para la tabla de contenidos local
    const h2Elements = Array.from(document.querySelectorAll('h2[id], h2[data-num]'));
    let tocHTML = h2Elements.map((h2, index) => {
        // Asegurarse de que tenga un ID para linkear
        if (!h2.id) {
            h2.id = `section-${index}`;
        }
        const text = h2.textContent.trim();
        // Si tiene data-num (ej. "1.1"), lo mostramos
        const dataNum = h2.getAttribute('data-num');
        const displayNum = dataNum ? `<span class="nav-num">${dataNum}</span>` : "";
        // Quitamos el data-num del texto visible si el texto ya lo tiene hardcodeado
        const cleanText = text.replace(/^[0-9.]+\s*/, ''); 

        return `<a href="#${h2.id}" class="nav-item toc-link" data-target="${h2.id}">${displayNum}${cleanText}</a>`;
    }).join('');

    if (h2Elements.length === 0) {
        tocHTML = `<div style="font-size: 0.8rem; color: var(--t3); padding: 0 0.5rem;">No hay secciones en este capítulo.</div>`;
    }

    // 2. Construir la lista de capítulos
    const chaptersHTML = allChapters.map(ch => {
        const isActive = ch.file === currentFile ? "active" : "";
        return `<a href="${ch.file}" class="nav-item ${isActive}"><span class="nav-num">${ch.num}</span>${ch.title}</a>`;
    }).join('');

    // 3. Crear y montar el sidebar dinámico
    const sidebarHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); margin-bottom: 1rem;">
          <a href="index.html" class="nav-back" style="border-bottom: none; margin-bottom: 0;">← Índice General</a>
          <button id="courseThemeToggleBtn" style="background: var(--bg3); border: 1px solid var(--border); border-radius: 8px; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--t2); margin-right: 1.5rem; transition: all 0.2s;">
              <svg class="sun-icon" style="width: 18px; height: 18px; display: none;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              <svg class="moon-icon" style="width: 18px; height: 18px; display: none;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          </button>
      </div>
      <div class="sidebar-logo">
        <div class="book-title">Master Book DE 2026</div>
        <div class="chapter-title-sb">Cap. ${currentChapterData.num} · ${currentChapterData.title}</div>
      </div>
      
      <div class="nav-section">
        <div class="nav-section-label">En este capítulo</div>
        ${tocHTML}
      </div>
      
      <div class="nav-section" style="margin-top:1.5rem; border-top: 1px solid var(--border); padding-top: 1rem;">
        <div class="nav-section-label">Capítulos</div>
        ${chaptersHTML}
      </div>
    `;

    // Buscar si ya hay un aside, si no, crear uno nuevo
    let aside = document.querySelector('aside.sidebar');
    if (!aside) {
        aside = document.createElement('aside');
        aside.className = 'sidebar';
        // Inyectar antes del contenedor principal de contenido (.content)
        const main = document.querySelector('.content');
        if (main) {
            document.body.insertBefore(aside, main);
        } else {
            document.body.prepend(aside);
        }
    }
    
    // Asegurarnos que la sidebar permita scroll independiente de todo el contenido si es largo
    aside.style.overflowY = 'auto';
    aside.style.height = '100vh';
    aside.style.position = 'sticky';
    aside.style.top = '0';
    
    aside.innerHTML = sidebarHTML;

    // 4. Implementar Scroll Spy
    const tocLinks = document.querySelectorAll('.toc-link');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60% 0px', // Activar cuando pasa el tope superior de la pantalla
        threshold: 0
    };

    const observerCallback = (entries) => {
        // Encontrar el último elemento visible desde arriba
        let activeId = null;
        for (let entry of entries) {
            if (entry.isIntersecting) {
                activeId = entry.target.id;
            }
        }
        
        if (activeId) {
            tocLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-target') === activeId) {
                    link.classList.add('active');
                    // Scroll el sidebar para mostrar el link activo si está fuera de vista
                    const sidebarRect = aside.getBoundingClientRect();
                    const linkRect = link.getBoundingClientRect();
                    
                    if (linkRect.top < sidebarRect.top || linkRect.bottom > sidebarRect.bottom) {
                        link.scrollIntoView({ behavior: "smooth", block: "nearest" });
                    }
                }
            });
        }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    h2Elements.forEach(h2 => {
        observer.observe(h2);
    });
    
    // Estilos móviles (Botón de menú en pantallas pequeñas) y corrección de contraste para Mermaid
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
        @media (max-width: 900px) {
            .mobile-nav-toggle {
                display: block;
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: var(--blue, #3b82f6);
                color: white;
                border: none;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                font-size: 24px;
                box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                z-index: 1000;
                cursor: pointer;
            }
            aside.sidebar {
                position: fixed;
                left: -300px;
                top: 0;
                z-index: 999;
                transition: left 0.3s ease;
                box-shadow: 5px 0 15px rgba(0,0,0,0.5);
            }
            aside.sidebar.mobile-open {
                left: 0;
            }
            .sidebar-overlay {
                display: none;
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(0,0,0,0.5);
                z-index: 998;
                backdrop-filter: blur(3px);
            }
            .sidebar-overlay.active {
                display: block;
            }
        }
        @media (min-width: 901px) {
            .mobile-nav-toggle {
                display: none;
            }
            .sidebar-overlay {
                display: none !important;
            }
        }

        /* --- Mermaid Diagram Custom Contrast Styles --- */
        /* Override light mode cyan to a dark, high-contrast cyan for readability */
        html.light {
          --cyan: #007A99 !important;
        }

        /* Subgraph/Cluster background and border */
        .mermaid .cluster rect, 
        .mermaid .cluster polygon {
          fill: var(--bg3) !important;
          stroke: var(--border) !important;
          stroke-width: 1px !important;
        }
        .mermaid .cluster :is(.cluster-label, .label, text, span) {
          fill: var(--t1) !important;
          color: var(--t1) !important;
          font-weight: 600 !important;
        }

        /* Flowchart Nodes (excluding custom styled ones) */
        .mermaid .node:not([style*="fill"]) :is(rect, circle, polygon, ellipse, path, .label-container):not([style*="fill"]) {
          fill: var(--bg2) !important;
          stroke: var(--border) !important;
          stroke-width: 1.5px !important;
        }
        .mermaid .node:not([style*="color"]) :is(.label, text, span, div, p, a):not([style*="color"]) {
          fill: var(--t1) !important;
          color: var(--t1) !important;
        }

        /* ER Diagram Entities and Attributes */
        .mermaid rect.entityBox {
          fill: var(--bg4) !important;
          stroke: var(--border) !important;
          stroke-width: 1.5px !important;
        }
        .mermaid rect.attributeBox {
          fill: var(--bg2) !important;
          stroke: var(--border) !important;
          stroke-width: 1px !important;
        }
        .mermaid .er :is(text, span, div) {
          fill: var(--t1) !important;
          color: var(--t1) !important;
        }
        .mermaid .relationshipLine {
          stroke: var(--t2) !important;
          stroke-width: 1.5px !important;
        }
        .mermaid .relationshipLabel {
          fill: var(--t1) !important;
          color: var(--t1) !important;
        }
        .mermaid rect.relationshipLabelBox {
          fill: var(--bg) !important;
          stroke: none !important;
        }

        /* Edges / Lines (Flowcharts) */
        .mermaid .edgePath .path,
        .mermaid .edgePaths .path {
          stroke: var(--t2) !important;
          stroke-width: 1.5px !important;
        }
        .mermaid marker path,
        .mermaid .arrowheadPath {
          fill: var(--t2) !important;
          stroke: var(--t2) !important;
        }

        /* Edge Labels (Flowcharts) */
        .mermaid .edgeLabel rect,
        .mermaid .edgeLabel .label-container {
          fill: var(--bg) !important;
          stroke: none !important;
        }
        .mermaid .edgeLabel :is(span, text, div) {
          color: var(--t2) !important;
          fill: var(--t2) !important;
          font-size: 0.8rem !important;
        }
    `;
    document.head.appendChild(styleEl);

    // Botón para móvil
    const mobileBtn = document.createElement('button');
    mobileBtn.className = 'mobile-nav-toggle';
    mobileBtn.innerHTML = '☰';
    document.body.appendChild(mobileBtn);

    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    const toggleMenu = () => {
        aside.classList.toggle('mobile-open');
        overlay.classList.toggle('active');
    };

    mobileBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    
    // Ocultar menú si tocamos un link en móvil
    tocLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                toggleMenu();
            }
        });
    });

    // Theme toggle logic
    const themeBtn = document.getElementById('courseThemeToggleBtn');
    if (themeBtn) {
        const sunIcon = themeBtn.querySelector('.sun-icon');
        const moonIcon = themeBtn.querySelector('.moon-icon');
        
        const updateThemeIcons = () => {
            if (document.documentElement.classList.contains('light')) {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            } else {
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            }
        };
        
        updateThemeIcons();
        
        themeBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('light');
            const isLight = document.documentElement.classList.contains('light');
            localStorage.setItem('deCourseTheme', isLight ? 'light' : 'dark');
            updateThemeIcons();
        });
    }
});
