// ── NAV SCROLL SHRINK ──
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── STAGGERED CHILDREN REVEAL ──
document.querySelectorAll('.stagger-parent').forEach(parent => {
  const children = parent.querySelectorAll('.stagger-child');
  children.forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.1}s`;
  });
});

// ── ANIMATED COUNTERS ──
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const duration = 1800;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;

    if (Number.isInteger(target)) {
      el.textContent = prefix + Math.round(value).toLocaleString() + suffix;
    } else {
      el.textContent = prefix + value.toFixed(1) + suffix;
    }

    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

// ── PERF BAR ANIMATION ──
const perfObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.perf-fill').forEach(fill => {
        const width = fill.dataset.width || fill.style.width;
        fill.style.width = '0';
        fill.style.transition = 'width 1s ease 0.3s';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => { fill.style.width = width; });
        });
      });
      perfObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.card-float').forEach(el => perfObserver.observe(el));

// ── GALLERY LIGHTBOX ──
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const label = item.querySelector('.gallery-label');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = label ? label.textContent : '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox?.classList.contains('open')) {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ── SMOOTH ANCHOR SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── CURSOR GLOW ──
const glow = document.createElement('div');
glow.id = 'cursor-glow';
glow.style.cssText = `
  position: fixed; pointer-events: none; z-index: 9999;
  width: 300px; height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,92,0,0.06) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: opacity 0.3s;
  opacity: 0;
`;
document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
  glow.style.opacity = '1';
});
document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
