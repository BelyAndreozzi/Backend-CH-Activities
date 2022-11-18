const express = require('express')
const handlebars = require  ('express-handlebars')
const {Server, Socket} = require('socket.io')


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

const Productos = require('./managers/Productos.js')
const productos = new Productos()

const Mensajes = require('./managers/Mensajes.js')
const mensajes = new Mensajes()


const io = new Server(server)

io.on('connection', async(socket)=>{
    console.log('Nuevo cliente conectado');

    //productos
    socket.emit('allProducts', await productos.getProductos())

    socket.on('newProduct', async(data)=>{
        await productos.addProduct(data)

        await productos.getProductos() 
        io.sockets.emit('allProducts', await productos.getProductos())
    })

    //mensajería 
    socket.emit("messagesChat", mensajes);
    
    //recibimos el mensaje
    socket.on("newMsgs", async(data)=>{
        const newMessages = await mensajes.newMsg(data, mensajes.getMessages);

        socket.emit('allMessages', newMessages)
        
        io.sockets.emit("allMessages", await mensajes.newMsg(data, mensajes.getMessages))
    })
})



app.get('/', (req, res)=>{
    res.render('form')
})







