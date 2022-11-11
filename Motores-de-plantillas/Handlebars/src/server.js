const express = require ('express')
const handlebars = require  ('express-handlebars')
const path = require('path')

const viewsFolder = path.join(__dirname, 'views' )
console.log(viewsFolder);

const app = express()

const PORT = 8080

app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`))

app.engine("handlebars", handlebars.engine())


app.set("views", viewsFolder )
app.set('view engine', 'handlebars' )

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const Productos = require('./clase.js')
const productos = new Productos()

app.get('/', (req, res)=>{
    res.render('form')
})

const products = productos.getProductos()
app.get('/productos', async(req, res)=>{
    if(await products==false){
        res.render('productos', {
            error: "No hay productos agregados"
        })
    } else {
        res.render('productos', {
            products
        })
    }
})

app.post('/productos', (req, res)=>{
    productos.addProduct(req.body);
    res.redirect('/productos')
})

