// Modern AdminHub JavaScript - Enhanced Interactions
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize animations
    initializeAnimations();
    
    // Form enhancements
    enhanceForms();
    
    // Interactive elements
    addInteractiveEffects();
    
    // Loading states
    handleLoadingStates();
    
    console.log('🚀 AdminHub Modern UI Loaded Successfully!');
});

// Mobile Menu System
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('show');
            
            // Prevent body scroll when menu is open
            if (mobileMenu.classList.contains('show')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on nav links
        const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('show');
                document.body.style.overflow = '';
            });
        });
    }
}

// Animation System
function initializeAnimations() {
    // Stagger animations for cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
    
    // Animate stats on scroll
    const statNumbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Number animation
function animateNumber(element) {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '');
    }, 16);
}

// Form Enhancements
function enhanceForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearErrors);
        });
        
        // Enhanced form submission
        form.addEventListener('submit', handleFormSubmit);
    });
    
    // File input enhancements
    enhanceFileInputs();
}

// Field validation
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error states
    field.style.borderColor = '';
    removeErrorMessage(field);
    
    // Validate based on field type
    let isValid = true;
    let errorMessage = '';
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    } else if (field.type === 'password' && value && value.length < 6) {
        isValid = false;
        errorMessage = 'Password must be at least 6 characters';
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        showFieldSuccess(field);
    }
    
    return isValid;
}

// Clear errors on input
function clearErrors(e) {
    const field = e.target;
    if (field.style.borderColor === 'var(--danger)') {
        field.style.borderColor = '';
        removeErrorMessage(field);
    }
}

// Show field error
function showFieldError(field, message) {
    field.style.borderColor = 'var(--danger)';
    field.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.1)';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.cssText = `
        color: var(--danger);
        font-size: 12px;
        margin-top: 4px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 4px;
    `;
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    
    field.parentNode.appendChild(errorDiv);
}

// Show field success
function showFieldSuccess(field) {
    field.style.borderColor = 'var(--success)';
    field.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.1)';
}

// Remove error message
function removeErrorMessage(field) {
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Email validation
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Enhanced form submission
function handleFormSubmit(e) {
    const form = e.target;
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isFormValid = true;
    
    // Validate all required fields
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        e.preventDefault();
        showToast('Please fix the errors before submitting', 'error');
        return;
    }
    
    // Add loading state to submit button
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        // Reset button after 5 seconds (fallback)
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 5000);
    }
}

// File input enhancements
function enhanceFileInputs() {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(input => {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // Validate file size (5MB max)
                if (file.size > 5 * 1024 * 1024) {
                    showToast('File size must be less than 5MB', 'error');
                    input.value = '';
                    return;
                }
                
                // Show preview for images
                if (file.type.startsWith('image/')) {
                    showImagePreview(input, file);
                }
                
                // Update input styling
                input.style.borderColor = 'var(--success)';
                showToast(`File "${file.name}" selected successfully`, 'success');
            }
        });
    });
}

// Show image preview
function showImagePreview(input, file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        let preview = input.parentNode.querySelector('.file-preview');
        if (!preview) {
            preview = document.createElement('div');
            preview.className = 'file-preview';
            preview.style.cssText = `
                margin-top: 16px;
                text-align: center;
                padding: 16px;
                background: var(--light);
                border-radius: var(--radius);
                border: 2px dashed var(--success);
            `;
            input.parentNode.appendChild(preview);
        }
        
        preview.innerHTML = `
            <img src="${e.target.result}" alt="Preview" style="
                max-width: 120px;
                max-height: 120px;
                border-radius: var(--radius);
                box-shadow: var(--shadow);
                margin-bottom: 8px;
            ">
            <div style="color: var(--success); font-weight: 600; font-size: 12px;">
                <i class="fas fa-check-circle"></i> Preview Ready
            </div>
        `;
    };
    reader.readAsDataURL(file);
}

// Interactive Effects
function addInteractiveEffects() {
    // Enhanced hover effects for cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Button ripple effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Table row interactions
    const tableRows = document.querySelectorAll('.table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

// Ripple effect
function createRipple(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Loading States
function handleLoadingStates() {
    // Show loading on page navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.href && !this.href.includes('#')) {
                showPageLoader();
            }
        });
    });
}

// Show page loader
function showPageLoader() {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        backdrop-filter: blur(5px);
    `;
    
    loader.innerHTML = `
        <div style="text-align: center;">
            <div style="
                width: 50px;
                height: 50px;
                border: 4px solid var(--primary-light);
                border-top: 4px solid var(--primary);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 16px;
            "></div>
            <div style="color: var(--primary); font-weight: 600;">Loading...</div>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // Remove loader after 3 seconds (fallback)
    setTimeout(() => {
        if (document.getElementById('page-loader')) {
            loader.remove();
        }
    }, 3000);
}

// Enhanced notification system with Toastify
function showToast(message, type = 'info', duration = 3000) {
    const colors = {
        success: {
            background: "linear-gradient(135deg, #10b981, #059669)",
            icon: "✅"
        },
        error: {
            background: "linear-gradient(135deg, #ef4444, #dc2626)",
            icon: "❌"
        },
        warning: {
            background: "linear-gradient(135deg, #f59e0b, #d97706)",
            icon: "⚠️"
        },
        info: {
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            icon: "ℹ️"
        }
    };
    
    const config = colors[type] || colors.info;
    
    Toastify({
        text: `${config.icon} ${message}`,
        duration: duration,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: config.background,
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
            fontSize: "15px",
            fontWeight: "600",
            padding: "16px 20px",
            fontFamily: "'Inter', sans-serif"
        },
        onClick: function(){}
    }).showToast();
}

// Notification system
function showNotification(message, type = 'info') {
    showToast(message, type);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);