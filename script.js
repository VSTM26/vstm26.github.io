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

// Add animation on scroll with stagger
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

let sectionIndex = 0;
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = 0; // no delay
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, delay * 1000);
            observer.unobserve(entry.target); // animate once
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(section);
    sectionIndex = index;
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
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        // Filter projects
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

// Close mobile menu when clicking a link
navLinks.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
});

// Particle system for header
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > this.canvas.width) this.x = 0;
        if (this.x < 0) this.x = this.canvas.width;
        if (this.y > this.canvas.height) this.y = 0;
        if (this.y < 0) this.y = this.canvas.height;
    }

    draw() {
        this.ctx.fillStyle = `rgba(102, 126, 234, ${this.opacity})`;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
    }
}

let particles = [];
const particleCanvas = document.createElement('canvas');
particleCanvas.id = 'particle-canvas';
particleCanvas.style.position = 'absolute';
particleCanvas.style.top = '0';
particleCanvas.style.left = '0';
particleCanvas.style.pointerEvents = 'none';
particleCanvas.style.zIndex = '1';

document.querySelector('header').appendChild(particleCanvas);

function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle(canvas));
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

initParticles();

// Header scroll animation with enhanced parallax
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const header = document.querySelector('header');
    const headerContent = document.querySelector('.header-content');
    const nav = document.querySelector('nav');
    const swirls = document.querySelectorAll('.swirl');

    // Enhanced parallax effect for header content
    const parallaxY = scrollY * 0.5;
    const parallaxX = scrollY * 0.1;
    headerContent.style.transform = `translate(${parallaxX}px, ${parallaxY}px) scale(${Math.max(0.95, 1 - scrollY / 2000)})`;

    // Scale and fade header with blur effect
    const scale = Math.max(0.9, 1 - scrollY / 1500);
    const opacity = Math.max(0.4, 1 - scrollY / 800);
    const blur = Math.min(5, scrollY / 200);
    header.style.transform = `scale(${scale})`;
    header.style.opacity = opacity;
    header.style.filter = `blur(${blur}px)`;

    // Animate nav slide in with rotation
    const headerHeight = window.innerHeight;
    if (scrollY > headerHeight * 0.8) {
        nav.style.transform = 'translateY(0) rotateX(0deg)';
        nav.style.opacity = '1';
    } else {
        nav.style.transform = 'translateY(-100%) rotateX(-90deg)';
        nav.style.opacity = '0';
    }

    // Animate swirls on scroll
    swirls.forEach((swirl, index) => {
        const swirlParallax = scrollY * (0.2 + index * 0.1);
        swirl.style.transform = `translateY(${swirlParallax}px) rotate(${scrollY * 0.1}deg)`;
    });
});
