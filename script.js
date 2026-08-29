// ================================
//  TYPING — typewriter loop estetik
// ================================
const texts = [
  "Happy Birthday, Fadillah yang lucu, imut, baik hati & tidak sombong 🎂",
  "btw tutor nilai PKN 34 dong 🏆",
  "Semoga hari-harimu penuh kebahagiaan 🎉",
  "Semangat terus calon mahasiswa impian! 📚",
  "Semoga semua impianmu segera tercapai ✨",
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById("typing");

function type() {
  if (!typingEl) return;
  const current = texts[textIndex];
  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex--);
  } else {
    typingEl.textContent = current.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex === current.length + 1) {
    isDeleting = true;
    setTimeout(type, 1600);
    return;
  }
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
  }
  setTimeout(type, isDeleting ? 32 : 72);
}
type();

// ================================
//  LOADING — open with confetti + fade
// ================================
const startBtn = document.getElementById("startBtn");
const loadingScreen = document.getElementById("loading-screen");

if (startBtn && loadingScreen) {
  startBtn.addEventListener("click", () => {
    // confetti burst estetik
    if (window.confetti) {
      const colors = ["#ff7bac", "#ff4d8a", "#c9a86a", "#ffe4b8", "#ffffff"];
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.7 }, colors, scalar: 1.1 });
      setTimeout(() => confetti({ particleCount: 80, spread: 120, origin: { y: 0.6 }, colors }), 280);
    }
    loadingScreen.style.transition = "opacity .9s cubic-bezier(.22,1,.36,1), transform .9s cubic-bezier(.22,1,.36,1)";
    loadingScreen.style.opacity = "0";
    loadingScreen.style.transform = "scale(1.02)";
    setTimeout(() => { loadingScreen.style.display = "none"; }, 900);
  });
}

// ================================
//  FLOWERS — soft emoji fall (performance capped)
// ================================
const flowers = ["🌸", "🌷", "💮", "🌺", "💐", "🌼", "💗", "✨"];
const flowerColors = ["#ff7bac", "#ffbfd6", "#e8c99a"];

function createFlower() {
  const el = document.createElement("div");
  el.className = "flower";
  el.textContent = flowers[Math.floor(Math.random() * flowers.length)];
  el.style.left = Math.random() * 100 + "vw";
  el.style.fontSize = (14 + Math.random() * 18) + "px";
  el.style.animationDuration = (5 + Math.random() * 5) + "s";
  el.style.animationDelay = Math.random() * 0.8 + "s";
  el.style.opacity = String(0.55 + Math.random() * 0.45);
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 9500);
}
// slower + fewer on mobile
const isMobile = window.matchMedia("(max-width: 640px)").matches;
setInterval(createFlower, isMobile ? 900 : 560);

// ================================
//  SURPRISE — jumpscare -> popup -> confetti
// ================================
const surpriseBtn = document.getElementById("surpriseBtn");
const jumpscare = document.getElementById("jumpscare");
const video = document.getElementById("jumpscareVideo");
const popup = document.getElementById("popup");

function fireConfetti() {
  if (!window.confetti) return;
  const colors = ["#ff7bac", "#e94e7a", "#c9a86a", "#fff2b8", "#ffffff"];
  confetti({ particleCount: 160, spread: 85, origin: { y: 0.68 }, colors, gravity: 0.9, scalar: 1.05 });
  setTimeout(() => confetti({ particleCount: 110, spread: 120, origin: { y: 0.62 }, colors }), 260);
  setTimeout(() => confetti({ particleCount: 70, spread: 160, origin: { y: 0.58 }, colors, scalar: 0.9 }), 520);
}

function showPopup() {
  if (!popup) return;
  popup.style.display = "flex";
  // trigger css animation
  requestAnimationFrame(() => popup.classList.add("show"));
  fireConfetti();
  // auto hide 5.5s
  clearTimeout(showPopup._t);
  showPopup._t = setTimeout(() => hidePopup(), 5500);
}
function hidePopup() {
  if (!popup) return;
  popup.classList.remove("show");
  setTimeout(() => { if (!popup.classList.contains("show")) popup.style.display = "none"; }, 300);
}

if (surpriseBtn && jumpscare && video) {
  surpriseBtn.addEventListener("click", () => {
    jumpscare.classList.add("show");
    jumpscare.style.display = "flex";
    video.currentTime = 0;
    video.muted = false;
    const p = video.play();
    if (p && p.catch) p.catch(() => { video.muted = true; video.play(); });
  });

  video.addEventListener("ended", () => {
    jumpscare.classList.remove("show");
    jumpscare.style.display = "none";
    showPopup();
  });

  jumpscare.addEventListener("click", () => {
    video.pause();
    jumpscare.classList.remove("show");
    jumpscare.style.display = "none";
    showPopup();
  });
}

// popup click outside to close + close buttons
if (popup) {
  popup.addEventListener("click", (e) => {
    if (e.target === popup) hidePopup();
  });
  // ESC to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popup.style.display === "flex") hidePopup();
  });
}

// ================================
//  REVEAL ON SCROLL — intersection
// ================================
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && reveals.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("in"));
}

// ================================
//  SMOOTH SCROLL FOR GHOST BUTTON + tiny parallax on hero
// ================================
const glassCard = document.querySelector(".glass-card");
if (glassCard && !isMobile) {
  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 8;
    glassCard.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });
}
