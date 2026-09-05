// ===============================
// DIGITAL INVITATION CONFIG
// Change these values for each client.
// ===============================
const INVITATION = {
  anniversaryDate: "2026-09-06T00:00:00",
  coupleName: "Folaranmi & Oluwatosin"
};

// ---------- Welcome screen ----------
const welcomeScreen = document.getElementById("welcomeScreen");
const openInvitation = document.getElementById("openInvitation");

openInvitation.addEventListener("click", () => {
  welcomeScreen.classList.add("hidden");
  startMusic();
});

// ---------- Smooth navigation + active nav ----------
const navItems = [...document.querySelectorAll(".nav-item")];
const sections = [...document.querySelectorAll(".page-section")];

navItems.forEach(item => {
  item.addEventListener("click", () => {
    navItems.forEach(n => n.classList.remove("active"));
    item.classList.add("active");
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    const active = document.querySelector(`.nav-item[href="#${id}"]`);
    if (active) {
      navItems.forEach(n => n.classList.remove("active"));
      active.classList.add("active");
    }
  });
}, {
  root: null,
  threshold: 0.35
});

sections.forEach(section => observer.observe(section));

// ---------- Countdown ----------
const countdownEls = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds")
};

function updateCountdown() {
  const target = new Date(INVITATION.anniversaryDate).getTime();
  const now = Date.now();
  let distance = target - now;

  // If the date has passed, count down to next year's anniversary.
  if (distance < 0) {
    const next = new Date(INVITATION.anniversaryDate);
    next.setFullYear(new Date().getFullYear() + 1);
    distance = next.getTime() - now;
  }

  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance / 3600000) % 24);
  const minutes = Math.floor((distance / 60000) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  countdownEls.days.textContent = String(days).padStart(3, "0");
  countdownEls.hours.textContent = String(hours).padStart(2, "0");
  countdownEls.minutes.textContent = String(minutes).padStart(2, "0");
  countdownEls.seconds.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ---------- Gallery lightbox ----------
const galleryItems = [...document.querySelectorAll(".gallery-item")];
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");
const prevPhoto = document.getElementById("prevPhoto");
const nextPhoto = document.getElementById("nextPhoto");

let currentPhoto = 0;

function getGallerySrc(index) {
  const item = galleryItems[index];
  const img = item.querySelector("img");
  return img.currentSrc || img.src;
}

function showPhoto(index) {
  currentPhoto = (index + galleryItems.length) % galleryItems.length;
  lightboxImage.src = getGallerySrc(currentPhoto);
}

function openLightbox(index) {
  showPhoto(index);
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeGallery() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => openLightbox(index));
});

closeLightbox.addEventListener("click", closeGallery);
prevPhoto.addEventListener("click", () => showPhoto(currentPhoto - 1));
nextPhoto.addEventListener("click", () => showPhoto(currentPhoto + 1));

lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeGallery();
});

document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeGallery();
  if (e.key === "ArrowLeft") showPhoto(currentPhoto - 1);
  if (e.key === "ArrowRight") showPhoto(currentPhoto + 1);
});

// ---------- Background music ----------
const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
let musicPlaying = false;

function startMusic() {
  music.play()
    .then(() => {
      musicPlaying = true;
      musicToggle.textContent = "❚❚";
    })
    .catch(() => {
      // Browser may require a second user interaction.
    });
}

musicToggle.addEventListener("click", () => {
  if (musicPlaying) {
    music.pause();
    musicPlaying = false;
    musicToggle.textContent = "♫";
  } else {
    music.play()
      .then(() => {
        musicPlaying = true;
        musicToggle.textContent = "❚❚";
      })
      .catch(() => {});
  }
});

// ---------- Scroll reveal animation ----------
const revealElements = document.querySelectorAll(
  ".section-heading, .timeline-item, .gallery-item, .goal, .detail-card"
);

revealElements.forEach(el => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));
