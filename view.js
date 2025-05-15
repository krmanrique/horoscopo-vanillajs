// view.js
const container = document.getElementById("horoscope-container");
const button = document.getElementById("get-horoscope");
const input = document.getElementById("birthdate")

export function disableButton() {
  button.disabled = true;
}

export function enableButton() {
  button.disabled = false;
}

export function clearView() {
  container.innerHTML = "";
  container.classList.remove("visible", "fade-out");
}

export function renderHoroscope({ sign, message, emoji }) {
  container.innerHTML = `
    <p>Tu signo es <strong>${sign}</strong> ${emoji}</p>
    <p>${message}</p>
  `;
  container.classList.remove("fade-out");
  container.classList.add("visible");
}

export function renderError(msg = "Fecha inválida. Usa DD-MM-AAAA.") {
  container.textContent = msg;
  container.classList.add("visible");
}

export function fadeOut() {
  container.classList.add("fade-out");
}

export function onInputChange(callback) {
  input.addEventListener("input", callback);
}

export function getInputValue() {
  return input.value.trim();
}