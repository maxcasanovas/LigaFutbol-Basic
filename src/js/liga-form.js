// Formulario de liga (crear/editar). Sin backend: guarda directamente en LEAGUES vía store.js.
// Al guardar (crear o editar) se vuelve a esta misma página en modo edición, donde además se
// puede ver y gestionar los equipos de la liga sin salir del formulario.
document.addEventListener("DOMContentLoaded", () => {
  const id = Number(getQueryParam("id")) || null;
  const form = document.getElementById("liga-form");
  const title = document.getElementById("form-title");
  const error = document.getElementById("form-error");
  const nameInput = form.elements.name;
  const countrySelect = form.elements.country;
  const submitButton = form.querySelector("button[type=submit]");

  const sortedCountries = COUNTRIES.slice().sort((a, b) => a.name.localeCompare(b.name));
  countrySelect.innerHTML =
    `<option value="" disabled selected>Seleccioná un país</option>` +
    sortedCountries.map((c) => `<option value="${c.name}">${c.name}</option>`).join("");

  if (COUNTRIES.length === 0) {
    error.textContent = "Primero necesitás crear un país.";
    error.hidden = false;
    submitButton.disabled = true;
  }

  let editingLeague = null;
  if (id) {
    editingLeague = findLeague(id);
    if (editingLeague) {
      title.textContent = "Editar liga";
      nameInput.value = editingLeague.name;
      countrySelect.value = editingLeague.country;
      renderLeagueTeams(editingLeague);
    }
  }

  document.getElementById("league-teams-tbody").addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete-team]");
    if (!button || !editingLeague) return;

    const teamId = Number(button.dataset.deleteTeam);
    const team = findTeam(teamId);
    if (!team) return;

    const confirmed = window.confirm(`¿Eliminar el equipo "${team.name}"?`);
    if (!confirmed) return;

    deleteTeam(teamId);
    renderLeagueTeams(editingLeague);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const country = countrySelect.value;

    if (!name || !country) {
      error.textContent = "Completá el nombre y el país de la liga.";
      error.hidden = false;
      return;
    }

    const duplicate = LEAGUES.some(
      (l) => l.name.toLowerCase() === name.toLowerCase() && l.id !== id
    );
    if (duplicate) {
      error.textContent = "Ya existe una liga con ese nombre.";
      error.hidden = false;
      return;
    }

    error.hidden = true;
    const saved = saveLeague({ id, name, country });
    window.location.href = `liga-form.html?id=${saved.id}`;
  });
});

function renderLeagueTeams(league) {
  const section = document.getElementById("league-teams-section");
  const tbody = document.getElementById("league-teams-tbody");
  const addLink = document.getElementById("add-team-link");

  section.hidden = false;
  const backUrl = `liga-form.html?id=${league.id}`;
  addLink.href = `equipo-form.html?leagueId=${league.id}&back=${encodeURIComponent(backUrl)}`;

  const teams = TEAMS.filter((t) => t.league === league.name);

  if (teams.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="empty-state">Todavía no hay equipos en esta liga.</td></tr>`;
    return;
  }

  tbody.innerHTML = teams
    .map(
      (t) => `
        <tr>
          <td>${t.name}</td>
          <td>${t.city}</td>
          <td>${t.founded}</td>
          <td>
            <div class="table-actions">
              <a class="btn btn-ghost btn-sm" href="equipo-form.html?id=${t.id}&back=${encodeURIComponent(backUrl)}">Editar</a>
              <button class="btn btn-danger btn-sm" type="button" data-delete-team="${t.id}">Eliminar</button>
            </div>
          </td>
        </tr>
      `
    )
    .join("");
}
