document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.querySelector(".search-bar button:nth-child(2)");
    const clearButton = document.querySelector(".search-bar button:nth-child(3)");
    const resultsContainer = document.getElementById("search-results");

    // Fetch data from the JSON file
    let travelData = {};
    fetch("travel_recommendation_api.json")
        .then(response => response.json())
        .then(data => {
            travelData = data;
        })
        .catch(error => console.error("Error fetching data:", error));

    // Function to display search results
    function displayResults(results) {
        resultsContainer.innerHTML = ""; // Clear previous results
        if (results.length === 0) {
            resultsContainer.innerHTML = `<p>No results found</p>`;
            return;
        }

        results.forEach(item => {
            const card = document.createElement("div");
            card.className = "result-card";

            card.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}" class="result-image">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <button>Visit</button>
            `;

            resultsContainer.appendChild(card);
        });
    }

    // Handle search
    searchButton.addEventListener("click", () => {
        const query = searchInput.value.toLowerCase();
        let results = [];

        if (query === "beach") {
            results = travelData.beaches;
        } else if (query === "temple") {
            results = travelData.temples;
        } else {
            Object.values(travelData.countries).forEach(country => {
                if (country.name.toLowerCase().includes(query)) {
                    results = results.concat(country.cities);
                }
            });
        }

        displayResults(results);
    });

    // Handle clear
    clearButton.addEventListener("click", () => {
        searchInput.value = "";
        resultsContainer.innerHTML = ""; // Clear results
    });
});
