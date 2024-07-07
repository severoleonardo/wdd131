/* w05-task.js */
/* W05: Programming Tasks */

/* Declare and initialize global variables */
const templesElement = document.getElementById('temples');
let templeList = [];

/* async displayTemples Function */
const displayTemples = (temples) => {
    // Clear the templesElement
    templesElement.innerHTML = '';

    // Process each temple in the temples array using forEach
    temples.forEach((temple) => {
        // Create an HTML <article> element
        const templeElement = document.createElement('article');

        // Create an HTML <h3> element for temple name
        const h3 = document.createElement('h3');
        h3.textContent = temple.templeName;

        // Create an HTML <img> element for temple image
        const img = document.createElement('img');
        img.src = temple.imageUrl;
        img.alt = temple.location;

        // Append <h3> and <img> elements to the <article> element
        templeElement.appendChild(h3);
        templeElement.appendChild(img);

        // Append the <article> element to the global templesElement variable
        templesElement.appendChild(templeElement);
    });
};


/* async getTemples Function using fetch()*/
const getTemples = async () => {
    try {
        // Fetch the data from a JSON file using fetch()
        const response = await fetch('https://byui-cse.github.io/cse121b-ww-course/resources/temples.json');

        // Check if the response is NOT ok
        if (!response.ok) {
            throw new Error(`Failed to fetch temple data: ${response.status}`);
        }

        // Extract JSON data from the response
        const templesData = await response.json();

        // Assign the extracted JSON data to the templeList global array variable
        templeList = templesData;

        // Call the displayTemples function to display the temples
        displayTemples(templesData);
    } catch (error) {
        console.error('Error fetching temple data:', error);
    }
};


// Test the code by calling the getTemples function
getTemples()
    .then(() => {
        console.log(templeList);
    })
    .catch((error) => {
        console.error('Error:', error);
    });


/* reset Function */
const reset = () => {
    // Clear all <article> elemments from the templesElement
    templesElement.innerHTML = '';
};

/* filterTemples Function */
const filterTemples = (temples) => {
    // Call reset function to clear the output 
    reset();

    // Get the value of the HTML select element with ID "filtered"
    const filter = document.getElementById('filtered').value;

    // Handle sorting option 
    if (filter === 'alphabetical') {
        temples.sort((a, b) => {
            // Sort temples alphabetically by templeName
            const nameA = a.templeName.toLowerCase();
            const nameB = b.templeName.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
    } else {
        // Handle other filtering options
        switch (filter) {
            case 'utah':
                temples = temples.filter(temple => temple.location.toLowerCase().includes('utah'));
                break;
            case 'notutah':
                temples = temples.filter(temple => !temple.location.toLowerCase().includes('utah'));
                break;
            case 'older':
                temples = temples.filter(temple => new Date(temple.dedicated) < new Date(1950, 0, 1));
                break;
            case 'all':
            default:
                // no filter applied
                break;
        }
    }
    
    // Display the filtered temples
    displayTemples(temples);
};



/* Event Listener */
// Add event list to the HTML select element with ID "filtered"
document.querySelector('#filtered').addEventListener('change', () => {
    filterTemples(templeList);
});