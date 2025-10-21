async function displayDescriptions() {
    var boxes = document.querySelectorAll(".item-box");
    var projectAmount = await fetchPilotCaseAmount();
    var currentProject = 0;

    boxes.forEach(box => {
        var containers = box.children;
        for (var container of containers) {
            container.innerHTML = "";
        }
    });

    for (var box of boxes) {
        var boxContainers = box.children;
        for (var i = 0; i < boxContainers.length; i++) {
            if (currentProject >= projectAmount) {
                break;
            }

            var container = boxContainers[i];
            var pilotCaseObj = await fetchPilotCaseById(currentProject + 1);
            var img = document.createElement("img");
            var title = document.createElement("h1");
            var description = document.createElement("p");
            var button = document.createElement("a");

            img.src = pilotCaseObj.image + ".jpg";
            img.alt = "bild på " + pilotCaseObj.company;
            title.innerText = pilotCaseObj.company;
            description.innerText = pilotCaseObj["brief-description"];
            button.innerText = "Läs mer om Pilotcase";
            button.href = `../Pages/clicked-project.html?Id=${pilotCaseObj.id}`

            container.appendChild(img);
            container.appendChild(title);
            container.appendChild(description);
            container.appendChild(button);
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
        var searchName = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        var data = await response.json();
        var pilotCase = data.pilotcases.find(caseItem => caseItem.company.toLowerCase().replace(/[^a-z0-9]+/g, "-") === searchName);

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
    }
}

var projectsData = [];

async function fetchProjectsData() {
    try {
        var response = await fetch("../Data/projects.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        var data = await response.json();
        projectsData = data.pilotcases;
    } catch (error) {
    }
}

function searchProjects(query) {
    if (!query.trim()) {
        return [];
    }

    var searchTerm = query.toLowerCase();
    return projectsData.filter(project => {
        return project.company.toLowerCase().includes(searchTerm);
    });
}

function displaySearchResults(results) {
    var boxes = document.querySelectorAll(".item-box");
    boxes.forEach(box => {
        var containers = box.children;
        for (var container of containers) {
            container.innerHTML = "";
            container.style.display = "none";
        }
    });

    if (results.length === 0) {
        var boxes = document.querySelectorAll(".item-box");
        if (boxes.length > 0 && boxes[0].children.length > 0) {
            var firstContainer = boxes[0].children[0];
            var message = document.createElement("p");
            message.innerText = "Inga resultat hittades";
            firstContainer.appendChild(message);
        }
        return;
    }

    var currentResult = 0;

    for (var box of boxes) {
        var boxContainers = box.children;
        for (var i = 0; i < boxContainers.length; i++) {
            if (currentResult >= results.length) {
                break;
            }

            var container = boxContainers[i];
            var pilotCaseObj = results[currentResult];
            var img = document.createElement("img");
            var title = document.createElement("h1");
            var description = document.createElement("p");
            var button = document.createElement("a");

            container.style.display = "initial";

            img.src = pilotCaseObj.image + ".jpg";
            img.alt = "bild på " + pilotCaseObj.company;
            title.innerText = pilotCaseObj.company;
            description.innerText = pilotCaseObj["brief-description"];
            button.innerText = "Läs mer om Pilotcase";
            button.href = `../Pages/clicked-project.html?Id=${pilotCaseObj.id}`

            container.appendChild(img);
            container.appendChild(title);
            container.appendChild(description);
            container.appendChild(button);

            currentResult++;
        }
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        await fetchProjectsData();
        await displayDescriptions();

        var searchButton = document.getElementById("search-button");
        var searchInput = document.getElementById("search-input");

        searchButton.addEventListener("click", () => {
            startSearch();
        });
        searchInput.addEventListener("keydown", (e) => {
            if (e.key === 'Enter') {
                startSearch();
            }
        });

        var showAllButton = document.getElementById("show-all-btn");
        showAllButton.style.cursor = "pointer";
        showAllButton.addEventListener("click", () => { location.reload(); });
    } catch (error) {
    }
});

function startSearch() {
    var searchInput = document.getElementById("search-input");
    var query = searchInput.value;
    if (!query.trim()) {
        displayDescriptions();
    }
    else {
        var results = searchProjects(query);
        displaySearchResults(results);
    }
    if (query.length === 0) {
        location.reload();
    }
}