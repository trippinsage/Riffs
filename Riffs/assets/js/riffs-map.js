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
        store => `
      <div class="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition text-center">
        <h3 class="text-xl font-bold text-red-600 mb-2">${store.name.replace("Riff's ", "")}</h3>
        <p class="text-gray-700 text-sm mb-1 leading-relaxed">${store.address}</p>
        <p class="text-gray-700 font-medium mb-3">${store.phone}</p>

        <a href="${store.google}" target="_blank" rel="noopener"
           class="text-red-600 hover:text-red-700 font-semibold text-sm inline-flex items-center gap-1">
          View on Google Maps

          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    `
      )
      .join("");
  }

  /* ---------------------------------------------------------
     INIT MAP
  --------------------------------------------------------- */
  const map = L.map(mapDiv, { zoomControl: true }).setView([49.2827, -55.875], 6);

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
      <svg width="32" height="32" viewBox="0 0 24 24">
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
    });

    markers.push(marker);
  });

  /* ---------------------------------------------------------
     SHOW STORE INFO BELOW MAP
  --------------------------------------------------------- */
  function showStoreInfo(i) {
    const store = stores[i];
    const marker = markers[i];

    map.flyTo([store.coords.lat, store.coords.lng], 14, { duration: 1.3 });

    // highlight marker
    if (activeMarker) activeMarker.setZIndexOffset(0);
    activeMarker = marker;
    marker.setZIndexOffset(1000);

    infoDiv.innerHTML = `
      <div class="text-center md:text-left">
        <h3 class="text-2xl md:text-3xl font-black text-red-600 mb-4">${store.name}</h3>

        <div class="space-y-4 text-gray-700 text-lg">
          <p>
            <strong class="block text-gray-900 mb-1">Address:</strong>
            ${store.address.replace(", ", "<br>")}
          </p>
          <p>
            <strong class="text-gray-900">Phone:</strong>
            <span class="font-semibold ml-2">${store.phone}</span>
          </p>
        </div>

        <div class="mt-8">
          <a href="${store.google}" target="_blank" rel="noopener"
             class="inline-block bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition shadow-lg hover:shadow-xl">
            Get Directions
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
    const i = Number(select.value);

    if (Number.isNaN(i)) {
      // reset view
      infoDiv.classList.add("hidden");
      map.setView([49.2827, -55.875], 6, { duration: 1.2 });

      if (activeMarker) activeMarker.setZIndexOffset(0);
      activeMarker = null;
    } else {
      showStoreInfo(i);
    }
  });

  /* ---------------------------------------------------------
     HIDE LOADING OVERLAY
  --------------------------------------------------------- */
  map.whenReady(() => {
    loadingDiv.style.opacity = "0";
    setTimeout(() => (loadingDiv.style.display = "none"), 500);
  });

  /* ---------------------------------------------------------
     PERFORMANCE TWEAK – Passive Events
  --------------------------------------------------------- */
  ["touchstart", "touchmove", "wheel"].forEach(evt =>
    document.addEventListener(evt, () => {}, { passive: true })
  );
});
