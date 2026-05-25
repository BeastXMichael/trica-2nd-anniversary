/* ===================================================
   SETUP
=================================================== */
gsap.registerPlugin(ScrollTrigger);

let lenis;
try {
  lenis = new Lenis({ lerp: 0.06 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
} catch (e) { /* native scroll fallback */ }

/* ===================================================
   AUDIO PLAYER
=================================================== */
const SONGS = [
  { title: 'Menarilah - NDC Worship',   src: 'Songs/Song 1 - NDC Worship - Menarilah (Live).mp3' },
  { title: 'Confidence - Sanctus Real', src: 'Songs/Song 2 - Sanctus Real - Confidence lyrics video.mp3' },
  { title: 'Kau 1, 2, 3... - GMS Live', src: 'Songs/Song 3 - Kau 1, 2, 3... (Live Recording) - GMS Live (Official Video).mp3' },
  { title: 'Seribu Rasa - GMS Live',    src: 'Songs/Song 4 - GMS Live - Seribu Rasa (Official GMS LIve).mp3' },
];

const audio     = document.getElementById('bg-audio');
const btnPlay   = document.getElementById('btn-play');
const btnPrev   = document.getElementById('btn-prev');
const btnNext   = document.getElementById('btn-next');
const btnMute   = document.getElementById('btn-mute');
const songTitle = document.getElementById('song-title');
const progress  = document.getElementById('audio-progress');
const timeCur   = document.getElementById('time-current');
const timeTot   = document.getElementById('time-total');
const iconPlay  = document.getElementById('icon-play');
const iconPause = document.getElementById('icon-pause');
const iconUnmuted = document.getElementById('icon-unmuted');
const iconMuted   = document.getElementById('icon-muted');

let currentTrack = 0;
let isPlaying    = false;
let isMuted      = false;

function fmt(s) {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec < 10 ? '0' : ''}${sec}`;
}

function loadTrack(idx, autoPlay) {
  currentTrack = ((idx % SONGS.length) + SONGS.length) % SONGS.length;
  audio.src    = SONGS[currentTrack].src;
  songTitle.textContent = SONGS[currentTrack].title;
  progress.value = 0;
  timeCur.textContent = '0:00';
  timeTot.textContent = '0:00';
  if (autoPlay) audio.play().catch(() => {});
}

function setPlaying(on) {
  isPlaying = on;
  iconPlay.style.display  = on ? 'none'  : 'block';
  iconPause.style.display = on ? 'block' : 'none';
}

function setMuted(on) {
  isMuted = on;
  audio.muted = on;
  iconUnmuted.style.display = on ? 'none'  : 'block';
  iconMuted.style.display   = on ? 'block' : 'none';
}

btnPlay.addEventListener('click', () => {
  if (isPlaying) { audio.pause(); setPlaying(false); }
  else           { audio.play().then(() => setPlaying(true)).catch(() => {}); }
});

btnPrev.addEventListener('click', () => loadTrack(currentTrack - 1, isPlaying));
btnNext.addEventListener('click', () => loadTrack(currentTrack + 1, isPlaying));
btnMute.addEventListener('click', () => setMuted(!isMuted));

audio.addEventListener('ended', () => { loadTrack(currentTrack + 1, true); setPlaying(true); });
audio.addEventListener('loadedmetadata', () => { timeTot.textContent = fmt(audio.duration); });
audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;
  progress.value = (audio.currentTime / audio.duration) * 100;
  timeCur.textContent = fmt(audio.currentTime);
  timeTot.textContent = fmt(audio.duration);
});
progress.addEventListener('input', () => {
  if (audio.duration) audio.currentTime = (progress.value / 100) * audio.duration;
});

songTitle.textContent = SONGS[0].title;

/* ===================================================
   INTRO OVERLAY
=================================================== */
const overlay = document.getElementById('intro-overlay');
let overlayDismissed = false;

function dismissOverlay() {
  if (overlayDismissed) return;
  overlayDismissed = true;

  loadTrack(0, false);
  audio.volume = 0.55;
  audio.play().then(() => setPlaying(true)).catch(() => {});

  gsap.to(overlay, {
    opacity: 0,
    duration: 1.2,
    ease: 'power2.inOut',
    onComplete() {
      overlay.remove();
      initHero();
    }
  });
}

overlay.addEventListener('click', dismissOverlay);
overlay.addEventListener('touchstart', dismissOverlay, { passive: true });

/* ===================================================
   HERO (fires after overlay dismiss)
=================================================== */
function initHero() {
  const hl1      = document.getElementById('hl-1');
  const hl2      = document.getElementById('hl-2');
  const since    = document.getElementById('hero-since');
  const counter  = document.getElementById('hero-counter');
  const dayCount = document.getElementById('day-count');
  const hint     = document.getElementById('hero-scroll-hint');
  const heroBg   = document.querySelector('.hero-bg');

  if (!hl1 || !hl2) return;

  const start = Date.UTC(2024, 4, 16); // May 16 2024 — UTC for cross-timezone consistency
  const days  = Math.floor((Date.now() - start) / 86400000);

  gsap.set([hl1, hl2], { yPercent: 110, opacity: 1 });
  gsap.set([since, counter, hint], { opacity: 0 });
  gsap.set(since,   { y: 18 });
  gsap.set(counter, { y: 22 });

  const counterObj = { val: 0 };
  const tl = gsap.timeline({ delay: 0.1 });

  tl
    .to(since,   { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' }, 0)
    .to(hl1,     { yPercent: 0, duration: 1.25, ease: 'power3.out' }, 0.22)
    .to(hl2,     { yPercent: 0, duration: 1.25, ease: 'power3.out' }, 0.38)
    .to(hl2,     { color: '#D4A0B0', duration: 0.9, ease: 'power1.inOut' }, 1.32)
    .to(counter, { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' }, 1.48)
    .to(counterObj, {
        val: days,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate() { dayCount.textContent = Math.round(counterObj.val); }
      }, 1.68)
    .to(hint, { opacity: 1, duration: 0.8, ease: 'power1.inOut' }, 2.35);

  if (heroBg) {
    gsap.to(heroBg, {
      yPercent: 22,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  initScrollAnimations();
}

/* ===================================================
   SCROLL ANIMATIONS
=================================================== */
function initScrollAnimations() {
  initWordReveals();
  initPhotoReveals();
  initProseReveals();
  initFlashes();
  initJourney();
  initLetterReveal();
  initClosingPhoto();
  initFavoriteBurst();
  initChibiSprites();
}

/* Word-by-word heading reveals */
function initWordReveals() {
  document.querySelectorAll('.js-word-reveal').forEach(el => {
    const text = el.textContent.trim();
    const words = text.split(' ');
    el.innerHTML = words.map(w =>
      `<span class="word"><span class="word-inner">${w}</span></span>`
    ).join(' ');

    gsap.to(el.querySelectorAll('.word-inner'), {
      y: 0,
      duration: 1.1,
      ease: 'power3.out',
      stagger: 0.06,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });
}

/* Clip-path photo reveals + polaroid frame entrance */
function initPhotoReveals() {
  document.querySelectorAll('.photo-reveal').forEach(el => {
    const wrapper = el.closest('.js-polaroid') || el;
    const rot = wrapper !== el
      ? (parseFloat(wrapper.style.getPropertyValue('--rot')) || 0)
      : 0;
    const trig = { trigger: wrapper, start: 'top 88%', toggleActions: 'play none none none' };

    if (wrapper !== el) {
      gsap.fromTo(wrapper,
        { y: 52, rotation: rot + 8, opacity: 0 },
        {
          y: 0, rotation: rot, opacity: 1,
          duration: 1.15, ease: 'expo.out',
          onComplete: () => gsap.set(wrapper, { clearProps: 'transform,opacity' }),
          scrollTrigger: trig
        }
      );
    }

    gsap.to(el, {
      clipPath: 'inset(0% 0 0 0)',
      duration: 1.2,
      delay: wrapper !== el ? 0.1 : 0,
      ease: 'expo.out',
      scrollTrigger: trig
    });

    const img = el.querySelector('img');
    if (img) {
      gsap.fromTo(img,
        { scale: 1.1 },
        { scale: 1, duration: 1.8, ease: 'power2.out', scrollTrigger: trig }
      );
    }
  });
}

/* Prose fade reveals */
function initProseReveals() {
  document.querySelectorAll('.js-fade-prose').forEach(el => {
    const paras = el.querySelectorAll('p');
    if (!paras.length) {
      gsap.from(el, {
        opacity: 0, y: 28, duration: 1, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
      });
      return;
    }
    paras.forEach((p, i) => {
      gsap.from(p, {
        opacity: 0, y: 28,
        duration: 1, ease: 'power2.out',
        delay: i * 0.12,
        scrollTrigger: { trigger: p, start: 'top 90%', toggleActions: 'play none none none' }
      });
    });
  });
}

/* ===================================================
   JOURNEY — HORIZONTAL PIN
=================================================== */
function initJourney() {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile) return;

  const wrapper = document.getElementById('journey-pin-wrapper');
  const track   = document.getElementById('journey-track');
  const slides  = track.querySelectorAll('.journey-slide');
  const N       = slides.length;

  wrapper.style.height = `${N * 100}vh`;

  const totalShift = (N - 1) * 100;

  gsap.to(track, {
    x: () => `-${totalShift}vw`,
    ease: 'none',
    scrollTrigger: {
      trigger: wrapper,
      start: 'top top',
      end: () => `+=${(N - 1) * window.innerHeight}`,
      scrub: 1,
      pin: '.journey-sticky',
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });

  /* 3D tilt on desktop */
  slides.forEach(slide => {
    const photo = slide.querySelector('.journey-slide-photo');
    if (!photo) return;
    slide.addEventListener('mousemove', e => {
      const r  = slide.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      const rx = ((e.clientY - cy) / (r.height / 2)) * -6;
      const ry = ((e.clientX - cx) / (r.width  / 2)) *  6;
      gsap.to(slide, {
        rotateX: rx, rotateY: ry,
        transformPerspective: 900,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
    slide.addEventListener('mouseleave', () => {
      gsap.to(slide, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'power2.out' });
    });
  });
}

/* ===================================================
   HEARTS SHOWER
=================================================== */
function fireHeartsShower() {
  if (window._heartsFired) return;
  window._heartsFired = true;

  const HEART = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="#D4A0B0" d="M10,30 A20,20,0,0,1,50,30 A20,20,0,0,1,90,30 Q90,60,50,90 Q10,60,10,30 z"/></svg>`;

  for (let i = 0; i < 10; i++) {
    const div = document.createElement('div');
    div.innerHTML = HEART;
    const size = 14 + Math.random() * 14;
    const dur  = 6  + Math.random() * 5;
    const del  = Math.random() * 2.5;
    div.style.cssText = `position:fixed;bottom:-40px;left:${5 + Math.random() * 90}%;`
      + `width:${size}px;pointer-events:none;z-index:9999;`;
    document.body.appendChild(div);

    gsap.timeline({ delay: del, onComplete: () => div.remove() })
      .fromTo(div, { opacity: 0 }, { opacity: 0.82, duration: 0.5, ease: 'power1.out' })
      .to(div, { y: -(window.innerHeight + 90), duration: dur, ease: 'power1.out' }, 0)
      .to(div, { opacity: 0, duration: 1.4, ease: 'power1.in' }, dur - 1.5);
  }
}

/* ===================================================
   FLASHES — PINNED SCRUB + HEART PARTICLES
=================================================== */
function initFlashes() {
  const section = document.getElementById('flashes');
  if (!section) return;

  const photos  = Array.from(section.querySelectorAll('#flashes-photos img'));
  const titleEl = section.querySelector('.flashes-title p');
  const canvas  = document.getElementById('flashes-canvas');
  const n       = photos.length;
  if (!n) return;

  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  // Pre-decode the first batch so they are GPU-ready before the section pins
  photos.slice(0, 10).forEach(img => { if (img.decode) img.decode().catch(() => {}); });

  // Photo 0 starts visible -- prevents the black-background flash on entry
  gsap.set(photos[0], { opacity: 1 });

  /* --------------------------------------------------
     GSAP Scrub Timeline
  -------------------------------------------------- */
  const tl = gsap.timeline({ defaults: { ease: 'none' } });

  // Title: visible at start, fade out after ~8 photos
  tl.fromTo(titleEl, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0);
  tl.to(titleEl, { opacity: 0, duration: 1.5 }, 7);

  // Each photo occupies 1 timeline unit
  photos.forEach((img, i) => {
    if (i === 0) {
      // Photo 0 is already visible; only define its scale and crossfade-out
      tl.fromTo(img, { scale: 1 }, { scale: 1.05, duration: 1 }, 0);
      tl.to(img, { opacity: 0, duration: 0.22 }, 0.78);
    } else {
      tl.fromTo(img, { opacity: 0 }, { opacity: 1, duration: 0.22 }, i);
      tl.fromTo(img, { scale: 1 }, { scale: 1.05, duration: 1 }, i);
      if (i < n - 1) {
        tl.to(img, { opacity: 0, duration: 0.22 }, i + 0.78);
      }
    }
  });

  // Extra hold on last photo before unpin
  tl.to({}, { duration: 1 });

  // 50px of scroll per photo; extra 1-unit hold adds 50px more
  const scrollDist = (n + 1) * 50;

  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: `+=${scrollDist}`,
    pin: true,
    scrub: 0.5,
    animation: tl,
    anticipatePin: 1,
    invalidateOnRefresh: true,
  });

  /* --------------------------------------------------
     Progressive image preloading as scrub advances
  -------------------------------------------------- */
  const AHEAD = 4;
  const preloaded = new Set([0, 1, 2, 3, 4]); // first 5 already eager

  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: `+=${scrollDist}`,
    onUpdate(self) {
      const cur = Math.floor(self.progress * n);
      for (let j = cur; j <= Math.min(cur + AHEAD, n - 1); j++) {
        if (!preloaded.has(j)) {
          preloaded.add(j);
          photos[j].setAttribute('loading', 'eager');
          // Kick off load by reassigning src
          const s = photos[j].src;
          if (!photos[j].complete) { photos[j].src = ''; photos[j].src = s; }
        }
      }
    }
  });

  /* --------------------------------------------------
     Heart Particle Canvas
  -------------------------------------------------- */
  if (!canvas) return;

  const GOLD = 'rgba(201,168,106,0.58)';
  const ROSE = 'rgba(212,160,176,0.58)';
  const COUNT = isMobile ? 12 : 30;
  const FADE_ZONE = 90;

  let ctx, w, h, particles = [], rafId = null, active = false;

  function resize() {
    w = canvas.width  = canvas.clientWidth  || window.innerWidth;
    h = canvas.height = canvas.clientHeight || window.innerHeight;
  }

  function heartPath(cx, cy, size) {
    const r = size * 0.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy + r * 0.35);
    ctx.bezierCurveTo(cx - r * 0.55, cy - r * 0.25, cx - r * 1.5, cy - r * 0.85, cx, cy - r * 1.1);
    ctx.bezierCurveTo(cx + r * 1.5, cy - r * 0.85, cx + r * 0.55, cy - r * 0.25, cx, cy + r * 0.35);
    ctx.closePath();
  }

  function spawnParticle(spreadY) {
    return {
      x: Math.random() * w,
      y: spreadY !== undefined ? spreadY : h + 20,
      size: 10 + Math.random() * 9,
      vy: 0.45 + Math.random() * 0.85,
      swayAmp: 0.25 + Math.random() * 0.5,
      swayFreq: 0.018 + Math.random() * 0.022,
      phase: Math.random() * Math.PI * 2,
      t: 0,
      color: Math.random() < 0.5 ? GOLD : ROSE,
    };
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < COUNT; i++) {
      particles.push(spawnParticle(Math.random() * h));
    }
  }

  function tick() {
    if (!active) { rafId = null; return; }
    rafId = requestAnimationFrame(tick);

    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.y -= p.vy;
      p.x += Math.sin(p.t * p.swayFreq * 80 + p.phase) * p.swayAmp;
      p.t++;

      if (p.y < -p.size) {
        particles[i] = spawnParticle();
        continue;
      }

      const fadeIn  = Math.min(1, (h - p.y) / FADE_ZONE);
      const fadeOut = Math.min(1, p.y / FADE_ZONE);
      const alpha   = Math.min(fadeIn, fadeOut);
      if (alpha <= 0) continue;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle   = p.color;
      heartPath(p.x, p.y, p.size);
      ctx.fill();
      ctx.restore();
    }
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      active = e.isIntersecting;
      if (active && !rafId) rafId = requestAnimationFrame(tick);
    });
  }, { threshold: 0.01 });

  ctx = canvas.getContext('2d');
  resize();
  initParticles();
  observer.observe(section);

  window.addEventListener('resize', () => { resize(); initParticles(); });
}

/* ===================================================
   LETTER PARAGRAPH REVEALS
=================================================== */
function initLetterReveal() {
  const letterBody = document.getElementById('letter-body');
  if (!letterBody) return;

  const paras = letterBody.querySelectorAll('p');
  paras.forEach(p => {
    gsap.fromTo(p,
      { opacity: 0, y: 35 },
      {
        opacity: 1, y: 0,
        duration: 1.2, ease: 'power2.out',
        scrollTrigger: { trigger: p, start: 'top 85%', toggleActions: 'play none none none' }
      }
    );
  });

  const sig      = document.querySelector('.letter-signature');
  if (!sig) return;
  const sigClose = sig.querySelector('.sig-close');
  const sigName  = sig.querySelector('.js-sig-reveal');

  if (sigClose) {
    gsap.from(sigClose, {
      opacity: 0, y: 14,
      duration: 0.9, ease: 'power2.out',
      scrollTrigger: { trigger: sig, start: 'top 90%', toggleActions: 'play none none none' }
    });
  }

  if (sigName) {
    gsap.fromTo(sigName,
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 2.2, ease: 'power2.inOut',
        delay: 0.45,
        scrollTrigger: {
          trigger: sig,
          start: 'top 90%',
          toggleActions: 'play none none none',
          onEnter: () => setTimeout(fireHeartsShower, 700)
        }
      }
    );
  }
}

/* ===================================================
   CLOSING PHOTO
=================================================== */
function initClosingPhoto() {
  const imgs = document.querySelectorAll('.closing-photo img');
  if (!imgs.length) return;

  imgs.forEach((img, i) => {
    gsap.fromTo(img,
      { opacity: 0, scale: 1.08 },
      {
        opacity: 1, scale: 1,
        duration: 2.2, ease: 'power2.out',
        delay: i * 0.25,
        scrollTrigger: { trigger: '#closing', start: 'top 75%', toggleActions: 'play none none none' }
      }
    );
  });
}

/* ===================================================
   CUSTOM CURSOR
=================================================== */
(function initCursor() {
  if (window.matchMedia('(hover: none)').matches) return;

  const ring = document.getElementById('cursor-ring');
  const dot  = document.getElementById('cursor-dot');
  if (!ring || !dot) return;

  let mx = -100, my = -100;
  let rx = -100, ry = -100;

  window.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    gsap.to(dot, { x: mx, y: my, duration: 0, overwrite: true });
  });

  gsap.ticker.add(() => {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    gsap.set(ring, { x: rx, y: ry });
  });

  const hoverEls = document.querySelectorAll('a, button, .photo-reveal, .journey-slide');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
})();

/* Section backgrounds handled by CSS (body bg-breathe animation + per-section CSS) */

/* ===================================================
   AMBIENT FLOATING PARTICLES (global, always running)
=================================================== */
(function initAmbientParticles() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const COUNT = isMobile ? 14 : 32;
  let w, h, particles = [];

  function resize() {
    w = canvas.width  = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function heartPath(cx, cy, s) {
    const r = s * 0.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy + r * 0.35);
    ctx.bezierCurveTo(cx - r*0.55, cy - r*0.25, cx - r*1.5, cy - r*0.85, cx, cy - r*1.1);
    ctx.bezierCurveTo(cx + r*1.5, cy - r*0.85, cx + r*0.55, cy - r*0.25, cx, cy + r*0.35);
    ctx.closePath();
  }

  function spawn(initialY) {
    return {
      x:        Math.random() * w,
      y:        initialY !== undefined ? initialY : h + 16,
      size:     3.5 + Math.random() * 5.5,
      vy:       0.18 + Math.random() * 0.32,
      swayAmp:  0.2  + Math.random() * 0.5,
      swayFreq: 0.01 + Math.random() * 0.016,
      phase:    Math.random() * Math.PI * 2,
      t:        0,
      isHeart:  Math.random() < 0.4,
      isGold:   Math.random() < 0.5,
      maxAlpha: 0.14 + Math.random() * 0.12
    };
  }

  function init() {
    particles = [];
    for (let i = 0; i < COUNT; i++) particles.push(spawn(Math.random() * h));
  }

  function tick() {
    requestAnimationFrame(tick);
    if (document.hidden) return;
    ctx.clearRect(0, 0, w, h);
    const FADE = h * 0.09;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.y  -= p.vy;
      p.x  += Math.sin(p.t * p.swayFreq * 80 + p.phase) * p.swayAmp;
      p.t++;
      if (p.y < -16) { particles[i] = spawn(); continue; }
      const fi = Math.min(1, (h - p.y) / FADE);
      const fo = Math.min(1, p.y / FADE);
      const alpha = Math.min(fi, fo) * p.maxAlpha;
      if (alpha <= 0) continue;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.isGold ? '#C9A86A' : '#D4A0B0';
      if (p.isHeart) { heartPath(p.x, p.y, p.size); }
      else           { ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 0.42, 0, Math.PI * 2); }
      ctx.fill();
      ctx.restore();
    }
  }

  resize();
  init();
  requestAnimationFrame(tick);
  window.addEventListener('resize', () => { resize(); init(); });
})();

/* ===================================================
   FAVORITE SECTION — PETAL BURST ON SCROLL ENTRY
=================================================== */
function initFavoriteBurst() {
  const section = document.getElementById('favorite');
  if (!section) return;

  const HEART = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="#D4A0B0" d="M10,30 A20,20,0,0,1,50,30 A20,20,0,0,1,90,30 Q90,60,50,90 Q10,60,10,30 z"/></svg>`;
  const STAR  = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><path fill="#C9A86A" d="M14,1 L15.3,11.5 L26,14 L15.3,16.5 L14,27 L12.7,16.5 L2,14 L12.7,11.5 Z"/></svg>`;

  let fired = false;
  ScrollTrigger.create({
    trigger: section,
    start: 'top 72%',
    onEnter() {
      if (fired) return;
      fired = true;
      for (let i = 0; i < 14; i++) {
        const div = document.createElement('div');
        div.innerHTML = Math.random() < 0.55 ? HEART : STAR;
        const size = 9 + Math.random() * 12;
        const dur  = 5 + Math.random() * 4;
        const del  = Math.random() * 1.8;
        const startX = 10 + Math.random() * 80;
        div.style.cssText = `position:fixed;bottom:-30px;left:${startX}%;`
          + `width:${size}px;pointer-events:none;z-index:9999;opacity:0;`;
        document.body.appendChild(div);
        gsap.timeline({ delay: del, onComplete: () => div.remove() })
          .to(div, { opacity: 0.75, duration: 0.4, ease: 'power1.out' })
          .to(div, { y: -(window.innerHeight * 0.65 + Math.random() * window.innerHeight * 0.2), x: (Math.random() - 0.5) * 120, rotate: (Math.random() - 0.5) * 360, duration: dur, ease: 'power1.out' }, 0)
          .to(div, { opacity: 0, duration: 1.2, ease: 'power1.in' }, dur - 1.3);
      }
    }
  });
}

/* ===================================================
   CHIBI SPRITES
=================================================== */
function initChibiSprites() {
  const BASE = 'Assets/Animations_transparent/';

  document.querySelectorAll('.chibi-sprite').forEach(el => {
    const anim  = el.dataset.anim;
    const count = parseInt(el.dataset.frames, 10);
    const hold  = parseInt(el.dataset.fps  || '1400', 10);
    const fade  = parseInt(el.dataset.fade || '280',  10);

    // Two stacked layers - A/B double buffer so src never changes on a visible frame
    const layerBot = document.createElement('img');
    const layerTop = document.createElement('img');
    [layerBot, layerTop].forEach(img => {
      img.alt = '';
      img.style.cssText =
        'position:absolute;inset:0;width:100%;height:100%;' +
        'object-fit:contain;display:block;' +
        'transition:opacity ' + fade + 'ms ease-in-out;';
    });
    layerBot.style.opacity = '0';
    layerTop.style.opacity = '0';
    el.appendChild(layerBot);
    el.appendChild(layerTop);

    // bot = currently visible layer, top = staging layer
    let bot   = layerBot;
    let top   = layerTop;
    let cur   = 0;
    let timer = null;
    let ready = false;
    const srcs = [];

    // Preload every frame before starting
    let loaded = 0;
    for (let i = 0; i < count; i++) {
      srcs.push(BASE + encodeURIComponent(anim) + '/' + (i + 1) + '.png');
      const img = new Image();
      img.onload = () => {
        loaded++;
        if (loaded === count) {
          ready = true;
          // Show first frame on bot immediately, no transition
          bot.style.transition = 'none';
          bot.src = srcs[0];
          bot.style.opacity = '1';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              bot.style.transition = 'opacity ' + fade + 'ms ease-in-out';
              if (visible) schedule();
            });
          });
        }
      };
      img.src = srcs[i];
    }

    function advance() {
      cur = (cur + 1) % count;
      // Stage next frame on the hidden layer (already in browser cache, no pop)
      top.src = srcs[cur];
      top.style.opacity = '1';
      bot.style.opacity = '0';
      // Swap roles
      const tmp = top; top = bot; bot = tmp;
      schedule();
    }

    function schedule() { timer = setTimeout(advance, hold); }

    function pause() { clearTimeout(timer); timer = null; }

    let visible = false;
    const io = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (visible && ready && timer === null) schedule();
      if (!visible) pause();
    }, { threshold: 0.1 });

    io.observe(el);
  });
}
