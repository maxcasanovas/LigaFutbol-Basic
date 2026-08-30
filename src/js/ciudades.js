// Página de ciudades: agrupa TEAMS (data.js) por ciudad y arma una tarjeta por cada una.
document.addEventListener("DOMContentLoaded", () => {
  renderCities(TEAMS);
});

function groupByCity(teams) {
  const cities = {};
  teams.forEach((t) => {
    if (!cities[t.city]) {
      cities[t.city] = { name: t.city, country: t.country, teams: [] };
    }
    cities[t.city].teams.push(t);
  });
  return Object.values(cities).sort((a, b) => a.name.localeCompare(b.name));
}

function renderCities(teams) {
  const cities = groupByCity(teams);
  const grid = document.getElementById("cities-grid");

  grid.innerHTML = cities
    .map(
      (city) => `
        <article class="city-card">
          <div class="city-card-header">
            <h2>${city.name}</h2>
            <span class="city-country">${city.country}</span>
          </div>
          <p class="city-count">${city.teams.length} ${city.teams.length === 1 ? "equipo" : "equipos"}</p>
          <ul class="city-teams">
            ${city.teams
              .map(
                (t) => `<li><span>${t.name}</span><span class="city-team-detail">${t.league} · ${t.stadium}</span></li>`
              )
              .join("")}
          </ul>
        </article>
      `
    )
    .join("");
}
