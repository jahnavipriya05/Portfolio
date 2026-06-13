/* ============================================================
   JAHNAVI PRIYA — Portfolio JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* -- Mobile Nav ------------------------------------------ */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  hamburger?.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
  });

  // Close mobile nav on link click
  mobileNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });
  });

  /* -- Active nav link on scroll --------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(s => observer.observe(s));

  /* -- Scroll fade-in for cards/sections ------------------- */
  const fadeEls = document.querySelectorAll(
    '.project-card, .cert-card, .profile-card, .skill-group, .edu-card, .contact-link, .stat-box'
  );

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    fadeObserver.observe(el);
  });

  /* -- Sliders (left/right controls) ----------------------- */
  const sliders = {
    projects: {
      track: document.querySelector('.projects-track'),
      prev: document.querySelector('[data-slider="projects"][data-direction="prev"]'),
      next: document.querySelector('[data-slider="projects"][data-direction="next"]')
    },
    certs: {
      track: document.querySelector('.certs-track'),
      prev: document.querySelector('[data-slider="certs"][data-direction="prev"]'),
      next: document.querySelector('[data-slider="certs"][data-direction="next"]')
    }
  };

  const getVisibleCount = () => (window.innerWidth < 880 ? 1 : 2);

  const setupSlider = (key) => {
    const slider = sliders[key];
    if (!slider.track || !slider.prev || !slider.next) return;

    const cards = Array.from(slider.track.children);
    if (cards.length < 2) {
      slider.prev.disabled = true;
      slider.next.disabled = true;
      return;
    }

    let index = 0;

    const update = () => {
      const visibleCount = Math.max(1, getVisibleCount());
      const maxIndex = Math.max(0, cards.length - visibleCount);
      index = Math.min(index, maxIndex);

      const gap = parseFloat(getComputedStyle(slider.track).columnGap || getComputedStyle(slider.track).gap || '0');
      const cardWidth = cards[0].getBoundingClientRect().width + gap;
      slider.track.style.transform = `translateX(-${index * cardWidth}px)`;
      slider.prev.disabled = index === 0;
      slider.next.disabled = index >= maxIndex;
    };

    slider.prev.addEventListener('click', () => {
      index = Math.max(0, index - 1);
      update();
    });

    slider.next.addEventListener('click', () => {
      const visibleCount = Math.max(1, getVisibleCount());
      const maxIndex = Math.max(0, cards.length - visibleCount);
      index = Math.min(maxIndex, index + 1);
      update();
    });

    update();
    window.addEventListener('resize', update);
  };

  Object.keys(sliders).forEach(setupSlider);

  /* -- Contact form (EmailJS) ----------------------------- */
  const EMAILJS_CONFIG = {
    publicKey: 'pVorqfujg5EBlH_EW',
    serviceId: 'service_k3i51mf',
    templateId: 'template_98y9o3m'
  };

  const contactForm = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');
  const submitBtn = contactForm?.querySelector('button[type="submit"]');

  const showStatus = (message, type) => {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.className = `form-status ${type}`;
  };

  emailjs.init(EMAILJS_CONFIG.publicKey);

  if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const name = document.getElementById('name')?.value?.trim() || 'Guest';
      const email = document.getElementById('email')?.value?.trim() || 'No email provided';
      const message = document.getElementById('project')?.value?.trim() || 'No details provided';

      if (submitBtn) submitBtn.disabled = true;
      showStatus('Sending your message…', '');

      try {
        await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          {
            from_name: name,
            from_email: email,
            message: message
          }
        );

        contactForm.reset();
        showStatus('Message sent successfully. I will get back to you soon.', 'success');
      } catch (error) {
        console.error('EmailJS send failed:', error);
        showStatus('Unable to send message. Please try again later.', 'error');
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  /* -- Year in footer -------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});

