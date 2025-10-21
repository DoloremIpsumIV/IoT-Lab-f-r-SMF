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


  boxes.forEach(function (box) {
    var containers = box.children;
    for (var container of containers) {
      container.innerHTML = "";
      container.style.display = "initial";
    }
  });

 
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

async function fetchPilotCaseByName(name) {
  try {
    var response = await fetch("../Data/projects.json");
    if (!response.ok) throw new Error("HTTP error! status: " + response.status);
    var searchName = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    var data = await response.json();
    var pilotCase = data.pilotcases.find(function (caseItem) {
      return caseItem.company.toLowerCase().replace(/[^a-z0-9]+/g, "-") === searchName;
    });
    if (!pilotCase) throw new Error("Inga pilot studier hittade.");
    return pilotCase;
  } catch (error) {
    console.error("Error med att fetcha pilot studie:", error);
    throw error;
  }
}

async function fetchPilotCaseById(id) {
  try {
    var response = await fetch("../Data/projects.json");
    if (!response.ok) throw new Error("HTTP error! status: " + response.status);
    var data = await response.json();
    var pilotCase = data.pilotcases.find(function (caseItem) { return caseItem.id === id; });
    if (!pilotCase) throw new Error("Inga pilot studier hittade med ID: " + id);
    return pilotCase;
  } catch (error) {
    console.error("Error med att fetcha pilot studie:", error);
    throw error;
  }
}

async function fetchPilotCaseAmount() {
  try {
    var response = await fetch("../Data/projects.json");
    if (!response.ok) throw new Error("HTTP error! status: " + response.status);
    var data = await response.json();
    return data.pilotcases.length;
  } catch (error) {
    console.error("Error med att fetcha antal pilot studier:", error);
    throw error;
  }
}

var projectsData = [];

async function fetchProjectsData() {
  try {
    var response = await fetch("../Data/projects.json");
    if (!response.ok) throw new Error("HTTP error! status: " + response.status);
    var data = await response.json();
    projectsData = data.pilotcases;
  } catch (error) {
    console.error("Error fetching projects data:", error);
  }
}

function searchProjects(query) {
  if (!query.trim()) return [];
  var searchTerm = query.toLowerCase();
  return projectsData.filter(function (project) {
    return project.company.toLowerCase().includes(searchTerm);
  });
}


function displaySearchResults(results) {
  var boxes = document.querySelectorAll(".item-box");

  boxes.forEach(function (box) {
    var containers = box.children;
    for (var container of containers) {
      container.innerHTML = "";
      container.style.display = "none";
    }
  });

  if (results.length === 0) {
    if (boxes.length > 0 && boxes[0].children.length > 0) {
      var firstContainer = boxes[0].children[0];
      var message = document.createElement("p");
      message.innerText = "Inga resultat hittades";
      firstContainer.style.display = "initial";
      firstContainer.appendChild(message);
    }
    return;
  }

  var currentResult = 0;
  for (var box of boxes) {
    var boxContainers = box.children;
    for (var i = 0; i < boxContainers.length; i++) {
      if (currentResult >= results.length) break;

      var container = boxContainers[i];
      var pilotCaseObj = results[currentResult];

      container.style.display = "initial";
      var card = buildCard(pilotCaseObj);
      container.appendChild(card);

      currentResult++;
    }
  }
}


document.addEventListener("DOMContentLoaded", async function () {
  try {
    await fetchProjectsData();
    await displayDescriptions();

    var searchButton = document.getElementById("search-button");
    var searchInput = document.getElementById("search-input");

    searchButton.addEventListener("click", function () {
      startSearch();
    });

   
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        startSearch();
      }
    });

    var showAllButton = document.getElementById("show-all-btn");
    showAllButton.style.cursor = "pointer";
    showAllButton.addEventListener("click", function () {
      location.reload();
    });
  } catch (error) {
    console.error(error);
  }
});

function startSearch() {
  var searchInput = document.getElementById("search-input");
  var query = searchInput.value;

  if (!query.trim()) {
    displayDescriptions();
  } else {
    var results = searchProjects(query);
    displaySearchResults(results);
  }

  if (query.length === 0) {
    location.reload();
  }
}
