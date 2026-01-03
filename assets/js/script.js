// assets/js/script.js
// FINAL VERSION – Complete & Safe Site-wide JavaScript for Riff's Department Store
// Works perfectly with riffs-map.js (ES modules) and store-data.js
// Proudly family-owned in Newfoundland & Labrador since 1939
// Updated: December 2025

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* ==================================================================
     1. HERO TEXT STROKE – Cross-browser & perfectly crisp
  ================================================================== */
  const applyTextStroke = () => {
    const elements = document.querySelectorAll(".text-white-stroke");
    if (!elements.length) return;

    elements.forEach(el => {
      el.style.cssText = `
        color: white !important;
        -webkit-text-stroke: 3px #EB1B21;
        text-stroke: 3px #EB1B21;
        text-shadow:
          3px 3px 0 #EB1B21,
          -3px -3px 0 #EB1B21,
          3px -3px 0 #EB1B21,
          -3px 3px 0 #EB1B21,
          0 3px 0 #EB1B21,
          3px 0 0 #EB1B21,
          -3px 0 0 #EB1B21,
          0 -3px 0 #EB1B21;
        paint-order: stroke fill;
        font-weight: 900;
      `;
    });
  };
  applyTextStroke();

  /* ==================================================================
     2. SMOOTH SCROLLING – Anchor links with offset
  ================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const scrollY = target.getBoundingClientRect().top + window.scrollY - 100;

      window.scrollTo({ top: scrollY, behavior: "smooth" });
      history.pushState(null, "", targetId);
    });
  });

  /* ==================================================================
     3. FADE-IN ON SCROLL – For .fade-in sections
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
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    fadeElements.forEach(el => fadeObserver.observe(el));
  }

  const fadeStyle = document.createElement("style");
  fadeStyle.textContent = `
    .fade-in {
      opacity: 0;
      transform: translateY(40px);
      transition: opacity 0.9s ease, transform 0.9s ease;
    }
    .fade-in.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(fadeStyle);

  /* ==================================================================
     4. ALL 20 LOCATIONS COLLAPSIBLE DROPDOWN
  ================================================================== */
  const toggleBtn = document.getElementById("locations-toggle");
  const locationsList = document.getElementById("locations-list");
  const toggleIcon = document.getElementById("toggle-icon");

  if (toggleBtn && locationsList && toggleIcon) {
    const waitForGrid = setInterval(() => {
      if (locationsList.children.length > 0) {
        clearInterval(waitForGrid);

        toggleBtn.addEventListener("click", () => {
          const isOpen = locationsList.classList.contains("open");

          if (isOpen) {
            locationsList.classList.remove("open");
            locationsList.style.maxHeight = "0px";
            toggleIcon.style.transform = "rotate(0deg)";
            toggleBtn.setAttribute("aria-expanded", "false");
          } else {
            locationsList.classList.add("open");
            locationsList.style.maxHeight = `${locationsList.scrollHeight + 60}px`;
            toggleIcon.style.transform = "rotate(180deg)";
            toggleBtn.setAttribute("aria-expanded", "true");
          }
        });

        // Initial collapsed state
        locationsList.style.maxHeight = "0px";
        toggleBtn.setAttribute("aria-expanded", "false");
      }
    }, 100);

    setTimeout(() => clearInterval(waitForGrid), 5000);
  }

  /* ==================================================================
     5. PERFORMANCE – Passive event listeners
  ================================================================== */
  ["touchstart", "touchmove", "wheel", "mousewheel"].forEach(evt => {
    document.addEventListener(evt, () => {}, { passive: true });
  });

  /* ==================================================================
     6. SUBTLE HEADER SHADOW ON SCROLL
  ================================================================== */
  const header = document.querySelector("header");
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        header.classList.add(
          "shadow-lg",
          "bg-white/95",
          "backdrop-blur-sm",
          "border-b",
          "border-gray-100"
        );
      } else {
        header.classList.remove(
          "shadow-lg",
          "bg-white/95",
          "backdrop-blur-sm",
          "border-b",
          "border-gray-100"
        );
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  /* ==================================================================
     7. PULSE ANIMATION FOR ACTIVE MAP MARKER
  ================================================================== */
  const pulseStyle = document.createElement("style");
  pulseStyle.textContent = `
    @keyframes pulse-marker {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.4); opacity: 0.7; }
    }
    .custom-riff-marker.active svg {
      animation: pulse-marker 0.8s ease-out;
    }
  `;
  document.head.appendChild(pulseStyle);

  /* ==================================================================
     8. BUTTON HOVER LIFT
  ================================================================== */
  document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("mouseenter", () => (btn.style.transform = "translateY(-4px)"));
    btn.addEventListener("mouseleave", () => (btn.style.transform = "translateY(0)"));
  });

  /* ==================================================================
     9. CONSOLE LOVE ❤️
  ================================================================== */
  console.log(
    "%cRiff’s Department Store – Website Loaded Successfully",
    "font-size: 16px; font-weight: bold; color: #EB1B21; background: white; padding: 8px 16px; border-radius: 8px;"
  );

  console.log(
    "%cFamily-owned and proud since 1939",
    "font-size: 14px; color: #666; font-style: italic;"
  );
});
