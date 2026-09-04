// Login sin backend: solo valida que los campos estén completos y redirige al Dashboard.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const error = document.getElementById("login-error");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      error.hidden = false;
      return;
    }

    error.hidden = true;
    window.location.href = "index.html";
  });
});
