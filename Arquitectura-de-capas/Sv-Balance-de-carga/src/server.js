import express from 'express'
import handlebars from 'express-handlebars'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { Server, Socket } from 'socket.io'
import { options } from './config/databaseConfig.js' //
import { ContenedorSQL } from './dbOperations/managers/ContenedorSQL.js' //
import session from 'express-session'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { UserModel } from './dbOperations/models/user.js'
import { envConfig } from './config/envConfig.js'
import parseArgs from 'minimist'
import { fork } from 'child_process'
import cluster from 'cluster'
import os from 'os'
import { connectMongoDB } from './config/dbConnection.js'
import { indexRouter } from './routes/indexRouter.js'

//minimist
const optionsM = { default: { p: 8080, m: 'fork' }, alias: { p: "port", m: "modo" } }
const args = parseArgs(process.argv.slice(2), optionsM)

const PORT = args.p
const MODO = args.m

// MongoDB Connection
connectMongoDB()

//sv
const app = express()



const __dirname = dirname(fileURLToPath(import.meta.url))

//express
app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Handlebars
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views");
app.set('view engine', 'handlebars')


//Cookies & sessions
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: envConfig.BASE_DE_DATOS_SESSIONS
    }),
    secret: "claveSecreta",
    resave: false,
    saveUninitialized: false
}))


//Cluster 
if (MODO === 'cluster' && cluster.isPrimary) {
    const numCpus = os.cpus().length
    console.log(numCpus);
    for (let i = 0; i < numCpus; i++) {
        cluster.fork()
    }
    cluster.on('exit',(worker)=>{
        console.log(`El proceso ${worker.process.pid} dejó de funcionar`);
        cluster.fork()
    })
} else {
    //express
    const server = app.listen(PORT, () => console.log(`Server listening on port ${PORT} on process ${process.pid}`))

    //websocket
    const io = new Server(server)

    io.on('connection', async (socket) => {
        console.log('Nuevo cliente conectado');

        //productos
        socket.emit('allProducts', await productos.getAll())

        socket.on('newProduct', async (data) => {
            await productos.save(data)


            await productos.getAll()
            io.sockets.emit('allProducts', await productos.getAll())
        })

        //mensajería 
        socket.emit("allMessages", await mensajes.getAll());

        //recibimos el mensaje
        socket.on("newMsgs", async (data) => {
            await mensajes.save(data);

            socket.emit('allMessages', await mensajes.getAll())

            io.sockets.emit("allMessages", await mensajes.getAll())
        })
    })
}



const productos = new ContenedorSQL(options.mariaDB, 'productos')
const mensajes = new ContenedorSQL(options.sqliteDB, 'mensajes')



//Passport 
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
    return done(null, user.id)
})
passport.deserializeUser((id, done) => {
    // con el id se busca en la db 
    UserModel.findById(id, (error, userFound) => {
        return done(error, userFound)
    })
})

// Sign up Local Strategy 
passport.use("signupStrategy", new LocalStrategy(
    {
        passReqToCallback: true,
        usernameField: "email"
    },
    (req, username, password, done) => {
        UserModel.findOne({ email: username }, (err, userFound) => {
            if (err) return done(err)
            if (userFound) return done(null, false, { message: "el usuario ya existe" })
            const newUser = {
                email: username,
                password: password
            }
            UserModel.create(newUser, (err, userCreated) => {
                if (err) return done(err, null, { mensaje: "Hubo un error al registrar el usuario" })
                return done(null, userCreated)
            })
        })
    }
))

// Login Local Strategy 
passport.use("loginStrategy", new LocalStrategy(
    {
        passReqToCallback: true,
        usernameField: "email"
    },
    (req, username, password, done) => {
        UserModel.findOne({ email: username }, (err, userFound) => {
            if (err) { return done(err); }
            if (!userFound) { return done(null, false); }
            if (userFound.password != password) { return done(null, { mensaje: "Contraseña incorrecta" }); }
            return done(null, userFound)
        })
    }
))



//endpoints routes 
app.use("/api",indexRouter)






