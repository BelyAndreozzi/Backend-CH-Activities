const express = require('express')
const handlebars = require  ('express-handlebars')
const {Server, Socket} = require('socket.io')
const {options} = require('./config/databaseConfig')
const {ContenedorSQL} = require('./managers/ContenedorSQL')
const session = require("express-session")
const cookieParser = require("cookie-parser")
const MongoStore = require("connect-mongo")


const path = require('path')
const viewsFolder = path.join(__dirname, 'views' )

const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, ()=>console.log(`Server listening on port ${PORT}`))

//express
app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Handlebars
app.engine("handlebars", handlebars.engine())
app.set("views", viewsFolder )
app.set('view engine', 'handlebars' )

//Cookies & sessions
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: options.mongoAtlas.urlDB
    }),
    secret:"claveSecreta",
    resave:false,
    saveUninitialized:false
}))

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
    
    if (req.session.username) {
        res.render('form', {name:req.session.username})
    } else {
        res.redirect('/login')
    }
})

app.get('/login', (req, res)=>{
    if (req.session.username) {
        res.redirect('/')
    } else {
        res.render('login')
    }
})

app.post('/login', (req, res)=>{
    const {name} = req.body
    req.session.username = name
    res.redirect('/')
})

app.get("/logout", (req, res)=>{
    const name = req.session.username
    req.session.destroy(err=>{
        if (err) return res.redirect('/')
        res.render("logout", {name:name})
    })
})







