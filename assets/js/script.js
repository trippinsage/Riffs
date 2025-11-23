document.addEventListener('DOMContentLoaded', () => {
  // Store data
  const stores = [
    {
      id: "badgers-quay",
      name: "Badger's Quay",
      address: "10 Hermit Cove Rd, Badger's Quay, NL A0G 1B0",
      phone: "(709) 536-3005",
      hours: "Tues–Sat: 10 a.m.–5 p.m.; Sun & Mon: Closed",
      lat: 49.1214,
      lng: -53.598593
    },
    {
      id: "baie-verte",
      name: "Baie Verte",
      address: "28 Main St., Baie Verte, NL A0K 1B0",
      phone: "(709) 532-8080",
      hours: "Tues–Sat: 10 a.m.–5 p.m.; Sun & Mon: Closed",
      lat: 49.931543,
      lng: -56.207073
    },
    {
      id: "bonavista",
      name: "Bonavista",
      address: "50-60 Church St., Bonavista, NL A0C 1B0",
      phone: "(709) 468-2403",
      hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed",
      lat: 48.653288,
      lng: -53.109546
    },
    {
      id: "clarenville",
      name: "Clarenville",
      address: "4 Thompson St., Clarenville, NL A5A 1Y9",
      phone: "(709) 466-7393",
      hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed",
      lat: 48.163489,
      lng: -53.979024
    },
    {
      id: "deer-lake",
      name: "Deer Lake",
      address: "10 Commerce St., Deer Lake, NL A8A 1E6",
      phone: "(709) 635-4200",
      hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed",
      lat: 49.175463,
      lng: -57.431374
    },
    {
      id: "fogo-island",
      name: "Fogo Island",
      address: "39 Main St, Fogo, NL A0G 2B0",
      phone: "(709) 266-2271",
      hours: "Tues–Sat: 10 a.m.–5 p.m.; Sun & Mon: Closed",
      lat: 49.708667,
      lng: -54.269222
    },
    {
      id: "forteau",
      name: "Forteau",
      address: "Main Highway, Forteau, NL A0K 2P0",
      phone: "(709) 931-2244",
      hours: "Tues–Sat: 10 a.m.–5 p.m.; Sun & Mon: Closed",
      lat: 51.476706,
      lng: -56.957757
    },
    {
      id: "gander",
      name: "Gander",
      address: "140 Bennet Drive, Gander, NL A1V 2E4",
      phone: "(709) 651-2324",
      hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed",
      lat: 48.953451,
      lng: -54.603228
    },
    {
      id: "grand-falls-windsor",
      name: "Grand Falls-Windsor",
      address: "2 Hardy Avenue, Grand Falls-Windsor, NL A2A 2P9",
      phone: "(709) 489-5631",
      hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed",
      lat: 48.950994,
      lng: -55.646498
    },
    {
      id: "happy-valley-goose-bay",
      name: "Happy Valley-Goose Bay",
      address: "70 Hamilton River Rd, Happy Valley-Goose Bay, NL A0P 1E0",
      phone: "(709) 896-5350",
      hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed",
      lat: 53.303922,
      lng: -60.329226
    },
    {
      id: "harbour-breton",
      name: "Harbour Breton",
      address: "16-18 Canada Dr, Harbour Breton, NL A0H 1P0",
      phone: "(709) 885-2022",
      hours: "Tues–Sat: 10 a.m.–5 p.m.; Sun & Mon: Closed",
      lat: 47.472447,
      lng: -55.822869
    },
    {
      id: "lewisporte",
      name: "Lewisporte",
      address: "Lewisporte Mall, Lewisporte, NL A0G 3A0",
      phone: "(709) 535-6608",
      hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed",
      lat: 49.240678,
      lng: -55.05654
    },
    {
      id: "marystown",
      name: "Marystown",
      address: "640 Queen St., Marystown, NL A0E 2M0",
      phone: "(709) 279-1651",
      hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed",
      lat: 47.165927,
      lng: -55.160142
    },
    {
      id: "port-aux-choix",
      name: "Port aux Choix",
      address: "45 Fisher St, Port au Choix, NL A0K 4C0",
      phone: "(709) 861-2100",
      hours: "Tues–Sat: 10 a.m.–5 p.m.; Sun & Mon: Closed",
      lat: 50.706376,
      lng: -57.355542
    },
    {
      id: "port-aux-basques",
      name: "Port aux Basques",
      address: "Grand Bay Road, Channel-Port aux Basques, NL A0M 1C0",
      phone: "(709) 695-7322",
      hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed",
      lat: 47.577583,
      lng: -59.150905
    },
    {
      id: "roddickton",
      name: "Roddickton",
      address: "51 Major St., Roddickton, NL A0K 4P0",
      phone: "(709) 457-1234",
      hours: "Tues–Sat: 10 a.m.–5 p.m.; Sun & Mon: Closed",
      lat: 50.871847,
      lng: -56.120792
    },
    {
      id: "springdale",
      name: "Springdale",
      address: "197 Little Bay Rd., Springdale, NL A0J 1T0",
      phone: "(709) 673-3787",
      hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed",
      lat: 49.506146,
      lng: -56.065266
    },
    {
      id: "st-albans",
      name: "St. Alban's",
      address: "102 Main St., St. Alban's, NL A0H 2E0",
      phone: "(709) 538-3370",
      hours: "Tues–Sat: 10 a.m.–5 p.m.; Sun & Mon: Closed",
      lat: 47.87668,
      lng: -55.844726
    },
    {
      id: "st-anthony",
      name: "St. Anthony",
      address: "143-149 West St., St. Anthony, NL A0K 4S0",
      phone: "(709) 454-2073",
      hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed",
      lat: 51.366462,
      lng: -55.587197
    },
    {
      id: "twillingate",
      name: "Twillingate",
      address: "3 Main St, Twillingate, NL A0G 4M0",
      phone: "(709) 884-2473",
      hours: "Tues–Sat: 10 a.m.–5 p.m.; Sun & Mon: Closed",
      lat: 49.651629,
      lng: -54.766377
    }
  ];

  // DOM references
  const storeSelect = document.getElementById('store-select');
  const storeInfo = document.getElementById('store-info');
  const mapLoading = document.getElementById('map-loading');

  if (!storeSelect || !storeInfo || !mapLoading) {
    console.error('One or more required DOM elements are missing.');
    return;
  }

  // Initialize map with scroll and touch zoom disabled by default
  let map;
  try {
    map = L.map('store-map', {
      zoomControl: true,
      zoomAnimation: true,
      fadeAnimation: true,
      scrollWheelZoom: false, // Disable scroll wheel zoom by default
      touchZoom: false, // Disable touch zoom by default
      dragging: true // Allow dragging for better UX
    }).setView([49.5, -56.0], 6);
  } catch (err) {
    console.error('Map initialization failed:', err);
    mapLoading.classList.add('hidden');
    return;
  }

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
    maxZoom: 18,
    minZoom: 5
  }).addTo(map);

  // Custom icons
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

  // Add markers and map store ids to markers
  const markerMap = new Map();

  stores.forEach(store => {
    const marker = L.marker([store.lat, store.lng], { icon: redIcon, keyboard: true })
      .addTo(map)
      .bindTooltip(store.name, { permanent: false, direction: 'top' });

    markerMap.set(store.id, marker);

    // On marker click or keyboard enter, select store in dropdown
    marker.on('click', () => {
      storeSelect.value = store.id;
      storeSelect.dispatchEvent(new Event('change'));
    });

    marker.on('keypress', (e) => {
      if (e.originalEvent.key === 'Enter' || e.originalEvent.key === ' ') {
        e.originalEvent.preventDefault();
        marker.fire('click');
      }
    });
  });

  // Add legend control
  const legend = L.control({ position: 'bottomright' });
  legend.onAdd = function () {
    const div = L.DomUtil.create('div', 'leaflet-control legend bg-white p-2 rounded shadow-md');
    div.innerHTML = `
      <div class="flex items-center mb-1">
        <span class="inline-block w-4 h-4 mr-2" style="background:#EB1B21"></span>Riff's Store
      </div>
      <div class="flex items-center">
        <span class="inline-block w-4 h-4 mr-2" style="background:#C3161C"></span>Selected Store
      </div>
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

  // Update store info panel and map on selection
  storeSelect.addEventListener('change', () => {
    const selectedId = storeSelect.value;

    if (!selectedId) {
      storeInfo.innerHTML = '';
      storeInfo.classList.add('hidden');

      markerMap.forEach(marker => marker.setIcon(redIcon));

      // Reset map view to default
      map.setView([49.5, -56.0], 6, { animate: true });
      return;
    }

    const selectedStore = stores.find(store => store.id === selectedId);
    if (!selectedStore) return;

    // Format phone for tel link (remove non-numeric except plus)
    const telPhone = selectedStore.phone.replace(/[^\d+]/g, '');

    storeInfo.innerHTML = `
      <h3 class="text-xl font-bold text-red-600">${selectedStore.name}</h3>
      <p><strong>Address:</strong> ${selectedStore.address}</p>
      <p><strong>Phone:</strong> <a href="tel:${telPhone}" class="text-red-600 hover:text-red-700">${selectedStore.phone}</a></p>
      <p><strong>Hours:</strong> ${selectedStore.hours}</p>
      <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedStore.address)}" target="_blank" rel="noopener noreferrer" class="google-maps-link">
        Open in Google Maps
      </a>
    `;
    storeInfo.classList.remove('hidden');

    // Update marker icons
    markerMap.forEach((marker, id) => {
      marker.setIcon(id === selectedId ? selectedIcon : redIcon);
    });

    // Center and zoom map on selected store
    map.setView([selectedStore.lat, selectedStore.lng], 12, { animate: true });
  });

  // Fix for scroll/swipe zoom issue
  // Enable zoom when map is clicked or focused
  const enableZoom = () => {
    map.scrollWheelZoom.enable();
    map.touchZoom.enable();
  };

  const disableZoom = () => {
    map.scrollWheelZoom.disable();
    map.touchZoom.disable();
  };

  map.on('click', enableZoom);
  map.on('focus', enableZoom);

  // Disable zoom when clicking outside the map or losing focus
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#store-map')) {
      disableZoom();
    }
  });

  map.on('blur', disableZoom);

  // Fix map size and hide loading once ready
  map.whenReady(() => {
    setTimeout(() => {
      map.invalidateSize();
      mapLoading.classList.add('hidden');
    }, 500);
  });
});

// ——————————————————————————————————————————————————————
  // NEW: Floating "Get Exclusive Savings" CTA Button
  // ——————————————————————————————————————————————————————

  // Create the floating CTA HTML
  const floatingCTA = document.createElement('div');
  floatingCTA.className = 'floating-cta-wrapper';
  floatingCTA.setAttribute('aria-hidden', 'true');
  floatingCTA.innerHTML = `
    <button 
      class="floating-cta" 
      onclick="window.location.href='https://your-exclusive-link.com'" 
      aria-label="Get Exclusive Savings">
      Get Exclusive Savings
      <span 
        class="floating-cta__close" 
        onclick="this.parentElement.parentElement.remove(); event.stopPropagation();" 
        aria-label="Close promotion">
        ×
      </span>
    </button>
  `;

  // Append to body
  document.body.appendChild(floatingCTA);

  // Show only after scrolling 600px (feels natural, not pushy)
  let ctaShown = false;
  const showCTA = () => {
    if (ctaShown) return;
    ctaShown = true;
    floatingCTA.style.opacity = '1';
    floatingCTA.style.transform = 'translateX(-50%) translateY(0)';
    floatingCTA.setAttribute('aria-hidden', 'false');
  };

  // Initial hidden state with smooth fade-in/up
  Object.assign(floatingCTA.style, {
    opacity: '0',
    transform: 'translateX(-50%) translateY(20px)',
    transition: 'opacity 0.5s ease, transform 0.5s ease',
    pointerEvents: 'none'
  });

  // Trigger on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      showCTA();
    }
  });

  // Optional: Auto-show after 12 seconds even if no scroll (backup engagement)
  setTimeout(() => {
    if (!ctaShown && window.scrollY < 100) {
      showCTA();
    }
  }, 12000);

  // Cleanup on page hide (performance)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && ctaShown) {
      // Optional: you could persist dismissal in localStorage here
    }
  });

  // Optional: Don't show again this session if dismissed
  const dismissKey = 'exclusive-cta-dismissed';
  if (sessionStorage.getItem(dismissKey)) {
    floatingCTA.remove();
  } else {
    // Add dismiss persistence
    floatingCTA.querySelector('.floating-cta__close').addEventListener('click', () => {
      sessionStorage.setItem(dismissKey, 'true');
    });
  }
  
  // Service Worker

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => console.log('Service Worker registered:', registration))
      .catch(error => console.error('Service Worker registration failed:', error));
  });
} 

