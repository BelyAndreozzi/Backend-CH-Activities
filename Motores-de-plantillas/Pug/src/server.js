const express = require('express')
const app = express()
const PORT = 8080
app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(__dirname + '/public'))

app.set('views', __dirname + '/views')

app.set('view engine', 'pug')

const Productos = require('./clase.js')
const productos = new Productos()

app.get('/', (req, res)=>{
    res.render('form', {
        mensaje:'Recordatorio de cómo funciona agregar algo dinámico XD'
    })
})



const products = productos.getProductos()
app.get('/productos', async(req, res)=>{
    if(await products==false){
        res.render('productos', {
            products,
            error: "No hay productos agregados"
        })
    } else {
        res.render('productos', {
            products
        })
    }
})




app.post('/productos', (req, res)=>{
    const result = productos.addProduct(req.body);
    res.redirect('/productos')
})

