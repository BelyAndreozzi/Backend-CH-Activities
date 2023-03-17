import express from "express"
import { transporter, gMail } from "./messages/email.js";
import { twilioClient, twilioWhatsappPhone, adminWhatsappPhone } from "./messages/whatsapp.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import options from "./config/databaseConfig.js";
import passport from "passport";
import { logger } from "./loggers/logger.js";

import { checkUserLoggued } from "./middlewares/userAuth.js";

const { Router } = express;

const PORT = process.env.PORT || 8080
const app = express()

const server = app.listen(PORT, () => logger.info(`Server listening on port ${PORT}`))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


/* app.use("*", (req, res) => {
    res.status(404).send("La ruta a la que intentas acceder, no existe!");
}) */

//Session config
app.use(session({
    store: MongoStore.create({
        mongoUrl: options.MongoDB.URI,
    }),
    secret: "secret",
    resave: false,
    saveUninitialized: false,
}))

//Passport config
app.use(passport.initialize());
app.use(passport.session());

//Router
const routerProductos = Router();
app.use("/api/productos", routerProductos);
const routerCarrito = Router();
app.use("/api/carrito", routerCarrito);
import { authRouter } from "./routes/auth.js";
app.use("/api/auth", authRouter);

//Managers y helper imports/config
import { ManagerDaoCarts, ManagerDaoProducts } from "./config/daosConfig.js";

const managerProductos = ManagerDaoProducts
import { Producto } from "./objs/Producto.js";

const managerCarrito = ManagerDaoCarts
import { Carrito } from "./objs/Carrito.js";


import { DateHelper } from "./helpers/DateHelper.js";
const dateHelper = new DateHelper()


//admin W.I.P 
let isAdmin = true;


//transporter


app.post("/envio-email", async (req, res) => {
    try {
        const productos = await managerProductos.getAll()
        await transporter.sendMail({
            from: "server app Node",
            to: gMail, //destinatario
            subject: `Nuevo pedido de: ${req.user.name} [${req.user.email}].`,
            html: `<div>
            <h1>Tu pedido es:</h1>
            <p>${productos}</p>
            
    </div>`
        })
        res.send('El mensaje se ha enviado correctamente')
    } catch (error) {
        res.send(`Hubo un error ${error}`)
    }
})

// Enviar mensaje de Whatsapp con los productos 
app.post("/envio-whatsapp", async (req, res) => {

    try {
        const productos = await managerProductos.getAll()
        await twilioClient.messages.create({
            from: twilioWhatsappPhone,
            to: adminWhatsappPhone,
            body: `Nuevo pedido de: ${req.user.name} [${req.user.email}]. Tus productos son: ${productos} `
        })
        res.send('El mensaje de Whatsapp se ha enviado correctamente')
    } catch (error) {
        res.send(`Hubo un error ${error}`)
    }

})


//endpoints productos 
routerProductos.get("/", /* checkUserLoggued, */ async (req, res) => {
    const result = await managerProductos.getAll()
    if (typeof result == "string") {
        res.status(404).send('El archivo no existe')
    } else {
        res.json(result)
    }
});

routerProductos.get("/:id", async (req, res) => {
    logger.info(req.params.id);
    res.json(await managerProductos.getById(req.params.id));
});

routerProductos.post("/", async (req, res) => {
    try {
        const product = new Producto(req.body.title, req.body.price, req.body.thumbnail)
        const result = await managerProductos.save(product);
        res.json(result);
    } catch (error) {
        return 'Faltan datos del producto'
    }
});

routerProductos.put("/", async (req, res) => {
    try {
        if (req.body.title == undefined || req.body.price == undefined || req.body.thumbnail == undefined) {
            throw 'Faltan datos del producto a actualizar'
        }
        else {
            const product = new Producto(req.body.title, req.body.price, req.body.thumbnail)
            const result = await managerProductos.updateProduct(product, req.body.id);
            res.json(result);
        }
    } catch (error) {
        logger.error(error);
        res.status(404).send(error)
    }
}); // ¿ LO CAMBIO ? 

routerProductos.delete("/:id", async (req, res) => {
    const result = await managerProductos.deleteById(req.params.id);
    res.json(result);
});


//endpoints carrito
routerCarrito.get("/:id/productos", async (req, res) => {
    const result = await managerCarrito.getAll(req.params.id)
    if (typeof result == "string") {
        res.status(404).send('El carrito no existe')
    } else {
        res.json(result)
    }
});

routerCarrito.post("/", async (req, res) => {
    try {

        const carrito = new Carrito(dateHelper.getDate(), req.body.productsId == undefined ? [] : req.body.productsId)

        const result = await managerCarrito.save(carrito);
        res.json(result);
        
    } catch (error) {
        logger.error(error);
    }
});

routerCarrito.post("/:id/productos", async (req, res) => {
    try {
        const result = await managerCarrito.save(req.body.id, req.params.id)
        res.json(result)
    } catch (error) {
         logger.error(error);
    }
})

routerCarrito.delete("/:id", async (req, res) => {
    const result = await managerCarrito.deleteById(req.params.id);
    res.json(result);
})

routerCarrito.delete("/:id/productos/:id_prod", async (req, res) => {
    const result = await managerCarrito.deleteProductInCartById(req.params.id_prod, req.params.id);
    res.json(result);
})

export {app}