document.addEventListener("DOMContentLoaded", () => {

  /* -----------------------------------------------------------------------
     STORE DATA
  ----------------------------------------------------------------------- */
  const stores = [
    { name: "Riff's Bay Roberts", lat: 47.5628, lng: -53.2961, address: "29-31 Caldwell St, Bay Roberts, NL", phone: "(709) 786-5111" },
    { name: "Riff's Carbonear", lat: 47.2865, lng: -53.1740, address: "1-3 Merchant Dr, Carbonear, NL", phone: "(709) 596-5100" },
    { name: "Riff's Corner Brook", lat: 48.9500, lng: -57.9500, address: "44 Murphy Square, Corner Brook, NL", phone: "(709) 634-7100" },
    { name: "Riff's Deer Lake", lat: 49.1833, lng: -57.4167, address: "9-11 Nicholsville Hwy, Deer Lake, NL", phone: "(709) 636-5678" },
    { name: "Riff's Stephenville", lat: 48.5440, lng: -58.5780, address: "145 Main St, Stephenville, NL", phone: "(709) 643-4321" },
    { name: "Riff's Gander", lat: 48.9560, lng: -54.6080, address: "112 Airport Blvd, Gander, NL", phone: "(709) 651-2323" },
    { name: "Riff's Grand Falls-Windsor", lat: 48.9500, lng: -55.6667, address: "5 High St, Grand Falls-Windsor, NL", phone: "(709) 489-5631" },
    { name: "Riff's Lewisporte", lat: 49.1260, lng: -55.4690, address: "3-5 Main St, Lewisporte, NL", phone: "(709) 535-2100" },
    { name: "Riff's Clarenville", lat: 48.1560, lng: -53.9590, address: "8A Myers Ave, Clarenville, NL", phone: "(709) 466-7400" },
    { name: "Riff's Bonavista", lat: 48.6500, lng: -53.1167, address: "14 Church St, Bonavista, NL", phone: "(709) 468-7300" },
    { name: "Riff's Baie Verte", lat: 49.3333, lng: -56.3167, address: "30-32 Main St, Baie Verte, NL", phone: "(709) 532-4805" },
    { name: "Riff's Marystown", lat: 47.1667, lng: -55.1500, address: "1 Harris Dr, Marystown, NL", phone: "(709) 279-1250" },
    { name: "Riff's Happy Valley-Goose Bay", lat: 53.3000, lng: -60.4167, address: "3 Alloway Ave, Happy Valley-Goose Bay, NL", phone: "(709) 896-5532" },
    { name: "Riff's Labrador City", lat: 52.9516, lng: -66.9362, address: "118 Humphrey Rd, Labrador City, NL", phone: "(709) 944-2411" },
    { name: "Riff's St. Alban's", lat: 47.3833, lng: -55.8833, address: "1 Main Rd, St. Alban's, NL", phone: "(709) 538-8200" },
    { name: "Riff's Forteau", lat: 51.6333, lng: -56.6167, address: "11-13 Main St, Forteau, NL", phone: "(709) 931-2463" }
  ].sort((a, b) => a.name.localeCompare(b.name));  // Alphabetical upgrade


  /* -----------------------------------------------------------------------
     DOM ELEMENTS
  ----------------------------------------------------------------------- */
  const select = document.getElementById("store-select");
  const mapDiv = document.getElementById("store-map");
  const infoDiv = document.getElementById("store-info");
  const loadingDiv = document.getElementById("map-loading");


  /* -----------------------------------------------------------------------
     POPULATE STORE DROPDOWN
  ----------------------------------------------------------------------- */
  stores.forEach((store, idx) => {
    const option = document.createElement("option");
    option.value = idx;
    option.textContent = store.name;
    select.appendChild(option);
  });


  /* -----------------------------------------------------------------------
     INITIALIZE MAP
  ----------------------------------------------------------------------- */
  const map = L.map(mapDiv, { tap: false, zoomControl: true })
    .setView([49.2827, -55.875], 6);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    tileSize: 256,
    crossOrigin: true,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);


  /* -----------------------------------------------------------------------
     CUSTOM RED ICON (Pulse Animation Enabled)
  ----------------------------------------------------------------------- */
  const redMarker = L.divIcon({
    className: "custom-red-marker",
    html: `
      <div class="marker-wrap">
        <svg width="26" height="26" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="#EB1B21" stroke="white" stroke-width="2"/>
        </svg>
      </div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -12]
  });


  /* -----------------------------------------------------------------------
     ADD MARKERS
  ----------------------------------------------------------------------- */
  let openPopup = null;

  const markers = stores.map((store, idx) => {
    const marker = L.marker([store.lat, store.lng], { icon: redMarker })
      .addTo(map)
      .bindPopup(`<b>${store.name}</b><br>${store.address}<br>${store.phone}`);

    // Click marker -> update dropdown + info panel
    marker.on("click", () => {
      select.value = idx;
      updateStoreInfo(idx);
      bounceMarker(marker);
    });

    return marker;
  });


  /* -----------------------------------------------------------------------
     HIDE LOADING SPINNER
  ----------------------------------------------------------------------- */
  map.whenReady(() => loadingDiv.style.opacity = "0");


  /* -----------------------------------------------------------------------
     MARKER BOUNCE/PULSE ANIMATION
  ----------------------------------------------------------------------- */
  function bounceMarker(marker) {
    const el = marker.getElement();
    if (!el) return;

    el.classList.add("pulse-marker");
    setTimeout(() => el.classList.remove("pulse-marker"), 700);
  }


  /* -----------------------------------------------------------------------
     GET DIRECTIONS LINK (Auto-detect iOS/Android/Desktop)
  ----------------------------------------------------------------------- */
  function getDirectionsURL(lat, lng) {
    const isApple = /iPad|iPhone|Mac/.test(navigator.platform);
    return isApple
      ? `http://maps.apple.com/?daddr=${lat},${lng}`
      : `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  }


  /* -----------------------------------------------------------------------
     UPDATE INFO PANEL
  ----------------------------------------------------------------------- */
  function updateStoreInfo(idx) {
    const store = stores[idx];
    const marker = markers[idx];

    // Fly into location (smooth)
    map.flyTo([store.lat, store.lng], 12, { duration: 1.2 });

    // Close other popups
    if (openPopup && openPopup !== marker) openPopup.closePopup();
    openPopup = marker;

    marker.openPopup();
    bounceMarker(marker);

    // Build info panel
    infoDiv.innerHTML = `
      <h3 class="text-2xl font-bold text-red-600 mb-2">${store.name}</h3>
      <p class="text-gray-700 mb-1"><strong>Address:</strong> ${store.address}</p>
      <p class="text-gray-700 mb-4"><strong>Phone:</strong> ${store.phone}</p>
      <a href="${getDirectionsURL(store.lat, store.lng)}"
         target="_blank"
         class="inline-block mt-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
         Get Directions
      </a>
    `;

    infoDiv.classList.remove("hidden");

    // Auto-scroll on mobile
    if (window.innerWidth < 768) {
      infoDiv.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }


  /* -----------------------------------------------------------------------
     DROPDOWN CHANGE EVENT
  ----------------------------------------------------------------------- */
  select.addEventListener("change", (e) => {
    const idx = e.target.value;

    if (idx === "") {
      infoDiv.classList.add("hidden");
      map.flyTo([49.2827, -55.875], 6, { duration: 1.2 });
      return;
    }

    updateStoreInfo(idx);

    // Scroll dropdown to selected item
    const selectedOption = select.options[idx];
    selectedOption.scrollIntoView({ block: "nearest" });
  });


  /* -----------------------------------------------------------------------
     PASSIVE EVENT LISTENERS FOR MOBILE SMOOTHNESS
  ----------------------------------------------------------------------- */
  ["touchstart", "touchmove", "wheel"].forEach(event => {
    document.addEventListener(event, () => {}, { passive: true });
  });

});
