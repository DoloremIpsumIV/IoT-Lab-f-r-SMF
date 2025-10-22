async function displayProject() {
    var params = new URLSearchParams(document.location.search);
    var id = parseInt(params.get("Id"));

    var project = await fetchPilotCaseById(id);
    var titleElement = document.getElementById("title");
    var descriptionElement = document.getElementById("description");
    var heroImgElement = document.getElementById("hero-img");

    titleElement.innerText = project["company"];
    descriptionElement.innerText = project["full-description"];

    var src = project.image;
    if (!/\.(png|jpe?g|webp|gif)$/i.test(src)) {
        src = src + ".jpg";
    }

    heroImgElement.src = project.image + ".jpg";
    heroImgElement.alt = "bild på " + project.company;

    heroImgElement.onerror = function () {
        console.warn("Hittade inte bild:", heroImgElement.src);
        heroImgElement.src = "../Images/placeholder.jpg";


    };
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

document.addEventListener("DOMContentLoaded", displayProject);