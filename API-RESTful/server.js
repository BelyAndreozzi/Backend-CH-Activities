const express = require('express')

const app = express();

const { Router } = require('express')

const PORT = 8080;

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// PUBLIC
app.use(express.static('public'))

app.listen(PORT, () => {
    console.log(`Server escuchando en el puerto: ${PORT}`);
})

const routerProductos = Router()

const Productos = require('./clase.js')

const productos = new Productos()

//GET '/api/productos' -> devuelve todos los productos.
routerProductos.get("/", (req, res) => {
    res.json(productos.getProductos())
});

//GET '/api/productos/:id' -> devuelve un producto según su id.
routerProductos.get("/:id", (req, res) => {
    res.json(productos.getProductById(req.params.id));
});

//POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
routerProductos.post("/", (req, res) => {
    const result = productos.addProduct(req.body);
    res.json(result);
});

//PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
routerProductos.put("/", (req, res) => {
    const result = productos.updateProduct(req.body);
    res.json(result);
});

//DELETE '/api/productos/:id' -> elimina un producto según su id.
routerProductos.delete("/:id", (req, res) => {
    const result = productos.deleteProduct(req.params.id);
    res.json(result);
});


app.use('/api/productos', routerProductos)
