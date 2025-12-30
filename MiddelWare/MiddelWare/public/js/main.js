// Enhanced JavaScript functionality for DB Mastery



// Navigation Manager
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        
        this.hamburger?.addEventListener('click', () => this.toggleMobileMenu());
        this.setupSmoothScrolling();
    }

    toggleMobileMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
}





// Initialize navigation
document.addEventListener('DOMContentLoaded', () => {
    new NavigationManager();
});