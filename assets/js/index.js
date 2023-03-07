
let cardsList = document.getElementById("cardsList");

let btnSearch = document.getElementById("searchBtn");

let categoriesCheckBox = document.getElementById("categoryList");

categoriesCheckBox.innerHTML = createCategoriesCheckBox(categoryList(allEvents));

let checkboxs = document.querySelectorAll(".form-check-input");

let notFound = `<div class="d-flex w-100 align-items-center justify-content-center">
<img class="not-found" src="../assets/img/not_found.png" alt="logo">
<div class="col-6"> <span class="inline-flex fs-2 fw-bold">Oops... We couldn’t find anything that matches your search :(</span></div>
</div>`;


categoriesCheckBox.addEventListener("click", function () {
    const wordSearch = document.getElementById("search-content");
    const arrayCategories = checkedCategoriesList(checkboxs);

    cardsList.innerHTML=createCards(filterCardsByCategoriesAndName(arrayCategories,wordSearch.value));
})

function createCategoriesCheckBox(categories) {
    let checkboxsHtml = "";
    let num = 1;
    for (const category of categories) {
        checkboxsHtml += `<div>
                            <input class="form-check-input" type="checkbox" name="category${num}" id="category${num}" value="${category}">
                            <label for="category${num}">${category}</label>
                        </div>`
        num++;
    }

    return checkboxsHtml;
}

function categoryList(events) {
    let categories = [];
    for (const item of events) {
        if (!categories.some((category) => category == item.category)) {
            categories.push(item.category);
        }
    }
    return categories;
}

btnSearch.addEventListener("click", () => {
    const wordSearch = document.getElementById("search-content");
    const arrayCategories = checkedCategoriesList(checkboxs);

    cardsList.innerHTML=createCards(filterCardsByCategoriesAndName(arrayCategories,wordSearch.value));
})

function checkedCategoriesList(checkboxs) {
    let categories = [];
    checkboxs.forEach(item => {
        if (item.checked) {
            categories.push(item.value);
        }
    })
    return categories;
}

function filterCardsByCategoriesAndName(arrayCategories, wordSearch) {
    let cardsFiltered = (arrayCategories.length > 0) ? allEvents.filter(event => arrayCategories.includes(event.category)) : allEvents;
    cardsFiltered = (wordSearch.value != "") ? cardsFiltered.filter(event => event.name.toLowerCase().indexOf(wordSearch.trim().toLowerCase()) != -1) : cardsFiltered;
    return cardsFiltered;
}

//Funcion que renderiza en tarjetas cada dato enviado
function createCards(data) {
    let allCards = "";
    for (const event of data) {
        allCards += ` <div class="col">
                            <div id="card1" class="card h-100">
                                <img class="card-img" src="${event.image}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${event.name}</h5>
                                    <p class="card-text">${event.description}</p>
                                    <p class="card-text"><small class="text-muted">${event.date}</small></p>
                                </div>
                                <div class="card-footer d-inline-flex justify-content-around">
                                    <div class="d-flex align-items-center">
                                        <span><i class="bi bi-tag-fill"></i> Price: $${event.price}</span>
                                    </div>
                                    <a class="btn btn-pink btn-details text-white" href="./pages/details.html?id=${event._id}">More info </a>
                                </div>
                            </div>
                    </div>`;
    }

    return allCards =="" ? (notFound) : allCards;

}
//Muestra todas las tarjetas al cargar la pagina
cardsList.innerHTML = createCards(allEvents);


