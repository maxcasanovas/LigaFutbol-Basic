// Formulario de ciudad (crear/editar). Sin backend: guarda directamente en CITIES vía store.js.
document.addEventListener("DOMContentLoaded", () => {
  const id = Number(getQueryParam("id")) || null;
  const form = document.getElementById("ciudad-form");
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

  if (id) {
    const city = findCity(id);
    if (city) {
      title.textContent = "Editar ciudad";
      nameInput.value = city.name;
      countrySelect.value = city.country;
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const country = countrySelect.value;

    if (!name || !country) {
      error.textContent = "Completá el nombre y el país de la ciudad.";
      error.hidden = false;
      return;
    }

    const duplicate = CITIES.some(
      (c) => c.name.toLowerCase() === name.toLowerCase() && c.id !== id
    );
    if (duplicate) {
      error.textContent = "Ya existe una ciudad con ese nombre.";
      error.hidden = false;
      return;
    }

    error.hidden = true;
    saveCity({ id, name, country });
    window.location.href = "ciudades.html";
  });
});
