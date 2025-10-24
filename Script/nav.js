// Functionality for the hamburger menu on mobile UI
(function () {
    var toggle = document.getElementById("nav-toggle");
    var menu = document.getElementById("mobile-menu");
    var backdrop = document.getElementById("mobile-backdrop");

    if (!toggle || !menu || !backdrop) return;

    function openMenu() {
        menu.hidden = false;
        backdrop.hidden = false;
        document.body.style.overflow = "hidden";
        toggle.setAttribute("aria-expanded", "true");
        menu.classList.add("open");
        backdrop.classList.add("show");
    }
    function closeMenu() {
        menu.classList.remove("open");
        backdrop.classList.remove("show");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        setTimeout(function () {
            menu.hidden = true;
            backdrop.hidden = true;
        }, 200);
    }

    toggle.addEventListener("click", function () {
        var expanded = toggle.getAttribute("aria-expanded") === "true";
        if (expanded) closeMenu(); else openMenu();
    });

    backdrop.addEventListener("click", closeMenu);
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeMenu();
    });
})();