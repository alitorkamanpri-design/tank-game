// script.js

// Header scroll effect
const header = document.querySelector(".header");
const headerToggle = document.querySelector(".header__toggle");
const headerNav = document.querySelector(".header__nav");

let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// Mobile menu toggle
headerToggle.addEventListener("click", () => {
  const isActive = headerToggle.classList.toggle("active");
  headerNav.classList.toggle("active");
  headerToggle.setAttribute("aria-expanded", isActive);

  // Prevent body scroll when menu is open
  document.body.style.overflow = isActive ? "hidden" : "";
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll(".nav__link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      headerToggle.classList.remove("active");
      headerNav.classList.remove("active");
      headerToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (window.innerWidth <= 768) {
    if (!header.contains(e.target) && headerNav.classList.contains("active")) {
      headerToggle.classList.remove("active");
      headerNav.classList.remove("active");
      headerToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  }
});

// Active link based on current page
const currentPath = window.location.pathname;
navLinks.forEach((link) => {
  if (link.getAttribute("href") === currentPath) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
