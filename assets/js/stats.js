let darkMode = document.getElementById("darkMode");
let menuDark = document.getElementById("menu-dark");
let mainDark = document.getElementById("mainDark");
let headerDM = document.getElementById("header");
let navDM = document.querySelectorAll(".text-dark");

let eventStatics = document.getElementById("eventStatics");
let upcomingStatics = document.getElementById("upcomingStatics");
let pastsStatics = document.getElementById("pastsStatics");

const urlApi = "https://mindhub-xj03.onrender.com/api/amazing";

let allEvents;

let currentDate;

async function traerDatos() {

    try {
        const datos = await fetch(urlApi)
            .then(response => response.json())
            .then(data => data);

        allEvents = datos.events;
        currentDate = datos.currentDate;
        statsInitializer();

    } catch (error) {
        console.log(error);
    }
}
traerDatos();
function statsInitializer() {


    let sortEventByPercentageOfAttendance = allEvents.filter(e => e.assistance != undefined).sort((a, b) => (a.assistance / a.capacity) - (b.assistance / b.capacity));
    let sortEventByPercentageOfEstimate = allEvents.filter(e => e.estimate != undefined).sort((a, b) => (a.estimate / a.capacity) - (b.estimate / b.capacity));
    let sortEventByCapacity = allEvents.filter(e => e.assistance != undefined).sort((a, b) => a.capacity - b.capacity);

    let pastArray = [];
    sortEventByPercentageOfAttendance.map(ev => {
        if (!pastArray.some((item) => ev.category == item.category)) {
            pastArray.push({
                category: ev.category,
                revenues: ev.price * ev.assistance,
                capacity: ev.capacity,
                assistance: ev.assistance
            });
        } else if (pastArray.some((item) => ev.category == item.category)) {
            pastArray.map(e => {
                if (e.category == ev.category) {
                    e.capacity += ev.capacity;
                    e.revenues += ev.price * ev.assistance;
                    e.assistance += ev.assistance;
                }
            })
        }
    });

    let upcomingArray=[];
    sortEventByPercentageOfEstimate.map(ev => {
        if (!upcomingArray.some((item) => ev.category == item.category)) {
            upcomingArray.push({
                category: ev.category,
                revenues: ev.price * ev.estimate,
                capacity: ev.capacity,
                estimate: ev.estimate
            });
        } else if (upcomingArray.some((item) => ev.category == item.category)) {
            upcomingArray.map(e => {
                if (e.category == ev.category) {
                    e.capacity += ev.capacity;
                    e.revenues += ev.price * ev.estimate;
                    e.estimate += ev.estimate;
                }
            })
        }
    });

    eventStatics.innerHTML = eventStaticsShow(sortEventByPercentageOfAttendance,sortEventByCapacity);
    pastsStatics.innerHTML = pastStaticsShow(pastArray);
    upcomingStatics.innerHTML = updateStaticsShow(upcomingArray);

    function eventStaticsShow(eventsAttendance, eventsCapacity) {
        let rows = '';
        rows = `<tr>
                    <td class="bg-secondary">Events with the highest percentage of attendance</td>
                    <td class="bg-secondary">Events with the lowest percentage of attendance</td>
                    <td class="bg-secondary">Event with larger capacity</td>
                </tr>
                <tr>
                    <td>${eventsAttendance[eventsAttendance.length - 1].name} : ${((eventsAttendance[eventsAttendance.length - 1].assistance/eventsAttendance[eventsAttendance.length - 1].capacity)*100).toFixed(2)} %</td >
                    <td>${eventsAttendance[0].name} : ${((eventsAttendance[0].assistance/eventsAttendance[0].capacity)*100).toFixed(2)} %</td >
                    <td>${eventsCapacity[eventsCapacity.length - 1].name} : ${eventsCapacity[eventsCapacity.length - 1].capacity}</td >
                </tr>
                <tr>
                    <td>${eventsAttendance[eventsAttendance.length - 2].name} : ${((eventsAttendance[eventsAttendance.length - 2].assistance/eventsAttendance[eventsAttendance.length - 2].capacity)*100).toFixed(2)} %</td >
                    <td>${eventsAttendance[1].name} : ${((eventsAttendance[1].assistance/eventsAttendance[1].capacity)*100).toFixed(2)} %</td >
                    <td>${eventsCapacity[eventsCapacity.length - 2].name} : ${eventsCapacity[eventsCapacity.length - 2].capacity}</td >
                </tr>
                <tr>
                    <td>${eventsAttendance[eventsAttendance.length - 3].name} : ${((eventsAttendance[eventsAttendance.length - 3].assistance/eventsAttendance[eventsAttendance.length - 3].capacity)*100).toFixed(2)} %</td >
                    <td>${eventsAttendance[2].name} : ${((eventsAttendance[2].assistance/eventsAttendance[2].capacity)*100).toFixed(2)} %</td >
                    <td>${eventsCapacity[eventsCapacity.length - 3].name} : ${eventsCapacity[eventsCapacity.length - 3].capacity}</td >
                </tr>`;

        return rows;
    }

    function updateStaticsShow(array){
        let rows = `<tr>
                        <td>Categories</td>
                        <td>Revenues</td>
                        <td>Percentage of estimate</td>
                    </tr>`;

        for (const item of array) {
            rows += `<tr>
                        <td>${item.category}</td>
                        <td>$${item.revenues}</td>
                        <td>${((item.estimate)/(item.capacity)*100).toFixed(2)} %</td>
                    </tr>`
        }
        return rows;
    }

    function pastStaticsShow(array){
        let rows = `<tr>
                        <td>Categories</td>
                        <td>Revenues</td>
                        <td>Percentage of attendance</td>
                    </tr>`;

        for (const item of array) {
            rows += `<tr>
                        <td>${item.category}</td>
                        <td>$${item.revenues}</td>
                        <td>${((item.assistance)/(item.capacity)*100).toFixed(2)} %</td>
                    </tr>`
        }
        return rows;
    }
}

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