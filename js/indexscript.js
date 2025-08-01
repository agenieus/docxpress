// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navButtons = document.querySelector('.nav-buttons');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    navButtons.classList.toggle('active');

    
    // Prevent body scroll when menu is open
    document.body.style.overflow = 
        hamburger.classList.contains('active') ? 'hidden' : 'auto';
});

// Close menu when clicking links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        navButtons.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

/*
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
    }); */
// Updated Carousel Functionality
function setupCarousel(trackId, itemWidth) {
    const track = document.getElementById(trackId);
    const dots = document.querySelectorAll(`#${trackId} + .carousel-nav .carousel-dot`);
    const items = track.querySelectorAll('.feature-card, .step-card');
    let currentIndex = 0;
    
    // Clone first few items and append to end for seamless looping
    const cloneCount = 3;
    for (let i = 0; i < cloneCount; i++) {
        const clone = items[i].cloneNode(true);
        track.appendChild(clone);
    }
    
    function updateCarousel() {
        track.style.transition = 'transform 0.5s ease';
        track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === (currentIndex % dots.length));
        });
        
        // Seamless loop when reaching cloned items
        if (currentIndex >= items.length) {
            setTimeout(() => {
                track.style.transition = 'none';
                currentIndex = 0;
                track.style.transform = `translateX(0)`;
            }, 500);
        }
    }
    
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentIndex = parseInt(dot.dataset.index);
            updateCarousel();
        });
    });
    
    // Auto-rotate carousel with seamless loop
    let interval = setInterval(() => {
        currentIndex++;
        updateCarousel();
    }, 3000);
    
    // Pause on hover
    track.addEventListener('mouseenter', () => clearInterval(interval));
    track.addEventListener('mouseleave', () => {
        interval = setInterval(() => {
            currentIndex++;
            updateCarousel();
        }, 3000);
    });
}
/*
    // Auto-rotate carousel
    setInterval(() => {
        currentIndex = (currentIndex + 1) % dots.length;
        updateCarousel();
    }, 500);
    */

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