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
        console.error("Error fetching projects data:", error);
    }
}

function searchProjects(query) {
    if (!query.trim()) {
        return [];
    }
    console.log(query);
    
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
            var title = document.createElement("h1");
            var img = document.createElement("img");
            var description = document.createElement("p");
            container.style.display = "initial";

            title.innerText = pilotCaseObj.company;
            img.src = pilotCaseObj.image;
            img.alt = "bild på " + pilotCaseObj.company;
            description.innerText = pilotCaseObj["brief-description"];

            container.appendChild(title);
            container.appendChild(img);
            container.appendChild(description);
            currentResult++;
        }
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await fetchProjectsData();
    await displayDescriptions(); 

    var searchInput = document.getElementById("search-input");

    searchInput.addEventListener("input", (e) => {
        var query = e.target.value;
        console.log(e.data);
        
        if (!query.trim()) {
            displayDescriptions();
        } else {
            var results = searchProjects(query);
            displaySearchResults(results);
        }
    });
});