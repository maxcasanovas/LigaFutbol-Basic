// Dashboard del index: stats, charts y listado de equipos. Usa TEAMS de data.js.
document.addEventListener("DOMContentLoaded", () => {
  renderStats(TEAMS);
  renderCharts(TEAMS);
  renderTeamsTable(TEAMS);
});

function renderStats(teams) {
  const countries = new Set(teams.map((t) => t.country));
  const leagues = new Set(teams.map((t) => t.league));

  document.getElementById("stat-teams").textContent = teams.length;
  document.getElementById("stat-countries").textContent = countries.size;
  document.getElementById("stat-leagues").textContent = leagues.size;
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

function renderCharts(teams) {
  const byCountry = countBy(teams, "country");
  const byLeague = countBy(teams, "league");

  Chart.defaults.font.family = "'Nunito Sans', sans-serif";
  Chart.defaults.color = INK;

  new Chart(document.getElementById("chart-countries"), {
    type: "bar",
    data: {
      labels: Object.keys(byCountry),
      datasets: [
        {
          label: "Equipos",
          data: Object.values(byCountry),
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

  new Chart(document.getElementById("chart-leagues"), {
    type: "doughnut",
    data: {
      labels: Object.keys(byLeague),
      datasets: [
        {
          data: Object.values(byLeague),
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

function renderTeamsTable(teams) {
  const tbody = document.getElementById("teams-tbody");
  tbody.innerHTML = teams
    .map(
      (t) => `
        <tr>
          <td>${t.name}</td>
          <td>${t.league}</td>
          <td>${t.country}</td>
          <td>${t.city}</td>
          <td>${t.founded}</td>
        </tr>
      `
    )
    .join("");
}
