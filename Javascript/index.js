let dataBooks = []
let dataBook
let navBooks = document.getElementsByClassName("navLink")
let home = document.getElementById("home")
let books = document.getElementById("books")
let contact = document.getElementById("contact")
let cardBooks = document.getElementById("container-books")

let filtroInput = document.getElementById("input-search")
let inputLimpio = ""
let checkboxsSeleccionados = []
let arrayFiltrado = []

async function infoBooks() {

    const bookshop = firebase.firestore().collection("Books");

    await bookshop.get()
        .then((results) => {

            const data = results.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            dataBooks.push(...data)
            dataBooks.sort(function (a, b) {
                return a.id - b.id;
            });

            console.log("Books", dataBooks);

            routes()

        })
}

infoBooks()

// INICIO PAGINA

window.addEventListener('load', function () {
    window.scrollTo(0, 0);
})

// MENU DESPLEGABLE

let nav = document.querySelector("#nav-bar-books");
let open = document.querySelector("#open");
let close = document.querySelector("#close");

open.addEventListener("click", () => {
    nav.classList.add("visibility");
})

close.addEventListener("click", () => {
    nav.classList.remove("visibility");
})

//NAV PÁGINAS

for (var i = 0; i < navBooks.length; i++) {
    var element = navBooks[i];
    element.addEventListener("click", function (e) {
        print(e.target.id)
        console.log(e.target.id)
    })
}

function print(id) {
    console.log(id)
    switch (id) {
        case "libros":
            home.style.display = "none"
            books.style.display = "flex"
            contact.style.display = "none"
            filtroInput.value = ""
            filtroCheckbox(dataBooks)
            checkboxsSeleccionados = []
            arrayFiltrado = dataBooks
            templateCardBooks(dataBooks)
            break;
        case "autobiografico":
            home.style.display = "none"
            books.style.display = "flex"
            contact.style.display = "none"
            let autobiografico = dataBooks.filter(dataBooks => dataBooks.genre == "Autobiográfico")
            templateCardBooks(autobiografico)
            break;
        case "ensayo":
            home.style.display = "none"
            books.style.display = "flex"
            contact.style.display = "none"
            let ensayo = dataBooks.filter(dataBooks => dataBooks.genre == "Ensayo");
            templateCardBooks(ensayo);
            break;
        case "novela":
            home.style.display = "none"
            books.style.display = "flex"
            contact.style.display = "none"
            let novela = dataBooks.filter(dataBooks => dataBooks.genre == "Novela");
            templateCardBooks(novela);
            break;
        case "poemaEpico":
            home.style.display = "none"
            books.style.display = "flex"
            contact.style.display = "none"
            let poemaEpico = dataBooks.filter(dataBooks => dataBooks.genre == "Poema Épico");
            templateCardBooks(poemaEpico);
            break;
        case "relatos":
            home.style.display = "none"
            books.style.display = "flex"
            contact.style.display = "none"
            let relatos = dataBooks.filter(dataBooks => dataBooks.genre == "Relatos");
            templateCardBooks(relatos);
            break;
        case "tratadoDeTacticas":
            home.style.display = "none"
            books.style.display = "flex"
            contact.style.display = "none"
            let tratadoDeTacticas = dataBooks.filter(dataBooks => dataBooks.genre == "Tratado de Tácticas");
            templateCardBooks(tratadoDeTacticas);
            break;
        case "contacto":
            home.style.display = "none"
            books.style.display = "none"
            contact.style.display = "flex"
            break;
        case "crud":
            home.style.display = "none"
            books.style.display = "none"
            contact.style.display = "none"
            crud.style.display = "flex"
            break;
        default:
            home.style.display = "flex"
            books.style.display = "none"
            contact.style.display = "none"
            break;
    }
}

function templateCardBooks(array) {

    var html = "";

    for (var i = 0; i < array.length; i++) {
        html += `
        <div class="card-books">
            <img src="${array[i].photo}" alt="${array[i].title}">
            <div class="category">${array[i].category}</div>
            <h3>${array[i].title}</h3>
            <h4>${array[i].author}</h4>
            <div>
                <p class="price-off">${array[i].price}</p>
                <p class="off">5% OFF</p>
            </div>
            <p>${array[i].priceOff}</p>
            <div class="card-books-buttons">
                <button class="button-details"><a href="./HTML/details.html?=id=${array[i].id}">Ver Detalles</a></button>
                <button class="button-cart-shopping"><i class="fa-solid fa-cart-plus"></i></button>
            </div> 
        </div>                 
        `
    }
    cardBooks.innerHTML = html;
}


// NAV PÁGINA DETALLES

var page = location.search.split("?page=");
console.log(page);

function routes() {

    var page = location.search.split("?page=");
    console.log(page[1]);

    switch (page[1]) {

        case "libros":
            print("libros")
            break;
        case "autobiografico":
            print("autobiografico")
            break;
        case "ensayo":
            print("ensayo")
            break;
        case "novela":
            print("novela")
            break;
        case "poemaEpico":
            print("poemaEpico")
            break;
        case "relatos":
            print("relatos")
            break;
        case "tratadoDeTacticas":
            print("tratadoDeTacticas")
            break;
        case "contacto":
            print("contacto")
            break;
        default:
            print("inicio")
    }

}

// FILTER TYPE OF BOOKS

let filterTypeOfBooks = document.getElementsByClassName("card-types-books")

for (var i = 0; i < filterTypeOfBooks.length; i++) {
    let elementsTypeOfBooks = filterTypeOfBooks[i];
    elementsTypeOfBooks.addEventListener("click", function (e) {
        if (e.target.parentElement.id == "tapaDura") {
            printTypeOfBooks("tapaDura")
        }
        else if (e.target.parentElement.id == "tapaBlanda") {
            printTypeOfBooks("tapaBlanda")
        }
        else {
            printTypeOfBooks("ebook")
        }
    })

}

function printTypeOfBooks(value) {
    console.log(value)
    switch (value) {
        case "tapaBlanda":
            home.style.display = "none"
            books.style.display = "flex"
            contact.style.display = "none"
            let tapaBlanda = dataBooks.filter(dataBooks => dataBooks.type == "Tapa Blanda");
            templateCardBooks(tapaBlanda);
            console.log("Entre a tapa blanda")
            break;
        case "tapaDura":
            home.style.display = "none"
            books.style.display = "flex"
            contact.style.display = "none"
            let tapaDura = dataBooks.filter(dataBooks => dataBooks.type == "Tapa Dura");
            templateCardBooks(tapaDura);
            console.log("Entre a tapa dura")
            break;
        default:
            home.style.display = "none"
            books.style.display = "flex"
            contact.style.display = "none"
            let ebook = dataBooks.filter(dataBooks => dataBooks.type == "Ebook");
            templateCardBooks(ebook);
            console.log("Entre a ebook")
            break;
            break;
    }
}

filtroInput.addEventListener("keyup", function (dataBooks) {

    let input = dataBooks.target.value;
    inputLimpio = input.trim().toLowerCase();
    console.log(input)
    filtrosCombinados()
})

// FILTRO CHECKBOX

function filtroCheckbox() {
    var checkboxs = document.querySelectorAll('input[type=checkbox]')
    for (i = 0; i < checkboxs.length; i++) {
        checkboxs[i].addEventListener("change", function () {
            checkboxsSeleccionados = []
            for (i = 0; i < checkboxs.length; i++) {
                if (checkboxs[i].checked) {
                    checkboxsSeleccionados.push(checkboxs[i].value)
                }
            }
            console.log(checkboxsSeleccionados)
            filtrosCombinados()
        })
    }
}

//FILTRO COMBINADO INPUT Y CHECKBOX

function filtrosCombinados() {
    var filtrado = []

    if (inputLimpio !== "" && checkboxsSeleccionados.length > 0) {
        checkboxsSeleccionados.map(subgenre => filtrado.push(...arrayFiltrado.filter(
            dataBooks => dataBooks.title?.toLowerCase().trim().includes(inputLimpio) && dataBooks.subgenre === subgenre)
        ))
    }
    else if (inputLimpio !== "" && checkboxsSeleccionados.length == 0) {
        filtrado = arrayFiltrado.filter(dataBooks => dataBooks.title?.toLowerCase().trim().includes(inputLimpio))
    }
    else if (inputLimpio === "" && checkboxsSeleccionados.length > 0) {
        checkboxsSeleccionados.map(subgenre => filtrado.push(...arrayFiltrado.filter(
            dataBooks => dataBooks.subgenre === subgenre)
        ))
    }
    else {
        filtrado = arrayFiltrado
    }
    filtrado.length > 0 ?
        templateCardBooks(filtrado) :
        cardBooks.innerHTML = `<h1 class="ceroResult"> No se encontraron Libros para tu búsqueda </h1>`
    console.log(arrayFiltrado)
    console.log(filtrado)
}

//CAROUSEL HOME

const slidesHome = document.querySelectorAll('.card-home-carousel');
let currentSlide = 0;

function showSlide(index) {
    slidesHome.forEach((slide, i) => {
        if (i === index) {
            slide.style.display = 'flex';
        } else {
            slide.style.display = 'none';
        }
    });
}

function beforeSlidesHome() {
    currentSlide = (currentSlide + 1) % slidesHome.length;
    showSlide(currentSlide);
}

const beforeButtonHome = document.getElementById('before-button-home-carousel');
beforeButtonHome.addEventListener('click', beforeSlidesHome);

function afterSlidesHome() {
    currentSlide = (currentSlide - 1 + slidesHome.length) % slidesHome.length;
    showSlide(currentSlide);
}

const afterButtonHome = document.getElementById('after-button-home-carousel');
afterButtonHome.addEventListener('click', afterSlidesHome);

setInterval(beforeSlidesHome, 10000);
showSlide(currentSlide);

//CAROUSEL RECOMMENDED BOOKS

const pagesRecommendedBooks = document.querySelectorAll('.container-recommended-books-carousel-page');
let currentPagesRecommendedBooks = 0;

function showPageRecommendedBooks(index) {
    pagesRecommendedBooks.forEach((page, i) => {
        if (i === index) {
            page.style.display = 'flex';
        } else {
            page.style.display = 'none';
        }
    });
}

function beforePagesRecommendedBooks() {
    currentPagesRecommendedBooks = (currentPagesRecommendedBooks + 1) % pagesRecommendedBooks.length;
    showPageRecommendedBooks(currentPagesRecommendedBooks);
}

const beforeButtonRecommendedBooks = document.getElementById('before-button-recommended-books-carousel');
beforeButtonRecommendedBooks.addEventListener('click', beforePagesRecommendedBooks);

function afterPagesRecommendedBooks() {
    currentPagesRecommendedBooks = (currentPagesRecommendedBooks - 1 + pagesRecommendedBooks.length) % pagesRecommendedBooks.length;
    showPageRecommendedBooks(currentPagesRecommendedBooks);
}

const afterButtonRecommendedBooks = document.getElementById('after-button-recommended-books-carousel');
afterButtonRecommendedBooks.addEventListener('click', afterPagesRecommendedBooks);

showPageRecommendedBooks(currentPagesRecommendedBooks);

//CAROUSEL BEST SELLERS BOOKS

const pagesBestSellersBooks = document.querySelectorAll('.container-best-sellers-books-carousel-page');
let currentPagesBestSellersBooks = 0;

function showPageBestSellers(index) {
    pagesBestSellersBooks.forEach((page, i) => {
        if (i === index) {
            page.style.display = 'flex';
        } else {
            page.style.display = 'none';
        }
    });
}

function beforePagesBestSellersBooks() {
    currentPagesBestSellersBooks = (currentPagesBestSellersBooks + 1) % pagesBestSellersBooks.length;
    showPageBestSellers(currentPagesBestSellersBooks);
}

const beforeButtonBestSellersBooks = document.getElementById('before-button-best-sellers-books-carousel');
beforeButtonBestSellersBooks.addEventListener('click', beforePagesBestSellersBooks);

function afterPagesBestSellersBooks() {
    currentPagesBestSellersBooks = (currentPagesBestSellersBooks - 1 + pagesBestSellersBooks.length) % pagesBestSellersBooks.length;
    showPageBestSellers(currentPagesBestSellersBooks);
}

const afterButtonBestSellersBooks = document.getElementById('after-button-best-sellers-books-carousel');
afterButtonBestSellersBooks.addEventListener('click', afterPagesBestSellersBooks);

showPageBestSellers(currentPagesBestSellersBooks);

//CAROUSEL NEW ENTRIES BOOKS

const pagesNewEntriesBooks = document.querySelectorAll('.container-new-entries-books-carousel-page');
let currentPagesNewEntriesBooks = 0;

function showPageNewEntries(index) {
    pagesNewEntriesBooks.forEach((page, i) => {
        if (i === index) {
            page.style.display = 'flex';
        } else {
            page.style.display = 'none';
        }
    });
}

function beforePagesNewEntriesBooks() {
    currentPagesNewEntriesBooks = (currentPagesNewEntriesBooks + 1) % pagesNewEntriesBooks.length;
    showPageNewEntries(currentPagesNewEntriesBooks);
}

const beforeButtonNewEntriesBooks = document.getElementById('before-button-new-entries-books-carousel');
beforeButtonNewEntriesBooks.addEventListener('click', beforePagesNewEntriesBooks);

function afterPagesNewEntriesBooks() {
    currentPagesNewEntriesBooks = (currentPagesNewEntriesBooks - 1 + pagesNewEntriesBooks.length) % pagesNewEntriesBooks.length;
    showPageNewEntries(currentPagesNewEntriesBooks);
}

const afterButtonNewEntriesBooks = document.getElementById('after-button-new-entries-books-carousel');
afterButtonNewEntriesBooks.addEventListener('click', afterPagesNewEntriesBooks);

showPageNewEntries(currentPagesNewEntriesBooks);

//CAROUSEL CLASSICS BOOKS

const pagesClassicsBooks = document.querySelectorAll('.container-classics-books-carousel-page');
let currentPagesClassicsBooks = 0;

function showPageClassics(index) {
    pagesClassicsBooks.forEach((page, i) => {
        if (i === index) {
            page.style.display = 'flex';
        } else {
            page.style.display = 'none';
        }
    });
}

function beforePagesClassicsBooks() {
    currentPagesClassicsBooks = (currentPagesClassicsBooks + 1) % pagesClassicsBooks.length;
    showPageClassics(currentPagesClassicsBooks);
}

const beforeButtonClassicsBooks = document.getElementById('before-button-classics-books-carousel');
beforeButtonClassicsBooks.addEventListener('click', beforePagesClassicsBooks);

function afterPagesClassicsBooks() {
    currentPagesClassicsBooks = (currentPagesClassicsBooks - 1 + pagesClassicsBooks.length) % pagesClassicsBooks.length;
    showPageClassics(currentPagesClassicsBooks);
}

const afterButtonClassicsBooks = document.getElementById('after-button-classics-books-carousel');
afterButtonClassicsBooks.addEventListener('click', afterPagesClassicsBooks);

showPageClassics(currentPagesClassicsBooks);

//CAROUSEL FANTASY BOOKS

const pagesFantasyBooks = document.querySelectorAll('.container-fantasy-books-carousel-page');
let currentPagesFantasyBooks = 0;

function showPageFantasy(index) {
    pagesFantasyBooks.forEach((page, i) => {
        if (i === index) {
            page.style.display = 'flex';
        } else {
            page.style.display = 'none';
        }
    });
}

function beforePagesFantasyBooks() {
    currentPagesFantasyBooks = (currentPagesFantasyBooks + 1) % pagesFantasyBooks.length;
    showPageFantasy(currentPagesFantasyBooks);
}

const beforeButtonFantasyBooks = document.getElementById('before-button-fantasy-books-carousel');
beforeButtonFantasyBooks.addEventListener('click', beforePagesFantasyBooks);

function afterPagesFantasyBooks() {
    currentPagesFantasyBooks = (currentPagesFantasyBooks - 1 + pagesFantasyBooks.length) % pagesFantasyBooks.length;
    showPageFantasy(currentPagesFantasyBooks);
}

const afterButtonFantasyBooks = document.getElementById('after-button-fantasy-books-carousel');
afterButtonFantasyBooks.addEventListener('click', afterPagesFantasyBooks);

showPageFantasy(currentPagesFantasyBooks);

const form = document.getElementById("form");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const menssage = document.getElementById("mensaje").value;

    console.log("Nombre:", name);
    console.log("Apellido:", lastName);
    console.log("Email:", email);
    console.log("Mensaje:", menssage);
    form.reset();
});

// MENU DESPLEGABLE

let cartContainer = document.querySelector("#modal-container");
let openc = document.querySelector("#open-cart");
let closec = document.querySelector("#close-cart");


openc.addEventListener("click", () => {
    cartContainer.classList.add("visibility-cart");
})

closec.addEventListener("click", () => {
    cartContainer.classList.remove("visibility-cart");
})


let listProductHTML = document.querySelector('.container-books');

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let product_id = positionClick.parentElement.dataset.title;
        console.log(product_id);
        console.log(positionClick)
    }
})
