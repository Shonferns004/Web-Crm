// Smooth scroll for all anchor links
document.querySelectorAll('a[href="#"]').forEach(link => {
  link.addEventListener('click', e => e.preventDefault());
});

// Sticky header shadow on scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.style.boxShadow = '0 4px 24px rgba(0,0,0,0.13)';
  } else {
    header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)';
  }
});

// Fade-in cards on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.spotlight-card, .involve-card, .story-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(card);
});

// Newsletter form
const form = document.querySelector('.newsletter-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('input');
    const btn = form.querySelector('button');
    if (input.value.trim()) {
      btn.textContent = 'Subscribed!';
      btn.style.background = '#2e7d32';
      input.value = '';
      setTimeout(() => {
        btn.textContent = 'Sign Up';
        btn.style.background = '';
      }, 3000);
    }
  });
}
