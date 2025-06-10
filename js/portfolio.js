// Portfolio Filtering and Modal

// DOM Elements
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const portfolioLinks = document.querySelectorAll('.portfolio-link');
const modal = document.getElementById('portfolio-modal');
const modalContainer = document.getElementById('modal-container');
const closeModal = document.querySelector('.close-modal');

// Portfolio Filtering
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Add active class to current button
    button.classList.add('active');
    
    // Get filter value
    const filterValue = button.getAttribute('data-filter');
    
    // Filter portfolio items
    portfolioItems.forEach(item => {
      if (filterValue === 'all' || item.classList.contains(filterValue)) {
        item.style.display = 'block';
        
        // Add animation with delay for a staggered effect
        setTimeout(() => {
          item.classList.add('show');
        }, 50);
      } else {
        item.style.display = 'none';
        item.classList.remove('show');
      }
    });
  });
});

// Add CSS for filter animation
const filterStyle = document.createElement('style');
filterStyle.textContent = `
  .portfolio-item {
    transition: all 0.4s ease;
    opacity: 1;
    transform: scale(1);
  }
  
  .portfolio-item.show {
    opacity: 1;
    transform: scale(1);
  }
`;
document.head.appendChild(filterStyle);

// Portfolio Modal
portfolioLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    const type = link.getAttribute('data-type');
    const src = link.getAttribute('data-src');
    
    // Clear previous content
    modalContainer.innerHTML = '';
    
    // Add content based on type
    if (type === 'image') {
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Portfolio Image';
      modalContainer.appendChild(img);
    } else if (type === 'video') {
      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.allow = 'autoplay; fullscreen';
      iframe.allowFullscreen = true;
      modalContainer.appendChild(iframe);
    }
    
    // Show modal
    modal.style.display = 'block';
    
    // Disable body scroll
    document.body.style.overflow = 'hidden';
  });
});

// Close modal
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  
  // Re-enable body scroll
  document.body.style.overflow = 'auto';
  
  // Clear iframe src to stop video if playing
  const iframe = modalContainer.querySelector('iframe');
  if (iframe) {
    iframe.src = '';
  }
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    
    // Re-enable body scroll
    document.body.style.overflow = 'auto';
    
    // Clear iframe src to stop video if playing
    const iframe = modalContainer.querySelector('iframe');
    if (iframe) {
      iframe.src = '';
    }
  }
});

// Close modal with Escape key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'block') {
    modal.style.display = 'none';
    
    // Re-enable body scroll
    document.body.style.overflow = 'auto';
    
    // Clear iframe src to stop video if playing
    const iframe = modalContainer.querySelector('iframe');
    if (iframe) {
      iframe.src = '';
    }
  }
});