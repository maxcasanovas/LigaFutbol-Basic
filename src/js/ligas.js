// Página de ligas: agrupa TEAMS (data.js) por liga y arma una tarjeta por cada una.
document.addEventListener("DOMContentLoaded", () => {
  renderLeagues(TEAMS);
});

function groupByLeague(teams) {
  const leagues = {};
  teams.forEach((t) => {
    if (!leagues[t.league]) {
      leagues[t.league] = { name: t.league, country: t.country, teams: [] };
    }
    leagues[t.league].teams.push(t);
  });
  return Object.values(leagues).sort((a, b) => a.name.localeCompare(b.name));
}

function renderLeagues(teams) {
  const leagues = groupByLeague(teams);
  const grid = document.getElementById("leagues-grid");

  grid.innerHTML = leagues
    .map(
      (league) => `
        <article class="league-card">
          <div class="league-card-header">
            <h2>${league.name}</h2>
            <span class="league-country">${league.country}</span>
          </div>
          <p class="league-count">${league.teams.length} equipos</p>
          <ul class="league-teams">
            ${league.teams.map((t) => `<li>${t.name}</li>`).join("")}
          </ul>
        </article>
      `
    )
    .join("");
}
