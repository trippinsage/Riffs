// assets/js/riffs-map.js
// FINAL VERSION – Elegant pins + info below map + smooth UI/UX
// Proudly family-owned in Newfoundland & Labrador since 1939

import { stores } from "./store-data.js";

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const select = document.getElementById("store-select");
  const mapDiv = document.getElementById("store-map");
  const infoDiv = document.getElementById("store-info");
  const loadingDiv = document.getElementById("map-loading");
  const locationsList = document.getElementById("locations-list");
  const touchOverlay = document.getElementById("map-touch-overlay");

  /* ---------------------------------------------------------
     POPULATE DROPDOWN
  --------------------------------------------------------- */
  stores.forEach((store, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = store.name;
    select.appendChild(opt);
  });

  /* ---------------------------------------------------------
     POPULATE COLLAPSIBLE LOCATION LIST
  --------------------------------------------------------- */
  if (locationsList) {
    locationsList.innerHTML = stores
      .map(
        store => {
          const telHref = "tel:" + store.phone.replace(/[^+\d]/g, "");
          return `
      <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-brand/30 transition text-center">
        <h3 class="text-lg font-bold text-brand mb-1">${store.name.replace("Riff's ", "")}</h3>
        <p class="text-gray-600 text-sm mb-1 leading-relaxed">${store.address}</p>
        <p class="mb-3"><a href="${telHref}" class="text-gray-800 font-semibold text-sm hover:text-brand">${store.phone}</a></p>
        <a href="${store.google}" target="_blank" rel="noopener"
           class="text-brand hover:text-brand-dark font-semibold text-sm inline-flex items-center gap-1">
          View on Google Maps
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    `;
        }
      )
      .join("");
  }

  /* ---------------------------------------------------------
     INIT MAP – scroll/touch disabled until user clicks the map
  --------------------------------------------------------- */
  const map = L.map(mapDiv, {
    zoomControl: true,
    scrollWheelZoom: false,
    dragging: !L.Browser.mobile,
    touchZoom: false
  }).setView([49.2827, -55.875], 6);

  // Enable full interaction only after user clicks inside the map
  mapDiv.addEventListener("click", () => {
    map.scrollWheelZoom.enable();
    map.touchZoom.enable();
    if (L.Browser.mobile) map.dragging.enable();
    // Remove the tap-to-interact overlay
    if (touchOverlay) touchOverlay.style.display = "none";
  });

  // Disable scroll zoom again when mouse leaves the map
  mapDiv.addEventListener("mouseleave", () => {
    map.scrollWheelZoom.disable();
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
    maxZoom: 19
  }).addTo(map);

  /* ---------------------------------------------------------
     CUSTOM RED PIN
  --------------------------------------------------------- */
  const redIcon = L.divIcon({
    className: "custom-riff-marker",
    html: `
      <svg width="32" height="32" viewBox="0 0 24 24" tabindex="0" aria-label="Store marker">
        <circle cx="12" cy="12" r="9" fill="#EB1B21" stroke="white" stroke-width="3"/>
        <circle cx="12" cy="12" r="4" fill="white"/>
      </svg>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  let markers = [];
  let activeMarker = null;

  /* ---------------------------------------------------------
     ADD MARKERS
  --------------------------------------------------------- */
  stores.forEach((store, i) => {
    const marker = L.marker([store.coords.lat, store.coords.lng], { icon: redIcon })
      .addTo(map);

    marker.on("click", () => {
      select.value = i;
      showStoreInfo(i);
      // Animate marker
      marker._icon.classList.add("active");
      setTimeout(() => marker._icon.classList.remove("active"), 900);
    });

    // Keyboard accessibility for markers
    marker.on("keypress", (e) => {
      if (e.originalEvent.key === "Enter" || e.originalEvent.key === " ") {
        select.value = i;
        showStoreInfo(i);
        marker._icon.classList.add("active");
        setTimeout(() => marker._icon.classList.remove("active"), 900);
      }
    });

    marker.on("mouseover", () => {
      marker._icon.classList.add("active");
    });
    marker.on("mouseout", () => {
      marker._icon.classList.remove("active");
    });

    markers.push(marker);
  });

  /* ---------------------------------------------------------
     SHOW STORE INFO BELOW MAP
  --------------------------------------------------------- */
  function showStoreInfo(i) {
    const store = stores[i];
    const marker = markers[i];
    const telHref = "tel:" + store.phone.replace(/[^+\d]/g, "");

    map.flyTo([store.coords.lat, store.coords.lng], 14, { duration: 1.3 });

    // highlight marker
    if (activeMarker) activeMarker.setZIndexOffset(0);
    activeMarker = marker;
    marker.setZIndexOffset(1000);

    infoDiv.innerHTML = `
      <div class="text-center md:text-left">
        <h3 class="text-2xl md:text-3xl font-black text-red-600 mb-4">${store.name}</h3>

        <div class="space-y-3 text-gray-700 text-base sm:text-lg">
          <p>
            <strong class="block text-gray-900 mb-1">Address</strong>
            ${store.address}
          </p>
          <p>
            <strong class="text-gray-900">Phone</strong>
            <a href="${telHref}" class="ml-2 font-semibold text-brand hover:underline">${store.phone}</a>
          </p>
        </div>

        <div class="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
          <a href="${store.google}" target="_blank" rel="noopener"
             class="inline-block bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition shadow-md">
            Get Directions
          </a>
          <a href="${telHref}"
             class="inline-block border-2 border-red-600 text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-50 transition sm:hidden">
            Call Store
          </a>
        </div>
      </div>
    `;

    infoDiv.classList.remove("hidden");

    if (window.innerWidth < 768) {
      infoDiv.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  /* ---------------------------------------------------------
     DROPDOWN CONTROL
  --------------------------------------------------------- */
  select.addEventListener("change", () => {
    const val = select.value;

    if (val === "") {
      // reset view
      infoDiv.classList.add("hidden");
      map.setView([49.2827, -55.875], 6, { duration: 1.2 });

      if (activeMarker) activeMarker.setZIndexOffset(0);
      activeMarker = null;
    } else {
      showStoreInfo(Number(val));
      // Animate marker
      if (markers[Number(val)] && markers[Number(val)]._icon) {
        markers[Number(val)]._icon.classList.add("active");
        setTimeout(() => markers[Number(val)]._icon.classList.remove("active"), 900);
      }
    }
  });

  /* ---------------------------------------------------------
     HIDE LOADING OVERLAY
  --------------------------------------------------------- */
  map.whenReady(() => {
    loadingDiv.style.opacity = "0";
    setTimeout(() => (loadingDiv.style.display = "none"), 500);
  });
});
