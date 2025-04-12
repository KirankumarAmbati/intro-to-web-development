// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add a welcome message to the console
    console.log('Welcome to My Website!');

    // Get all navigation links
    // const navLinks = document.querySelectorAll('nav a');

    // // Add click event listeners to all navigation links
    // navLinks.forEach(link => {
    //     link.addEventListener('click', function(e) {
    //         e.preventDefault(); // Prevent default link behavior
    //         console.log('Clicked:', this.textContent);
    //         // You can add more functionality here
    //     });
    // });

    // Image Gallery Functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add a simple animation class
            this.style.transform = 'scale(1.05)';
            
            // Reset after animation
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            console.log('Gallery item clicked');
        });
    });
}); 