// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(section);
});

// Active nav link highlighting
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

// Project Filter Functionality
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

// Add fade-in animation
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

// Initialize first filter button as active
if (filterButtons.length > 0) {
    filterButtons[0].classList.add('active');
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.toggle('active');
});

// ALL MODAL FUNCTIONALITY - Consolidated
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing modal functionality...');
    
    // GREENBITES MODAL ELEMENTS
    const greenbitesLearnBtn = document.getElementById('greenbites-learn-btn');
    const greenbitesModal = document.getElementById('greenbites-modal');
    const greenbitesClose = greenbitesModal?.querySelector('.close');
    
    // ABOUT SECTION MODAL ELEMENTS
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    const learnMoreModal = document.getElementById('learnMoreModal');
    const learnMoreClose = document.getElementById('closeModal');
    
    // Debug all elements
    console.log('=== GREENBITES MODAL ===');
    console.log('Button:', greenbitesLearnBtn);
    console.log('Modal:', greenbitesModal);
    console.log('Close:', greenbitesClose);
    
    console.log('=== ABOUT MODAL ===');
    console.log('Button:', learnMoreBtn);
    console.log('Modal:', learnMoreModal);
    console.log('Close:', learnMoreClose);
    
    // GREENBITES MODAL FUNCTIONALITY
    if (greenbitesLearnBtn && greenbitesModal) {
        console.log('Setting up Greenbites modal...');
        
        // Ensure modal starts hidden
        greenbitesModal.style.display = 'none';
        
        greenbitesLearnBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('🎯 Greenbites button clicked!');
            console.log('Current modal display:', greenbitesModal.style.display);
            
            // Force modal to show
            greenbitesModal.style.display = 'flex';
            greenbitesModal.style.visibility = 'visible';
            greenbitesModal.style.zIndex = '9999';
            document.body.style.overflow = 'hidden';
            
            console.log('✅ Modal display set to:', greenbitesModal.style.display);
            console.log('✅ Modal should now be visible');
        });
        
        // Close functionality
        if (greenbitesClose) {
            greenbitesClose.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('❌ Greenbites close clicked');
                greenbitesModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
        
        // Click outside to close
        greenbitesModal.addEventListener('click', (e) => {
            if (e.target === greenbitesModal) {
                console.log('❌ Clicked outside Greenbites modal');
                greenbitesModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // ABOUT SECTION MODAL FUNCTIONALITY
    if (learnMoreBtn && learnMoreModal) {
        console.log('Setting up About modal...');
        
        // Ensure modal starts hidden
        learnMoreModal.style.display = 'none';
        
        learnMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('🎯 About button clicked!');
            
            // Force modal to show
            learnMoreModal.style.display = 'flex';
            learnMoreModal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            console.log('✅ About modal displayed:', learnMoreModal.style.display);
        });
        
        // Close functionality
        if (learnMoreClose) {
            learnMoreClose.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('❌ About close clicked');
                learnMoreModal.style.display = 'none';
                learnMoreModal.classList.remove('show');
                document.body.style.overflow = 'auto';
            });
        }
        
        // Click outside to close
        learnMoreModal.addEventListener('click', (e) => {
            if (e.target === learnMoreModal) {
                console.log('❌ Clicked outside About modal');
                learnMoreModal.style.display = 'none';
                learnMoreModal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // ESCAPE KEY HANDLER
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (greenbitesModal && greenbitesModal.style.display === 'flex') {
                console.log('❌ Escape pressed - closing Greenbites');
                greenbitesModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
            if (learnMoreModal && learnMoreModal.classList.contains('show')) {
                console.log('❌ Escape pressed - closing About');
                learnMoreModal.style.display = 'none';
                learnMoreModal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    console.log('🎉 Modal functionality initialized!');
});
