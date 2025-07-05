// Mobile Menu Toggle Function
function toggleMenu() {
const nav = document.getElementById('nav');
const kebab = document.querySelector('.kebab-menu');

// Toggle active classes
nav.classList.toggle('active');
kebab.classList.toggle('active');

// Toggle body overflow when menu is open
document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
}

// Close menu when clicking anywhere outside
document.addEventListener('click', function(event) {
const nav = document.getElementById('nav');
const kebab = document.querySelector('.kebab-menu');

// If click is outside nav and kebab menu, and menu is open
if (!nav.contains(event.target) && 
    !kebab.contains(event.target) && 
    nav.classList.contains('active')) {
    nav.classList.remove('active');
    kebab.classList.remove('active');
    document.body.style.overflow = '';
}
});

// Close menu when clicking on nav links
document.querySelectorAll('#nav a').forEach(link => {
link.addEventListener('click', () => {
    document.getElementById('nav').classList.remove('active');
    document.querySelector('.kebab-menu').classList.remove('active');
    document.body.style.overflow = '';
});
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
// Scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Special handling for progress bars
        if (entry.target.classList.contains('progress-bar')) {
        const level = entry.target.getAttribute('data-level');
        const fill = entry.target.querySelector('.progress-fill');
        fill.style.width = `${level}%`;
        }
    }
    });
}, { threshold: 0.1 });

// Observe all elements with reveal class
document.querySelectorAll('.reveal, .section-header, .skill-card, .creed').forEach(el => {
    observer.observe(el);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
    // Don't prevent default if it's the kebab menu
    if (!this.classList.contains('kebab-menu')) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
        target.scrollIntoView({
            behavior: 'smooth'
        });
        }
    }
    });
});
});

// Animate progress bars when skills section is in view
const skillsObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
    if (entry.isIntersecting) {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        const fill = bar.querySelector('.progress-fill');
        fill.style.width = `${level}%`;
    });
    }
});
}, { threshold: 0.5 });

const skillsSection = document.querySelector('#skills');
if (skillsSection) {
skillsObserver.observe(skillsSection);
}
