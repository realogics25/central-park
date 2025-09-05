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

// Close popup when form is submitted
const popupForm = popupModal.querySelector('form');
popupForm.addEventListener('submit', () => {
    setTimeout(closePopup, 1000); // Close after 1 second to allow form submission
});

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
});

// Initialize popup on page load
document.addEventListener('DOMContentLoaded', showPopup);
