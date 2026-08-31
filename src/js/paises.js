// Página de países: agrupa TEAMS (data.js) por país y arma una tarjeta por cada uno.
document.addEventListener("DOMContentLoaded", () => {
  renderCountries(TEAMS);
});

function groupByCountry(teams) {
  const countries = {};
  teams.forEach((t) => {
    if (!countries[t.country]) {
      countries[t.country] = { name: t.country, teams: [] };
    }
    countries[t.country].teams.push(t);
  });
  return Object.values(countries).sort((a, b) => a.name.localeCompare(b.name));
}

function renderCountries(teams) {
  const countries = groupByCountry(teams);
  const grid = document.getElementById("countries-grid");

  grid.innerHTML = countries
    .map((country) => {
      const cities = new Set(country.teams.map((t) => t.city));
      return `
        <article class="country-card">
          <div class="country-card-header">
            <h2>${country.name}</h2>
            <span class="country-cities">${cities.size} ${cities.size === 1 ? "ciudad" : "ciudades"}</span>
          </div>
          <p class="country-count">${country.teams.length} equipos</p>
          <ul class="country-teams">
            ${country.teams
              .map((t) => `<li><span>${t.name}</span><span class="country-team-league">${t.league}</span></li>`)
              .join("")}
          </ul>
        </article>
      `;
    })
    .join("");
}
