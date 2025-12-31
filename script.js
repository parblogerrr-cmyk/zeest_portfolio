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
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            overlay.classList.remove('active');
            toggle.textContent = 'Menu';
        });
    });


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
