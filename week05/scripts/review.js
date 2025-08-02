// Retrieve existing counter from localStorage, or start at 0
let reviewCount = parseInt(localStorage.getItem("reviewCount")) || 0;

// Increment the counter
reviewCount++;

// Save it back to localStorage
localStorage.setItem("reviewCount", reviewCount);

// Display the count in the confirmation page
const counterElement = document.getElementById("counter");
if (counterElement) {
  counterElement.textContent = `Reviews submitted: ${reviewCount}`;
}
