let dataBooks = []

async function infoBooksDetails() {

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

        })

    printDetails(dataBooks)
}

infoBooksDetails()

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

// TEMPLATE DETALLES

function printDetails() {
    let id = location.search.split("?=id=")
    console.log(id)
    let selectId = id[1]
    console.log(selectId)
    let arrayDetails = []

    for (var i = 0; i < dataBooks.length; i++) {

        if (dataBooks[i].id == selectId) {
            arrayDetails.push(dataBooks[i])
        }
    }

    console.log(arrayDetails)

    var cardBooksDetails = document.getElementById("container-books-details")
    cardBooksDetails.innerHTML =
        `
        <div class="card-books-details">
            <div class="image">
                <img src="${arrayDetails[0].photo}" alt="${arrayDetails[0].title}" class="photoService">
            </div>
            <div class="details">
                <h3>${arrayDetails[0].title}</h3>
                <h4>${arrayDetails[0].author}</h4>
                <p>${arrayDetails[0].description}</p>
                <div class="genres">
                    <button>${arrayDetails[0].genre}</button>
                    <button>${arrayDetails[0].subgenre}</button>
                </div>
                <div class="prices">
                    <p class="price-off">${arrayDetails[0].price}</p>
                    <p class="off">5% OFF</p>
                </div>
                <p class="price">${arrayDetails[0].priceOff}</p>
                <div class="card-details">
                    <div>
                        <p>Encuadernación :</p>
                        <p>${arrayDetails[0].type}</p>
                    </div>
                    <div>
                        <p>ISBN :</p>
                        <p>${arrayDetails[0].ISBN}</p>
                    </div>
                    <div>
                        <p>Editorial :</p>
                        <p>${arrayDetails[0].editorial}</p>
                    </div>
                    <div>
                        <p>Año de Lanzamiento :</p>
                        <p>${arrayDetails[0].year}</p>
                    </div>
                    <div>
                        <p>País de Lanzamiento :</p>
                        <p>${arrayDetails[0].country}</p>
                    </div>
                    <div>
                        <p>Idioma de Lanzamiento :</p>
                        <p>${arrayDetails[0].language}</p>
                    </div>
                </div>
            </div>
        </div>
        `
}

