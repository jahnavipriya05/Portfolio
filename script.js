// CURSOR
  const cursor = document.getElementById('cursor');
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx+'px'; dot.style.top = my+'px'; });
  function animRing() {
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    ring.style.left = rx+'px'; ring.style.top = ry+'px';
    requestAnimationFrame(animRing);
  }
  animRing();
  document.querySelectorAll('a, button, .skill-card, .project-card, .cert-card').forEach(el => {
    el.addEventListener('mouseenter', () => { ring.style.width='50px'; ring.style.height='50px'; ring.style.borderColor='rgba(232,148,58,0.8)'; });
    el.addEventListener('mouseleave', () => { ring.style.width='32px'; ring.style.height='32px'; ring.style.borderColor='rgba(232,148,58,0.4)'; });
  });

  // NAVBAR SCROLL
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 50); });

  // SCROLL REVEAL
  const reveals = document.querySelectorAll('.reveal, .reveal-left');
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => obs.observe(el));

  // HERO TITLE ANIMATE
  const lines = document.querySelectorAll('.hero-title .line');
  lines.forEach((l, i) => {
    l.style.opacity = '0'; l.style.transform = 'translateY(40px)';
    l.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    l.style.transitionDelay = (0.2 + i * 0.15)+'s';
    setTimeout(() => { l.style.opacity = '1'; l.style.transform = 'translateY(0)'; }, 100);
  });

  // BADGE ANIMATE
  const badge = document.querySelector('.hero-badge');
  if (badge) {
    badge.style.opacity='0'; badge.style.transform='translateY(20px)';
    badge.style.transition='opacity 0.6s ease, transform 0.6s ease';
    setTimeout(() => { badge.style.opacity='1'; badge.style.transform='translateY(0)'; }, 100);
  }

  // COUNTER ANIMATE
  function animateNum(el, target, decimals=0) {
    let start = 0; const duration = 1500;
    const step = timestamp => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = (target * ease).toFixed(decimals);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  const statObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const nums = e.target.querySelectorAll('.stat-num');
        nums.forEach(n => {
          const txt = n.textContent.replace(/[^0-9.]/g,'');
          const suffix = n.textContent.replace(/[0-9.]/g,'');
          const val = parseFloat(txt);
          const decimals = txt.includes('.') ? 1 : 0;
          animateNum(n, val, decimals);
          if (suffix) setTimeout(() => n.textContent += suffix, 1500);
        });
        statObs.disconnect();
      }
    });
  }, { threshold: 0.5 });
  const statsEl = document.querySelector('.hero-stats');
  if (statsEl) statObs.observe(statsEl);

  // HAMBURGER (mobile)
  document.getElementById('hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').style.display === 'flex'
      ? document.querySelector('.nav-links').style.display = 'none'
      : Object.assign(document.querySelector('.nav-links').style, {display:'flex',flexDirection:'column',position:'fixed',top:'60px',left:'0',right:'0',background:'rgba(8,8,8,0.98)',padding:'24px',gap:'24px',borderBottom:'1px solid rgba(255,255,255,0.08)'});
  });

  const projectsScroll =
document.getElementById("projectsScroll");

const slideLeft =
document.getElementById("slideLeft");

const slideRight =
document.getElementById("slideRight");

slideLeft.addEventListener("click", () => {

  projectsScroll.scrollBy({
    left: -450,
    behavior: "smooth"
  });

});

slideRight.addEventListener("click", () => {

  projectsScroll.scrollBy({
    left: 450,
    behavior: "smooth"
  });

});