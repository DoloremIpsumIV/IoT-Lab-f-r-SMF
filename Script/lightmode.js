
let lightmode = localStorage.getItem("lightmode")
const themeSwitch = document.getElementById("theme-switch")

const enableLightmode = () => {
    document.body.classList.add("lightmode")
    localStorage.setItem("lightmode", "active")
}

const disableLightmode = () => {
    document.body.classList.remove("lightmode")
    localStorage.setItem("lightmode", null ) 
}

if(lightmode === "active") enableLightmode()

themeSwitch.addEventListener("click",  () =>{
    lightmode = localStorage.getItem("lightmode")
    lightmode !== "active" ? enableLightmode(): disableLightmode()
})

// Check theme on page load
document.addEventListener("DOMContentLoaded", () => {
    const currentTheme = localStorage.getItem("lightmode");
    if (currentTheme === "active") {
        enableLightmode();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const currentTheme = localStorage.getItem("lightmode");
    if (currentTheme != "active") {
        disableLightmode();
    }
});


