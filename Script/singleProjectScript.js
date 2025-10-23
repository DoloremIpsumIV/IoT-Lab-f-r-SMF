async function displayProject() {
    var params = new URLSearchParams(document.location.search);
    var id = parseInt(params.get("Id"));

    var project = await fetchPilotCaseById(id);
    var titleElement = document.getElementById("title");
    var descriptionElement = document.getElementById("description");


    titleElement.innerText = project["company"];
    descriptionElement.innerText = project["full-description"];

    displayProjectMedia(project);
    displayProjectVideo(project);
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

function displayProjectVideo(project) {
    var videoContainer = document.getElementById("video-container");

    if (!videoContainer) {
        console.warn("Video container not found");
        return;
    }

    if (!project.media || project.media.length === 0) {
        return;
    }

    var videoMedia = project.media.filter(mediaItem =>
        ["mov", "mp4", "avi", "webm"].includes(mediaItem.type.toLowerCase())
    );

    if (videoMedia.length === 0) {
        return;
    }

    var videoTitle = document.createElement("h2");
    videoTitle.textContent = "Videor från projektet";
    videoContainer.appendChild(videoTitle);

    var videoGrid = document.createElement("div");
    videoGrid.className = "media-grid";
    videoContainer.appendChild(videoGrid);

    videoMedia.forEach(mediaItem => {
        var videoElement = createVideoElement(mediaItem);
        if (videoElement) {
            videoGrid.appendChild(videoElement);
        }
    });
}

function displayProjectMedia(project) {
    var mediaContainer = document.getElementById("body-grid");

    if (!mediaContainer) {
        console.warn("Media container not found");
        return;
    }

    if (!project.media || project.media.length === 0) {
        var mediaGrid = document.createElement("div");
        mediaGrid.className = "media-grid";

        var mediaTitle = document.createElement("h2");
        mediaTitle.textContent = "Bilder från projektet";

        mediaContainer.appendChild(mediaTitle);

        mediaContainer.appendChild(mediaGrid);

        var heroImgElement = document.createElement("img");
        var heroDivElement = document.createElement("div");

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
        
        heroDivElement.appendChild(heroImgElement);
        mediaGrid.appendChild(heroDivElement);
        return;
    }

    var imageMedia = project.media.filter(mediaItem =>
        ["jpg", "jpeg", "png", "gif", "webp"].includes(mediaItem.type.toLowerCase())
    );

    if (imageMedia.length === 0) {
        mediaContainer.innerHTML = "<p>Inga bilder tillgängliga för detta projekt.</p>";
        return;
    }

    var mediaTitle = document.createElement("h2");
    mediaTitle.textContent = "Bilder från projektet";
    mediaContainer.appendChild(mediaTitle);

    var mediaGrid = document.createElement("div");
    mediaGrid.className = "media-grid";
    mediaContainer.appendChild(mediaGrid);

    imageMedia.forEach(mediaItem => {
        var mediaElement = createImageElement(mediaItem);
        if (mediaElement) {
            mediaGrid.appendChild(mediaElement);
        }
    });
}

function createImageElement(mediaItem) {
    var mediaWrapper = document.createElement("div");

    try {
        var img = document.createElement("img");
        img.src = mediaItem.source;
        img.alt = `Projektbild - ${mediaItem.type}`;
        img.loading = "lazy";

        mediaWrapper.appendChild(img);
        return mediaWrapper;

    } catch (error) {
        console.error("Error creating image element:", error);
        return null;
    }
}

function createVideoElement(mediaItem) {
    var mediaWrapper = document.createElement("div");
    var lowerType = mediaItem.type.toLowerCase();

    try {
        var video = document.createElement("video");
        video.controls = true;
        video.preload = "metadata";

        var source = document.createElement("source");
        source.src = mediaItem.source;

        if (lowerType === "mov") {
            source.type = "video/quicktime";
        } else if (lowerType === "mp4") {
            source.type = "video/mp4";
        } else if (lowerType === "avi") {
            source.type = "video/x-msvideo";
        } else if (lowerType === "webm") {
            source.type = "video/webm";
        }

        video.appendChild(source);
        mediaWrapper.appendChild(video);

        return mediaWrapper;

    } catch (error) {
        console.error("Error creating video element:", error);
        return null;
    }
}
document.addEventListener("DOMContentLoaded", displayProject);