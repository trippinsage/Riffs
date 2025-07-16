document.addEventListener('DOMContentLoaded', () => {
  // Store data
  const stores = [
    { id: "badgers-quay", name: "Badger's Quay", address: "3 Main St, Badger's Quay, NL A0G 1B0", phone: "(709) 536-3005", hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed", lat: 48.6647, lng: -53.5838 },
    { id: "baie-verte", name: "Baie Verte", address: "5 Farm Rd, Baie Verte, NL A0K 1B0", phone: "(709) 532-8080", hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed", lat: 49.9367, lng: -56.1927 },
    { id: "bonavista", name: "Bonavista", address: "5 Williams Dr, Bonavista, NL A0C 1B0", phone: "(709) 468-2403", hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed", lat: 48.6562, lng: -53.1119 },
    { id: "clarenville", name: "Clarenville", address: "69 Manitoba Dr, Clarenville, NL A5A 1K5", phone: "(709) 466-7393", hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed", lat: 48.1531, lng: -53.9632 },
    { id: "deer-lake", name: "Deer Lake", address: "9 Wight's Rd, Deer Lake, NL A8A 2J4", phone: "(709) 635-4200", hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed", lat: 49.174, lng: -57.4266 },
    { id: "fogo-island", name: "Fogo Island", address: "39 Main St, Fogo, NL A0G 2B0", phone: "(709) 266-2271", hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed", lat: 49.7161, lng: -54.2837 },
    { id: "forteau", name: "Forteau", address: "12 Forteau Rd, Forteau, NL A0K 2P0", phone: "(709) 931-2244", hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed", lat: 51.4728, lng: -56.814 },
    { id: "gander", name: "Gander", address: "104 Trans-Canada Hwy, Gander, NL A1V 1P6", phone: "(709) 651-2324", hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed", lat: 48.9517, lng: -54.6087 },
    { id: "grand-falls-windsor", name: "Grand Falls-Windsor", address: "20 Cromer Ave, Grand Falls-Windsor, NL A2A 1X1", phone: "(709) 489-5631", hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed", lat: 48.9565, lng: -55.6628 },
    { id: "happy-valley-goose-bay", name: "Happy Valley-Goose Bay", address: "70 Hamilton River Rd, Happy Valley-Goose Bay, NL A0P 1E0", phone: "(709) 896-5350", hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed", lat: 53.3017, lng: -60.326 },
    { id: "harbour-breton", name: "Harbour Breton", address: "3 Canada Dr, Harbour Breton, NL A0H 1P0", phone: "(709) 885-2022", hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed", lat: 47.4743, lng: -55.8041 },
    { id: "lewisporte", name: "Lewisporte", address: "465 Main St, Lewisporte, NL A0G 3A0", phone: "(709) 535-6608", hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed", lat: 49.2452, lng: -55.0485 },
    { id: "marystown", name: "Marystown", address: "74 Union St, Marystown, NL A0E 2M0", phone: "(709) 279-1651", hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed", lat: 47.1643, lng: -55.148 },
    { id: "port-aux-choix", name: "Port aux Choix", address: "45 Fisher St, Port au Choix, NL A0K 4C0", phone: "(709) 861-2100", hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed", lat: 50.6987, lng: -57.3537 },
    { id: "port-aux-basques", name: "Port aux Basques", address: "3 Marine Dr, Channel-Port aux Basques, NL A0M 1C0", phone: "(709) 695-7322", hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed", lat: 47.5716, lng: -59.1367 },
    { id: "roddickton", name: "Roddickton", address: "10 Main St, Roddickton, NL A0K 4P0", phone: "(709) 457-1234", hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed", lat: 50.85, lng: -56.1167 },
    { id: "springdale", name: "Springdale", address: "4 Chaulk Rd, Springdale, NL A0J 1T0", phone: "(709) 673-3787", hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed", lat: 49.4997, lng: -56.0645 },
    { id: "st-albans", name: "St. Alban's", address: "42 Barnard Dr, St. Alban's, NL A0H 2E0", phone: "(709) 538-3370", hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed", lat: 47.8733, lng: -55.8417 },
    { id: "st-anthony", name: "St. Anthony", address: "5 Indian Carrs St, St. Anthony, NL A0K 4S0", phone: "(709) 454-2073", hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed", lat: 51.3644, lng: -55.5811 },
    { id: "twillingate", name: "Twillingate", address: "10 Gillam St, Twillingate, NL A0G 4M0", phone: "(709) 884-2473", hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed", lat: 49.6451, lng: -54.7597 }
  ];

  // DOM references
  const storeSelect = document.getElementById('store-select');
  const storeInfo = document.getElementById('store-info');
  const mapLoading = document.getElementById('map-loading');

  if (!storeSelect || !storeInfo || !mapLoading) {
    console.error('One or more DOM elements are missing. Please check the HTML structure.');
    return;
  }

  // Initialize Leaflet map
  let map;
  try {
    map = L.map('store-map', {
      zoomControl: true,
      zoomAnimation: true,
      fadeAnimation: true
    }).setView([49.5, -56.0], 6);
  } catch (error) {
    console.error('Map initialization failed:', error);
    mapLoading.classList.add('hidden');
    return;
  }

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
    minZoom: 5
  }).addTo(map);

  // Custom icons (using SVG strings, embedded safely in divIcon)
  const redIconSvg = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" 
      xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13
        c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 
        12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" fill="#EB1B21"/>
    </svg>`;

  const selectedIconSvg = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13
        c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 
        12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" fill="#C3161C"/>
    </svg>`;

  const redIcon = L.divIcon({
    html: redIconSvg,
    className: '',
    iconSize: [24, 24],
    iconAnchor: [12, 24]
  });

  const selectedIcon = L.divIcon({
    html: selectedIconSvg,
    className: 'selected-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 24]
  });

  // Add markers for all stores
  const markerMap = new Map();
  stores.forEach(store => {
    const marker = L.marker([store.lat, store.lng], { icon: redIcon }).addTo(map);
    markerMap.set(store.id, marker);
  });

  // Map legend
  const legend = L.control({ position: 'bottomright' });
  legend.onAdd = function () {
    const div = L.DomUtil.create('div', 'leaflet-control legend bg-white p-2 rounded shadow-md');
    div.innerHTML = `
      <div class="flex items-center mb-1"><span class="inline-block w-4 h-4 mr-2" style="background:#EB1B21"></span>Riff's Store</div>
      <div class="flex items-center"><span class="inline-block w-4 h-4 mr-2" style="background:#C3161C"></span>Selected Store</div>
    `;
    return div;
  };
  legend.addTo(map);

  // Populate store dropdown
  stores.forEach(store => {
    const option = document.createElement('option');
    option.value = store.id;
    option.textContent = store.name;
    storeSelect.appendChild(option);
  });

  // Store selection handler
  storeSelect.addEventListener('change', () => {
    const selectedStoreId = storeSelect.value;
    if (!selectedStoreId) {
      storeInfo.innerHTML = '';
      storeInfo.classList.add('hidden');
      markerMap.forEach(marker => marker.setIcon(redIcon));
      map.setView([49.5, -56.0], 6, { animate: true });
      return;
    }

    const selectedStore = stores.find(store => store.id === selectedStoreId);
    if (selectedStore) {
      storeInfo.innerHTML = `
        <h3 class="text-xl font-bold text-red-600">${selectedStore.name}</h3>
        <p><strong>Address:</strong> ${selectedStore.address}</p>
        <p><strong>Phone:</strong> <a href="tel:${selectedStore.phone}" class="text-red-600 hover:text-red-700">${selectedStore.phone}</a></p>
        <p><strong>Hours:</strong> ${selectedStore.hours}</p>
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedStore.address)}" target="_blank" rel="noopener" class="google-maps-link">Open in Google Maps</a>
      `;
      storeInfo.classList.remove('hidden');

      markerMap.forEach((marker, id) => {
        marker.setIcon(id === selectedStoreId ? selectedIcon : redIcon);
      });

      map.setView([selectedStore.lat, selectedStore.lng], 12, { animate: true });
    }
  });

  // Fix map rendering after load
  map.whenReady(() => {
    setTimeout(() => {
      map.invalidateSize();
      mapLoading.classList.add('hidden');
    }, 500);
  });
});
