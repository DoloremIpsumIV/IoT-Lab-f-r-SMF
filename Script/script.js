function buildCard(p) {
    var card = document.createElement("article");
    card.className = "card";
    card.tabIndex = 0;
    card.setAttribute("role", "link");
    card.setAttribute("aria-label", p.company);

    var img = document.createElement("img");
    img.className = "card-img";
    img.src = p.image + ".jpg";
    img.alt = "bild på " + p.company;
    img.loading = "lazy";

    var body = document.createElement("div");
    body.className = "card-body";

    var h = document.createElement("h3");
    h.className = "card-title";
    h.textContent = p.company;

    var txt = document.createElement("p");
    txt.className = "card-text";
    txt.textContent = p["brief-description"];

    var ctaSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    ctaSvg.setAttribute("width", "24");
    ctaSvg.setAttribute("height", "24");
    ctaSvg.setAttribute("viewBox", "0 0 24 24");
    ctaSvg.setAttribute("fill", "none");
    ctaSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    ctaSvg.innerHTML = '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.25 5.75C19.25 5.19772 18.8023 4.75 18.25 4.75H14C12.8954 4.75 12 5.64543 12 6.75V19.25L12.8284 18.4216C13.5786 17.6714 14.596 17.25 15.6569 17.25H18.25C18.8023 17.25 19.25 16.8023 19.25 16.25V5.75Z"></path><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 5.75C4.75 5.19772 5.19772 4.75 5.75 4.75H10C11.1046 4.75 12 5.64543 12 6.75V19.25L11.1716 18.4216C10.4214 17.6714 9.40401 17.25 8.34315 17.25H5.75C5.19772 17.25 4.75 16.8023 4.75 16.25V5.75Z"></path>';

    var cta = document.createElement("button");
    cta.className = "card-cta";
    cta.type = "button";
    cta.textContent = "Läs mer om Pilotcase";
    cta.addEventListener("click", function (e) {
        e.stopPropagation();
        window.location.href = "../Pages/clicked-project.html?Id=" + p.id;
    });
    cta.prepend(ctaSvg);


    card.addEventListener("click", function () {
        window.location.href = "../Pages/clicked-project.html?Id=" + p.id;
    });
    card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            window.location.href = "../Pages/clicked-project.html?Id=" + p.id;
        }
    });

    body.append(h, txt, cta);
    card.append(img, body);
    return card;
}



async function displayDescriptions() {
    var boxes = document.querySelectorAll(".item-box");
    var selectedPilotCases = [6, 5, 16, 2, 7, 3];
    
    let currentProject = 0;

    for (var box of boxes) {
        var containers = box.children;
        
        for (let i = 0; i < containers.length && currentProject < selectedPilotCases.length; i++) {
            var container = containers[i];
            var pilotCaseId = selectedPilotCases[currentProject];
            var pilotCaseObj = await fetchPilotCaseById(pilotCaseId);
            var card = buildCard(pilotCaseObj);
            
            container.appendChild(card);
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

document.addEventListener("DOMContentLoaded", function () {
    var showAllButton = document.getElementById("show-all-btn");
    var showAllButton2 = document.querySelector(".btn2");
    

    showAllButton.style.cursor = "pointer";
    showAllButton.addEventListener("click", function () {
        window.location.href = "../Pages/Projekt.html";
    });

    showAllButton2.style.cursor = "pointer";
    showAllButton2.addEventListener("click", function () {
        window.location.href = "../Pages/Projekt.html";
    });
    
});