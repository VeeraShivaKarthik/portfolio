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
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "dark";
    setTheme(current === "dark" ? "light" : "dark");
  });
}
