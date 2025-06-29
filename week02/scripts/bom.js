// Select the input, button, and list elements
const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");

// Add event listener to the button
button.addEventListener("click", () => {
  const chapter = input.value.trim(); // Get the value from the input

  // Check for empty input
  if (chapter === "") {
    input.focus();
    return;
  }

  // Create a new <li> element
  const li = document.createElement("li");

  // Create a delete button
  const deleteButton = document.createElement("button");

  // Set content and attributes
  li.textContent = chapter; // Display chapter name
  deleteButton.textContent = "❌"; // Symbol
  deleteButton.setAttribute("aria-label", `Remove ${chapter}`); // Accessibility

  // Append button to <li>
  li.appendChild(deleteButton);

  // Append <li> to the list
  list.appendChild(li);

  // Clear input and set focus back
  input.value = "";
  input.focus();

  // Enable delete functionality
  deleteButton.addEventListener("click", () => {
    list.removeChild(li);
  });
});
