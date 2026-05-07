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
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORMSPREE_ID';

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

// ============================================
//  INTERACTIVE INDIA MAP
// ============================================

const mapData = {
  varanasi: {
    icon: '🕉',
    state: 'Uttar Pradesh',
    name: 'Varanasi (Kashi)',
    desc: 'The eternal city on the banks of the Ganges — where the living pray and the departed attain moksha. Witness the soul-stirring Ganga Aarti at Dashashwamedh Ghat every evening.',
    tags: ['Hindu', 'Ganga Aarti', 'Kashi Vishwanath', 'Moksha City'],
  },
  amritsar: {
    icon: '⭐',
    state: 'Punjab',
    name: 'Golden Temple, Amritsar',
    desc: 'Harmandir Sahib — the holiest Sikh shrine — shimmers in the sacred Amrit Sarovar. Open to all faiths, it also runs the world\'s largest free community kitchen (Langar).',
    tags: ['Sikh', 'Langar', 'Amrit Sarovar', 'Harmandir Sahib'],
  },
  kedarnath: {
    icon: '🏔',
    state: 'Uttarakhand',
    name: 'Kedarnath Temple',
    desc: 'One of the twelve Jyotirlingas, Kedarnath stands at 3,583 m in the Himalayan snow. Part of the Char Dham circuit, this trek is a profound test of body, mind and devotion.',
    tags: ['Shiva', 'Jyotirlinga', 'Char Dham', 'Himalayan Trek'],
  },
  vrindavan: {
    icon: '🪷',
    state: 'Uttar Pradesh',
    name: 'Mathura & Vrindavan',
    desc: 'The sacred birthplace of Lord Krishna and the land of Raas Leela. Vrindavan\'s 5,000 temples, the Yamuna riverbank and Holi celebrations make this an unforgettable pilgrimage.',
    tags: ['Krishna', 'Raas Leela', 'Yamuna', 'Holi'],
  },
  ujjain: {
    icon: '🔱',
    state: 'Madhya Pradesh',
    name: 'Mahakaleshwar, Ujjain',
    desc: 'The only south-facing (Dakshina-mukhi) Jyotirlinga, Mahakaleshwar in ancient Ujjain draws devotees for the legendary pre-dawn Bhasma Aarti — a ritual like no other on earth.',
    tags: ['Shiva', 'Jyotirlinga', 'Bhasma Aarti', 'Kshipra Ghat'],
  },
  udaipur: {
    icon: '🏰',
    state: 'Rajasthan',
    name: 'Udaipur & Nathdwara',
    desc: 'The City of Lakes meets divine devotion. Visit the magnificent City Palace and then seek blessings at Nathdwara — home to Shrinathji, a beloved form of Lord Krishna.',
    tags: ['Krishna', 'Shrinathji', 'City Palace', 'Heritage'],
  },
  tirupati: {
    icon: '🛕',
    state: 'Andhra Pradesh',
    name: 'Tirupati Balaji',
    desc: 'The Venkateswara Temple atop Tirumala hills is among the most visited sacred sites on earth, welcoming over 50,000 devotees daily with unwavering faith and devotion.',
    tags: ['Vishnu', 'Tirumala Hills', 'Prasadam', 'Laddu'],
  },
  rameshwaram: {
    icon: '🌊',
    state: 'Tamil Nadu',
    name: 'Rameshwaram',
    desc: 'Where Lord Rama worshipped Shiva before the battle of Lanka. The Ramanathaswamy Temple\'s magnificent 1.2 km corridor and 22 sacred teerthams make this the Varanasi of the South.',
    tags: ['Shiva', 'Char Dham', 'Agni Teertham', 'Ramayana'],
  },
};

// DOM refs
const markers    = document.querySelectorAll('.map-marker');
const mapDefault = document.getElementById('mapDefault');
const mapDetail  = document.getElementById('mapDetail');

function showMapDetail(id) {
  const d = mapData[id];
  if (!d) return;

  // Populate
  document.getElementById('mpdIcon').textContent  = d.icon;
  document.getElementById('mpdState').textContent = d.state;
  document.getElementById('mpdName').textContent  = d.name;
  document.getElementById('mpdDesc').textContent  = d.desc;

  const tagsEl = document.getElementById('mpdTags');
  tagsEl.innerHTML = d.tags.map(t => `<span>${t}</span>`).join('');

  // Toggle visibility
  mapDefault.style.display = 'none';
  mapDetail.style.display  = 'block';
  // Re-trigger animation
  mapDetail.style.animation = 'none';
  mapDetail.offsetHeight; // reflow
  mapDetail.style.animation = 'fadeUp 0.4s ease both';
}

if (markers.length) {
  markers.forEach(marker => {
    // Click
    marker.addEventListener('click', () => {
      markers.forEach(m => m.classList.remove('active'));
      marker.classList.add('active');
      showMapDetail(marker.dataset.id);
    });

    // Keyboard (Enter / Space)
    marker.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        marker.click();
      }
    });
  });

  // Auto-highlight first marker after 1.5s so visitors know it's interactive
  setTimeout(() => {
    if (!document.querySelector('.map-marker.active')) {
      const first = markers[0];
      first.classList.add('active');
      showMapDetail(first.dataset.id);
    }
  }, 1500);
}
