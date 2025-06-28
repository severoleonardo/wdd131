document.addEventListener("DOMContentLoaded", function() {
    const temperature = parseFloat(document.getElementById('temperature').textContent);
    const windSpeed = parseFloat(document.getElementById('wind-speed').textContent);

    function calculateWindChill(temp, speed) {
        if (temp <= 10 && speed > 4.8) {
            return (13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16)).toFixed(1);
        } else {
            return "N/A";
        }
    }

    const windChill = calculateWindChill(temperature, windSpeed);
    document.getElementById('wind-chill').textContent = windChill + " °C";

    const lastModified = document.lastModified;
    document.getElementById('last-modified').textContent = lastModified;
});
