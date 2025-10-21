async function displayDescriptions() {
    var boxes = document.querySelectorAll(".item-box");
    var projectAmount = await fetchPilotCaseAmount();
    var currentProject = 0;

    for (const box of boxes) {
        var boxContainers = box.children;
        for (var i = 0; i < boxContainers.length; i++) {
            if (currentProject >= projectAmount) {
                break;
            }

            var container = boxContainers[i];
            var pilotCaseObj = await fetchPilotCaseById(currentProject + 1);
            var title = document.createElement("h1");
            var img = document.createElement("img");
            var description = document.createElement("p");

            title.innerText = pilotCaseObj.company;
            img.src = pilotCaseObj.image;
            img.alt = "bild på " + pilotCaseObj.company;
            description.innerText = pilotCaseObj["brief-description"];

            container.appendChild(title);
            container.appendChild(img);
            container.appendChild(description);
            currentProject++;
        }
    }
}

async function fetchPilotCaseByName(name) {
    try {
        var response = await fetch("../Data/projects.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        var searchName = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        var data = await response.json();
        var pilotCase = data.pilotcases.find(caseItem => caseItem.company.toLowerCase().replace(/[^a-z0-9]+/g, '-') === searchName);

        if (!pilotCase) {
            throw new Error(`Inga pilot studier hittade med ID: ${id}`);
        }


        return pilotCase;

    } catch (error) {
        console.error("Error med att fetcha pilot studie:", error);
        throw error;
    }
}

async function fetchPilotCaseById(id) {
    try {
        var response = await fetch("../Data/projects.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        var data = await response.json();
        var pilotCase = data.pilotcases.find(caseItem => caseItem.id === id);

        if (!pilotCase) {
            throw new Error(`Inga pilot studier hittade med ID: ${id}`);
        }


        return pilotCase;

    } catch (error) {
        console.error("Error med att fetcha pilot studie:", error);
        throw error;
    }
}

async function fetchPilotCaseAmount() {
    try {

        var response = await fetch("../Data/projects.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        var data = await response.json();
        var pilotCase = data.pilotcases.length;

        return pilotCase;
    }
    catch (error) {
        console.error("Error med att fetcha antal pilot studier:", error);
        throw error;
    }
}
let projectsData = [];

async function fetchProjectsData() {
    try {
        const response = await fetch('../Data/projects.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        projectsData = data.pilotcases;
    } catch (error) {
        console.error('Error fetching projects data:', error);
    }
}

function searchProjects(query) {
    if (!query.trim()) {
        return [];
    }

    const searchTerm = query.toLowerCase();
    return projectsData.filter(project => {
        return (
            project.company.toLowerCase().includes(searchTerm) ||
            project['brief-description'].toLowerCase().includes(searchTerm) ||
            project['full-description'].toLowerCase().includes(searchTerm)
        );
    });
}

function displaySearchResults(results) {
    const resultsContainer = document.getElementById('search-results');

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>Inga projekt hittades.</p>';
        return;
    }

    resultsContainer.innerHTML = results.map(project => `
                <div class="search-result-item">
                    <h3>${project.company}</h3>
                    <p><strong>Kort beskrivning:</strong> ${project['brief-description']}</p>
                    <p><strong>Fullständig beskrivning:</strong> ${project['full-description']}</p>
                </div>
            `).join('');
}

document.addEventListener('DOMContentLoaded', async () => {
    await fetchProjectsData();

    const searchInput = document.getElementById('search-input');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        const results = searchProjects(query);
        displaySearchResults(results);
    });
});

document.addEventListener("DOMContentLoaded", displayDescriptions)