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
  initJourney();
  initLetterReveal();
  initClosingPhoto();
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
        { y: 52, rotation: rot + 8 },
        { y: 0, rotation: rot, duration: 1.15, ease: 'expo.out', scrollTrigger: trig }
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
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: p,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  /* Signature */
  const sig = document.querySelector('.letter-signature');
  if (sig) {
    gsap.from(sig, {
      opacity: 0, y: 24,
      duration: 1.1, ease: 'power2.out',
      scrollTrigger: { trigger: sig, start: 'top 88%', toggleActions: 'play none none none' }
    });
  }
}

/* ===================================================
   CLOSING PHOTO
=================================================== */
function initClosingPhoto() {
  const closing = document.querySelector('.closing-photo img');
  if (!closing) return;
  gsap.to(closing, {
    scale: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#closing',
      start: 'top 80%',
      end: 'top top',
      scrub: true
    }
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
