// Página de países: usa COUNTRIES (data.js) como fuente de verdad y TEAMS para las relaciones.
document.addEventListener("DOMContentLoaded", () => {
  renderCountries();
  document.getElementById("countries-grid").addEventListener("click", handleGridClick);
});

function renderCountries() {
  const grid = document.getElementById("countries-grid");
  const countries = COUNTRIES.slice().sort((a, b) => a.name.localeCompare(b.name));

  if (countries.length === 0) {
    grid.innerHTML = `<p class="empty-state">No hay países cargados todavía. ¡Agregá el primero!</p>`;
    return;
  }

  grid.innerHTML = countries
    .map((country) => {
      const teams = TEAMS.filter((t) => t.country === country.name);
      const cities = new Set(teams.map((t) => t.city));
      return `
        <article class="country-card">
          <div class="country-card-header">
            <h2>${country.name}</h2>
            <span class="country-cities">${cities.size} ${cities.size === 1 ? "ciudad" : "ciudades"}</span>
          </div>
          <p class="country-count">${teams.length} ${teams.length === 1 ? "equipo" : "equipos"}</p>
          <ul class="country-teams">
            ${teams
              .map((t) => `<li><span>${t.name}</span><span class="country-team-league">${t.league}</span></li>`)
              .join("")}
          </ul>
          <div class="card-actions">
            <a class="btn btn-ghost btn-sm" href="pais-form.html?id=${country.id}">Editar</a>
            <button class="btn btn-danger btn-sm" type="button" data-delete-country="${country.id}">Eliminar</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function handleGridClick(event) {
  const button = event.target.closest("[data-delete-country]");
  if (!button) return;

  const id = Number(button.dataset.deleteCountry);
  const country = findCountry(id);
  if (!country) return;

  const confirmed = window.confirm(
    `¿Eliminar "${country.name}"? También se eliminarán sus ligas y equipos asociados.`
  );
  if (!confirmed) return;

  deleteCountry(id);
  renderCountries();
}
