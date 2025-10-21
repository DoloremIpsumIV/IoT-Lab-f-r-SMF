function buildCard(p) {
  const card = document.createElement("article");
  card.className = "card";
  card.tabIndex = 0;                       
  card.setAttribute("role", "link");       
  card.setAttribute("aria-label", p.company);

  const img = document.createElement("img");
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

  var cta = document.createElement("button");
  cta.className = "card-cta";
  cta.type = "button";
  cta.textContent = "Läs mer om Pilotcase";
  cta.addEventListener("click", function (e) {
    e.stopPropagation(); 
    window.location.href = "../Pages/clicked-project.html?Id=" + p.id;
  });

  
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
  var projectAmount = await fetchPilotCaseAmount();
  var currentProject = 0;

  for (var box of boxes) {
    var boxContainers = box.children;
    for (var i = 0; i < boxContainers.length; i++) {
      if (currentProject >= projectAmount) break;

      var container = boxContainers[i];
      var pilotCaseObj = await fetchPilotCaseById(currentProject + 1);

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