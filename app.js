const loadingText = document.getElementById("loading-text");
const loadingScreen = document.getElementById("loading");
const dashboard = document.getElementById("dashboard");

const phrases = [
  "Calibrando sensores submarinos…",
  "Contando burbujas con precisión científica…",
  "Negociando con los peces locales…",
  "Ajustando pH al equilibrio perfecto…"
];

let index = 0;

setInterval(() => {
  loadingText.textContent = phrases[index % phrases.length];
  index++;
}, 3500);

// Simulación de conexión ESP32
setTimeout(() => {
  loadingScreen.classList.remove("active");
  dashboard.classList.add("active");

  // Datos simulados
  document.getElementById("ph").textContent = "7.2";
  document.getElementById("temp").textContent = "24.6°C";
  document.getElementById("turb").textContent = "Baja";
}, 8000);
