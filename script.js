// Smooth scrolling for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Add to cart visual feedback (for static product cards on pages like home)
document.querySelectorAll('.btn-product').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.product-card');
        const productNameEl = card ? card.querySelector('.product-name') : null;
        const productPriceEl = card ? card.querySelector('.product-price') : null;
        const productName = productNameEl ? productNameEl.textContent : 'Item';
        const productPrice = productPriceEl ? productPriceEl.textContent : '';
        this.style.backgroundColor = '#28a745';
        this.textContent = 'Added!';
        setTimeout(() => {
            alert(`${productName}${productPrice ? ` (${productPrice})` : ''} added to cart!`);
            this.style.backgroundColor = '#000';
            this.textContent = 'Add to Cart';
        }, 1000);
    });
});

// Newsletter subscription
const newsletterBtn = document.querySelector('.btn-newsletter');
if (newsletterBtn) {
    newsletterBtn.addEventListener('click', function() {
        const input = document.querySelector('.email-input');
        const email = input ? input.value.trim() : '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && emailRegex.test(email)) {
            this.style.backgroundColor = '#28a745';
            this.textContent = 'Subscribed!';
            if (input) input.value = '';
            setTimeout(() => {
                this.style.backgroundColor = '#fff';
                this.textContent = 'Subscribe';
            }, 2000);
        } else {
            alert('Please enter a valid email address');
        }
    });
}

// Category buttons demo behavior
document.querySelectorAll('.btn-category').forEach(button => {
    button.addEventListener('click', function() {
        const title = this.closest('.category-card')?.querySelector('h3')?.textContent || 'Category';
        alert(`Redirecting to ${title} section...`);
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = '#fff';
        navbar.style.backdropFilter = 'none';
    }
});

// Product card hover effects
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Search icon integrates with catalog search if available
function runSearch(query) {
    if (typeof window.searchProducts === 'function') {
        window.searchProducts(query);
    } else {
        alert(`Searching for: "${query}"`);
    }
}
const searchIcon = document.querySelector('.search-icon');
if (searchIcon) {
    searchIcon.addEventListener('click', function() {
        const navInput = document.querySelector('.nav-search-input');
        const value = navInput && navInput.value.trim() ? navInput.value.trim() : prompt('What are you looking for?');
        if (value) runSearch(value);
    });
}

// Cart icon opens modal if catalog.js provided it
const cartIcon = document.querySelector('.cart-icon');
if (cartIcon) {
    cartIcon.addEventListener('click', function() {
        if (typeof window.openCart === 'function') {
            window.openCart();
        } else {
            alert('Cart is empty. Add some products to see them here!');
        }
    });
}

// Profile icon simple behavior (can be replaced with real auth)
const profileIcon = document.querySelector('.profile-icon');
if (profileIcon) {
    profileIcon.addEventListener('click', function() {
        alert('Please log in to access your profile');
    });
}

// Intersection Observer animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);
document.querySelectorAll('.product-card, .category-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Mobile menu toggle (exposed for future use)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) navMenu.classList.toggle('active');
}
window.toggleMobileMenu = toggleMobileMenu;

// Page load fade-in
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => { document.body.style.opacity = '1'; }, 100);
});

// Keyboard activation for buttons
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.classList && (
            e.target.classList.contains('btn-product') ||
            e.target.classList.contains('btn-category') ||
            e.target.classList.contains('btn-primary') ||
            e.target.classList.contains('btn-secondary')
        )) {
            e.preventDefault();
            e.target.click();
        }
    }
});

// Ripple effect for all buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) ripple.remove();
    button.appendChild(circle);
}
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Inject ripple CSS
const style = document.createElement('style');
style.textContent = `
    .ripple { position: absolute; border-radius: 50%; background-color: rgba(255, 255, 255, 0.6); transform: scale(0); animation: ripple 600ms linear; pointer-events: none; }
    @keyframes ripple { to { transform: scale(4); opacity: 0; } }
    button { position: relative; overflow: hidden; }
`;
document.head.appendChild(style);
