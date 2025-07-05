document.addEventListener('DOMContentLoaded', function() {
// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');

mobileMenuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    mainNav.classList.toggle('active');
});

// Project Filtering
const categoryFilter = document.getElementById('category-filter');
const projectCards = document.querySelectorAll('.project-card');

categoryFilter.addEventListener('change', function() {
    const selectedCategory = this.value;
    
    projectCards.forEach(card => {
        if (selectedCategory === 'all' || card.dataset.category === selectedCategory) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Project Sorting
const sortSelect = document.getElementById('sort-projects');
const projectsGrid = document.querySelector('.grid');

sortSelect.addEventListener('change', function() {
    const sortValue = this.value;
    const projects = Array.from(projectCards);
    
    projects.sort((a, b) => {
        if (sortValue === 'newest') {
            return new Date(b.dataset.date) - new Date(a.dataset.date);
        } else if (sortValue === 'oldest') {
            return new Date(a.dataset.date) - new Date(b.dataset.date);
        } else if (sortValue === 'name') {
            const nameA = a.querySelector('h3').textContent.toLowerCase();
            const nameB = b.querySelector('h3').textContent.toLowerCase();
            return nameA.localeCompare(nameB);
        }
        return 0;
    });
    
    // Re-append sorted projects
    projects.forEach(project => {
        projectsGrid.appendChild(project);
    });
});

// Project Search
const searchInput = document.querySelector('.search-box input');

searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    
    projectCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.project-description').textContent.toLowerCase();
        const tags = Array.from(card.querySelectorAll('.project-tags li')).map(tag => tag.textContent.toLowerCase());
        
        if (title.includes(searchTerm) || 
            description.includes(searchTerm) || 
            tags.some(tag => tag.includes(searchTerm))) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Load More Button (simulated)
const loadMoreBtn = document.getElementById('load-more-btn');
let visibleProjects = 3; // Initial number of visible projects

// Initially hide projects beyond the first 3
projectCards.forEach((card, index) => {
    if (index >= visibleProjects) {
        card.style.display = 'none';
    }
});

loadMoreBtn.addEventListener('click', function() {
    visibleProjects += 3;
    
    projectCards.forEach((card, index) => {
        if (index < visibleProjects) {
            card.style.display = 'block';
        }
    });
    
    // Hide button if all projects are visible
    if (visibleProjects >= projectCards.length) {
        loadMoreBtn.style.display = 'none';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animation for project cards when they come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// Animation for section header
const pageHeader = document.querySelector('.page-header');
const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.3 });

headerObserver.observe(pageHeader);
});

