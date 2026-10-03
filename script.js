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
  let stars = [];
  let animationId;
  let w = 0;
  let h = 0;
  let mouse = { x: null, y: null, active: false };
  let time = 0;
  const COUNT = 110;
  const STAR_COUNT = 6;
  const MAX_DIST = 170;
  const MOUSE_DIST = 220;

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
      const speed = Math.random() * 0.7 + 0.25;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        r: Math.random() * 2.4 + 0.7,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.035
      });
    }
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h * 0.6,
        len: 40 + Math.random() * 80,
        speed: 3 + Math.random() * 5,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
        opacity: 0,
        delay: Math.random() * 400,
        life: 0,
        maxLife: 60 + Math.random() * 40
      });
    }
  }

  function draw() {
    time++;
    ctx.clearRect(0, 0, w, h);
    const light = isLight();
    const dotColor = light ? [8, 145, 178] : [34, 211, 238];
    const lineColor = light ? [8, 145, 178] : [34, 211, 238];
    const accentColor = light ? [99, 102, 241] : [129, 140, 248];
    const starColor = light ? [8, 145, 178] : [165, 243, 252];

    const blobs = [
      { x: w * 0.2 + Math.sin(time * 0.008) * 80, y: h * 0.3 + Math.cos(time * 0.006) * 60, r: 180, c: accentColor, a: light ? 0.04 : 0.07 },
      { x: w * 0.75 + Math.cos(time * 0.007) * 70, y: h * 0.55 + Math.sin(time * 0.009) * 50, r: 200, c: dotColor, a: light ? 0.03 : 0.06 },
      { x: w * 0.5 + Math.sin(time * 0.005) * 100, y: h * 0.8 + Math.cos(time * 0.008) * 40, r: 160, c: accentColor, a: light ? 0.025 : 0.05 }
    ];
    for (const b of blobs) {
      const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
      g.addColorStop(0, "rgba(" + b.c.join(",") + "," + b.a + ")");
      g.addColorStop(1, "rgba(" + b.c.join(",") + ",0)");
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    }

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.pulse += p.pulseSpeed;

      if (mouse.active && mouse.x != null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_DIST && dist > 1) {
          const force = (MOUSE_DIST - dist) / MOUSE_DIST * 0.055;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      }

      p.vx *= 0.994;
      p.vy *= 0.994;
      if (Math.abs(p.vx) < 0.06) p.vx += (Math.random() - 0.5) * 0.025;
      if (Math.abs(p.vy) < 0.06) p.vy += (Math.random() - 0.5) * 0.025;

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) { p.x = 0; p.vx *= -1; }
      if (p.x > w) { p.x = w; p.vx *= -1; }
      if (p.y < 0) { p.y = 0; p.vy *= -1; }
      if (p.y > h) { p.y = h; p.vy *= -1; }

      const pulseR = p.r + Math.sin(p.pulse) * 0.7;
      const alpha = 0.3 + Math.sin(p.pulse) * 0.25;

      const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulseR * 5);
      glow.addColorStop(0, "rgba(" + accentColor.join(",") + "," + (alpha * 0.4) + ")");
      glow.addColorStop(1, "rgba(" + accentColor.join(",") + ",0)");
      ctx.beginPath();
      ctx.arc(p.x, p.y, pulseR * 5, 0, Math.PI * 2);
      ctx.fillStyle = glow;
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
          const a = (1 - dist / MAX_DIST) * 0.45;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = "rgba(" + lineColor.join(",") + "," + a + ")";
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }
    }

    for (const s of stars) {
      s.life++;
      if (s.life < s.delay) continue;
      const t = (s.life - s.delay) / s.maxLife;
      if (t > 1) {
        s.life = 0;
        s.delay = 80 + Math.random() * 300;
        s.x = Math.random() * w;
        s.y = Math.random() * h * 0.5;
        s.len = 40 + Math.random() * 90;
        s.speed = 3.5 + Math.random() * 5;
        continue;
      }
      const opacity = t < 0.2 ? t / 0.2 : t > 0.7 ? (1 - t) / 0.3 : 1;
      const dx = Math.cos(s.angle) * s.speed;
      const dy = Math.sin(s.angle) * s.speed;
      s.x += dx;
      s.y += dy;
      const tailX = s.x - Math.cos(s.angle) * s.len;
      const tailY = s.y - Math.sin(s.angle) * s.len;
      const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
      grad.addColorStop(0, "rgba(" + starColor.join(",") + ",0)");
      grad.addColorStop(1, "rgba(" + starColor.join(",") + "," + (opacity * 0.7) + ")");
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(s.x, s.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + starColor.join(",") + "," + opacity + ")";
      ctx.fill();
    }

    if (mouse.active && mouse.x != null) {
      const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 140);
      g.addColorStop(0, "rgba(" + accentColor.join(",") + ",0.15)");
      g.addColorStop(0.5, "rgba(" + dotColor.join(",") + ",0.06)");
      g.addColorStop(1, "rgba(" + accentColor.join(",") + ",0)");
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 140, 0, Math.PI * 2);
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

// ===== Scroll progress =====
(function () {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;
  function update() {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const p = h > 0 ? (window.scrollY / h) * 100 : 0;
    bar.style.width = p + "%";
  }
  window.addEventListener("scroll", update, { passive: true });
  update();
})();

// ===== Back to top =====
(function () {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;
  window.addEventListener("scroll", function () {
    if (window.scrollY > 400) btn.classList.add("visible");
    else btn.classList.remove("visible");
  }, { passive: true });
  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

// ===== Active nav link =====
(function () {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-links a[href^='#']");
  if (!sections.length || !links.length) return;
  function onScroll() {
    let current = "";
    sections.forEach(function (sec) {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.getAttribute("id");
    });
    links.forEach(function (a) {
      a.classList.remove("active-link");
      if (a.getAttribute("href") === "#" + current) a.classList.add("active-link");
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

// ===== Skill meters =====
(function () {
  const meters = document.querySelectorAll(".skill-meter");
  if (!meters.length) return;
  const obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const el = entry.target;
        const level = el.getAttribute("data-level") || "0";
        const fill = el.querySelector(".meter-fill");
        if (fill) fill.style.width = level + "%";
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  meters.forEach(function (m) { obs.observe(m); });
})();

// ===== Project filters =====
(function () {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");
  if (!buttons.length) return;
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      buttons.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      cards.forEach(function (card) {
        const cat = (card.getAttribute("data-category") || "").toLowerCase();
        if (filter === "all" || cat.indexOf(filter) !== -1) {
          card.classList.remove("is-hidden");
        } else {
          card.classList.add("is-hidden");
        }
      });
    });
  });
})();

// ===== Copy email =====
(function () {
  const btn = document.getElementById("copy-email");
  if (!btn) return;
  btn.addEventListener("click", function () {
    const email = btn.getAttribute("data-email") || "veerashivakarthik@gmail.com";
    function done() {
      const old = btn.textContent;
      btn.textContent = "Copied!";
      btn.classList.add("copied");
      setTimeout(function () {
        btn.textContent = old;
        btn.classList.remove("copied");
      }, 1800);
      burstConfetti(btn);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(done).catch(function () {
        window.prompt("Copy email:", email);
      });
    } else {
      window.prompt("Copy email:", email);
    }
  });
})();

// ===== Confetti burst =====
function burstConfetti(anchor) {
  const colors = ["#22d3ee", "#818cf8", "#34d399", "#f472b6", "#fbbf24"];
  const rect = anchor ? anchor.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 };
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  for (let i = 0; i < 28; i++) {
    const p = document.createElement("div");
    p.className = "confetti-burst";
    p.style.left = cx + "px";
    p.style.top = cy + "px";
    p.style.background = colors[i % colors.length];
    document.body.appendChild(p);
    const angle = (Math.PI * 2 * i) / 28;
    const dist = 60 + Math.random() * 80;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 40;
    p.animate([
      { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
      { transform: "translate(" + dx + "px," + dy + "px) rotate(" + (Math.random() * 360) + "deg)", opacity: 0 }
    ], { duration: 700 + Math.random() * 400, easing: "cubic-bezier(0.2,0.8,0.2,1)" }).onfinish = function () {
      p.remove();
    };
  }
}

// Confetti on resume download
document.querySelectorAll('a[download], a.btn-resume').forEach(function (a) {
  a.addEventListener("click", function () {
    burstConfetti(a);
  });
});
