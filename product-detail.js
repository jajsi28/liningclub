// Image gallery switching
document.querySelectorAll('.thumb').forEach((thumb, idx, arr) => {
    thumb.addEventListener('click', function() {
        arr.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        document.getElementById('mainProductImage').src = this.src;
    });
});

// Wishlist toggle
document.getElementById('wishlistBtn').addEventListener('click', function() {
    this.classList.toggle('active');
    this.textContent = this.classList.contains('active') ? "♥ Wishlisted" : "♡ Wishlist";
});

// Tabs switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        ['descTab','reviewsTab','relatedTab'].forEach(id => document.getElementById(id).style.display = 'none');
        if(this.dataset.tab === 'desc') document.getElementById('descTab').style.display = 'block';
        if(this.dataset.tab === 'reviews') document.getElementById('reviewsTab').style.display = 'block';
        if(this.dataset.tab === 'related') document.getElementById('relatedTab').style.display = 'block';
    });
});
// Show default tab
document.getElementById('descTab').style.display = 'block';

// Add review form (simple demo)
document.querySelector('.add-review-form').addEventListener('submit', function(e){
    e.preventDefault();
    alert('Thank you for your review! (Demo only)');
    this.reset();
});
