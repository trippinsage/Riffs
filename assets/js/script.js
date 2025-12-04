document.addEventListener("DOMContentLoaded", () => {
  const stores = [
    { name: "Riff's Conception Bay South", lat: 47.5665, lng: -52.7853, address: "25 Conception Bay Hwy, Conception Bay South, NL", phone: "(709) 834-7600" },
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
  ];

  const select = document.getElementById("store-select");
  const mapDiv = document.getElementById("store-map");
  const infoDiv = document.getElementById("store-info");
  const loadingDiv = document.getElementById("map-loading");

  // Populate the store selector
  stores.forEach((store, idx) => {
    const option = document.createElement("option");
    option.value = idx;
    option.textContent = store.name;
    select.appendChild(option);
  });

  // Initialize Leaflet map
  const map = L.map(mapDiv, { tap: false }).setView([49.2827, -55.875], 6); // Center NL
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  // Custom red circle marker
  const redMarker = L.divIcon({
    className: 'custom-red-marker',
    html: `<svg width="24" height="24" viewBox="0 0 24 24">
             <circle cx="12" cy="12" r="10" fill="#EB1B21" stroke="#fff" stroke-width="2"/>
           </svg>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });

  // Add all markers using the new redMarker
  const markers = stores.map(store =>
    L.marker([store.lat, store.lng], { icon: redMarker })
      .addTo(map)
      .bindPopup(`<b>${store.name}</b><br>${store.address}<br>${store.phone}`)
  );

  // Hide loading once map tiles load
  map.on("load", () => loadingDiv.style.display = "none");
  map.whenReady(() => loadingDiv.style.display = "none");

  // Bounce animation for selected marker
  function bounceMarker(marker) {
    const el = marker.getElement();
    if (!el) return;
    el.classList.add('selected-marker');
    setTimeout(() => el.classList.remove('selected-marker'), 350);
  }

  // Handle store selection
  select.addEventListener("change", (e) => {
    const idx = e.target.value;
    if (idx === "") {
      map.setView([49.2827, -55.875], 6);
      infoDiv.classList.add("hidden");
      return;
    }

    const store = stores[idx];
    map.setView([store.lat, store.lng], 12, { animate: true });
    markers[idx].openPopup();
    bounceMarker(markers[idx]);

    // Update info panel
    infoDiv.innerHTML = `
      <h3 class="text-2xl font-bold text-red-600 mb-2">${store.name}</h3>
      <p class="text-gray-700 mb-1"><strong>Address:</strong> ${store.address}</p>
      <p class="text-gray-700"><strong>Phone:</strong> ${store.phone}</p>
    `;
    infoDiv.classList.remove("hidden");

    // Smooth scroll to info panel on mobile
    if (window.innerWidth < 768) {
      infoDiv.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  // Fix mobile scroll lag: enable passive listeners for touch events
  ["touchstart", "touchmove", "wheel"].forEach(event => {
    document.addEventListener(event, () => {}, { passive: true });
  });
});
