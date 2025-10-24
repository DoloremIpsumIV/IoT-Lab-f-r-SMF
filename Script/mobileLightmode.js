
let mobilelightmode = localStorage.getItem("lightmode");
const mobilethemeSwitch = document.getElementById("mobiletheme-switch");


const mobileenableLightmode = () => {
    document.body.classList.add("lightmode");
    localStorage.setItem("lightmode", "active");
}

const mobiledisableLightmode = () => {
    document.body.classList.remove("lightmode");
    localStorage.setItem("lightmode", "inactive");
}

if (lightmode === "active") {
    mobileenableLightmode();
}

mobilethemeSwitch.addEventListener("click", () => {
    mobilelightmode = localStorage.getItem("lightmode");
    mobilelightmode !== "active" ? mobileenableLightmode() : mobiledisableLightmode();
});






