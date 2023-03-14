let darkMode = document.getElementById("darkMode");
let menuDark = document.getElementById("menu-dark");
let mainDark = document.getElementById("mainDark");
let headerDM = document.getElementById("header");
let navDM = document.querySelectorAll(".text-dark");


if (localStorage.getItem("dark-mode") == "true") {
    darkModeActivated();
}

darkMode.addEventListener("click", () => {
    let darkModeStatus = localStorage.getItem("dark-mode");
    darkModeStatus == null || darkModeStatus == "false" ? localStorage.setItem("dark-mode", true) : localStorage.setItem("dark-mode", false)

    darkModeActivated(darkModeStatus);

})

function darkModeActivated(darkModeStatus) {
    headerDM.classList.toggle("headerDM");
    mainDark.classList.toggle("mainDark");
    for (const item of navDM) {
        item.classList.toggle("navDM");
    }
    if (darkModeStatus == "true") {
        darkMode.className = "btn bi bi-moon-stars-fill";
        menuDark.className = "bi bi-list fs-2";
    } else {
        darkMode.className = "btn bi bi-brightness-alt-high-fill text-warning";
        menuDark.className = "bi bi-list fs-2 text-light";

    }
}