// ============================================================
// Main JS — Navigation, scroll effects, reveal animations
// ============================================================

const header = document.getElementById('header');
const mobileToggle = document.getElementById('mobile-toggle');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('#nav ul li a');
const scrollTopBtn = document.querySelector('.scroll-top');
const logoImg = document.getElementById('logo-img');

document.addEventListener('DOMContentLoaded', () => {
  initializeNavigation();
  initializeScrollEffects();
  initializeRevealAnimations();
});

// ---------- Navigation ----------

function initializeNavigation() {
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      nav.classList.toggle('active');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileToggle) {
        mobileToggle.classList.remove('active');
        nav.classList.remove('active');
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ---------- Scroll Effects ----------

function initializeScrollEffects() {
  window.addEventListener('scroll', () => {
    handleHeaderScroll();
    handleScrollTopButton();
    handleActiveNavLinks();
  });

  handleHeaderScroll();

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

function handleHeaderScroll() {
  if (!header) return;

  if (window.scrollY > 1) {
    header.classList.add('scrolled');
    if (logoImg) {
      logoImg.src = 'https://kayo-fellipe.github.io/kayo-fellipe-dados/img/Banners/logo-branca.png';
    }
  } else {
    header.classList.remove('scrolled');
    if (logoImg && !document.body.classList.contains('portfolio-page')) {
      logoImg.src = 'https://kayo-fellipe.github.io/kayo-fellipe-dados/img/Banners/logo-branca.png';
    }
  }
}

function handleScrollTopButton() {
  if (!scrollTopBtn) return;
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add('active');
  } else {
    scrollTopBtn.classList.remove('active');
  }
}

function handleActiveNavLinks() {
  const sections = document.querySelectorAll('section');
  const scrollPosition = window.scrollY + 200;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href') || '';
        if (href === `#${sectionId}` || href === `index.html#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// ---------- Reveal Animations ----------

function initializeRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal, .portfolio-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

window.PortfolioUtils = {
  debounce,
  handleHeaderScroll,
  handleScrollTopButton,
  handleActiveNavLinks
};
