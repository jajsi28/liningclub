// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    setupContactForm();
    setupStoreSearch();
});

// Setup contact form
function setupContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        
        // Add real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearError);
        });
    }
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (validateForm(data)) {
        // Show loading state
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            showSuccessMessage();
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
}

// Validate form data
function validateForm(data) {
    let isValid = true;
    
    // Clear previous errors
    clearAllErrors();
    
    // Validate name
    if (!data.name || data.name.trim().length < 2) {
        showError('name', 'Please enter your full name');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate subject
    if (!data.subject) {
        showError('subject', 'Please select a subject');
        isValid = false;
    }
    
    // Validate message
    if (!data.message || data.message.trim().length < 10) {
        showError('message', 'Please enter a message (at least 10 characters)');
        isValid = false;
    }
    
    return isValid;
}

// Validate individual field
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    clearError(e);
    
    switch(field.name) {
        case 'name':
            if (value.length < 2) {
                showError(field.name, 'Name must be at least 2 characters');
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                showError(field.name, 'Please enter a valid email address');
            }
            break;
        case 'message':
            if (value.length < 10) {
                showError(field.name, 'Message must be at least 10 characters');
            }
            break;
    }
}

// Show error message
function showError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const formGroup = field.closest('.form-group');
    
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
}

// Clear error
function clearError(e) {
    const field = e.target;
    field.classList.remove('error');
    
    const formGroup = field.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Clear all errors
function clearAllErrors() {
    const errorFields = document.querySelectorAll('.error');
    errorFields.forEach(field => field.classList.remove('error'));
    
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(message => message.remove());
}

// Show success message
function showSuccessMessage() {
    const form = document.getElementById('contactForm');
    const existingSuccess = form.querySelector('.success-message');
    
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.';
    
    form.insertBefore(successDiv, form.firstChild);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 5000);
}

// Setup store search
function setupStoreSearch() {
    const searchBtn = document.querySelector('.btn-search');
    const searchInput = document.querySelector('.store-search-input');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', handleStoreSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleStoreSearch();
            }
        });
    }
}

// Handle store search
function handleStoreSearch() {
    const searchInput = document.querySelector('.store-search-input');
    const query = searchInput.value.trim();
    
    if (!query) {
        alert('Please enter a city or zip code to search for stores.');
        return;
    }
    
    // Simulate store search
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.innerHTML = `
            <div style="padding: 2rem; background: #fff; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                <h3>Stores near "${query}"</h3>
                <div style="margin: 1rem 0;">
                    <div style="padding: 1rem; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 1rem;">
                        <h4>Nike Store - Downtown</h4>
                        <p>123 Main Street, ${query}</p>
                        <p>📞 (555) 123-4567</p>
                        <p>🕒 Mon-Sat: 10AM-9PM, Sun: 11AM-7PM</p>
                    </div>
                    <div style="padding: 1rem; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 1rem;">
                        <h4>Nike Store - Mall Location</h4>
                        <p>456 Shopping Center, ${query}</p>
                        <p>📞 (555) 987-6543</p>
                        <p>🕒 Mon-Sat: 10AM-9PM, Sun: 11AM-7PM</p>
                    </div>
                </div>
                <p style="color: #666; font-size: 0.9rem;">* This is a demo. In a real application, this would show actual store locations.</p>
            </div>
        `;
    }
}

// FAQ Accordion functionality (if needed)
function setupFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            // Toggle active state
            this.classList.toggle('active');
            
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
}

// Initialize FAQ accordion if needed
document.addEventListener('DOMContentLoaded', function() {
    setupFAQAccordion();
});
