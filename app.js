// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
    }
});

// FAQ accordion functionality
function toggleFAQ(button) {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('svg');
    
    // Toggle answer visibility
    answer.classList.toggle('hidden');
    
    // Rotate icon
    icon.classList.toggle('rotate-180');
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            mobileMenu.classList.add('hidden');
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // Create WhatsApp message
    const whatsappMessage = `Full Name: ${name}%0AEmail: ${email}%0AService: ${service}%0AMessage: ${message}`;
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/2547XXXXXXX?text=${whatsappMessage}`, '_blank');
    
    // Reset form
    contactForm.reset();
});

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .testimonial-card, .section-title').forEach(el => {
    observer.observe(el);
});

// Navbar scroll behavior
let lastScroll = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('shadow-md');
        return;
    }
    
    if (currentScroll > lastScroll) {
        // Scrolling down
        navbar.classList.add('shadow-md');
    } else {
        // Scrolling up
        navbar.classList.remove('shadow-md');
    }
    
    lastScroll = currentScroll;
});

// Add active class to current section in navigation
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`nav a[href*=${sectionId}]`)?.classList.add('text-primary');
        } else {
            document.querySelector(`nav a[href*=${sectionId}]`)?.classList.remove('text-primary');
        }
    });
});

// Form validation
function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !service || !message) {
        alert('Please fill in all fields');
        return false;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add form validation to submit event
contactForm.addEventListener('submit', (e) => {
    if (!validateForm()) {
        e.preventDefault();
    }
});

// Add loading state to form submission
contactForm.addEventListener('submit', () => {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = 'Sending...';
    
    // Reset button state after 2 seconds (simulating API call)
    setTimeout(() => {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Send Message';
    }, 2000);
});

// Add hover effect to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('transform', 'scale-105');
    });
    
    card.addEventListener('mouseleave', () => {
        card.classList.remove('transform', 'scale-105');
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('#home');
    const scroll = window.pageYOffset;
    
    if (hero) {
        hero.style.backgroundPositionY = `${scroll * 0.5}px`;
    }
});

// Add typing effect to hero heading
const heroHeading = document.querySelector('#home h1');
if (heroHeading) {
    const text = heroHeading.textContent;
    heroHeading.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroHeading.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    typeWriter();
}

// Add counter animation to statistics
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 40);
}

// Initialize counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
}); 