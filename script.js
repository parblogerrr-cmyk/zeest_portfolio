// Interactions for Thieb.co inspired redesign

document.addEventListener('DOMContentLoaded', () => {

    // 1. Navigation Toggle
    const toggle = document.querySelector('.nav-toggle');
    const overlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    let isMenuOpen = false;

    toggle.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            overlay.classList.add('active');
            toggle.textContent = 'Close';
        } else {
            overlay.classList.remove('active');
            toggle.textContent = 'Menu';
        }
    });

    // Close menu when link is clicked
    if (navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                overlay.classList.remove('active');
                if (toggle) toggle.textContent = 'Menu';
            });
        });
    }


    // 2. Hover Reveal Effect
    const projectItems = document.querySelectorAll('.project-item');
    const revealContainer = document.querySelector('.hover-reveal');

    projectItems.forEach(item => {
        item.addEventListener('mouseenter', (e) => {
            const imgUrl = item.getAttribute('data-img');
            if (imgUrl) {
                revealContainer.style.backgroundImage = `url('${imgUrl}')`;
                revealContainer.classList.add('active');
            }
        });

        item.addEventListener('mousemove', (e) => {
            // Move the container somewhat but keep it centered or close to mouse?
            // Thieb.co style: usually fixed in center or follows mouse.
            // Let's try following mouse slightly or just fixed center (easier for mobile perf).
            // Based on CSS 'fixed' center, we don't need mousemove logic unless we want parallax.
            // Let's add slight parallax based on mouse position relative to window center.

            const x = (e.clientX - window.innerWidth / 2) * 0.1;
            const y = (e.clientY - window.innerHeight / 2) * 0.1;

            revealContainer.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(-5deg)`;
        });

        item.addEventListener('mouseleave', () => {
            revealContainer.classList.remove('active');
            // Reset transform
            setTimeout(() => {
                revealContainer.style.transform = `translate(-50%, -50%) scale(0.5)`;
            }, 400);
        });
    });

    // 4. Scroll Animations & Background Slideshow Logic
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // 5. Auto-Generate Background Slideshow for Articles
    const articleImages = document.querySelectorAll('.content img, .gallery-collage-3 img, .gallery-grid-2 img, .gallery-grid-3 img');

    if (articleImages.length > 0) {
        // Create wrapper
        const bgWrapper = document.createElement('div');
        bgWrapper.className = 'bg-slideshow-wrapper';
        document.body.prepend(bgWrapper);

        // Collect images and hide originals
        const imageUrls = [];
        articleImages.forEach(img => {
            imageUrls.push(img.src);
            img.style.display = 'none'; // Hide original
        });

        // Populate wrapper
        imageUrls.forEach((url, index) => {
            const slide = document.createElement('div');
            slide.className = 'bg-slide';
            if (index === 0) slide.classList.add('active'); // Start first one active
            slide.style.backgroundImage = `url('${url}')`;
            bgWrapper.appendChild(slide);
        });

        // Start Slideshow if > 1 image
        if (imageUrls.length > 1) {
            let currentSlide = 0;
            const slides = document.querySelectorAll('.bg-slide');

            setInterval(() => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }, 5000); // 5 seconds per slide
        }
    }

    // 3. Smooth Scroll (Optional basic smooth scroll for anchors)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});
