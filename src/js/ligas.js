// Página de ligas: usa LEAGUES (data.js) como fuente de verdad y TEAMS para las relaciones.
document.addEventListener("DOMContentLoaded", () => {
  renderLeagues();
  document.getElementById("leagues-grid").addEventListener("click", handleGridClick);
});

function renderLeagues() {
  const grid = document.getElementById("leagues-grid");
  const leagues = LEAGUES.slice().sort((a, b) => a.name.localeCompare(b.name));

  if (leagues.length === 0) {
    grid.innerHTML = `<p class="empty-state">No hay ligas cargadas todavía. ¡Agregá la primera!</p>`;
    return;
  }

  grid.innerHTML = leagues
    .map((league) => {
      const teams = TEAMS.filter((t) => t.league === league.name);
      return `
        <article class="league-card">
          <div class="league-card-header">
            <h2>${league.name}</h2>
            <span class="league-country">${league.country}</span>
          </div>
          <p class="league-count">${teams.length} ${teams.length === 1 ? "equipo" : "equipos"}</p>
          <ul class="league-teams">
            ${teams.map((t) => `<li>${t.name}</li>`).join("")}
          </ul>
          <div class="card-actions">
            <a class="btn btn-ghost btn-sm" href="liga-form.html?id=${league.id}">Editar</a>
            <button class="btn btn-danger btn-sm" type="button" data-delete-league="${league.id}">Eliminar</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function handleGridClick(event) {
  const button = event.target.closest("[data-delete-league]");
  if (!button) return;

  const id = Number(button.dataset.deleteLeague);
  const league = findLeague(id);
  if (!league) return;

  const confirmed = window.confirm(
    `¿Eliminar "${league.name}"? También se eliminarán sus equipos asociados.`
  );
  if (!confirmed) return;

  deleteLeague(id);
  renderLeagues();
}
