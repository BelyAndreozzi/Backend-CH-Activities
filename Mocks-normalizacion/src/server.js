const express = require('express')
const handlebars = require  ('express-handlebars')
const {Server, Socket} = require('socket.io')
const {options} = require('./config/databaseConfig')
const {ContenedorSQL} = require('./managers/ContenedorSQL')


const path = require('path')
const viewsFolder = path.join(__dirname, 'views' )

const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, ()=>console.log(`Server listening on port ${PORT}`))

app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.engine("handlebars", handlebars.engine())


app.set("views", viewsFolder )
app.set('view engine', 'handlebars' )

const productos = new ContenedorSQL(options.mariaDB, 'productos')
const mensajes = new ContenedorSQL(options.sqliteDB, 'mensajes')


const io = new Server(server)

io.on('connection', async(socket)=>{
    console.log('Nuevo cliente conectado');

    //productos
    socket.emit('allProducts', await productos.getAll())

    socket.on('newProduct', async(data)=>{
        await productos.save(data)

        await productos.getAll() 
        io.sockets.emit('allProducts', await productos.getAll())
    })

    //mensajería 
    socket.emit("allMessages", await mensajes.getAll());
    
    //recibimos el mensaje
    socket.on("newMsgs", async(data)=>{
        await mensajes.save(data);

        socket.emit('allMessages', await mensajes.getAll())
        
        io.sockets.emit("allMessages", await mensajes.getAll())
    })
})


app.get('/', (req, res)=>{
    res.render('form')
})

app.get('/api/productos-test', (req, res)=>{
    res.render('productosFaker')
})






