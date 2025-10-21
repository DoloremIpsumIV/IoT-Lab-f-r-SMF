async function displayDescriptions() {
    var boxes = document.querySelectorAll(".item-box");
    var projectAmount = await fetchPilotCaseAmount();
    var currentProject = 0;

    var showAllButton = document.getElementById("show-all-btn");
    showAllButton.style.cursor = "pointer";
    showAllButton.addEventListener("click", () => { location.href = "../Pages/Projekt.html"; });

    for (const box of boxes) {
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

document.addEventListener("DOMContentLoaded", displayDescriptions)