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

  /* -- Scroll Progress Bar & Back to Top ------------------- */
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgress) {
      scrollProgress.style.width = `${scrollPercent}%`;
    }

    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* -- Dynamic Typewriter Effect for Hero Title ------------ */
  const typewriterEl = document.getElementById('typewriter');
  if (typewriterEl) {
    const phrases = [
      'Aspiring Backend & AI Engineer',
      'FastAPI & Python Specialist',
      'Generative AI Explorer',
      'Scalable Systems Enthusiast'
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    const type = () => {
      const currentPhrase = phrases[phraseIdx];

      if (isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 45;
      } else {
        typewriterEl.textContent = currentPhrase.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 90;
      }

      if (!isDeleting && charIdx === currentPhrase.length) {
        typingSpeed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typingSpeed = 400;
      }

      setTimeout(type, typingSpeed);
    };

    setTimeout(type, 800);
  }

  /* -- Mouse Spotlight & Card Micro Tilt ------------------- */
  const cards = document.querySelectorAll(
    '.project-card, .skill-card, .cert-card, .profile-card, .edu-card'
  );

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  /* -- Interactive Resume Modal --------------------------- */
  const resumeModal = document.getElementById('resumeModal');
  const openResumeBtn = document.getElementById('openResumeBtn');
  const floatResumeBtn = document.getElementById('floatResumeBtn');
  const closeResumeBtn = document.getElementById('closeResumeBtn');
  const resumeIframe = document.getElementById('resumeIframe');

  const openModal = () => {
    if (!resumeModal) return;
    if (resumeIframe && !resumeIframe.getAttribute('src')) {
      resumeIframe.setAttribute('src', resumeIframe.getAttribute('data-src') || 'levroxen.pdf');
    }
    resumeModal.classList.add('active');
    resumeModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!resumeModal) return;
    resumeModal.classList.remove('active');
    resumeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openResumeBtn?.addEventListener('click', openModal);
  floatResumeBtn?.addEventListener('click', openModal);
  closeResumeBtn?.addEventListener('click', closeModal);

  resumeModal?.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal?.classList.contains('active')) {
      closeModal();
    }
  });

  /* -- Animated Particle Background Canvas ---------------- */
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 22), 55);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.6 + 0.8;
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateParticles = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.18 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        const mdx = p1.x - mouseX;
        const mdy = p1.y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 160) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(96, 165, 250, ${0.25 * (1 - mdist / 160)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      requestAnimationFrame(animateParticles);
    };

    animateParticles();
  }

});

