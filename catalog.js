// Product Data
const products = {
    men: [
        {
            id: 1,
            name: "Air Jordan 1 Retro High OG",
            category: "shoes",
            price: 170,
            oldPrice: 200,
            image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1920,c_limit/4b1a2b0a-3b5c-4b5a-8b5a-3b5c4b5a8b5a/air-jordan-1-retro-high-og-mens-shoes-6GdF9n.png",
            badge: "sale",
            sizes: ["8", "9", "10", "11", "12"]
        },
        {
            id: 2,
            name: "Air Force 1 '07",
            category: "shoes",
            price: 90,
            image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1920,c_limit/4b1a2b0a-3b5c-4b5a-8b5a-3b5c4b5a8b5a/air-force-1-07-mens-shoes-5QFp5Z.png",
            badge: "new",
            sizes: ["8", "9", "10", "11", "12"]
        },
        {
            id: 3,
            name: "Nike Dunk Low",
            category: "shoes",
            price: 100,
            image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1920,c_limit/4b1a2b0a-3b5c-4b5a-8b5a-3b5c4b5a8b5a/dunk-low-mens-shoes-4QKq1q.png",
            sizes: ["8", "9", "10", "11", "12"]
        },
        {
            id: 4,
            name: "Nike Dri-FIT T-Shirt",
            category: "clothing",
            price: 35,
            image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1920,c_limit/4b1a2b0a-3b5c-4b5a-8b5a-3b5c4b5a8b5a/dri-fit-mens-t-shirt-4QKq1q.png",
            badge: "new",
            sizes: ["S", "M", "L", "XL", "XXL"]
        },
        {
            id: 5,
            name: "Nike Sportswear Hoodie",
            category: "clothing",
            price: 85,
            image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1920,c_limit/4b1a2b0a-3b5c-4b5a-8b5a-3b5c4b5a8b5a/sportswear-mens-hoodie-4QKq1q.png",
            sizes: ["S", "M", "L", "XL", "XXL"]
        },
        {
            id: 6,
            name: "Nike Air Max 270",
            category: "shoes",
            price: 150,
            image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1920,c_limit/4b1a2b0a-3b5c-4b5a-8b5a-3b5c4b5a8b5a/air-max-270-mens-shoes-KkLcGR.png",
            sizes: ["8", "9", "10", "11", "12"]
        }
    ],
    women: [
        {
            id: 7,
            name: "Air Jordan 1 Retro High OG",
            category: "shoes",
            price: 170,
            image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1920,c_limit/4b1a2b0a-3b5c-4b5a-8b5a-3b5c4b5a8b5a/air-jordan-1-retro-high-og-womens-shoes-6GdF9n.png",
            badge: "new",
            sizes: ["6", "7", "8", "9", "10"]
        },
        {
            id: 8,
            name: "Nike Air Force 1 '07",
            category: "shoes",
            price: 90,
            image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1920,c_limit/4b1a2b0a-3b5c-4b5a-8b5a-3b5c4b5a8b5a/air-force-1-07-womens-shoes-5QFp5Z.png",
            sizes: ["6", "7", "8", "9", "10"]
        },
        {
            id: 9,
            name: "Nike Dri-FIT Tank Top",
            category: "clothing",
            price: 30,
            image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1920,c_limit/4b1a2b0a-3b5c-4b5a-8b5a-3b5c4b5a8b5a/dri-fit-womens-tank-4QKq1q.png",
            badge: "sale",
            oldPrice: 40,
            sizes: ["XS", "S", "M", "L", "XL"]
        },
        {
            id: 10,
            name: "Nike Sportswear Joggers",
            category: "clothing",
            price: 65,
            image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1920,c_limit/4b1a2b0a-3b5c-4b5a-8b5a-3b5c4b5a8b5a/sportswear-womens-joggers-4QKq1q.png",
            sizes: ["XS", "S", "M", "L", "XL"]
        }
    ],
    kids: [
        {
            id: 11,
            name: "Nike Air Max 270 Kids",
            category: "shoes",
            price: 80,
            image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1920,c_limit/4b1a2b0a-3b5c-4b5a-8b5a-3b5c4b5a8b5a/air-max-270-kids-shoes-KkLcGR.png",
            badge: "new",
            sizes: ["3", "4", "5", "6", "7"]
        },
        {
            id: 12,
            name: "Nike Dri-FIT Kids T-Shirt",
            category: "clothing",
            price: 20,
            image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1920,c_limit/4b1a2b0a-3b5c-4b5a-8b5a-3b5c4b5a8b5a/dri-fit-kids-t-shirt-4QKq1q.png",
            sizes: ["XS", "S", "M", "L"]
        }
    ]
};

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('nikeCart')) || [];
let currentCategory = 'all';
let currentSort = 'featured';

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop().split('.')[0];
    loadProducts(currentPage);
    updateCartCount();
    setupEventListeners();
});

// Load products based on current page
function loadProducts(page) {
    let productData = [];
    
    switch(page) {
        case 'men':
            productData = products.men;
            break;
        case 'women':
            productData = products.women;
            break;
        case 'kids':
            productData = products.kids;
            break;
        default:
            productData = [...products.men, ...products.women, ...products.kids];
    }
    
    displayProducts(productData);
}

// Display products in grid
function displayProducts(productsToShow) {
    const productsGrid = document.getElementById('productsGrid');
    
    if (!productsGrid) return;
    
    // Filter by category
    let filteredProducts = productsToShow;
    if (currentCategory !== 'all') {
        filteredProducts = productsToShow.filter(product => product.category === currentCategory);
    }
    
    // Sort products
    filteredProducts = sortProducts(filteredProducts, currentSort);
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="empty-state">
                <h3>No products found</h3>
                <p>Try adjusting your filters or browse other categories.</p>
            </div>
        `;
        return;
    }
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-id="${product.id}">
            ${product.badge ? `<div class="product-badge ${product.badge}">${product.badge}</div>` : ''}
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">
                    ${product.oldPrice ? `<span class="old-price">$${product.oldPrice}</span>` : ''}
                    $${product.price}
                </div>
                <div class="product-actions">
                    <button class="btn-product" onclick="addToCart(${product.id})">Add to Cart</button>
                    <button class="btn-wishlist" onclick="toggleWishlist(${product.id})">♡</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Sort products
function sortProducts(products, sortBy) {
    switch(sortBy) {
        case 'price-low':
            return products.sort((a, b) => a.price - b.price);
        case 'price-high':
            return products.sort((a, b) => b.price - a.price);
        case 'newest':
            return products.sort((a, b) => b.id - a.id);
        default:
            return products;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            loadProducts(getCurrentPage());
        });
    });
    
    // Sort select
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            currentSort = this.value;
            loadProducts(getCurrentPage());
        });
    }
}

// Get current page
function getCurrentPage() {
    return window.location.pathname.split('/').pop().split('.')[0];
}

// Add to cart
function addToCart(productId) {
    const currentPage = getCurrentPage();
    let productData = [];
    
    switch(currentPage) {
        case 'men':
            productData = products.men;
            break;
        case 'women':
            productData = products.women;
            break;
        case 'kids':
            productData = products.kids;
            break;
        default:
            productData = [...products.men, ...products.women, ...products.kids];
    }
    
    const product = productData.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1,
            size: product.sizes[0] // Default size
        });
    }
    
    localStorage.setItem('nikeCart', JSON.stringify(cart));
    updateCartCount();
    showAddToCartFeedback(product.name);
}

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

// Show add to cart feedback
function showAddToCartFeedback(productName) {
    // Find the button that was clicked
    const buttons = document.querySelectorAll('.btn-product');
    buttons.forEach(btn => {
        if (btn.textContent === 'Add to Cart') {
            const originalText = btn.textContent;
            btn.style.backgroundColor = '#28a745';
            btn.textContent = 'Added!';
            
            setTimeout(() => {
                btn.style.backgroundColor = '#000';
                btn.textContent = originalText;
            }, 1500);
        }
    });
}

// Toggle wishlist
function toggleWishlist(productId) {
    const wishlistBtn = event.target;
    const isWishlisted = wishlistBtn.classList.contains('wishlisted');
    
    if (isWishlisted) {
        wishlistBtn.classList.remove('wishlisted');
        wishlistBtn.textContent = '♡';
        wishlistBtn.style.backgroundColor = '#f8f9fa';
        wishlistBtn.style.borderColor = '#ddd';
    } else {
        wishlistBtn.classList.add('wishlisted');
        wishlistBtn.textContent = '♥';
        wishlistBtn.style.backgroundColor = '#ff4757';
        wishlistBtn.style.borderColor = '#ff4757';
        wishlistBtn.style.color = '#fff';
    }
}

// Search functionality
function searchProducts(query) {
    const currentPage = getCurrentPage();
    let productData = [];
    
    switch(currentPage) {
        case 'men':
            productData = products.men;
            break;
        case 'women':
            productData = products.women;
            break;
        case 'kids':
            productData = products.kids;
            break;
        default:
            productData = [...products.men, ...products.women, ...products.kids];
    }
    
    const filteredProducts = productData.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    
    displayProducts(filteredProducts);
}

// Cart functionality
function openCart() {
    if (cart.length === 0) {
        alert('Your cart is empty. Add some products to see them here!');
        return;
    }
    
    // Create cart modal
    const cartModal = document.createElement('div');
    cartModal.className = 'cart-modal';
    cartModal.innerHTML = `
        <div class="cart-content">
            <div class="cart-header">
                <h2>Shopping Cart</h2>
                <button class="close-cart">&times;</button>
            </div>
            <div class="cart-items">
                ${cart.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="item-details">
                            <h4>${item.name}</h4>
                            <p>Size: ${item.size}</p>
                            <p>$${item.price}</p>
                        </div>
                        <div class="item-controls">
                            <button onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="updateQuantity(${item.id}, 1)">+</button>
                            <button onclick="removeFromCart(${item.id})">Remove</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="cart-footer">
                <div class="cart-total">
                    <strong>Total: $${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</strong>
                </div>
                <button class="btn-checkout">Checkout</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(cartModal);
    
    // Close cart functionality
    cartModal.querySelector('.close-cart').addEventListener('click', () => {
        document.body.removeChild(cartModal);
    });
    
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            document.body.removeChild(cartModal);
        }
    });
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        localStorage.setItem('nikeCart', JSON.stringify(cart));
        updateCartCount();
        openCart(); // Refresh cart display
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('nikeCart', JSON.stringify(cart));
    updateCartCount();
    openCart(); // Refresh cart display
}

// Add cart modal styles
const cartStyles = `
    .cart-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    
    .cart-content {
        background: white;
        border-radius: 10px;
        width: 90%;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
    }
    
    .cart-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #eee;
    }
    
    .close-cart {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
    }
    
    .cart-item {
        display: flex;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #eee;
    }
    
    .cart-item img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 5px;
        margin-right: 15px;
    }
    
    .item-details {
        flex: 1;
    }
    
    .item-details h4 {
        margin: 0 0 5px 0;
        font-size: 16px;
    }
    
    .item-details p {
        margin: 0;
        color: #666;
        font-size: 14px;
    }
    
    .item-controls {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .item-controls button {
        padding: 5px 10px;
        border: 1px solid #ddd;
        background: white;
        cursor: pointer;
        border-radius: 3px;
    }
    
    .cart-footer {
        padding: 20px;
        border-top: 1px solid #eee;
        text-align: center;
    }
    
    .cart-total {
        margin-bottom: 15px;
        font-size: 18px;
    }
    
    .btn-checkout {
        background: #000;
        color: white;
        border: none;
        padding: 15px 30px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 600;
    }
`;

// Add cart styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = cartStyles;
document.head.appendChild(styleSheet);

// Make functions globally available
window.addToCart = addToCart;
window.toggleWishlist = toggleWishlist;
window.openCart = openCart;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.searchProducts = searchProducts;
