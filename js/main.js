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
closePopupButton.addEventListener('click', closePopup);

// Close popup when clicking outside the modal
popupModal.addEventListener('click', (e) => {
    if (e.target === popupModal) {
        closePopup();
    }
});

// Close popup on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popupModal.style.display === 'flex') {
        closePopup();
    }
});

// Thank You Popup functionality
function createThankYouPopup() {
    const thankYouPopup = document.createElement('div');
    thankYouPopup.id = 'thank-you-popup';
    thankYouPopup.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
    thankYouPopup.innerHTML = `
        <div class="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 text-center transform scale-0 transition-transform duration-300">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-check text-2xl text-green-500"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">Thank You!</h3>
            <p class="text-gray-600 mb-6">Your form has been submitted successfully. Our team will contact you soon.</p>
            <button id="thank-you-close" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                Close
            </button>
        </div>
    `;
    document.body.appendChild(thankYouPopup);
    
    // Animate in
    setTimeout(() => {
        thankYouPopup.querySelector('div').style.transform = 'scale(1)';
    }, 10);
    
    // Close button functionality
    const closeBtn = thankYouPopup.querySelector('#thank-you-close');
    closeBtn.addEventListener('click', () => {
        thankYouPopup.querySelector('div').style.transform = 'scale(0)';
        setTimeout(() => {
            document.body.removeChild(thankYouPopup);
            document.body.style.overflow = 'auto';
        }, 300);
    });
    
    // Close on outside click
    thankYouPopup.addEventListener('click', (e) => {
        if (e.target === thankYouPopup) {
            closeBtn.click();
        }
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (document.getElementById('thank-you-popup')) {
            closeBtn.click();
        }
    }, 5000);
    
    document.body.style.overflow = 'hidden';
}

// Form submission handler
function handleFormSubmission(form) {
    const formData = new FormData(form);
    
    // Submit to Web3Forms
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Close the initial popup if it's open
            if (popupModal.style.display === 'flex') {
                closePopup();
            }
            
            // Show thank you popup
            createThankYouPopup();
            
            // Reset form
            form.reset();
        } else {
            alert('There was an error submitting the form. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
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
    mobileMenu.classList.add('open');
    mobileMenuOverlay.classList.remove('hidden');
    hamburger.classList.add('open');
    document.body.classList.add('menu-open');
}

function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    mobileMenuOverlay.classList.add('hidden');
    hamburger.classList.remove('open');
    document.body.classList.remove('menu-open');
}

mobileMenuButton.addEventListener('click', () => {
    if (mobileMenu.classList.contains('open')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});
mobileMenuClose.addEventListener('click', closeMobileMenu);
mobileMenuOverlay.addEventListener('click', closeMobileMenu);

// Close mobile menu when clicking on a link
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
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

    showTab('project');
    
    // Handle form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            handleFormSubmission(this);
        });
    });
});

// Initialize popup on page load
document.addEventListener('DOMContentLoaded', showPopup);