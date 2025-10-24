// Checks the theme on page load and sets it to lightmode if true
var lightmode = localStorage.getItem("lightmode")
var themeSwitch = document.getElementById("theme-switch")

var enableLightmode = () => {
    document.body.classList.add("lightmode")
    localStorage.setItem("lightmode", "active")
}

var disableLightmode = () => {
    document.body.classList.remove("lightmode")
    localStorage.setItem("lightmode", null)
}

if (lightmode === "active") enableLightmode()

themeSwitch.addEventListener("click", () => {
    lightmode = localStorage.getItem("lightmode")
    lightmode !== "active" ? enableLightmode() : disableLightmode()
})

document.addEventListener("DOMContentLoaded", () => {
    var currentTheme = localStorage.getItem("lightmode");
    if (currentTheme === "active") {
        enableLightmode();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    var currentTheme = localStorage.getItem("lightmode");
    if (currentTheme != "active") {
        disableLightmode();
    }
});