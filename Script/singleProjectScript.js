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
    heroImgElement.src = src;
    heroImgElement.alt = "bild på " + project.company;

    heroImgElement.onerror = function () {
        console.warn("Hittade inte bild:", heroImgElement.src);
        heroImgElement.src = "../Images/placeholder.jpg";
    };

    displayProjectMedia(project);
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

function displayProjectMedia(project) {
    var mediaContainer = document.getElementById("body-grid");

    if (!mediaContainer) {
        console.warn("Media container not found");
        return;
    }

    mediaContainer.innerHTML = "";

    if (!project.media || project.media.length === 0) {
        mediaContainer.innerHTML = "<p>Inga mediafiler tillgängliga för detta projekt.</p>";
        return;
    }

    var mediaTitle = document.createElement("h2");
    mediaTitle.textContent = "Media från projektet";
    mediaContainer.appendChild(mediaTitle);

    var mediaGrid = document.createElement("div");
    mediaGrid.className = "media-grid";
    mediaContainer.appendChild(mediaGrid);

    project.media.forEach(mediaItem => {
        var mediaElement = createMediaElement(mediaItem);
        if (mediaElement) {
            mediaGrid.appendChild(mediaElement);
        }
    });
}

function createMediaElement(mediaItem) {
    var mediaWrapper = document.createElement("div");
    mediaWrapper.className = "media-item";

    var lowerType = mediaItem.type.toLowerCase();

    try {
        if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(lowerType)) {
            var img = document.createElement("img");
            img.src = mediaItem.source;
            img.alt = `Projektbild - ${mediaItem.type}`;
            img.loading = "lazy";

            mediaWrapper.appendChild(img);

        } else if (['mov', 'mp4'].includes(lowerType)) {
            var video = document.createElement("video");
            video.controls = true;
            video.preload = "metadata";

            var source = document.createElement("source");
            source.src = mediaItem.source;

            if (lowerType === 'mov') {
                source.type = "video/quicktime";
            } else if (lowerType === 'mp4') {
                source.type = "video/mp4";
            } else if (lowerType === 'avi') {
                source.type = "video/x-msvideo";
            } else if (lowerType === 'webm') {
                source.type = "video/webm";
            }

            video.appendChild(source);

            mediaWrapper.appendChild(video);

        }
        return mediaWrapper;

    } catch (error) {
        return error;
    }
}

document.addEventListener("DOMContentLoaded", displayProject);