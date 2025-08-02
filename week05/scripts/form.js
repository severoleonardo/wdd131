// Product array with id, name, and average rating
const products = [
  { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
  { id: "fc-2050", name: "power laces", averagerating: 4.7 },
  { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
  { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
  { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];

// Select the dropdown element from the form
const productDropdown = document.getElementById("productName");

// Loop through the array and add each product as an option
products.forEach(product => {
  const option = document.createElement("option");
  option.value = product.id;              // Set the value as product ID
  option.textContent = product.name;      // Display the product name
  productDropdown.appendChild(option);    // Append to <select>
});
