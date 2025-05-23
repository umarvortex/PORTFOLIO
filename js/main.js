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
    initBlogSearch();
    initFaqAccordion();
    initContactForm();
    initLightbox();
    initTimelineTabs();
    initBlogPagination();
    
    // Set all lightboxes to display: none initially
    const allLightboxes = document.querySelectorAll('.project-lightbox');
    allLightboxes.forEach(box => {
        box.style.display = 'none';
    });
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

// Blog Search
function initBlogSearch() {
    const searchInput = document.querySelector('.search-input');
    const blogCards = document.querySelectorAll('.blog-card');
    const featuredPost = document.querySelector('.featured-post-card');
    
    if (!searchInput || blogCards.length === 0) return;
    
    // Add keywords as data attributes to each blog post (this can also be done directly in HTML)
    blogCards.forEach(card => {
        const title = card.querySelector('.blog-card-title')?.textContent || '';
        const excerpt = card.querySelector('.blog-card-excerpt')?.textContent || '';
        const category = card.querySelector('.post-category')?.textContent || '';
        
        // Combine title, excerpt and category as keywords
        const keywords = `${title} ${excerpt} ${category}`.toLowerCase();
        card.setAttribute('data-keywords', keywords);
    });
    
    // Also add keywords to featured post if it exists
    if (featuredPost) {
        const featuredTitle = featuredPost.querySelector('.featured-post-title')?.textContent || '';
        const featuredExcerpt = featuredPost.querySelector('.featured-post-excerpt')?.textContent || '';
        const featuredCategory = featuredPost.querySelector('.post-category')?.textContent || '';
        
        const featuredKeywords = `${featuredTitle} ${featuredExcerpt} ${featuredCategory}`.toLowerCase();
        featuredPost.setAttribute('data-keywords', featuredKeywords);
    }
    
    // Function to filter blog posts based on search input
    function filterBlogPosts() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        // If search term is empty, show all posts
        if (searchTerm === '') {
            blogCards.forEach(card => {
                card.style.display = '';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            });
            
            if (featuredPost) {
                featuredPost.style.display = '';
                featuredPost.style.opacity = '1';
                featuredPost.style.transform = 'scale(1)';
            }
            return;
        }
        
        // Filter blog cards
        blogCards.forEach(card => {
            const keywords = card.getAttribute('data-keywords');
            
            if (keywords.includes(searchTerm)) {
                card.style.display = '';
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
        
        // Filter featured post
        if (featuredPost) {
            const featuredKeywords = featuredPost.getAttribute('data-keywords');
            
            if (featuredKeywords.includes(searchTerm)) {
                featuredPost.style.display = '';
                setTimeout(() => {
                    featuredPost.style.opacity = '1';
                    featuredPost.style.transform = 'scale(1)';
                }, 10);
            } else {
                featuredPost.style.opacity = '0';
                featuredPost.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    featuredPost.style.display = 'none';
                }, 300);
            }
        }
    }
    
    // Add event listener for real-time filtering
    searchInput.addEventListener('input', filterBlogPosts);
    
    // Prevent form submission
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            filterBlogPosts();
        });
    }
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

    // Set all lightboxes to display: none initially
    const allLightboxes = document.querySelectorAll('.project-lightbox');
    allLightboxes.forEach(box => {
        box.style.display = 'none';
    });

    viewProjectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            const lightbox = document.getElementById(`${projectId}-lightbox`);
            
            if (lightbox) {
                // Smoothly display the lightbox
                lightbox.style.display = 'flex';
                setTimeout(() => {
                    lightbox.classList.add('active');
                    document.body.classList.add('no-scroll');
                }, 10);
                
                // Make the lightbox container accessible
                const lightboxContainer = document.querySelector('.lightbox-container');
                if (lightboxContainer) {
                    lightboxContainer.style.pointerEvents = 'auto';
                }
                
                // Scroll lightbox content to top
                const lightboxContent = lightbox.querySelector('.lightbox-content');
                if (lightboxContent) {
                    lightboxContent.scrollTop = 0;
                }
                
                // Add keyboard navigation for closing with Escape key
                document.addEventListener('keydown', handleEscKey);
            }
        });
    });
    
    // Function to handle Escape key
    function handleEscKey(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    }
    
    // Function to close lightbox
    function closeLightbox() {
        const activeLightbox = document.querySelector('.project-lightbox.active');
        if (activeLightbox) {
            activeLightbox.classList.remove('active');
            document.body.classList.remove('no-scroll');
            
            // Make the lightbox container inaccessible again
            const lightboxContainer = document.querySelector('.lightbox-container');
            if (lightboxContainer) {
                lightboxContainer.style.pointerEvents = 'none';
            }
            
            // Remove keyboard event listener
            document.removeEventListener('keydown', handleEscKey);
            
            // Hide lightbox after transition
            setTimeout(() => {
                activeLightbox.style.display = 'none';
            }, 300);
        }
    }

    // Close lightbox when close button is clicked
    const lightboxCloseButtons = document.querySelectorAll('.lightbox-close');
    lightboxCloseButtons.forEach(button => {
        button.addEventListener('click', closeLightbox);
    });

    // Close lightbox when clicking outside content
    const lightboxes = document.querySelectorAll('.project-lightbox');
    lightboxes.forEach(lightbox => {
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                closeLightbox();
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

// Blog Pagination
function initBlogPagination() {
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    if (paginationBtns.length === 0 || blogCards.length === 0) return;
    
    // Number of blog posts per page
    const postsPerPage = 6;
    
    // Total number of pages
    const totalPages = Math.ceil(blogCards.length / postsPerPage);
    
    // Current active page
    let currentPage = 1;
    
    // Handle initial load animation
    blogCards.forEach((card, index) => {
        if (index < postsPerPage) {
            setTimeout(() => {
                card.classList.add('animated');
            }, index * 100);
        }
    });
    
    // Function to show blog posts for the current page
    function showPosts(page) {
        // Reset animations
        blogCards.forEach(card => {
            card.classList.remove('animated');
            card.style.display = 'none';
        });
        
        // Calculate start and end indices
        const startIndex = (page - 1) * postsPerPage;
        const endIndex = Math.min(startIndex + postsPerPage, blogCards.length);
        
        // Show blog posts for the current page
        for (let i = startIndex; i < endIndex; i++) {
            if (blogCards[i]) {
                blogCards[i].style.display = 'block';
                
                // Add animation with delay based on position
                setTimeout(() => {
                    blogCards[i].classList.add('animated');
                }, (i - startIndex) * 100);
            }
        }
        
        // Update active pagination button
        paginationBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to current page button (if it's a number button)
        paginationBtns.forEach(btn => {
            if (btn.textContent.trim() === page.toString()) {
                btn.classList.add('active');
            }
        });
        
        // Scroll to the top of the blog grid with slight offset
        const blogGrid = document.getElementById('blog-grid');
        if (blogGrid) {
            const scrollOptions = {
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            };
            setTimeout(() => {
                blogGrid.scrollIntoView(scrollOptions);
            }, 100);
        }
        
        // Update current page
        currentPage = page;
    }
    
    // Add click event listeners to pagination buttons
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // If it's a number button
            if (!this.classList.contains('next')) {
                const pageNum = parseInt(this.textContent);
                if (pageNum !== currentPage) {
                    showPosts(pageNum);
                }
            } 
            // If it's the next button
            else {
                if (currentPage < totalPages) {
                    showPosts(currentPage + 1);
                }
            }
        });
    });
    
    // Initialize with first page blogs visible
    blogCards.forEach((card, index) => {
        if (index < postsPerPage) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
} 


 // desktop hire button

const hireButton = document.getElementById('hireButton');

// Set delays for each menu item
document.querySelectorAll('.menu-item').forEach((item, index) => {
  item.style.setProperty('--i', index);
});

hireButton.addEventListener('click', function(e) {
  e.preventDefault();
  e.stopPropagation();
  this.classList.toggle('active');
});

// Close when clicking outside
document.addEventListener('click', function(e) {
  if (!hireButton.contains(e.target) && 
      !document.querySelector('.half-circle-menu').contains(e.target)) {
    hireButton.classList.remove('active');
  }
});


 // mobile navbar hirebutton

// Modified JavaScript for both desktop and mobile
document.addEventListener('DOMContentLoaded', function() {
  // Handle both desktop and mobile hire buttons
  document.addEventListener('click', function(e) {
    const hireBtn = e.target.closest('#hireButton');
    if (hireBtn) {
      e.preventDefault();
      e.stopPropagation();
      hireBtn.classList.toggle('active');
    }
    
    // Close when clicking outside
    if (!e.target.closest('#hireButton') && !e.target.closest('.half-circle-menu')) {
      document.querySelectorAll('#hireButton').forEach(btn => {
        btn.classList.remove('active');
      });
    }
  });
});










// Combined Mobile Nav Functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileMenuButton = document.getElementById('mobileMenuButton');
  const hintMessage = document.createElement('div');
  let touchStartX = 0;
  let touchEndX = 0;
  let hintTimeout;

  // Create hint message
  hintMessage.innerHTML = `
    <div class="hint-message">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 5l7 7m0 0l-7 7m7-7H3"/>
      </svg>
      <span>Swipe from left to open menu</span>
    </div>
  `;
  document.body.appendChild(hintMessage);

  // Show hint only on first visit
  if (!sessionStorage.getItem('navHintShown')) {
    setTimeout(() => {
      hintMessage.classList.add('show');
      sessionStorage.setItem('navHintShown', 'true');
      
      hintTimeout = setTimeout(() => {
        hintMessage.classList.remove('show');
      }, 3000);
    }, 1000);
  }

  // Handle hamburger menu click
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', function() {
      toggleNav(!mobileNav.classList.contains('active'));
    });
  }

  // Touch events for swipe detection
  document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  }, {passive: true});

  document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, {passive: true});

  function handleSwipe() {
    // Only allow swipe open from very left edge (first 50px)
    if (touchStartX < 50 && touchEndX - touchStartX > 100) {
      toggleNav(true);
    }
    // Allow swipe close from anywhere when nav is open
    else if (mobileNav.classList.contains('active') && touchStartX - touchEndX > 100) {
      toggleNav(false);
    }
  }

  // Toggle nav function
  function toggleNav(show) {
    if (show) {
      // Open nav
      mobileNav.style.display = 'block';
      document.body.style.overflow = 'hidden';
      
      // Trigger reflow before animation
      void mobileNav.offsetWidth;
      
      mobileNav.style.transition = 'transform 0.4s ease-out, opacity 0.3s';
      mobileNav.style.transform = 'translateX(0)';
      mobileNav.style.opacity = '1';
      mobileNav.classList.add('active');
    } else {
      // Close nav
      mobileNav.style.transition = 'transform 0.3s ease-in, opacity 0.2s';
      mobileNav.style.transform = 'translateX(-100%)';
      mobileNav.style.opacity = '0';
      document.body.style.overflow = '';
      
      setTimeout(() => {
        mobileNav.classList.remove('active');
      }, 300);
    }
  }

  // Close hint message
  hintMessage.addEventListener('click', () => {
    hintMessage.classList.remove('show');
    clearTimeout(hintTimeout);
  });

  // Handle hire button
  document.addEventListener('click', function(e) {
    if (e.target.closest('#hireButton')) {
      e.preventDefault();
      e.stopPropagation();
      e.target.closest('#hireButton').classList.toggle('active');
    }
  });
});