const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Smooth scrolling for valid in-page anchor links.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') {
            e.preventDefault();
            return;
        }

        const targetId = href.slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll.
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    if (prefersReducedMotion) {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
        return;
    }
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(section);
});

// Active nav link highlighting.
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.style.color = '#f0f0f0';
        if (link.getAttribute('href') === '#' + current) {
            link.style.color = '#667eea';
        }
    });
});

// Project filter functionality.
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');

            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Add fade-in animation.
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize first filter button as active.
if (filterButtons.length > 0) {
    filterButtons[0].classList.add('active');
}

// Mobile menu toggle.
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    navLinks.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
}

function setupModal(modalId, buttonId, closeSelector) {
    const modal = document.getElementById(modalId);
    const button = document.getElementById(buttonId);
    const closeBtn = modal?.querySelector(closeSelector);

    if (!modal || !button) return;

    // Ensure modal starts hidden.
    modal.style.display = 'none';

    // Open modal function.
    const openModal = (e) => {
        e?.preventDefault();
        e?.stopPropagation();

        modal.style.display = 'flex';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        document.body.style.overscrollBehavior = 'none';

        // Focus management for accessibility.
        modal.setAttribute('aria-hidden', 'false');
        closeBtn?.focus();
    };

    // Close modal function.
    const closeModal = (e) => {
        e?.preventDefault();

        modal.style.display = 'none';
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        document.body.style.overscrollBehavior = 'auto';

        modal.setAttribute('aria-hidden', 'true');
    };

    // Button click to open.
    button.addEventListener('click', openModal);

    // Close button.
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
        closeBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            closeModal();
        });
    }

    // Click outside to close (but not on modal content).
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Touch outside to close on mobile.
    modal.addEventListener('touchend', (e) => {
        if (e.target === modal) {
            e.preventDefault();
            closeModal();
        }
    });

    // Prevent modal content clicks from closing modal.
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        modalContent.addEventListener('touchend', (e) => {
            e.stopPropagation();
        });
    }

    return { openModal, closeModal };
}

// Initialize modals when DOM is loaded.
document.addEventListener('DOMContentLoaded', () => {
    // Setup Greenbites modal.
    setupModal('greenbites-modal', 'greenbites-learn-btn', '.close');

    // Setup About modal.
    setupModal('learnMoreModal', 'learnMoreBtn', '#closeModal');

    // Global ESC key handler.
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal.show, .modal[style*="display: flex"]');
            openModals.forEach(modal => {
                modal.style.display = 'none';
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
                document.body.style.overscrollBehavior = 'auto';
                modal.setAttribute('aria-hidden', 'true');
            });
        }
    });

    // Handle viewport changes (orientation changes, etc.).
    window.addEventListener('resize', () => {
        const openModals = document.querySelectorAll('.modal.show, .modal[style*="display: flex"]');
        openModals.forEach(modal => {
            // Force reflow to handle viewport changes.
            modal.style.display = 'flex';
        });
    });
});

// Coming soon popup functionality.
document.addEventListener('DOMContentLoaded', () => {
    const popupButtons = document.querySelectorAll('[data-popup="coming-soon"]');
    const popup = document.getElementById('comingSoonPopup');
    const popupText = popup ? popup.querySelector('span') : null;

    if (popupButtons.length > 0 && popup && popupText) {
        popupButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                // Find the parent project card.
                const projectCard = button.closest('.project-card');

                if (projectCard) {
                    projectCard.style.position = 'relative';
                    projectCard.appendChild(popup);
                    popupText.textContent = 'Coming Soon';

                    popup.style.display = 'block';
                    popup.style.animation = 'notificationSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';

                    setTimeout(() => {
                        popup.style.animation = 'notificationFadeOut 0.3s ease';
                        setTimeout(() => {
                            popup.style.display = 'none';
                        }, 250); // Wait for fade out animation to complete.
                    }, 10000);
                }
            });
        });
    }
});
