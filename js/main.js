// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initPreloader();
    initScrollSpy();
    initStickyHeader();
    initMobileNav();
    initBackToTop();
    initCustomCursor();
    initScrollAnimation();
    initTypingAnimation();
    initCurrentYear();
    initProjectFilter();
    initBlogFilter();
    initFaqAccordion();
    initContactForm();
    initLightbox();
    initTimelineTabs();
});

// Preloader
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;

    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
        }, 500);
    });
}

// ScrollSpy
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    if (sections.length === 0) return;

    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
            if (!navLink) return;

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        });
    });
}

// Sticky Header
function initStickyHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile Navigation
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile nav when a link is clicked
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Custom Cursor
function initCustomCursor() {
    // Disable custom cursor animation functionality
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursor) {
        cursor.style.display = 'none';
        cursor.style.visibility = 'hidden';
        cursor.style.opacity = '0';
    }
    
    if (cursorFollower) {
        cursorFollower.style.display = 'none';
        cursorFollower.style.visibility = 'hidden';
        cursorFollower.style.opacity = '0';
    }
    
    return;
}

// Scroll Animation
function initScrollAnimation() {
    // Only initialize if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) return;

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    if (animateElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Add animation classes to skill bars on Skills page
    const skillProgressBars = document.querySelectorAll('.skill-progress-bar');
    if (skillProgressBars.length === 0) return;

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.parentElement.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
                entry.target.classList.add('animated');
                skillObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    skillProgressBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Typing Animation
function initTypingAnimation() {
    const typingElement = document.getElementById('typing');
    if (!typingElement) return;

    // Using Typed.js for typing animation
    if (typeof Typed !== 'undefined') {
        new Typed('#typing', {
            strings: ['Web Developer', 'UI/UX Designer', 'Frontend Engineer', 'Creative Coder'],
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
            loop: true
        });
    }
}

// Current Year for Copyright
function initCurrentYear() {
    const currentYear = document.getElementById('currentYear');
    if (!currentYear) return;

    currentYear.textContent = new Date().getFullYear();
}

// Project Filter
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    if (filterButtons.length === 0 || projectItems.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Blog Filter
function initBlogFilter() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    if (categoryButtons.length === 0 || blogCards.length === 0) return;

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const category = this.getAttribute('data-category');
            
            blogCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// FAQ Accordion
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon i');

        question.addEventListener('click', function() {
            // Toggle the current item
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.classList.replace('fa-plus', 'fa-minus');
            } else {
                answer.style.maxHeight = '0';
                icon.classList.replace('fa-minus', 'fa-plus');
            }
        });
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    if (!contactForm || !toast) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        setTimeout(function() {
            // Show success toast
            toast.classList.add('show');
            
            // Reset form
            contactForm.reset();
            
            // Hide toast after 5 seconds
            setTimeout(function() {
                toast.classList.remove('show');
            }, 5000);
        }, 1000);
    });

    // Close toast when close button is clicked
    const toastClose = document.querySelector('.toast-close');
    if (toastClose) {
        toastClose.addEventListener('click', function() {
            toast.classList.remove('show');
        });
    }
}

// Project Lightbox
function initLightbox() {
    const viewProjectButtons = document.querySelectorAll('.view-project');
    if (viewProjectButtons.length === 0) return;

    viewProjectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            const lightbox = document.getElementById(`${projectId}-lightbox`);
            
            if (lightbox) {
                lightbox.classList.add('active');
                document.body.classList.add('no-scroll');
            }
        });
    });

    // Close lightbox when close button is clicked
    const lightboxCloseButtons = document.querySelectorAll('.lightbox-close');
    lightboxCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lightbox = this.closest('.project-lightbox');
            lightbox.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Close lightbox when clicking outside content
    const lightboxes = document.querySelectorAll('.project-lightbox');
    lightboxes.forEach(lightbox => {
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // Prevent closing when clicking on content
    const lightboxContents = document.querySelectorAll('.lightbox-content');
    lightboxContents.forEach(content => {
        content.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
}

// Timeline Tabs
function initTimelineTabs() {
    const timelineTabs = document.querySelectorAll('.timeline-tab');
    if (timelineTabs.length === 0) return;

    timelineTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            timelineTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');

            // Hide all timeline sections
            const timelineSections = document.querySelectorAll('.timeline-section');
            timelineSections.forEach(section => {
                section.classList.remove('active');
            });

            // Show target section
            const target = this.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });
}

// Add class to animate when scrolled into view
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('animated');
        }
    });
}); 
