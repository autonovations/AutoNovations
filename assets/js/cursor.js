(function () {
    // 1. Detect if touch device (touch devices usually don't have hover/mouse pointers)
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        return; // Don't run on touchscreens
    }

    // 2. Compute correct relative path to the drone image
    // Find if the current page is in a subdirectory (courses or overview)
    const isSubdir = window.location.pathname.includes('/courses/') || window.location.pathname.includes('/overview/');
    const imagePath = isSubdir ? '../assets/images/cursor-drone.png' : 'assets/images/cursor-drone.png';

    // 3. Inject CSS Styles programmatically
    const styles = `
        /* Drone Cursor Container (follows the mouse as a companion) */
        .uav-cursor-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 200px;
            height: 200px;
            pointer-events: none;
            z-index: 10000;
            transform: translate3d(-50%, -50%, 0);
            will-change: transform;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .uav-cursor-container.initialized {
            opacity: 1;
        }

        /* Drone Image styling */
        .uav-cursor-drone {
            width: 100%;
            height: 100%;
            object-fit: contain;
            filter: drop-shadow(0 0 6px rgba(0, 217, 255, 0.5));
            transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.2s ease;
            will-change: transform;
        }

        /* High-tech target reticle behind the drone */
        .uav-cursor-reticle {
            position: absolute;
            width: 48px;
            height: 48px;
            border: 1px dashed rgba(0, 240, 255, 0.35);
            border-radius: 50%;
            pointer-events: none;
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            animation: uav-spin 8s linear infinite;
        }

        /* Interactive hovered state on buttons, links, etc. */
        .uav-cursor-container.hovered .uav-cursor-drone {
            transform: scale(1.3);
            filter: drop-shadow(0 0 10px rgba(0, 240, 255, 0.85)) brightness(1.15);
        }

        .uav-cursor-container.hovered .uav-cursor-reticle {
            width: 60px;
            height: 60px;
            border-color: rgba(0, 240, 255, 0.85);
            border-style: solid;
            box-shadow: 0 0 10px rgba(0, 240, 255, 0.3);
        }

        /* Click Shockwave Ring */
        .uav-cursor-click-ring {
            position: absolute;
            border: 2px solid #00f0ff;
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
            z-index: 9999;
            width: 12px;
            height: 12px;
            animation: uav-ripple 0.45s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        }

        @keyframes uav-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        @keyframes uav-ripple {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(4.5);
                opacity: 0;
            }
        }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // 4. Create DOM elements for the cursor
    const cursorContainer = document.createElement('div');
    cursorContainer.className = 'uav-cursor-container';

    const reticle = document.createElement('div');
    reticle.className = 'uav-cursor-reticle';
    cursorContainer.appendChild(reticle);

    const drone = document.createElement('img');
    drone.className = 'uav-cursor-drone';
    drone.src = imagePath;
    drone.alt = 'Drone Cursor';

    // Fallback if the drone image fails to load
    drone.onerror = () => {
        drone.style.display = 'none';
        reticle.style.borderStyle = 'solid';
        reticle.style.backgroundColor = 'rgba(0, 240, 255, 0.15)';
    };
    cursorContainer.appendChild(drone);

    document.body.appendChild(cursorContainer);

    // 5. Lerp Position tracking
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let targetRotation = 0;
    let currentRotation = 0;
    let lastTime = performance.now();
    let hasMoved = false;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!hasMoved) {
            hasMoved = true;
            // Instantly snap to first position to avoid jumping from center
            cursorX = mouseX;
            cursorY = mouseY;
            cursorContainer.classList.add('initialized');
        }
    });

    // 6. Smooth loop using requestAnimationFrame
    function updateCursor(time) {
        if (!hasMoved) {
            requestAnimationFrame(updateCursor);
            return;
        }

        const dt = (time - lastTime) / 1000;
        lastTime = time;

        // Target coordinates with offset to the bottom-right of the real pointer
        // 22px offset prevents overlapping with the native cursor arrow tip
        const targetX = mouseX + 22;
        const targetY = mouseY + 22;

        // Linear interpolation (lerp) for trailing physical behavior
        const ease = 0.16; // 0.16 provides an organic pilot latency
        const dx = targetX - cursorX;
        const dy = targetY - cursorY;

        cursorX += dx * ease;
        cursorY += dy * ease;

        // Dynamic tilt based on speed and direction
        const speedX = dx * 0.45;
        targetRotation = Math.max(-20, Math.min(20, speedX));

        // Interpolate rotation transitions
        currentRotation += (targetRotation - currentRotation) * 0.15;

        // Position container and tilt image
        cursorContainer.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
        drone.style.transform = `rotate(${currentRotation}deg)`;

        requestAnimationFrame(updateCursor);
    }
    requestAnimationFrame(updateCursor);

    // 7. Interactive Elements Hover bindings
    function updateHoverBindings() {
        const interactables = document.querySelectorAll('a, button, .cursor-pointer, select, input[type="submit"], input[type="button"], [role="button"]');
        interactables.forEach(item => {
            // Avoid duplicate listeners
            item.removeEventListener('mouseenter', onMouseEnter);
            item.removeEventListener('mouseleave', onMouseLeave);

            item.addEventListener('mouseenter', onMouseEnter);
            item.addEventListener('mouseleave', onMouseLeave);
        });
    }

    function onMouseEnter() {
        cursorContainer.classList.add('hovered');
    }

    function onMouseLeave() {
        cursorContainer.classList.remove('hovered');
    }

    // Bind click shockwave ring
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'uav-cursor-click-ring';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        document.body.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 500);
    });

    // Bind initially
    updateHoverBindings();

    // Periodically re-bind hover events for dynamically loaded content/simulators
    const observer = new MutationObserver(() => {
        updateHoverBindings();
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();
