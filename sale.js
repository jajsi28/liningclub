// Sale page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    loadSaleProducts();
    startCountdown();
    setupSaleEventListeners();
});

// Load sale products (items with discounts)
function loadSaleProducts() {
    const allProducts = [...products.men, ...products.women, ...products.kids];
    const saleProducts = allProducts.filter(product => product.oldPrice || product.badge === 'sale');
    
    displayProducts(saleProducts);
}

// Countdown timer
function startCountdown() {
    // Set countdown to 7 days from now
    const countdownDate = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);
    
    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(timer);
            document.querySelector('.countdown-timer').innerHTML = '<h3>Sale Ended!</h3>';
        }
    }, 1000);
}

// Setup sale-specific event listeners
function setupSaleEventListeners() {
    // Override the sort function for sale page
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            currentSort = this.value;
            if (this.value === 'discount') {
                sortByDiscount();
            } else {
                loadSaleProducts();
            }
        });
    }
}

// Sort by discount percentage
function sortByDiscount() {
    const allProducts = [...products.men, ...products.women, ...products.kids];
    const saleProducts = allProducts.filter(product => product.oldPrice || product.badge === 'sale');
    
    const sortedProducts = saleProducts.sort((a, b) => {
        const discountA = a.oldPrice ? ((a.oldPrice - a.price) / a.oldPrice) * 100 : 0;
        const discountB = b.oldPrice ? ((b.oldPrice - b.price) / b.oldPrice) * 100 : 0;
        return discountB - discountA;
    });
    
    displayProducts(sortedProducts);
}

// Add sale-specific styles
const saleStyles = `
    .sale-header {
        background: linear-gradient(135deg, #ff4757 0%, #ff6b7a 100%);
        color: white;
        position: relative;
        overflow: hidden;
    }
    
    .sale-header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="50" font-size="20" fill="rgba(255,255,255,0.1)">SALE</text></svg>') repeat;
        animation: slide 20s linear infinite;
    }
    
    @keyframes slide {
        0% { transform: translateX(-100px); }
        100% { transform: translateX(100px); }
    }
    
    .sale-badge {
        position: absolute;
        top: 20px;
        right: 20px;
        background: #fff;
        color: #ff4757;
        padding: 10px 20px;
        border-radius: 25px;
        font-weight: 900;
        font-size: 18px;
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .sale-banner {
        background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
        color: white;
        padding: 60px 0;
        text-align: center;
    }
    
    .banner-content h2 {
        font-size: 3rem;
        font-weight: 900;
        margin-bottom: 1rem;
    }
    
    .banner-content p {
        font-size: 1.2rem;
        margin-bottom: 2rem;
        opacity: 0.9;
    }
    
    .countdown-timer {
        display: flex;
        justify-content: center;
        gap: 2rem;
        margin-top: 2rem;
    }
    
    .timer-item {
        text-align: center;
        background: rgba(255, 255, 255, 0.1);
        padding: 20px;
        border-radius: 10px;
        min-width: 80px;
    }
    
    .timer-number {
        display: block;
        font-size: 2.5rem;
        font-weight: 900;
        line-height: 1;
    }
    
    .timer-label {
        font-size: 0.9rem;
        opacity: 0.8;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    
    .product-card .product-badge.sale {
        background: linear-gradient(45deg, #ff4757, #ff6b7a);
        animation: glow 2s ease-in-out infinite alternate;
    }
    
    @keyframes glow {
        from { box-shadow: 0 0 5px #ff4757; }
        to { box-shadow: 0 0 20px #ff4757, 0 0 30px #ff4757; }
    }
    
    .product-price .old-price {
        color: #ff4757;
        font-weight: 600;
    }
    
    .discount-percentage {
        background: #ff4757;
        color: white;
        padding: 2px 8px;
        border-radius: 10px;
        font-size: 12px;
        font-weight: 600;
        margin-left: 5px;
    }
    
    @media (max-width: 768px) {
        .countdown-timer {
            gap: 1rem;
        }
        
        .timer-item {
            padding: 15px;
            min-width: 60px;
        }
        
        .timer-number {
            font-size: 2rem;
        }
        
        .banner-content h2 {
            font-size: 2rem;
        }
    }
`;

// Add sale styles
const saleStyleSheet = document.createElement('style');
saleStyleSheet.textContent = saleStyles;
document.head.appendChild(saleStyleSheet);
