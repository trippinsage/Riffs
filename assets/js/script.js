(() => {
  document.addEventListener('DOMContentLoaded', () => {

    // ——————————————————————————————————————————
    // STORES DATA
    // ——————————————————————————————————————————
    const stores = [
      { id: "badgers-quay", name: "Badger's Quay", address: "10 Hermit Cove Rd, Badger's Quay, NL A0G 1B0", phone: "(709) 536-3005", hours: "Tues–Sat: 10 a.m.–5 p.m.; Sun & Mon: Closed", lat: 49.1214, lng: -53.598593 },
      { id: "baie-verte", name: "Baie Verte", address: "28 Main St., Baie Verte, NL A0K 1B0", phone: "(709) 532-8080", hours: "Tues–Sat: 10 a.m.–5 p.m.; Sun & Mon: Closed", lat: 49.931543, lng: -56.207073 },
      { id: "bonavista", name: "Bonavista", address: "50-60 Church St., Bonavista, NL A0C 1B0", phone: "(709) 468-2403", hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed", lat: 48.653288, lng: -53.109546 },
      { id: "clarenville", name: "Clarenville", address: "4 Thompson St., Clarenville, NL A5A 1Y9", phone: "(709) 466-7393", hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed", lat: 48.163489, lng: -53.979024 },
      { id: "deer-lake", name: "Deer Lake", address: "10 Commerce St., Deer Lake, NL A8A 1E6", phone: "(709) 635-4200", hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed", lat: 49.175463, lng: -57.431374 },
      { id: "fogo-island", name: "Fogo Island", address: "39 Main St, Fogo, NL A0G 2B0", phone: "(709) 266-2271", hours: "Tues–Sat: 10 a.m.–5 p.m.; Sun & Mon: Closed", lat: 49.708667, lng: -54.269222 },
      { id: "forteau", name: "Forteau", address: "Main Highway, Forteau, NL A0K 2P0", phone: "(709) 931-2244", hours: "Tues–Sat: 10 a.m.–5 p.m.; Sun & Mon: Closed", lat: 51.476706, lng: -56.957757 },
      { id: "gander", name: "Gander", address: "140 Bennet Drive, Gander, NL A1V 2E4", phone: "(709) 651-2324", hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed", lat: 48.953451, lng: -54.603228 },
      { id: "grand-falls-windsor", name: "Grand Falls-Windsor", address: "2 Hardy Avenue, Grand Falls-Windsor, NL A2A 2P9", phone: "(709) 489-5631", hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed", lat: 48.950994, lng: -55.646498 },
      { id: "happy-valley-goose-bay", name: "Happy Valley-Goose Bay", address: "70 Hamilton River Rd, Happy Valley-Goose Bay, NL A0P 1E0", phone: "(709) 896-5350", hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed", lat: 53.303922, lng: -60.329226 },
      { id: "harbour-breton", name: "Harbour Breton", address: "16-18 Canada Dr, Harbour Breton, NL A0H 1P0", phone: "(709) 885-2022", hours: "Tues–Sat: 10 a.m.–5 p.m.; Sun & Mon: Closed", lat: 47.472447, lng: -55.822869 },
      { id: "lewisporte", name: "Lewisporte", address: "Lewisporte Mall, Lewisporte, NL A0G 3A0", phone: "(709) 535-6608", hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed", lat: 49.240678, lng: -55.05654 },
      { id: "marystown", name: "Marystown", address: "640 Queen St., Marystown, NL A0E 2M0", phone: "(709) 279-1651", hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed", lat: 47.165927, lng: -55.160142 },
      { id: "port-aux-choix", name: "Port aux Choix", address: "45 Fisher St, Port au Choix, NL A0K 4C0", phone: "(709) 861-2100", hours: "Tues–Sat: 10 a.m.–5 p.m.; Sun & Mon: Closed", lat: 50.706376, lng: -57.355542 },
      { id: "port-aux-basques", name: "Port aux Basques", address: "Grand Bay Road, Channel-Port aux Basques, NL A0M 1C0", phone: "(709) 695-7322", hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed", lat: 47.577583, lng: -59.150905 },
      { id: "roddickton", name: "Rddickton", address: "51 Major St., Roddickton, NL A0K 4P0", phone: "(709) 457-1234", hours: "Tues–Sat: 10 a.m.–5 p.m.; Sun & Mon: Closed", lat: 50.871847, lng: -56.120792 },
      { id: "springdale", name: "Springdale", address: "197 Little Bay Rd., Springdale, NL A0J 1T0", phone: "(709) 673-3787", hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed", lat: 49.506146, lng: -56.065266 },
      { id: "st-albans", name: "St. Alban's", address: "102 Main St., St. Alban's, NL A0H 2E0", phone: "(709) 538-3370", hours: "Tues–Sat: 10 a.m.–5 p.m.; Sun & Mon: Closed", lat: 47.87668, lng: -55.844726 },
      { id: "st-anthony", name: "St. Anthony", address: "143-149 West St., St. Anthony, NL A0K 4S0", phone: "(709) 454-2073", hours: "Mon–Sat: 10 a.m.–5 p.m.; Sun: Closed", lat: 51.366462, lng: -55.587197 },
      { id: "twillingate", name: "Twillingate", address: "3 Main St, Twillingate, NL A0G 4M0", phone: "(709) 884-2473", hours: "Tues–Sat: 10 a.m.–5 p.m.; Sun & Mon: Closed", lat: 49.651629, lng: -54.766377 }
    ];

    // DOM refs
    const storeSelect = document.getElementById('store-select');
    const storeInfo = document.getElementById('store-info');
    const mapLoading = document.getElementById('map-loading');

    if (!storeSelect || !storeInfo || !mapLoading) {
      console.error("Missing required map elements.");
      return;
    }

    // ——————————————————————————————————————————
    // MAP INIT
    // ——————————————————————————————————————————
    let map;
    try {
      map = L.map('store-map', {
        zoomControl: true,
        touchZoom: false,
        scrollWheelZoom: false,
        dragging: true
      }).setView([49.5, -56], 6);
    } catch (err) {
      console.error("Map failed to initialize.", err);
      mapLoading.classList.add('hidden');
      return;
    }

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      minZoom: 5,
    }).addTo(map);

    const redIcon = L.divIcon({
      html: `<svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EB1B21"/></svg>`,
      className: "marker-red",
      iconSize: [24, 24],
      iconAnchor: [12, 24],
    });

    const selectedIcon = L.divIcon({
      html: `<svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#C3161C"/></svg>`,
      className: "marker-selected",
      iconSize: [24, 24],
      iconAnchor: [12, 24],
    });

    const markerMap = new Map();

    stores.forEach(store => {
      const marker = L.marker([store.lat, store.lng], { icon: redIcon })
        .addTo(map)
        .bindTooltip(store.name);

      marker.on("click", () => {
        storeSelect.value = store.id;
        storeSelect.dispatchEvent(new Event("change"));
      });

      markerMap.set(store.id, marker);
    });

    // Fill dropdown
    stores.forEach(store => {
      const opt = document.createElement("option");
      opt.value = store.id;
      opt.textContent = store.name;
      storeSelect.appendChild(opt);
    });

    // ——————————————————————————————————————————
    // STORE SELECT LOGIC
    // ——————————————————————————————————————————
    storeSelect.addEventListener("change", () => {
      const id = storeSelect.value;

      if (!id) {
        storeInfo.innerHTML = "";
        storeInfo.classList.add("hidden");
        markerMap.forEach(m => m.setIcon(redIcon));
        map.setView([49.5, -56], 6);
        return;
      }

      const s = stores.find(s => s.id === id);
      const tel = s.phone.replace(/[^\d+]/g, "");

      storeInfo.innerHTML = `
        <h3 class="text-xl font-bold text-red-600">${s.name}</h3>
        <p><strong>Address:</strong> ${s.address}</p>
        <p><strong>Phone:</strong> <a href="tel:${tel}" class="text-red-600 underline">${s.phone}</a></p>
        <p><strong>Hours:</strong> ${s.hours}</p>
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}"
          target="_blank" class="text-blue-600 underline">Open in Google Maps</a>
      `;
      storeInfo.classList.remove("hidden");

      markerMap.forEach((m, markerId) => {
        m.setIcon(markerId === id ? selectedIcon : redIcon);
      });

      map.setView([s.lat, s.lng], 12);
    });

    // Enable zoom on map interaction
    const enableZoom = () => {
      map.scrollWheelZoom.enable();
      map.touchZoom.enable();
    };
    const disableZoom = () => {
      map.scrollWheelZoom.disable();
      map.touchZoom.disable();
    };

    map.on("click", enableZoom);
    map.on("focus", enableZoom);

    document.addEventListener("click", e => {
      if (!e.target.closest("#store-map")) disableZoom();
    });

    map.on("blur", disableZoom);

    map.whenReady(() => {
      setTimeout(() => {
        map.invalidateSize();
        mapLoading.classList.add("hidden");
      }, 500);
    });

    // ——————————————————————————————————————————
    // FLOATING CTA BUTTON
    // ——————————————————————————————————————————
    const ctaWrapper = document.createElement("div");
    ctaWrapper.className = "floating-cta-wrapper";
    ctaWrapper.innerHTML = `
      <button class="floating-cta" aria-label="Get Exclusive Savings">
        Get Exclusive Savings
        <span class="floating-cta__close" aria-label="Close">×</span>
      </button>
    `;

    document.body.appendChild(ctaWrapper);
    let ctaShown = false;

    const showCTA = () => {
      if (ctaShown) return;
      ctaShown = true;
      ctaWrapper.style.opacity = "1";
      ctaWrapper.style.transform = "translate(-50%, 0)";
    };

    Object.assign(ctaWrapper.style, {
      opacity: "0",
      transform: "translate(-50%, 20px)",
      transition: "0.4s ease",
      pointerEvents: "auto"
    });

    window.addEventListener("scroll", () => {
      if (window.scrollY > 600) showCTA();
    });

    setTimeout(() => {
      if (!ctaShown && window.scrollY < 100) showCTA();
    }, 12000);

    const dismissKey = "cta-dismissed";
    if (sessionStorage.getItem(dismissKey)) {
      ctaWrapper.remove();
    } else {
      ctaWrapper.querySelector(".floating-cta__close").addEventListener("click", e => {
        e.stopPropagation();
        sessionStorage.setItem(dismissKey, "true");
        ctaWrapper.remove();
      });
    }

    // ——————————————————————————————————————————
    // SERVICE WORKER
    // ——————————————————————————————————————————
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js")
        .then(r => console.log("SW registered", r))
        .catch(err => console.error("SW failed", err));
    }

  }); // DOM Loaded end
})();
