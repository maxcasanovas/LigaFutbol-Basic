// Formulario de equipo (crear/editar). Sin backend: guarda directamente en TEAMS vía store.js.
// El país del equipo se deriva de la liga elegida, no se pide por separado.
//
// Query params soportados:
//   id       -> id del equipo a editar.
//   leagueId -> preselecciona una liga (usado al crear un equipo desde liga-form.html).
//   back     -> URL a la que volver al guardar/cancelar (por defecto index.html).
document.addEventListener("DOMContentLoaded", () => {
  const id = Number(getQueryParam("id")) || null;
  const leagueId = Number(getQueryParam("leagueId")) || null;
  const back = getQueryParam("back") || "index.html";

  const form = document.getElementById("equipo-form");
  const title = document.getElementById("form-title");
  const error = document.getElementById("form-error");
  const nameInput = form.elements.name;
  const leagueSelect = form.elements.league;
  const citySelect = form.elements.city;
  const foundedInput = form.elements.founded;
  const stadiumInput = form.elements.stadium;
  const countryPreview = document.getElementById("team-country-preview");
  const submitButton = form.querySelector("button[type=submit]");
  const cancelLink = document.getElementById("cancel-link");

  cancelLink.href = back;

  const sortedLeagues = LEAGUES.slice().sort((a, b) => a.name.localeCompare(b.name));
  leagueSelect.innerHTML =
    `<option value="" disabled selected>Seleccioná una liga</option>` +
    sortedLeagues.map((l) => `<option value="${l.name}">${l.name} (${l.country})</option>`).join("");

  const sortedCities = CITIES.slice().sort((a, b) => a.name.localeCompare(b.name));
  citySelect.innerHTML =
    `<option value="" disabled selected>Seleccioná una ciudad</option>` +
    sortedCities.map((c) => `<option value="${c.name}">${c.name} (${c.country})</option>`).join("");

  function updateCountryPreview() {
    const league = LEAGUES.find((l) => l.name === leagueSelect.value);
    countryPreview.textContent = league ? `País: ${league.country}` : "";
  }

  if (LEAGUES.length === 0) {
    error.textContent = "Primero necesitás crear una liga.";
    error.hidden = false;
    submitButton.disabled = true;
  } else if (CITIES.length === 0) {
    error.textContent = "Primero necesitás crear una ciudad.";
    error.hidden = false;
    submitButton.disabled = true;
  }

  leagueSelect.addEventListener("change", updateCountryPreview);

  if (id) {
    const team = findTeam(id);
    if (team) {
      title.textContent = "Editar equipo";
      nameInput.value = team.name;
      leagueSelect.value = team.league;
      citySelect.value = team.city;
      foundedInput.value = team.founded;
      stadiumInput.value = team.stadium;
      updateCountryPreview();
    }
  } else if (leagueId) {
    const league = findLeague(leagueId);
    if (league) {
      leagueSelect.value = league.name;
      updateCountryPreview();
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const league = leagueSelect.value;
    const city = citySelect.value;
    const founded = Number(foundedInput.value);
    const stadium = stadiumInput.value.trim();

    if (!name || !league || !city || !founded || !stadium) {
      error.textContent = "Completá todos los campos.";
      error.hidden = false;
      return;
    }

    error.hidden = true;
    saveTeam({ id, name, league, city, founded, stadium });
    window.location.href = back;
  });
});
