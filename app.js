const phrases = [
  "Un momento, el pH perfecto toma tiempo",
  "Contando burbujas y pidiendo a los peces no morder los sensores",
  "Calibrando las mareas",
  "Tu mundo acuático casi está listo",
  "Traduciendo acento de Veracruz, espere un momento"
];

let aquariumId = "";
const ESP_URL = "http://esp32.local"; 
// o http://192.168.X.X si no usas mDNS

function show(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function connect() {
  const input = document.getElementById("aquariumId").value.trim().toUpperCase();
  if (input.length !== 6) {
    document.getElementById("error").textContent = "ID inválido";
    return;
  }

  aquariumId = input;
  localStorage.setItem("aquariumId", aquariumId);

  show("screen-loading");
  document.getElementById("loadingText").textContent =
    phrases[Math.floor(Math.random() * phrases.length)];

  setTimeout(testConnection, 4000);
}

function testConnection() {
  fetch(`${ESP_URL}/data?id=${aquariumId}`)
    .then(r => {
      if (!r.ok) throw "fail";
      show("screen-menu");
      updateData();
      setInterval(updateData, 3000);
    })
    .catch(() => {
      show("screen-id");
      document.getElementById("error").textContent = "No se encontró el dispositivo";
    });
}

function updateData() {
  fetch(`${ESP_URL}/data?id=${aquariumId}`)
    .then(r => r.json())
    .then(d => {
      document.getElementById("temp").textContent = d.temp;
      document.getElementById("ph").textContent = d.ph;
    });
}

function feed(size) {
  fetch(`${ESP_URL}/feed?size=${size}&id=${aquariumId}`);
}

function setColor(hex) {
  const r = parseInt(hex.substr(1,2),16);
  const g = parseInt(hex.substr(3,2),16);
  const b = parseInt(hex.substr(5,2),16);
  fetch(`${ESP_URL}/rgb?r=${r}&g=${g}&b=${b}&id=${aquariumId}`);
}

// Auto-login
const saved = localStorage.getItem("aquariumId");
if (saved) {
  aquariumId = saved;
  show("screen-loading");
  setTimeout(testConnection, 2000);
}
