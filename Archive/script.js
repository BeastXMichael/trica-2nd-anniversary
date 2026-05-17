// Day counter
const start = new Date('2024-05-16T00:00:00');
const days = Math.floor((new Date() - start) / 86400000);
document.getElementById('day-count').textContent = days;

// Photo data
const PHOTO_DATA = [
  { year: 2024, months: [
    { month: 'January',   photos: ['Photos/2024/01. January/IMG_0142.jpeg'] },
    { month: 'February',  photos: ['Photos/2024/02. February/IMG_0328.jpeg','Photos/2024/02. February/IMG_0553.jpeg','Photos/2024/02. February/IMG_1091.jpeg','Photos/2024/02. February/IMG_1185.jpeg'] },
    { month: 'March',     photos: ['Photos/2024/03. March/IMG_1571.jpeg','Photos/2024/03. March/IMG_2038.jpeg','Photos/2024/03. March/IMG_3057.jpeg'] },
    { month: 'April',     photos: ['Photos/2024/04. April/IMG_2746.jpeg','Photos/2024/04. April/IMG_2810.jpeg','Photos/2024/04. April/IMG_2988.jpeg','Photos/2024/04. April/IMG_3018.jpeg','Photos/2024/04. April/IMG_3027.jpeg','Photos/2024/04. April/IMG_3155.jpeg'] },
    { month: 'May',       photos: ['Photos/2024/05. May/IMG_3725.jpeg','Photos/2024/05. May/IMG_3852.jpeg','Photos/2024/05. May/IMG_4625.jpeg','Photos/2024/05. May/IMG_5007.jpeg'] },
    { month: 'June',      photos: ['Photos/2024/06. June/IMG_5700.jpeg','Photos/2024/06. June/IMG_6465.jpeg'] },
    { month: 'July',      photos: ['Photos/2024/07. July/IMG_7787.jpeg'] },
    { month: 'August',    photos: ['Photos/2024/08. August/IMG_8423.jpeg','Photos/2024/08. August/IMG_8429.jpeg'] },
    { month: 'September', photos: ['Photos/2024/09. September/IMG_8564.jpeg','Photos/2024/09. September/IMG_8568.jpeg','Photos/2024/09. September/IMG_8597.jpeg','Photos/2024/09. September/IMG_8660.jpeg'] },
    { month: 'October',   photos: ['Photos/2024/10. October/IMG_8974.jpeg','Photos/2024/10. October/IMG_9014.jpeg','Photos/2024/10. October/IMG_9152.jpeg','Photos/2024/10. October/IMG_9184.jpeg'] },
    { month: 'November',  photos: ['Photos/2024/11. November/IMG_9291.jpeg','Photos/2024/11. November/IMG_9410.jpeg','Photos/2024/11. November/IMG_9795.jpeg'] },
    { month: 'December',  photos: ['Photos/2024/12. December/IMG_0170.jpeg','Photos/2024/12. December/IMG_0176.jpeg','Photos/2024/12. December/IMG_0192.jpeg'] },
  ]},
  { year: 2025, months: [
    { month: 'January',   photos: ['Photos/2025/01. January/IMG_2012.jpeg'] },
    { month: 'February',  photos: ['Photos/2025/02. February/IMG_2233.jpeg','Photos/2025/02. February/IMG_2370.jpeg','Photos/2025/02. February/IMG_2517.jpeg','Photos/2025/02. February/IMG_2723.jpeg'] },
    { month: 'March',     photos: ['Photos/2025/03. March/IMG_2883.jpeg','Photos/2025/03. March/IMG_2955.jpeg','Photos/2025/03. March/IMG_2991.jpeg','Photos/2025/03. March/IMG_3050.jpeg','Photos/2025/03. March/IMG_3062.jpeg','Photos/2025/03. March/IMG_3374.jpeg','Photos/2025/03. March/IMG_3378.jpeg','Photos/2025/03. March/IMG_3432.jpeg','Photos/2025/03. March/IMG_3605.jpeg'] },
    { month: 'April',     photos: ['Photos/2025/04. April/IMG_3723.jpeg','Photos/2025/04. April/IMG_3914.jpeg','Photos/2025/04. April/IMG_4050.jpeg','Photos/2025/04. April/IMG_4309.jpeg'] },
    { month: 'May',       photos: ['Photos/2025/05. May/IMG_4394.jpeg','Photos/2025/05. May/IMG_4672.jpeg'] },
    { month: 'June',      photos: ['Photos/2025/06. June/IMG_4759.jpeg','Photos/2025/06. June/IMG_4860.jpeg','Photos/2025/06. June/IMG_4917.jpeg','Photos/2025/06. June/IMG_5012.jpeg','Photos/2025/06. June/IMG_5036.jpeg','Photos/2025/06. June/IMG_5137.jpeg'] },
    { month: 'July',      photos: ['Photos/2025/07. July/IMG_5227.jpeg','Photos/2025/07. July/IMG_5237.jpeg','Photos/2025/07. July/IMG_5317.jpeg'] },
    { month: 'August',    photos: ['Photos/2025/08. August/3_4059.jpeg','Photos/2025/08. August/IMG_5603.jpeg','Photos/2025/08. August/IMG_5668.jpeg','Photos/2025/08. August/IMG_5880.jpeg','Photos/2025/08. August/IMG_5924.jpeg'] },
    { month: 'September', photos: ['Photos/2025/09. September/IMG_6178.jpeg','Photos/2025/09. September/IMG_6309.jpeg'] },
    { month: 'October',   photos: ['Photos/2025/10. October/IMG_6459.jpeg','Photos/2025/10. October/IMG_6528.jpeg'] },
    { month: 'November',  photos: ['Photos/2025/11. November/IMG_6664.jpeg','Photos/2025/11. November/IMG_6665.jpeg','Photos/2025/11. November/IMG_6818.jpeg','Photos/2025/11. November/IMG_6884.jpeg'] },
    { month: 'December',  photos: ['Photos/2025/12. December/IMG_6946.jpeg','Photos/2025/12. December/IMG_7013.jpeg','Photos/2025/12. December/IMG_7028.jpeg'] },
  ]},
  { year: 2026, months: [
    { month: 'January',  photos: ['Photos/2026/01. January/IMG_7430.jpeg','Photos/2026/01. January/IMG_7586.jpeg','Photos/2026/01. January/IMG_7596.jpeg'] },
    { month: 'February', photos: ['Photos/2026/02. February/IMG_7871.jpeg','Photos/2026/02. February/IMG_7872.jpeg','Photos/2026/02. February/IMG_7877.jpeg'] },
    { month: 'March',    photos: ['Photos/2026/03. March/IMG_7985.jpeg','Photos/2026/03. March/IMG_7996.jpeg','Photos/2026/03. March/IMG_8033.jpeg','Photos/2026/03. March/IMG_8076.jpeg','Photos/2026/03. March/IMG_8155.jpeg','Photos/2026/03. March/IMG_8332.jpeg','Photos/2026/03. March/IMG_8345.jpeg'] },
    { month: 'April',    photos: ['Photos/2026/04. April/IMG_8583.jpeg','Photos/2026/04. April/IMG_8672.jpeg','Photos/2026/04. April/IMG_8782.jpeg','Photos/2026/04. April/IMG_8965.jpeg','Photos/2026/04. April/IMG_9063.jpeg'] },
    { month: 'May',      photos: ['Photos/2026/05. May/IMG_9174.jpeg','Photos/2026/05. May/IMG_9379.jpeg','Photos/2026/05. May/IMG_9397.jpeg','Photos/2026/05. May/IMG_9407.jpeg'] },
  ]},
];

// Build flat photo array for lightbox
const allPhotos = [];
PHOTO_DATA.forEach(y => y.months.forEach(m => m.photos.forEach(p => allPhotos.push(p))));

// Build gallery HTML
function buildGallery(yearData, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  yearData.months.forEach(monthData => {
    const group = document.createElement('div');
    group.className = 'month-group';

    const label = document.createElement('div');
    label.className = 'month-label';
    label.textContent = monthData.month;
    group.appendChild(label);

    const grid = document.createElement('div');
    grid.className = 'photo-grid';

    monthData.photos.forEach(path => {
      const idx = allPhotos.indexOf(path);
      const item = document.createElement('div');
      item.className = 'photo-item';
      const img = document.createElement('img');
      img.src = path;
      img.loading = 'lazy';
      img.alt = '';
      img.addEventListener('click', () => openLightbox(idx));
      item.appendChild(img);
      grid.appendChild(item);
    });

    group.appendChild(grid);
    container.appendChild(group);
  });
}

PHOTO_DATA.forEach(y => buildGallery(y, 'gallery-' + y.year));

// Lightbox
let currentPhotoIndex = 0;
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lbCounter = document.getElementById('lb-counter');

function openLightbox(idx) {
  currentPhotoIndex = idx;
  lightboxImg.src = allPhotos[currentPhotoIndex];
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
  updateCounter();
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  lightboxImg.src = '';
}

function lbPrev() {
  currentPhotoIndex = (currentPhotoIndex - 1 + allPhotos.length) % allPhotos.length;
  lightboxImg.src = allPhotos[currentPhotoIndex];
  updateCounter();
}

function lbNext() {
  currentPhotoIndex = (currentPhotoIndex + 1) % allPhotos.length;
  lightboxImg.src = allPhotos[currentPhotoIndex];
  updateCounter();
}

function updateCounter() {
  lbCounter.textContent = (currentPhotoIndex + 1) + ' / ' + allPhotos.length;
}

document.getElementById('lb-close').addEventListener('click', closeLightbox);
document.getElementById('lb-prev').addEventListener('click', lbPrev);
document.getElementById('lb-next').addEventListener('click', lbNext);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'ArrowLeft') lbPrev();
  else if (e.key === 'ArrowRight') lbNext();
  else if (e.key === 'Escape') closeLightbox();
});

let touchStartX = 0;
lightbox.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
lightbox.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) dx < 0 ? lbNext() : lbPrev();
}, { passive: true });

// Audio player
const SONGS = [
  { title: 'Menarilah - NDC Worship',      src: 'Songs/Song 1 - NDC Worship - Menarilah (Live).mp3' },
  { title: 'Confidence - Sanctus Real',    src: 'Songs/Song 2 - Sanctus Real - Confidence lyrics video.mp3' },
  { title: 'Kau 1, 2, 3... - GMS Live',   src: 'Songs/Song 3 - Kau 1, 2, 3... (Live Recording) - GMS Live (Official Video).mp3' },
  { title: 'Seribu Rasa - GMS Live',       src: 'Songs/Song 4 - GMS Live - Seribu Rasa (Official GMS LIve).mp3' },
];

const audio      = document.getElementById('bg-audio');
const btnPlay    = document.getElementById('btn-play');
const btnPrev    = document.getElementById('btn-prev');
const btnNext    = document.getElementById('btn-next');
const songTitle  = document.getElementById('song-title');
const progress   = document.getElementById('audio-progress');
const timeCur    = document.getElementById('time-current');
const timeTot    = document.getElementById('time-total');
const iconPlay   = document.getElementById('icon-play');
const iconPause  = document.getElementById('icon-pause');

let currentTrack = 0;
let isPlaying    = false;

function fmt(s) {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return m + ':' + (sec < 10 ? '0' : '') + sec;
}

function loadTrack(idx) {
  currentTrack = ((idx % SONGS.length) + SONGS.length) % SONGS.length;
  audio.src = SONGS[currentTrack].src;
  songTitle.textContent = SONGS[currentTrack].title;
  progress.value = 0;
  timeCur.textContent = '0:00';
  timeTot.textContent = '0:00';
  if (isPlaying) audio.play().catch(() => {});
}

function setPlaying(on) {
  isPlaying = on;
  iconPlay.style.display  = on ? 'none'  : 'block';
  iconPause.style.display = on ? 'block' : 'none';
}

btnPlay.addEventListener('click', () => {
  if (!audio.src || audio.src === window.location.href) { loadTrack(0); }
  if (isPlaying) {
    audio.pause();
    setPlaying(false);
  } else {
    audio.play().then(() => setPlaying(true)).catch(() => {});
  }
});

btnPrev.addEventListener('click', () => loadTrack(currentTrack - 1));
btnNext.addEventListener('click', () => loadTrack(currentTrack + 1));
audio.addEventListener('ended', () => loadTrack(currentTrack + 1));

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

// Set first track title on load (no autoplay)
loadTrack(0);

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
