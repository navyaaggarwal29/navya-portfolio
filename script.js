document.addEventListener("DOMContentLoaded", () => {
    /* ===== NAVBAR SCROLL EFFECT ===== */
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".nav-links li a");
    const sections = document.querySelectorAll("section, footer");

    window.addEventListener("scroll", () => {
        // Navbar styling
        if (window.scrollY > 80) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Active link tracking
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (current && link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    /* ===== PARALLAX EFFECT FOR HERO VISUAL ===== */
    const heroVisual = document.getElementById("parallax-visual");
    const abstractGraphic = document.querySelector(".abstract-graphic");
    
    if (heroVisual && abstractGraphic) {
        document.addEventListener("mousemove", (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 40;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 40;
            
            abstractGraphic.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        // Reset on mouse leave
        document.addEventListener("mouseleave", () => {
            abstractGraphic.style.transform = `rotateY(0deg) rotateX(0deg)`;
        });
    }

    /* ===== HIGH-END REVEAL ANIMATIONS (INTERSECTION OBSERVER) ===== */
    const revealElements = document.querySelectorAll(".reveal");

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Reveal only once for performance
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    /* ===== TYPPING EFFECT ===== */
    const typingText = document.querySelector(".typing-text");
    if (typingText) {
        const textArray = ["Full-Stack Developer", "Building Scalable & Impactful Systems"];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentText = textArray[textIndex];
            
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % textArray.length;
                typeSpeed = 500; // Pause before typing new word
            }

            setTimeout(type, typeSpeed);
        }

        // Start typing
        setTimeout(type, 1000);
    }

    /* ===== 3D INTERACTIVE ELEMENTS ===== */
    const interactiveElements = document.querySelectorAll(".interactive-tilt");
    
    interactiveElements.forEach(el => {
        el.addEventListener("mousemove", (e) => {
            const elRect = el.getBoundingClientRect();
            const elCenterX = elRect.left + elRect.width / 2;
            const elCenterY = elRect.top + elRect.height / 2;
            
            const mouseX = e.clientX - elCenterX;
            const mouseY = e.clientY - elCenterY;
            
            // Calculate tilt degrees (lighter effect)
            const rotateX = (mouseY / (elRect.height / 2)) * -5;
            const rotateY = (mouseX / (elRect.width / 2)) * 5;
            
            // For project cards we want to keep the lift
            const translateY = el.classList.contains('project-card-premium') ? '-10px' : '0px';
            
            el.style.transform = `translateY(${translateY}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        el.addEventListener("mouseleave", () => {
            el.style.transform = `translateY(0) rotateX(0deg) rotateY(0deg)`;
        });
    });

});
