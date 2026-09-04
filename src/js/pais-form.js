// Formulario de país (crear/editar). Sin backend: guarda directamente en COUNTRIES vía store.js.
document.addEventListener("DOMContentLoaded", () => {
  const id = Number(getQueryParam("id")) || null;
  const form = document.getElementById("pais-form");
  const title = document.getElementById("form-title");
  const error = document.getElementById("form-error");
  const nameInput = form.elements.name;

  if (id) {
    const country = findCountry(id);
    if (country) {
      title.textContent = "Editar país";
      nameInput.value = country.name;
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();

    if (!name) {
      error.textContent = "El nombre del país es obligatorio.";
      error.hidden = false;
      return;
    }

    const duplicate = COUNTRIES.some(
      (c) => c.name.toLowerCase() === name.toLowerCase() && c.id !== id
    );
    if (duplicate) {
      error.textContent = "Ya existe un país con ese nombre.";
      error.hidden = false;
      return;
    }

    error.hidden = true;
    saveCountry({ id, name });
    window.location.href = "paises.html";
  });
});
