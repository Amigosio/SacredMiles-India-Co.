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

// === BOOKING FORM — powered by Formspree ===
// SETUP: Replace YOUR_FORMSPREE_ID below with your actual ID from formspree.io
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mzdorkgn';

async function handleSubmit(e) {
  e.preventDefault();
  const form    = document.getElementById('bookingForm');
  const success = document.getElementById('formSuccess');
  const error   = document.getElementById('formError');
  const btn     = form.querySelector('button[type="submit"]');

  btn.textContent = '✦ Sending...';
  btn.disabled = true;
  if (error) error.style.display = 'none';

  try {
    const data = Object.fromEntries(new FormData(form));

    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      form.style.display    = 'none';
      success.style.display = 'block';
    } else {
      throw new Error('Submission failed');
    }
  } catch (err) {
    btn.textContent = '🙏 Send My Enquiry';
    btn.disabled = false;
    if (error) {
      error.style.display = 'block';
      error.textContent = 'Something went wrong. Please call us directly on +91 7387160790.';
    }
  }
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
