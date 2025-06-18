// DOM Elements
const header = document.getElementById('header');
const mobileToggle = document.getElementById('mobile-toggle');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('#nav ul li a');
const scrollTopBtn = document.querySelector('.scroll-top');

// Toggle Mobile Menu
mobileToggle.addEventListener('click', () => {
  mobileToggle.classList.toggle('active');
  nav.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileToggle.classList.remove('active');
    nav.classList.remove('active');
  });
});

// Header scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Scroll to top button visibility
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add('active');
  } else {
    scrollTopBtn.classList.remove('active');
  }

  // Active nav link on scroll
  updateActiveNavLink();
});

// Scroll to top functionality
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const scrollPosition = window.scrollY + 200;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Initial call to set active nav link
updateActiveNavLink();

// Reveal animations for sections
const revealElements = () => {
  const elements = document.querySelectorAll('.section-header, .about-content, .portfolio-item, .service-card, .testimonial-slider, .contact-content');
  
  elements.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('animate');
    }
  });
};

// Add animate class to CSS for revealed elements
const style = document.createElement('style');
style.textContent = `
  .section-header, .about-content, .portfolio-item, .service-card, .testimonial-slider, .contact-content {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  
  .section-header.animate, .about-content.animate, .portfolio-item.animate, .service-card.animate, .testimonial-slider.animate, .contact-content.animate {
    opacity: 1;
    transform: translateY(0);
  }
  
  .portfolio-item:nth-child(2), .service-card:nth-child(2) {
    transition-delay: 0.2s;
  }
  
  .portfolio-item:nth-child(3), .service-card:nth-child(3) {
    transition-delay: 0.4s;
  }
  
  .portfolio-item:nth-child(4), .service-card:nth-child(4) {
    transition-delay: 0.6s;
  }
`;
document.head.appendChild(style);

// Check for reveal elements on load and scroll
window.addEventListener('scroll', revealElements);
window.addEventListener('load', revealElements);