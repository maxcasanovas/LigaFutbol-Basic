// Dashboard del index: stats, charts y listado de equipos. Usa COUNTRIES, LEAGUES y TEAMS de data.js.
document.addEventListener("DOMContentLoaded", () => {
  renderStats();
  renderCharts();
  renderTeamsTable();
  document.getElementById("teams-tbody").addEventListener("click", handleTableClick);
});

function renderStats() {
  document.getElementById("stat-teams").textContent = TEAMS.length;
  document.getElementById("stat-countries").textContent = COUNTRIES.length;
  document.getElementById("stat-leagues").textContent = LEAGUES.length;
}

function countBy(teams, key) {
  const counts = {};
  teams.forEach((t) => {
    counts[t[key]] = (counts[t[key]] || 0) + 1;
  });
  return counts;
}

const PALETTE = ["#d1462f", "#e0a940", "#4f7942", "#2f6690", "#8a4b6b", "#c97b3d", "#3d6b5c", "#a83250"];
const INK = "#2b2013";
let countriesChart = null;
let leaguesChart = null;

function renderCharts() {
  const byCountry = countBy(TEAMS, "country");
  const byLeague = countBy(TEAMS, "league");

  const countryLabels = COUNTRIES.slice().sort((a, b) => a.name.localeCompare(b.name)).map((c) => c.name);
  const leagueLabels = LEAGUES.slice().sort((a, b) => a.name.localeCompare(b.name)).map((l) => l.name);

  Chart.defaults.font.family = "'Nunito Sans', sans-serif";
  Chart.defaults.color = INK;

  if (countriesChart) countriesChart.destroy();
  if (leaguesChart) leaguesChart.destroy();

  countriesChart = new Chart(document.getElementById("chart-countries"), {
    type: "bar",
    data: {
      labels: countryLabels,
      datasets: [
        {
          label: "Equipos",
          data: countryLabels.map((name) => byCountry[name] || 0),
          backgroundColor: "#d1462f",
          borderColor: INK,
          borderWidth: 2,
          borderRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { precision: 0 }, grid: { color: "rgba(43,32,19,0.12)" } },
        x: { grid: { display: false } },
      },
    },
  });

  leaguesChart = new Chart(document.getElementById("chart-leagues"), {
    type: "doughnut",
    data: {
      labels: leagueLabels,
      datasets: [
        {
          data: leagueLabels.map((name) => byLeague[name] || 0),
          backgroundColor: PALETTE,
          borderColor: "#fffaf0",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { position: "bottom", labels: { boxWidth: 12 } } },
    },
  });
}

function renderTeamsTable() {
  const tbody = document.getElementById("teams-tbody");

  if (TEAMS.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="empty-state">No hay equipos cargados todavía.</td></tr>`;
    return;
  }

  tbody.innerHTML = TEAMS
    .map(
      (t) => `
        <tr>
          <td>${t.name}</td>
          <td>${t.league}</td>
          <td>${t.country}</td>
          <td>${t.city}</td>
          <td>${t.founded}</td>
          <td>
            <div class="table-actions">
              <a class="btn btn-ghost btn-sm" href="equipo-form.html?id=${t.id}">Editar</a>
              <button class="btn btn-danger btn-sm" type="button" data-delete-team="${t.id}">Eliminar</button>
            </div>
          </td>
        </tr>
      `
    )
    .join("");
}

function handleTableClick(event) {
  const button = event.target.closest("[data-delete-team]");
  if (!button) return;

  const id = Number(button.dataset.deleteTeam);
  const team = findTeam(id);
  if (!team) return;

  const confirmed = window.confirm(`¿Eliminar el equipo "${team.name}"?`);
  if (!confirmed) return;

  deleteTeam(id);
  renderStats();
  renderCharts();
  renderTeamsTable();
}
