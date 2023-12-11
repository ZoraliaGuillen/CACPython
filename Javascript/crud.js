const { createApp } = Vue
createApp({
    data() {
        return {
            productos: [],
            //url:'http://127.0.0.1:5000/productos',//
            url: 'https://zoralia.pythonanywhere.com/productos',
            error: false,
            cargando: true,
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
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.productos = data;
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        deletee(producto) {
            const url = this.url + '/' + producto;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.json()) // or res.json()
                .then(res => {
                    location.reload();
                })
        },
        createe() {
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
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("El Libro se creo con Éxito")
                    window.location.href = "./crud.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al crear el Libro")
                })
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')