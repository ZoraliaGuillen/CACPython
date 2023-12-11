var id = location.search.substring(4)
const {
    createApp
} = Vue
createApp({
    data() {
        return {
            id: 0,
            isbn: "",
            author: "",
            category: "",
            country: "",
            description: "",
            editorial: "",
            genre: "",
            language: "",
            photo: "",
            price: 0,
            priceOff: 0,
            subgenre: "",
            title: "",
            type: "",
            year: "",

            url: 'https://zoralia.pythonanywhere.com/productos/' + id,
            //url:'http://127.0.0.1:5000/productos/' + id, //
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id=data.id
                    this.isbn=data.isbn
                    this.author=data.author
                    this.category=data.category
                    this.country=data.country
                    this.description=data.description
                    this.editorial=data.editorial
                    this.genre=data.genre
                    this.language=data.language
                    this.photo=data.photo
                    this.price=data.price
                    this.priceOff=data.priceOff
                    this.subgenre=data.subgenre
                    this.title=data.title
                    this.type=data.type
                    this.year=data.year
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        updatee() {
            let producto = {
                isbn: this.isbn,
                author: this.author,
                category: this.category,
                country: this.country,
                description: this.description,
                editorial: this.editorial,
                genre: this.genre,
                language: this.language,
                photo: this.photo,
                price: this.price,
                priceOff: this.priceOff,
                subgenre: this.subgenre,
                title: this.title,
                type: this.type,
                year: this.year
            }
            var options = {
                body: JSON.stringify(producto),
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function() {
                    alert("El Libro se edito con Éxito")
                    window.location.href = "./crud.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al editar el Libro")
                })
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')