// Página de ciudades: usa CITIES (data.js) como fuente de verdad y TEAMS para las relaciones.
document.addEventListener("DOMContentLoaded", () => {
  renderCities();
  document.getElementById("cities-grid").addEventListener("click", handleGridClick);
});

function renderCities() {
  const grid = document.getElementById("cities-grid");
  const cities = CITIES.slice().sort((a, b) => a.name.localeCompare(b.name));

  if (cities.length === 0) {
    grid.innerHTML = `<p class="empty-state">No hay ciudades cargadas todavía. ¡Agregá la primera!</p>`;
    return;
  }

  grid.innerHTML = cities
    .map((city) => {
      const teams = TEAMS.filter((t) => t.city === city.name);
      return `
        <article class="city-card">
          <div class="city-card-header">
            <h2>${city.name}</h2>
            <span class="city-country">${city.country}</span>
          </div>
          <p class="city-count">${teams.length} ${teams.length === 1 ? "equipo" : "equipos"}</p>
          <ul class="city-teams">
            ${teams
              .map(
                (t) => `<li><span>${t.name}</span><span class="city-team-detail">${t.league} · ${t.stadium}</span></li>`
              )
              .join("")}
          </ul>
          <div class="card-actions">
            <a class="btn btn-ghost btn-sm" href="ciudad-form.html?id=${city.id}">Editar</a>
            <button class="btn btn-danger btn-sm" type="button" data-delete-city="${city.id}">Eliminar</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function handleGridClick(event) {
  const button = event.target.closest("[data-delete-city]");
  if (!button) return;

  const id = Number(button.dataset.deleteCity);
  const city = findCity(id);
  if (!city) return;

  const confirmed = window.confirm(
    `¿Eliminar "${city.name}"? También se eliminarán sus equipos asociados.`
  );
  if (!confirmed) return;

  deleteCity(id);
  renderCities();
}
