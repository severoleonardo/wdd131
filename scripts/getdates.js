document.addEventListener('DOMContentLoaded', () => {
    // Atualizar o ano corrente
    const currentYearElement = document.getElementById('currentyear');
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;

    // Atualizar a data de última modificação
    const lastModifiedElement = document.getElementById('lastModified');
    lastModifiedElement.textContent = `Last modified: ${document.lastModified}`;
});
