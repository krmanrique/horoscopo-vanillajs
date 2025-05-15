// controller.js
import { getZodiacSign, getHoroscope } from "./model.js";
import {
  disableButton,
  enableButton,
  clearView,
  renderHoroscope,
  renderError,
  fadeOut,
  onInputChange,
  getInputValue,
} from "./view.js";

let hideTimeout;

// 🟢 Validar formato DD-MM-AAAA
function isValidDateFormat(dateStr) {
  const regex = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
  const match = dateStr.match(regex);
  if (!match) return false;

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);

  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() + 1 === month &&
    date.getDate() === day
  );
}


// 🟡 Evento al escribir en input
onInputChange(() => {
  const date = getInputValue();
  if (isValidDateFormat(date)) {
    enableButton(); // AC2
  } else {
    disableButton();
  }
});

// 🔴 Evento al hacer clic en “Consultar”
document
  .getElementById("get-horoscope")
  .addEventListener("click", () => {
    clearTimeout(hideTimeout);
    clearView();
    disableButton(); // AC4

    const dateStr = getInputValue();
    if (!isValidDateFormat(dateStr)) {
      renderError();
      enableButton();
      return;
    }

    const [day, month] = dateStr.split("-").map(Number);
    const sign = getZodiacSign(day, month);

    if (!sign) {
      renderError("No se pudo determinar el signo zodiacal.");
      enableButton();
      return;
    }

    const { message, emoji } = getHoroscope(sign);
    renderHoroscope({ sign, message, emoji }); // AC3

    // ⏳ Mantener 15s visible
    hideTimeout = setTimeout(() => {
      fadeOut(); // AC5
      setTimeout(() => {
        clearView();
        enableButton(); // AC5
      }, 1000); // duración de animación fade
    }, 15000); // AC4
  });
