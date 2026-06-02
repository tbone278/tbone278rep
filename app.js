const favoritesKey = "airportFavorites";
function getFavorites() {
  return JSON.parse(localStorage.getItem(favoritesKey) || "[]");
}
function saveFavorites(favorites) {
  localStorage.setItem(favoritesKey, JSON.stringify(favorites));
}
function toggleFavorite(iata) {
  let favorites = getFavorites();
  if (favorites.includes(iata)) {
    favorites = favorites.filter(f => f !== iata);
  } else {
    favorites.push(iata);
  }
  saveFavorites(favorites);
  renderFavorites();
}
let airports = [];

const searchInput = document.getElementById("search");
const result = document.getElementById("result");

fetch("./airports.json")
  .then(response => response.json())
  .then(data => {
    airports = data;
    result.innerHTML = `Loaded ${airports.length.toLocaleString()} airports`;
  })
  .catch(error => {
    result.innerHTML = "Failed to load airport database";
    console.error(error);
  });

searchInput.addEventListener("input", function () {

  const query = this.value.trim().toLowerCase();

  if (query.length < 2) {
    result.innerHTML = "Enter at least 2 characters";
    return;
  }

  const matches = airports.filter(a => {

    const iata = (a.iata || "").toLowerCase();
    const icao = (a.icao || "").toLowerCase();
    const name = (a.name || "").toLowerCase();
    const city = (a.city || "").toLowerCase();

    return (
      iata.includes(query) ||
      icao.includes(query) ||
      name.includes(query) ||
      city.includes(query)
    );

  }).slice(0, 20);

  if (matches.length === 0) {
    result.innerHTML = "No airports found";
    return;
  }

  result.innerHTML = matches.map(a => {

    const mapsUrl =
      `https://maps.apple.com/?ll=${a.lat},${a.lon}`;

    return `
      <div class="card">

        <h3>${a.iata} | ${a.city || "-"} | ${a.country}</h3>

        <strong>${a.name}</strong><br><br>

        IATA: ${a.iata}<br>
        ICAO: ${a.icao || "-"}<br><br>

        <a href="${mapsUrl}"
           target="_blank">
           Open in Apple Maps
        </a>

      </div>
    `;

  }).join("");

});
function renderFavorites() {

  const container = document.getElementById("favorites");

  const favorites = getFavorites();

  if (favorites.length === 0) {
    container.innerHTML = "No favorites yet";
    return;
  }

  const favAirports = airports.filter(a =>
    favorites.includes(a.iata)
  );

  container.innerHTML = favAirports.map(a => `
      <div class="card">
        ⭐ ${a.iata} | ${a.city}
      </div>
  `).join("");
}
