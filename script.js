// Typing animation
const texts = [
  "DevOps Enthusiast",
  "Cloud Support Engineer",
  "IT Operations Specialist",
  "Junior Cloud Engineer"
];
let count = 0;
let index = 0;
let currentText = "";
let isDeleting = false;

const typedEl = document.getElementById("typed-text");

function type() {
  if (!typedEl) return;
  currentText = texts[count];

  if (isDeleting) {
    typedEl.textContent = currentText.substring(0, index - 1);
    index--;
  } else {
    typedEl.textContent = currentText.substring(0, index + 1);
    index++;
  }

  let speed = isDeleting ? 40 : 90;

  if (!isDeleting && index === currentText.length) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && index === 0) {
    isDeleting = false;
    count = (count + 1) % texts.length;
    speed = 400;
  }

  setTimeout(type, speed);
}

type();

// Navbar scroll effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile menu toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}

// Smooth reveal on scroll
const revealEls = document.querySelectorAll(
  ".info-card, .skill-category, .project-card, .cert-card, .edu-card, .contact-card, .timeline-content"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

revealEls.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(24px)";
  el.style.transition = "opacity 0.55s ease, transform 0.55s ease";
  observer.observe(el);
});

// Theme toggle
const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;

function setTheme(theme) {
  root.classList.add("theme-changing");
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  window.setTimeout(function () {
    root.classList.remove("theme-changing");
  }, 500);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "dark";
    setTheme(current === "dark" ? "light" : "dark");
  });
}

// ===== Animated background particles =====
(function () {
  const canvas = document.getElementById("particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let particles = [];
  let animationId;
  let w = 0;
  let h = 0;
  let mouse = { x: null, y: null, active: false };
  const COUNT = 80;
  const MAX_DIST = 160;
  const MOUSE_DIST = 180;

  function isLight() {
    return document.documentElement.getAttribute("data-theme") === "light";
  }

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < COUNT; i++) {
      const speed = Math.random() * 0.6 + 0.2;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        r: Math.random() * 2.2 + 0.8,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const light = isLight();
    const dotColor = light ? [8, 145, 178] : [34, 211, 238];
    const lineColor = light ? [8, 145, 178] : [34, 211, 238];
    const accentColor = light ? [99, 102, 241] : [129, 140, 248];

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.pulse += p.pulseSpeed;

      if (mouse.active && mouse.x != null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_DIST && dist > 1) {
          const force = (MOUSE_DIST - dist) / MOUSE_DIST * 0.04;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      }

      p.vx *= 0.995;
      p.vy *= 0.995;

      if (Math.abs(p.vx) < 0.05) p.vx += (Math.random() - 0.5) * 0.02;
      if (Math.abs(p.vy) < 0.05) p.vy += (Math.random() - 0.5) * 0.02;

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) { p.x = 0; p.vx *= -1; }
      if (p.x > w) { p.x = w; p.vx *= -1; }
      if (p.y < 0) { p.y = 0; p.vy *= -1; }
      if (p.y > h) { p.y = h; p.vy *= -1; }

      const pulseR = p.r + Math.sin(p.pulse) * 0.6;
      const alpha = 0.35 + Math.sin(p.pulse) * 0.2;

      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulseR * 4);
      gradient.addColorStop(0, "rgba(" + accentColor.join(",") + "," + (alpha * 0.35) + ")");
      gradient.addColorStop(1, "rgba(" + accentColor.join(",") + ",0)");
      ctx.beginPath();
      ctx.arc(p.x, p.y, pulseR * 4, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(pulseR, 0.5), 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + dotColor.join(",") + "," + alpha + ")";
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const a = (1 - dist / MAX_DIST) * 0.4;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = "rgba(" + lineColor.join(",") + "," + a + ")";
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }
    }

    if (mouse.active && mouse.x != null) {
      const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 120);
      g.addColorStop(0, "rgba(" + accentColor.join(",") + ",0.12)");
      g.addColorStop(1, "rgba(" + accentColor.join(",") + ",0)");
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 120, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    }

    animationId = requestAnimationFrame(draw);
  }

  function init() {
    resize();
    createParticles();
    if (animationId) cancelAnimationFrame(animationId);
    draw();
  }

  window.addEventListener("resize", function () {
    resize();
    createParticles();
  });

  window.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });

  window.addEventListener("mouseleave", function () {
    mouse.active = false;
  });

  window.addEventListener("touchmove", function (e) {
    if (e.touches && e.touches[0]) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
      mouse.active = true;
    }
  }, { passive: true });

  window.addEventListener("touchend", function () {
    mouse.active = false;
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
