// --- Navbar Shrink Effect ---
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- Mobile Hamburger Menu ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

// Toggle menu on hamburger click
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Toggle icon between bars and close (x)
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// Close menu when a link is clicked
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    });
});

// --- Scroll Animations (Intersection Observer) ---
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Optional: unobserve after showing once
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// --- Project Modal Logic ---
const projectModal = document.getElementById('project-modal');

const projectData = {
    quickattend: {
        title: 'QuickAttend',
        badges: ['React Native', 'Flask', 'Firebase'],
        description: 'A highly secure, location-aware, and real-time attendance tracking system. It uses a multi-layered security approach including Rotating Encrypted QR Codes, WiFi BSSID Validation, and Biometric Authentication to eliminate proxy attendance.',
        vlog: {
            feeling: 'Building QuickAttend was an exhilarating experience. I felt a strong need to solve the proxy attendance issue commonly seen in universities. It felt deeply satisfying to build a robust solution that can genuinely save time for professors and maintain integrity.',
            path: 'I started by researching secure communication protocols and mapping out the user journey for both students and professors. Then, I developed the backend with Flask to handle core logic and validation, followed by the mobile app using React Native for a seamless user experience.',
            difficulties: 'One of the major challenges was ensuring the location validation worked accurately across different devices and environments. Dealing with WiFi BSSID extraction on varied Android versions also posed a significant hurdle, which required deep dives into platform-specific documentation.'
        }
    }
};

function openProjectModal(projectId) {
    if (projectData[projectId]) {
        const data = projectData[projectId];
        
        // Update basic info
        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-description').textContent = data.description;
        
        // Update badges
        const badgesContainer = document.getElementById('modal-badges');
        badgesContainer.innerHTML = '';
        data.badges.forEach(badge => {
            const span = document.createElement('span');
            span.className = 'badge';
            span.textContent = badge;
            badgesContainer.appendChild(span);
        });
        
        // Update vlog section
        document.getElementById('vlog-feeling').textContent = data.vlog.feeling;
        document.getElementById('vlog-path').textContent = data.vlog.path;
        document.getElementById('vlog-difficulties').textContent = data.vlog.difficulties;
        
        // Open modal
        projectModal.classList.remove('is-hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeProjectModal() {
    projectModal.classList.add('is-hidden');
    document.body.style.overflow = 'auto'; // Restore background scrolling
}

// Close modal on Escape key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !projectModal.classList.contains('is-hidden')) {
        closeProjectModal();
    }
});
