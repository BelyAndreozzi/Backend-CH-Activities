const fs = require('fs')
const express = require('express')

const PORT = 8080
const app = express()

const server = app.listen(PORT,()=>{
    console.log(`Server iniciado y escuchando en puerto: ${PORT}`);
});

//Contenedor (clase del anterior ejercicio con función utilizada en este)
class Contenedor {
    constructor(filename) {
        this.filename = filename
    }

    async getAll() {
        try {
            const contenido = await fs.promises.readFile(this.filename, "utf-8")
            const productos = JSON.parse(contenido)
            return productos
        } catch (err) {
            console.log(err);
            return 'No se pudo leer el archivo'
        }
    }
}

const productos = new Contenedor ("./productos.txt")

// Función para obtener un producto random
function randomNumber(min, max){
    return Math.round(Math.random() * (max - min + 1) + min);
}


app.get('/productos', async (req, res) => {
    const products = await productos.getAll()
    res.send(products)
})

app.get('/productoRandom', async (req, res) => {
    const products = await productos.getAll()
    const randomProduct = randomNumber(0, products.length-1)
    const product = products[randomProduct]
    res.send(product)
})