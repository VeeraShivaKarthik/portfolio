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
  const COUNT = 55;
  const MAX_DIST = 140;

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
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 1.8 + 0.6
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = isLight()
        ? "rgba(8, 145, 178, 0.45)"
        : "rgba(34, 211, 238, 0.55)";
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.35;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = isLight()
            ? "rgba(8, 145, 178," + alpha + ")"
            : "rgba(34, 211, 238," + alpha + ")";
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
