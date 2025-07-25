// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navButtons = document.querySelector('.nav-buttons');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navButtons.classList.toggle('active');
});

// Carousel Functionality
function setupCarousel(trackId, itemWidth) {
    const track = document.getElementById(trackId);
    const dots = document.querySelectorAll(`#${trackId} + .carousel-nav .carousel-dot`);
    let currentIndex = 0;
    
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentIndex = parseInt(dot.dataset.index);
            updateCarousel();
        });
    });
    
    // Auto-rotate carousel
    setInterval(() => {
        currentIndex = (currentIndex + 1) % dots.length;
        updateCarousel();
    }, 5000);
}

// Initialize carousels
document.addEventListener('DOMContentLoaded', () => {
    setupCarousel('features-track', 330); // 300px card + 30px margin
    setupCarousel('steps-track', 330);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Scroll animation
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.feature-card, .step-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});