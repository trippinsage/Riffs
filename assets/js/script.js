document.addEventListener('DOMContentLoaded', () => {
  const stores = [/* your store data unchanged */];

  const storeSelect = document.getElementById('store-select');
  const storeInfo = document.getElementById('store-info');
  const mapLoading = document.getElementById('map-loading');

  if (!storeSelect || !storeInfo || !mapLoading) {
    console.error('Required DOM elements are missing.');
    return;
  }

  // Initialize map
  let map;
  try {
    map = L.map('store-map', {
      zoomControl: true,
      zoomAnimation: true,
      fadeAnimation: true
    }).setView([49.5, -56.0], 6);
  } catch (err) {
    console.error('Failed to initialize map:', err);
    mapLoading.classList.add('hidden');
    return;
  }

  // Add tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © OpenStreetMap contributors',
    maxZoom: 18,
    minZoom: 5
  }).addTo(map);

  // Custom icons
  const iconSvg = color => `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
    </svg>`;

  const createIcon = color => L.divIcon({
    html: iconSvg(color),
    className: '',
    iconSize: [24, 24],
    iconAnchor: [12, 24]
  });

  const redIcon = createIcon('#EB1B21');
  const selectedIcon = createIcon('#C3161C');

  // Add markers
  const markerMap = new Map();
  stores.forEach(store => {
    const marker = L.marker([store.lat, store.lng], { icon: redIcon }).addTo(map);
    markerMap.set(store.id, marker);
  });

  // Legend
  const legend = L.control({ position: 'bottomright' });
  legend.onAdd = () => {
    const div = L.DomUtil.create('div', 'bg-white p-2 rounded shadow-md text-sm');
    div.innerHTML = `
      <div class="flex items-center mb-1">
        <span class="w-4 h-4 mr-2 rounded-full inline-block bg-[#EB1B21]"></span> Riff's Store
      </div>
      <div class="flex items-center">
        <span class="w-4 h-4 mr-2 rounded-full inline-block bg-[#C3161C]"></span> Selected Store
      </div>
    `;
    return div;
  };
  legend.addTo(map);

  // Populate select options
  stores.forEach(store => {
    const opt = document.createElement('option');
    opt.value = store.id;
    opt.textContent = store.name;
    storeSelect.appendChild(opt);
  });

  // Store selection
  storeSelect.addEventListener('change', () => {
    const selectedId = storeSelect.value;
    storeInfo.innerHTML = '';
    storeInfo.classList.add('hidden');

    if (!selectedId) {
      markerMap.forEach(marker => marker.setIcon(redIcon));
      map.setView([49.5, -56.0], 6, { animate: true });
      return;
    }

    const store = stores.find(s => s.id === selectedId);
    if (!store) return;

    // Sanitize phone
    const tel = store.phone.replace(/[^\d+]/g, '');

    storeInfo.innerHTML = `
      <h3 class="text-xl font-bold text-red-600">${store.name}</h3>
      <p><strong>Address:</strong> ${store.address}</p>
      <p><strong>Phone:</strong> <a href="tel:${tel}" class="text-red-600 hover:text-red-700">${store.phone}</a></p>
      <p><strong>Hours:</strong> ${store.hours}</p>
      <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-800">Open in Google Maps</a>
    `;
    storeInfo.classList.remove('hidden');

    // Update marker icons
    markerMap.forEach((marker, id) => {
      marker.setIcon(id === selectedId ? selectedIcon : redIcon);
    });

    map.setView([store.lat, store.lng], 12, { animate: true });
  });

  // Ensure map renders correctly
  map.whenReady(() => {
    setTimeout(() => {
      map.invalidateSize();
      mapLoading.classList.add('hidden');
    }, 500);
  });
});
