// Capa de acceso a datos sobre COUNTRIES, LEAGUES, CITIES y TEAMS (data.js).
// No hay backend: cada mutación se refleja en sessionStorage para que sobreviva a la navegación
// entre páginas dentro de la misma pestaña. Se pierde al cerrar la pestaña o el navegador.
const STORAGE_KEY = "ligafutbol:data";

function replaceContents(array, newItems) {
  array.length = 0;
  array.push(...newItems);
}

function loadFromStorage() {
  let raw;
  try {
    raw = sessionStorage.getItem(STORAGE_KEY);
  } catch (e) {
    return;
  }
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);
    if (parsed.countries) replaceContents(COUNTRIES, parsed.countries);
    if (parsed.leagues) replaceContents(LEAGUES, parsed.leagues);
    if (parsed.cities) replaceContents(CITIES, parsed.cities);
    if (parsed.teams) replaceContents(TEAMS, parsed.teams);
  } catch (e) {
    // Datos corruptos en sessionStorage: se ignoran y quedan los valores por defecto de data.js.
  }
}

function persist() {
  try {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ countries: COUNTRIES, leagues: LEAGUES, cities: CITIES, teams: TEAMS })
    );
  } catch (e) {
    // sessionStorage no disponible (ej. navegación privada): los cambios solo viven en esta página.
  }
}

loadFromStorage();

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function nextId(items) {
  return items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}

function findCountry(id) {
  return COUNTRIES.find((c) => c.id === id);
}

function findLeague(id) {
  return LEAGUES.find((l) => l.id === id);
}

function findCity(id) {
  return CITIES.find((c) => c.id === id);
}

function findTeam(id) {
  return TEAMS.find((t) => t.id === id);
}

function saveCountry({ id, name }) {
  if (id) {
    const country = findCountry(id);
    const oldName = country.name;
    country.name = name;

    if (oldName !== name) {
      LEAGUES.forEach((l) => {
        if (l.country === oldName) l.country = name;
      });
      CITIES.forEach((c) => {
        if (c.country === oldName) c.country = name;
      });
      TEAMS.forEach((t) => {
        if (t.country === oldName) t.country = name;
      });
    }

    persist();
    return country;
  }

  const country = { id: nextId(COUNTRIES), name };
  COUNTRIES.push(country);
  persist();
  return country;
}

function deleteCountry(id) {
  const country = findCountry(id);
  if (!country) return;

  LEAGUES.filter((l) => l.country === country.name)
    .map((l) => l.id)
    .forEach(deleteLeague);

  CITIES.filter((c) => c.country === country.name)
    .map((c) => c.id)
    .forEach(deleteCity);

  for (let i = TEAMS.length - 1; i >= 0; i--) {
    if (TEAMS[i].country === country.name) TEAMS.splice(i, 1);
  }

  const index = COUNTRIES.findIndex((c) => c.id === id);
  COUNTRIES.splice(index, 1);
  persist();
}

function saveLeague({ id, name, country }) {
  if (id) {
    const league = findLeague(id);
    const oldName = league.name;
    league.name = name;
    league.country = country;

    TEAMS.forEach((t) => {
      if (t.league === oldName) {
        t.league = name;
        t.country = country;
      }
    });

    persist();
    return league;
  }

  const league = { id: nextId(LEAGUES), name, country };
  LEAGUES.push(league);
  persist();
  return league;
}

function deleteLeague(id) {
  const league = findLeague(id);
  if (!league) return;

  for (let i = TEAMS.length - 1; i >= 0; i--) {
    if (TEAMS[i].league === league.name) TEAMS.splice(i, 1);
  }

  const index = LEAGUES.findIndex((l) => l.id === id);
  LEAGUES.splice(index, 1);
  persist();
}

function saveCity({ id, name, country }) {
  if (id) {
    const city = findCity(id);
    const oldName = city.name;
    city.name = name;
    city.country = country;

    TEAMS.forEach((t) => {
      if (t.city === oldName) t.city = name;
    });

    persist();
    return city;
  }

  const city = { id: nextId(CITIES), name, country };
  CITIES.push(city);
  persist();
  return city;
}

function deleteCity(id) {
  const city = findCity(id);
  if (!city) return;

  for (let i = TEAMS.length - 1; i >= 0; i--) {
    if (TEAMS[i].city === city.name) TEAMS.splice(i, 1);
  }

  const index = CITIES.findIndex((c) => c.id === id);
  CITIES.splice(index, 1);
  persist();
}

function saveTeam({ id, name, league, city, founded, stadium }) {
  const leagueObj = LEAGUES.find((l) => l.name === league);
  const country = leagueObj ? leagueObj.country : "";

  if (id) {
    const team = findTeam(id);
    Object.assign(team, { name, league, country, city, founded, stadium });
    persist();
    return team;
  }

  const team = { id: nextId(TEAMS), name, league, country, city, founded, stadium };
  TEAMS.push(team);
  persist();
  return team;
}

function deleteTeam(id) {
  const index = TEAMS.findIndex((t) => t.id === id);
  if (index !== -1) TEAMS.splice(index, 1);
  persist();
}
