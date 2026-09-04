// Datos estáticos del portal LigaFutbol. Sin API: todo vive en estos arrays en memoria.
// Los formularios de CRUD (país, liga, equipo) leen y mutan estos mismos arrays vía store.js.
const COUNTRIES = [
  { id: 1, name: "Argentina" },
  { id: 2, name: "Brasil" },
  { id: 3, name: "España" },
  { id: 4, name: "Inglaterra" },
  { id: 5, name: "Italia" },
  { id: 6, name: "Alemania" },
  { id: 7, name: "Francia" },
  { id: 8, name: "Portugal" },
];

const LEAGUES = [
  { id: 1, name: "Liga Profesional Argentina", country: "Argentina" },
  { id: 2, name: "Brasileirão", country: "Brasil" },
  { id: 3, name: "LaLiga", country: "España" },
  { id: 4, name: "Premier League", country: "Inglaterra" },
  { id: 5, name: "Serie A", country: "Italia" },
  { id: 6, name: "Bundesliga", country: "Alemania" },
  { id: 7, name: "Ligue 1", country: "Francia" },
  { id: 8, name: "Primeira Liga", country: "Portugal" },
];

const TEAMS = [
  { id: 1, name: "River Plate", league: "Liga Profesional Argentina", country: "Argentina", city: "Buenos Aires", founded: 1901, stadium: "Estadio Monumental" },
  { id: 2, name: "Boca Juniors", league: "Liga Profesional Argentina", country: "Argentina", city: "Buenos Aires", founded: 1905, stadium: "La Bombonera" },
  { id: 3, name: "Racing Club", league: "Liga Profesional Argentina", country: "Argentina", city: "Avellaneda", founded: 1903, stadium: "Estadio Presidente Perón" },

  { id: 4, name: "Flamengo", league: "Brasileirão", country: "Brasil", city: "Río de Janeiro", founded: 1895, stadium: "Maracaná" },
  { id: 5, name: "Palmeiras", league: "Brasileirão", country: "Brasil", city: "São Paulo", founded: 1914, stadium: "Allianz Parque" },
  { id: 6, name: "Corinthians", league: "Brasileirão", country: "Brasil", city: "São Paulo", founded: 1910, stadium: "Neo Química Arena" },

  { id: 7, name: "Real Madrid", league: "LaLiga", country: "España", city: "Madrid", founded: 1902, stadium: "Santiago Bernabéu" },
  { id: 8, name: "FC Barcelona", league: "LaLiga", country: "España", city: "Barcelona", founded: 1899, stadium: "Spotify Camp Nou" },
  { id: 9, name: "Atlético de Madrid", league: "LaLiga", country: "España", city: "Madrid", founded: 1903, stadium: "Cívitas Metropolitano" },

  { id: 10, name: "Manchester United", league: "Premier League", country: "Inglaterra", city: "Mánchester", founded: 1878, stadium: "Old Trafford" },
  { id: 11, name: "Liverpool FC", league: "Premier League", country: "Inglaterra", city: "Liverpool", founded: 1892, stadium: "Anfield" },
  { id: 12, name: "Arsenal FC", league: "Premier League", country: "Inglaterra", city: "Londres", founded: 1886, stadium: "Emirates Stadium" },

  { id: 13, name: "Juventus", league: "Serie A", country: "Italia", city: "Turín", founded: 1897, stadium: "Allianz Stadium" },
  { id: 14, name: "AC Milan", league: "Serie A", country: "Italia", city: "Milán", founded: 1899, stadium: "San Siro" },
  { id: 15, name: "Inter de Milán", league: "Serie A", country: "Italia", city: "Milán", founded: 1908, stadium: "San Siro" },

  { id: 16, name: "Bayern Múnich", league: "Bundesliga", country: "Alemania", city: "Múnich", founded: 1900, stadium: "Allianz Arena" },
  { id: 17, name: "Borussia Dortmund", league: "Bundesliga", country: "Alemania", city: "Dortmund", founded: 1909, stadium: "Signal Iduna Park" },
  { id: 18, name: "RB Leipzig", league: "Bundesliga", country: "Alemania", city: "Leipzig", founded: 2009, stadium: "Red Bull Arena" },

  { id: 19, name: "Paris Saint-Germain", league: "Ligue 1", country: "Francia", city: "París", founded: 1970, stadium: "Parc des Princes" },
  { id: 20, name: "Olympique de Marsella", league: "Ligue 1", country: "Francia", city: "Marsella", founded: 1899, stadium: "Stade Vélodrome" },
  { id: 21, name: "AS Mónaco", league: "Ligue 1", country: "Francia", city: "Mónaco", founded: 1924, stadium: "Stade Louis II" },

  { id: 22, name: "SL Benfica", league: "Primeira Liga", country: "Portugal", city: "Lisboa", founded: 1904, stadium: "Estádio da Luz" },
  { id: 23, name: "FC Porto", league: "Primeira Liga", country: "Portugal", city: "Oporto", founded: 1893, stadium: "Estádio do Dragão" },
  { id: 24, name: "Sporting CP", league: "Primeira Liga", country: "Portugal", city: "Lisboa", founded: 1906, stadium: "Estádio José Alvalade" }
];
