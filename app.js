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

// Order Tracking Simulation (Frontend only)
const orderIdInput = document.getElementById('order-id-input');
const trackOrderButton = document.getElementById('track-order-button');
const orderStatusDisplay = document.getElementById('order-status-display');
const displayedOrderId = document.getElementById('displayed-order-id');
const orderStatus = document.getElementById('order-status');

// Mock order data (replace with actual backend data in a real application)
const mockOrders = {
    'ORDER123': 'In Progress - Assigned to Writer',
    'ORDER456': 'Under Review - Quality Check',
    'ORDER789': 'Completed - Ready for Download',
    'ORDER000': 'Payment Pending - Awaiting Confirmation'
};

trackOrderButton.addEventListener('click', () => {
    const orderId = orderIdInput.value.trim().toUpperCase();

    if (orderId) {
        if (mockOrders[orderId]) {
            displayedOrderId.textContent = orderId;
            orderStatus.textContent = mockOrders[orderId];
            orderStatusDisplay.classList.remove('hidden');
        } else {
            displayedOrderId.textContent = orderId;
            orderStatus.textContent = 'Order not found. Please check your Order ID.';
            orderStatusDisplay.classList.remove('hidden');
        }
    } else {
        alert('Please enter an Order ID to track.');
        orderStatusDisplay.classList.add('hidden');
    }
});

// Authentication System
const authModal = document.getElementById('auth-modal');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const mobileLoginBtn = document.getElementById('mobile-login-btn');
const mobileRegisterBtn = document.getElementById('mobile-register-btn');
const closeModal = document.getElementById('close-modal');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Show login modal
function showLoginModal() {
    authModal.classList.remove('hidden');
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
}

// Show register modal
function showRegisterModal() {
    authModal.classList.remove('hidden');
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
}

// Close modal
function closeAuthModal() {
    authModal.classList.add('hidden');
}

// Event listeners for modal
loginBtn.addEventListener('click', showLoginModal);
registerBtn.addEventListener('click', showRegisterModal);
mobileLoginBtn.addEventListener('click', showLoginModal);
mobileRegisterBtn.addEventListener('click', showRegisterModal);
closeModal.addEventListener('click', closeAuthModal);
showRegister.addEventListener('click', showRegisterModal);
showLogin.addEventListener('click', showLoginModal);

// Close modal when clicking outside
authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
        closeAuthModal();
    }
});

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Simple validation (in a real app, this would be server-side)
    if (email && password) {
        // Store user data (in a real app, this would be a session/token)
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('userName', email.split('@')[0]); // Use email prefix as name
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        alert('Please fill in all fields');
    }
});

// Handle register form submission
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    
    // Simple validation
    if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    
    // Store user data (in a real app, this would be server-side)
    localStorage.setItem('userLoggedIn', 'true');
    localStorage.setItem('userName', name);
    
    // Redirect to dashboard
    window.location.href = 'dashboard.html';
});

// Check if user is already logged in
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('userLoggedIn');
    if (isLoggedIn) {
        // User is logged in, redirect to dashboard
        window.location.href = 'dashboard.html';
    }
}

// Check login status when page loads
document.addEventListener('DOMContentLoaded', checkLoginStatus);