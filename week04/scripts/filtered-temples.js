const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

menuButton.addEventListener('click', () => {
  navigation.classList.toggle('open');
});

document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last modified: ${document.lastModified}`;

const templeGallery = document.querySelector("#templeGallery");

const temples = [
  {
    templeName: "Salt Lake Temple",
    location: "Salt Lake City, Utah, USA",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669-main.jpg"
  },
  {
    templeName: "Accra Ghana Temple",
    location: "Accra, Ghana",
    dedicated: "2004, January, 11",
    area: 17500,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/accra-ghana-temple/accra-ghana-temple-13760-main.jpg"
  },
  {
    templeName: "Paris France Temple",
    location: "Le Chesnay, France",
    dedicated: "2017, May, 21",
    area: 44000,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/paris-france-temple/paris-france-temple-2056-main.jpg"
  },
  {
    templeName: "Mexico City Mexico Temple",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/mexico-city-mexico-temple/mexico-city-mexico-temple-4060-main.jpg"
  },
  {
    templeName: "Sydney Australia Temple",
    location: "Carlingford, Australia",
    dedicated: "1984, September, 20",
    area: 30000,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/sydney-australia-temple/sydney-australia-temple-43342-main.jpg"
  },
  {
    templeName: "Johannesburg South Africa Temple",
    location: "Johannesburg, South Africa",
    dedicated: "1985, August, 24",
    area: 19000,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/johannesburg-south-africa-temple/johannesburg-south-africa-temple-22475-main.jpg"
  },
  {
    templeName: "Rome Italy Temple",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 40000,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642-main.jpg"
  },
  {
    templeName: "Hong Kong China Temple",
    location: "Hong Kong, China",
    dedicated: "1996, May, 26",
    area: 28000,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/hong-kong-china-temple/hong-kong-china-temple-28125-main.jpg"
  },
  {
    templeName: "São Paulo Brazil Temple",
    location: "São Paulo, Brazil",
    dedicated: "1978, October, 30",
    area: 59000,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/_temp/017-S%C3%A3o-Paulo-Brazil-Temple.jpg"
  },
  {
    templeName: "Bern Switzerland Temple",
    location: "Zollikofen, Switzerland",
    dedicated: "1955, September, 11",
    area: 35000,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/bern-switzerland-temple/bern-switzerland-temple-54641-main.jpg"
  },
  {
    templeName: "Aba Nigeria Temple",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/aba-nigeria-temple/aba-nigeria-temple-5087-main.jpg"
  },
  {
    templeName: "Yigo Guam Temple",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/yigo-guam-temple/yigo-guam-temple-26495-main.jpg"
  },
  {
    templeName: "Kinshasa Democratic Republic of the Congo Temple",
    location: "Kinshasa, Democratic Republic of the Congo",
    dedicated: "2019, April, 14",
    area: 10225,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/kinshasa-democratic-republic-of-the-congo-temple/kinshasa-democratic-republic-of-the-congo-temple-3533-main.jpg"
  },
  {
    templeName: "Papeete Tahiti Temple",
    location: "Papeete, Tahiti",
    dedicated: "1983, October, 27",
    area: 9450,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/_temp/025-Papeete-Tahiti-Temple.jpg"
  }
];
function displayTemples(array) {
  templeGallery.innerHTML = "";
  array.forEach(temple => {
    const figure = document.createElement("figure");
    figure.innerHTML = `
      <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy">
      <figcaption>
        <h3>${temple.templeName}</h3>
        <p>${temple.location}</p>
        <p>Dedicated: ${temple.dedicated}</p>
        <p>Area: ${temple.area.toLocaleString()} sq ft</p>
      </figcaption>
    `;
    templeGallery.appendChild(figure);
  });
}

function displayAll() {
  displayTemples(temples);
}

function filterOld() {
  displayTemples(temples.filter(t => parseInt(t.dedicated) < 1900));
}

function filterNew() {
  displayTemples(temples.filter(t => parseInt(t.dedicated) > 2000));
}

function filterLarge() {
  displayTemples(temples.filter(t => t.area > 90000));
}

function filterSmall() {
  displayTemples(temples.filter(t => t.area < 10000));
}

document.addEventListener("DOMContentLoaded", displayAll);
