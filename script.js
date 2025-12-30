document.addEventListener('DOMContentLoaded', () => {

    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');

    // Header Scroll Effect - Removed for Permanent Centered Layout

    /* 
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }); 
    */

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        // Simple hamburger animation could go here
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });
    });

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Staggered animation for blog cards
    const blogCards = document.querySelectorAll('.blog-card.fade-in');
    blogCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 50}ms`; // 50ms delay per item for faster appear
    });

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        observer.observe(el);
    });
});
