// ============================================
//  SacredMiles India Co. — script.js
// ============================================

// === NAVBAR SCROLL EFFECT ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// === MOBILE HAMBURGER MENU ===
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const bars = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    bars[0].style.transform = 'translateY(7px) rotate(45deg)';
    bars[1].style.opacity   = '0';
    bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    bars.forEach(b => (b.style.transform = '', b.style.opacity = ''));
  }
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(b => (b.style.transform = '', b.style.opacity = ''));
  });
});

// === SCROLL FADE-IN (Intersection Observer) ===
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger child cards in a grid
      const delay = entry.target.style.getPropertyValue('--delay') || '0s';
      entry.target.style.transitionDelay = delay;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

fadeEls.forEach(el => observer.observe(el));

// === BOOKING FORM ===
function handleSubmit(e) {
  e.preventDefault();
  const form    = document.getElementById('bookingForm');
  const success = document.getElementById('formSuccess');
  const btn     = form.querySelector('button[type="submit"]');

  // Animate button
  btn.textContent = '✦ Sending...';
  btn.disabled = true;

  // Simulate async submission (replace with actual fetch/email API)
  setTimeout(() => {
    form.style.display   = 'none';
    success.style.display = 'block';
    success.style.animation = 'fadeUp 0.6s ease both';
  }, 1200);

  // In production, use EmailJS or Formspree:
  // fetch('https://formspree.io/f/YOUR_ID', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(Object.fromEntries(new FormData(form)))
  // }).then(() => { ... });
}

// === SMOOTH ACTIVE NAV HIGHLIGHT ===
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

// === PLACE CARD TILT EFFECT (subtle) ===
document.querySelectorAll('.place-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 6;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 6;
    card.style.transform = `translateY(-6px) rotateY(${x}deg) rotateX(${-y}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// === CURRENT YEAR IN FOOTER ===
const yearEls = document.querySelectorAll('.current-year');
yearEls.forEach(el => el.textContent = new Date().getFullYear());

// === PARALLAX ON HERO ===
const hero = document.getElementById('hero');
window.addEventListener('scroll', () => {
  if (window.scrollY < window.innerHeight) {
    hero.style.backgroundPositionY = `calc(50% + ${window.scrollY * 0.3}px)`;
  }
}, { passive: true });

// === INIT ===
window.dispatchEvent(new Event('scroll')); // trigger navbar state on load
