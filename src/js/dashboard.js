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

function renderCharts(teams) {
  const byCountry = countBy(teams, "country");
  const byLeague = countBy(teams, "league");

  new Chart(document.getElementById("chart-countries"), {
    type: "bar",
    data: {
      labels: Object.keys(byCountry),
      datasets: [
        {
          label: "Equipos",
          data: Object.values(byCountry),
          backgroundColor: "#4f8cff",
          borderRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { precision: 0 } },
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
          backgroundColor: [
            "#4f8cff",
            "#35c78a",
            "#f5a623",
            "#e5484d",
            "#9b59f6",
            "#22b8cf",
            "#f06595",
            "#82c91e",
          ],
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
