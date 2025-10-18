# Nike Website - Complete E-commerce Platform

A fully functional Nike-style e-commerce website built with HTML, CSS, and JavaScript.

## 🚀 Features

### **Core Pages**
- **Homepage** (`index.html`) - Hero section, featured products, categories
- **Men's Collection** (`men.html`) - Men's products with filtering
- **Women's Collection** (`women.html`) - Women's products with filtering  
- **Kids' Collection** (`kids.html`) - Kids' products with age categories
- **Sale Page** (`sale.html`) - Discounted items with countdown timer
- **About Us** (`about.html`) - Company information and history
- **Contact** (`contact.html`) - Contact form and store locator

### **E-commerce Functionality**
- ✅ **Shopping Cart** - Add/remove items, quantity management
- ✅ **Product Catalog** - Filter by category, sort by price/date
- ✅ **Product Search** - Search across all products
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Interactive Elements** - Hover effects, animations
- ✅ **Form Validation** - Contact form with real-time validation

### **Technical Features**
- **Responsive Design** - Works on all devices
- **Modern CSS** - Flexbox, Grid, animations
- **JavaScript ES6+** - Modern JavaScript features
- **Local Storage** - Cart persistence
- **Smooth Animations** - CSS transitions and keyframes
- **Accessibility** - Keyboard navigation, semantic HTML

## 📁 File Structure

```
nike-website/
├── index.html          # Homepage
├── men.html           # Men's collection
├── women.html         # Women's collection
├── kids.html          # Kids' collection
├── sale.html          # Sale page
├── about.html         # About us page
├── contact.html       # Contact page
├── styles.css         # Main stylesheet
├── catalog.css        # Product catalog styles
├── about.css          # About page styles
├── contact.css        # Contact page styles
├── script.js          # Main JavaScript
├── catalog.js         # Product catalog functionality
├── sale.js            # Sale page functionality
├── contact.js         # Contact form functionality
└── README.md          # This file
```

## 🎨 Design Features

### **Nike Branding**
- Official Nike color scheme (black, white, gray)
- Nike typography (Helvetica Neue)
- "Just Do It" tagline integration
- Professional, athletic aesthetic

### **User Experience**
- Intuitive navigation
- Clear product categorization
- Easy-to-use shopping cart
- Mobile-optimized interface
- Fast loading animations

### **Interactive Elements**
- Product hover effects
- Shopping cart animations
- Form validation feedback
- Smooth page transitions
- Responsive image galleries

## 🛒 Shopping Cart Features

- **Add to Cart** - Click any product to add to cart
- **Cart Counter** - Shows total items in navigation
- **Cart Modal** - View and manage cart items
- **Quantity Control** - Increase/decrease item quantities
- **Remove Items** - Remove items from cart
- **Price Calculation** - Automatic total calculation
- **Local Storage** - Cart persists between sessions

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Tablet Support** - Responsive grid layouts
- **Desktop Enhanced** - Full feature set on desktop
- **Touch Friendly** - Large buttons and touch targets
- **Fast Loading** - Optimized images and code

## 🚀 How to Use

1. **Open the Website**
   ```bash
   # Navigate to the nike-website folder
   cd nike-website
   
   # Open index.html in your browser
   open index.html
   ```

2. **Browse Products**
   - Click on Men's, Women's, or Kids' to view collections
   - Use filters to narrow down products
   - Sort by price, date, or category

3. **Add to Cart**
   - Click "Add to Cart" on any product
   - View cart by clicking the cart icon
   - Manage quantities and remove items

4. **Contact Us**
   - Fill out the contact form
   - Use the store locator to find nearby stores
   - Browse FAQ for common questions

## 🛠️ Customization

### **Adding New Products**
Edit the `products` object in `catalog.js`:

```javascript
const products = {
    men: [
        {
            id: 1,
            name: "Product Name",
            category: "shoes",
            price: 100,
            image: "image-url",
            sizes: ["8", "9", "10"]
        }
    ]
};
```

### **Styling Changes**
- Main styles: `styles.css`
- Product catalog: `catalog.css`
- About page: `about.css`
- Contact page: `contact.css`

### **Adding New Pages**
1. Create HTML file
2. Link to main stylesheet
3. Add navigation links
4. Include necessary JavaScript

## 🌟 Key Highlights

- **Complete E-commerce Experience** - Full shopping functionality
- **Professional Design** - Nike-quality branding and UX
- **Mobile Responsive** - Works perfectly on all devices
- **Interactive Features** - Engaging user interactions
- **Clean Code** - Well-organized, maintainable code
- **Fast Performance** - Optimized for speed
- **Accessibility** - Keyboard navigation and screen reader friendly

## 📞 Support

For questions or support, please contact us through the contact form on the website.

---

**Built with ❤️ for the Nike brand experience**
