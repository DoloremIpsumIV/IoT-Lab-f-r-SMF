// Renders the lightmode button on the mobile hamburger menu UI
var mobilelightmode = localStorage.getItem("lightmode");
var mobivarThemeSwitch = document.getElementById("mobiletheme-switch");

var mobileenableLightmode = () => {
    document.body.classList.add("lightmode");
    localStorage.setItem("lightmode", "active");
}

var mobiledisableLightmode = () => {
    document.body.classList.remove("lightmode");
    localStorage.setItem("lightmode", "inactive");
}

if (lightmode === "active") {
    mobileenableLightmode();
}

mobivarThemeSwitch.addEventListener("click", () => {
    mobilelightmode = localStorage.getItem("lightmode");
    mobilelightmode !== "active" ? mobileenableLightmode() : mobiledisableLightmode();
});