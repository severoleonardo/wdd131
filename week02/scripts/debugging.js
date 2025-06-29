// Seleciona os elementos da página
const radiusOutput = document.getElementById("radius");
const areaOutput = document.getElementById("area");

// Define o valor de PI corretamente
const PI = 3.14159;

// Usamos "let" pois o raio será alterado
let radius = 10;
let area = PI * radius * radius;

// Exibe os primeiros valores
radiusOutput.textContent = radius;
areaOutput.textContent = area;

// Atualiza o valor do raio e recalcula
radius = 20;
area = PI * radius * radius;

// Exibe os novos valores
radiusOutput.textContent = radius;
areaOutput.textContent = area;
