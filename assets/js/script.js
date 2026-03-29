// assets/js/script.js
// Riff's Department Store — Site-wide JavaScript
// Updated: March 2026

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* ==================================================================
     1. MOBILE MENU TOGGLE
  ================================================================== */
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const iconOpen = document.getElementById("menu-icon-open");
  const iconClose = document.getElementById("menu-icon-close");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const isHidden = mobileMenu.classList.contains("hidden");

      mobileMenu.classList.toggle("hidden", !isHidden);
      iconOpen.classList.toggle("hidden", isHidden);
      iconClose.classList.toggle("hidden", !isHidden);
      menuBtn.setAttribute("aria-expanded", isHidden ? "true" : "false");
    });

    // Close mobile menu when a nav link is clicked
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        iconOpen.classList.remove("hidden");
        iconClose.classList.add("hidden");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ==================================================================
     2. SMOOTH SCROLLING — Anchor links with header offset
  ================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerH = document.querySelector("header")?.offsetHeight || 80;
      const scrollY = target.getBoundingClientRect().top + window.scrollY - headerH - 16;

      window.scrollTo({ top: scrollY, behavior: "smooth" });
      history.pushState(null, "", targetId);
    });
  });

  /* ==================================================================
     3. FADE-IN ON SCROLL
  ================================================================== */
  const fadeElements = document.querySelectorAll(".fade-in");
  if (fadeElements.length) {
    const fadeObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    fadeElements.forEach(el => fadeObserver.observe(el));
  }

  /* ==================================================================
     4. HEADER SHADOW ON SCROLL
  ================================================================== */
  const header = document.querySelector("header");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ==================================================================
     5. LOCATIONS LIST TOGGLE
  ================================================================== */
  const toggleBtn = document.getElementById("locations-toggle");
  const locationsList = document.getElementById("locations-list");
  const toggleIcon = document.getElementById("toggle-icon");

  if (toggleBtn && locationsList && toggleIcon) {
    const waitForGrid = setInterval(() => {
      if (locationsList.children.length > 0) {
        clearInterval(waitForGrid);

        locationsList.style.maxHeight = "0px";
        toggleBtn.setAttribute("aria-expanded", "false");

        toggleBtn.addEventListener("click", () => {
          const isOpen = locationsList.classList.contains("open");

          if (isOpen) {
            locationsList.classList.remove("open");
            locationsList.style.maxHeight = "0px";
            toggleIcon.style.transform = "rotate(0deg)";
            toggleBtn.setAttribute("aria-expanded", "false");
          } else {
            locationsList.classList.add("open");
            locationsList.style.maxHeight = `${locationsList.scrollHeight + 40}px`;
            toggleIcon.style.transform = "rotate(180deg)";
            toggleBtn.setAttribute("aria-expanded", "true");
          }
        });
      }
    }, 100);

    setTimeout(() => clearInterval(waitForGrid), 5000);
  }

});
