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

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('mobile-menu').classList.add('hidden');
        });
    });
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

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
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
}

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

// --- Instant Price Calculator Logic ---
const calcServiceType = document.getElementById('calcServiceType');
const calcAcademicLevel = document.getElementById('calcAcademicLevel');
const calcPages = document.getElementById('calcPages');
const calcUrgency = document.getElementById('calcUrgency');
const calcBasePrice = document.getElementById('calcBasePrice');
const calcLevelMultiplier = document.getElementById('calcLevelMultiplier');
const calcUrgencyFee = document.getElementById('calcUrgencyFee');
const calcSubtotal = document.getElementById('calcSubtotal');
const calcDiscount = document.getElementById('calcDiscount');
const calcTotalPrice = document.getElementById('calcTotalPrice');

if (calcServiceType && calcAcademicLevel && calcPages && calcUrgency && calcBasePrice && calcLevelMultiplier && calcUrgencyFee && calcSubtotal && calcDiscount && calcTotalPrice) {
    const pricingConfig = {
        services: {
            'research-paper': { basePrice: 30 },
            'thesis': { basePrice: 30 },
            'literature-review': { basePrice: 15 },
            'case-study': { basePrice: 30 },
            'essay': { basePrice: 25 },
            'proctored-exam': { basePrice: 150 },
            'professional-exam': { basePrice: 300 },
            'class-management': { basePrice: 400 }
        },
        academicLevels: {
            'high-school': { multiplier: 0.8 },
            'undergraduate': { multiplier: 1.0 },
            'masters': { multiplier: 1.3 },
            'phd': { multiplier: 1.6 }
        },
        urgency: {
            'standard': { multiplier: 1.0 },
            'urgent': { multiplier: 1.15 },
            'very-urgent': { multiplier: 1.3 },
            'asap': { multiplier: 1.5 }
        }
    };

    function updateCalcPrice() {
        const serviceType = calcServiceType.value;
        const pages = parseInt(calcPages.value) || 0;
        const urgency = calcUrgency.value;
        const academicLevel = calcAcademicLevel.value;

        // Get base price
        const service = pricingConfig.services[serviceType];
        const basePrice = service ? service.basePrice : 0;
        const basePriceTotal = basePrice * pages;

        // Get academic level multiplier
        const level = pricingConfig.academicLevels[academicLevel];
        const levelMultiplier = level ? level.multiplier : 1.0;
        const levelPrice = basePriceTotal * levelMultiplier;

        // Get urgency multiplier
        const urgencyConfig = pricingConfig.urgency[urgency];
        const urgencyMultiplier = urgencyConfig ? urgencyConfig.multiplier : 1.0;
        const urgencyPrice = levelPrice * urgencyMultiplier;

        // Calculate subtotal
        const subtotal = urgencyPrice;

        // Calculate discount (10% for new clients)
        const discount = subtotal * 0.1;

        // Calculate total
        const total = subtotal - discount;

        // Animate price update (optional, for smoothness)
        const elements = [calcBasePrice, calcLevelMultiplier, calcUrgencyFee, calcSubtotal, calcDiscount, calcTotalPrice];
        elements.forEach(element => {
            if (element) {
                element.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 150);
            }
        });

        // Update pricing display
        calcBasePrice.textContent = `$${basePrice}`;
        calcLevelMultiplier.textContent = `${levelMultiplier.toFixed(1)}x`;
        calcUrgencyFee.textContent = `$${(urgencyPrice - levelPrice).toFixed(0)}`;
        calcSubtotal.textContent = `$${subtotal.toFixed(0)}`;
        calcDiscount.textContent = `-$${discount.toFixed(0)}`;
        calcTotalPrice.textContent = `$${total.toFixed(0)}`;
    }

    [calcServiceType, calcAcademicLevel, calcPages, calcUrgency].forEach(el => {
        el.addEventListener('input', updateCalcPrice);
        el.addEventListener('change', updateCalcPrice);
    });
    // Initialize on page load
    updateCalcPrice();
} 