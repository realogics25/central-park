// Popup Modal functionality
const popupModal = document.getElementById('popup-modal');
const closePopupButton = document.getElementById('close-popup');

// Show popup on page load
function showPopup() {
    // Check if popup was already shown in this session
    if (!sessionStorage.getItem('popupShown')) {
        // Show popup after a delay (2 seconds)
        setTimeout(() => {
            popupModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }, 2000);
    }
}

// Close popup function
function closePopup() {
    popupModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    // Mark popup as shown for this session
    sessionStorage.setItem('popupShown', 'true');
}

// Close popup when clicking the close button
if (closePopupButton) {
    closePopupButton.addEventListener('click', closePopup);
}

// Close popup when clicking outside the modal
if (popupModal) {
    popupModal.addEventListener('click', (e) => {
        if (e.target === popupModal) {
            closePopup();
        }
    });
}

// Close popup on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popupModal && popupModal.style.display === 'flex') {
        closePopup();
    }
});

// Form submission handler - Updated to redirect to thank you page
function handleFormSubmission(form) {
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    // Submit to Web3Forms
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Store submission success in sessionStorage for thank you page
            sessionStorage.setItem('formSubmitted', 'true');
            sessionStorage.setItem('submissionTime', new Date().toISOString());
            
            // Redirect to thank you page
            window.location.href = 'thank-you.html';
        } else {
            // Reset button and show error
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            alert('There was an error submitting the form. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Reset button and show error
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        alert('There was an error submitting the form. Please try again.');
    });
}

// Mobile menu functionality
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const hamburger = document.querySelector('.hamburger');

function openMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.add('open');
    }
    if (mobileMenuOverlay) {
        mobileMenuOverlay.classList.remove('hidden');
    }
    if (hamburger) {
        hamburger.classList.add('open');
    }
    document.body.classList.add('menu-open');
}

function closeMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.remove('open');
    }
    if (mobileMenuOverlay) {
        mobileMenuOverlay.classList.add('hidden');
    }
    if (hamburger) {
        hamburger.classList.remove('open');
    }
    document.body.classList.remove('menu-open');
}

if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
        if (mobileMenu && mobileMenu.classList.contains('open')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
}

if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
}

if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
}

// Close mobile menu when clicking on a link
if (mobileMenu) {
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
        closeMobileMenu();
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Tab functionality for Overview section
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    function showTab(tabName) {
        tabContents.forEach(content => {
            content.classList.add('hidden');
            content.classList.remove('active');
        });

        tabButtons.forEach(btn => {
            btn.classList.remove('active', 'bg-black', 'text-white');
            btn.classList.add('bg-white', 'border-2', 'border-gray-300', 'text-gray-700');
        });

        const selectedTab = document.getElementById(`${tabName}-tab`);
        if (selectedTab) {
            selectedTab.classList.remove('hidden');
            selectedTab.classList.add('active');
        }

        const selectedButton = document.querySelector(`[data-tab="${tabName}"]`);
        if (selectedButton) {
            selectedButton.classList.remove('bg-white', 'border-2', 'border-gray-300', 'text-gray-700');
            selectedButton.classList.add('active', 'bg-black', 'text-white');
        }
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            showTab(tabName);
        });
    });

    // Show default tab
    if (tabButtons.length > 0) {
        showTab('project');
    }
    
    // Handle form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            handleFormSubmission(this);
        });
    });

    // Initialize popup on page load (only on main page)
    if (popupModal) {
        showPopup();
    }
});

// Additional utility functions
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('border-red-500');
            isValid = false;
        } else {
            field.classList.remove('border-red-500');
        }
    });
    
    return isValid;
}

// Enhanced form submission with validation
function enhancedFormSubmission(form) {
    if (!validateForm(form)) {
        alert('Please fill in all required fields.');
        return;
    }
    
    handleFormSubmission(form);
}

// Phone number formatting (optional enhancement)
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 10) {
        value = value.substring(0, 10);
        input.value = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    } else {
        input.value = value;
    }
}

// Add phone formatting to phone inputs
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    });
});

// Analytics and tracking functions
function trackFormSubmission(formType) {
    // Google Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            'form_type': formType,
            'page_location': window.location.href
        });
    }
    
    // Facebook Pixel tracking
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_name: 'Central Park Inquiry',
            content_category: 'Real Estate'
        });
    }
    
    // Add other tracking codes as needed
}

// Call tracking function before form submission
function handleFormSubmissionWithTracking(form) {
    const formType = form.id || 'contact_form';
    trackFormSubmission(formType);
    handleFormSubmission(form);
}