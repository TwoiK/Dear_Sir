// Wait for DOM to be fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll handling
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Fade-in animation
    function handleFadeIn() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.animation = 'fadeIn 1.5s ease forwards';
            }
        });
    }

    // Mobile menu functionality
    function initializeMobileMenu() {
        // Create mobile menu button
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.classList.add('mobile-menu-button');
        mobileMenuButton.innerHTML = '☰';
        document.querySelector('.navbar').appendChild(mobileMenuButton);

        const navLinks = document.querySelector('.nav-links');

        // Toggle mobile menu
        mobileMenuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('mobile-active');
            mobileMenuButton.innerHTML = navLinks.classList.contains('mobile-active') ? '✕' : '☰';
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const navbar = document.querySelector('.navbar');
            if (!navbar.contains(e.target) && navLinks.classList.contains('mobile-active')) {
                navLinks.classList.remove('mobile-active');
                mobileMenuButton.innerHTML = '☰';
            }
        });

        // Close mobile menu when clicking a link
        navLinks.addEventListener('click', () => {
            navLinks.classList.remove('mobile-active');
            mobileMenuButton.innerHTML = '☰';
        });
    }

    initializeMobileMenu();

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const mobileMenuButton = document.querySelector('.mobile-menu-button');
            const navLinks = document.querySelector('.nav-links');
            mobileMenuButton.classList.remove('active');
            navLinks.classList.remove('mobile-active');
        }
    });
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('newsletterEmail').value;
            const messageDiv = document.getElementById('newsletterMessage');
            
            try {
                const response = await fetch('http://localhost:5000/api/newsletter/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                });

                const data = await response.json();

                if (response.ok) {
                    messageDiv.textContent = data.message;
                    messageDiv.className = 'newsletter-message success';
                    newsletterForm.reset();
                } else {
                    messageDiv.textContent = data.message;
                    messageDiv.className = 'newsletter-message error';
                }

                // Hide message after 3 seconds
                setTimeout(() => {
                    messageDiv.textContent = '';
                    messageDiv.className = 'newsletter-message';
                }, 3000);

            } catch (error) {
                console.error('Error:', error);
                messageDiv.textContent = 'An error occurred. Please try again.';
                messageDiv.className = 'newsletter-message error';
            }
        });
    }
});