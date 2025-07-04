// Atualiza o ano atual no rodapé
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Atualiza a data da última modificação
document.getElementById("lastModified").textContent = document.lastModified;

// Função para calcular o wind chill (em °C)
function calculateWindChill(tempC, windKmh) {
  return (
    13.12 +
    0.6215 * tempC -
    11.37 * Math.pow(windKmh, 0.16) +
    0.3965 * tempC * Math.pow(windKmh, 0.16)
  ).toFixed(1);
}

// Valores estáticos (devem coincidir com os exibidos no HTML)
const temp = parseFloat(document.getElementById("temp").textContent);
const wind = parseFloat(document.getElementById("wind").textContent);

// Verifica se as condições são adequadas para calcular o wind chill
let chill = "N/A";
if (temp <= 10 && wind > 4.8) {
  chill = `${calculateWindChill(temp, wind)} °C`;
}

// Atualiza o conteúdo da página
document.getElementById("chill").textContent = chill;
