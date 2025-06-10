// Testimonial Slider

// DOM Elements
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const prevBtn = document.getElementById('prev-testimonial');
const nextBtn = document.getElementById('next-testimonial');
const dots = document.querySelectorAll('.testimonial-dots .dot');

// Set initial slide
let currentSlide = 0;
const slideCount = testimonialSlides.length;

// Show slide function
function showSlide(index) {
  // Hide all slides
  testimonialSlides.forEach(slide => {
    slide.classList.remove('active');
  });
  
  // Remove active class from all dots
  dots.forEach(dot => {
    dot.classList.remove('active');
  });
  
  // Show current slide
  testimonialSlides[index].classList.add('active');
  
  // Add active class to current dot
  dots[index].classList.add('active');
}

// Next slide function
function nextSlide() {
  currentSlide++;
  if (currentSlide >= slideCount) {
    currentSlide = 0;
  }
  showSlide(currentSlide);
}

// Previous slide function
function prevSlide() {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = slideCount - 1;
  }
  showSlide(currentSlide);
}

// Event listeners
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});

// Auto slide every 5 seconds
let slideInterval = setInterval(nextSlide, 5000);

// Pause auto slide on hover
const testimonialContainer = document.querySelector('.testimonial-slider');
testimonialContainer.addEventListener('mouseenter', () => {
  clearInterval(slideInterval);
});

// Resume auto slide on mouse leave
testimonialContainer.addEventListener('mouseleave', () => {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 5000);
});

// Touch swipe functionality for mobile
let touchStartX = 0;
let touchEndX = 0;

const testimonialElement = document.querySelector('.testimonial-container');

testimonialElement.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

testimonialElement.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  if (touchEndX < touchStartX - 50) {
    // Swipe left, show next slide
    nextSlide();
  }
  
  if (touchEndX > touchStartX + 50) {
    // Swipe right, show previous slide
    prevSlide();
  }
}