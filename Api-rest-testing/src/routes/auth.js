import express from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/user.js";
import bcript from "bcrypt";

//encriptar contraseña
const createHash = (password) => {
    return bcript.hashSync(password, bcript.genSaltSync());
}


const authRouter = express.Router();

passport.serializeUser((user, done) => {
    return done(null, user.id);
})
passport.deserializeUser((id, done) => {
    User.findById(id, (err, userFound) => {
        return done(err, userFound);
    })
})//req.user=userFound

// Sign up strategy
passport.use("signupStrategy", new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
    },
    (req, username, password, done) => {
        User.findOne({ email: username }, (err, userFound) => {
            if (err) {
                return done(null,false,{message:`Error al encontrar el usuario: ${err}`});
            }
            if (userFound) {
                return done(null, false, { message: "El correo ya está registrado" });
            }
            const newUser = {
                email: username,
                name: req.body.name,
                password: createHash(password),
                address: req.body.address,
                age: req.body.age,
                phone: req.body.phone,
                avatar: req.body.avatar
            }
            User.create(newUser, (err, userCreated) => {
                if (err) {
                    return done(null, false, { message: `Error al crear el usuario: ${err}` });
                }
                return done(null, userCreated, {message: "Usuario creado correctamente"});
            })
        })
    }
))

authRouter.post("/signup", passport.authenticate("signupStrategy", {
    failureRedirect: "/api/auth/signupError",
    failureMessage: true,
}), (req, res) => {
    res.send('Usuario registrado y autenticado')
})

authRouter.get("/signupError",(req,res)=>{
    const errMessage = req.session.messages[0] || '';
    req.session.messages = [];
    res.json({error:errMessage})
});


// Login strategy
passport.use("loginStrategy", new LocalStrategy(
    {
        usernameField: "email",
        passReqToCallback: true,
    },
    (req, username, password, done) => {
        User.findOne({ email: username }, (err, userFound) => {
            if (err) {
                return done(null, false, { message: `Error al encontrar el usuario: ${err}` });
            }
            if (!userFound) {
                return done(null, false, { message: "El correo no está registrado" });
            }
            if (!bcript.compareSync(password, userFound.password)) {
                return done(null, false, { message: "Contraseña incorrecta" });
            }
            return done(null, userFound, { message: "El usuario ha iniciado sesión correctamente" });
        })
    }
))

authRouter.post("/login", passport.authenticate("loginStrategy", {
    failureRedirect: "/api/auth/loginError",
    failureMessage: true,
}),
    (req, res) => {
        const {email} = req.body
        req.session.passport.username = email
        res.send('El usuario ha iniciado sesión correctamente')
    })



//Logout 
authRouter.post("/logout", (req, res) => {
    req.logout(err=>{
        if(err){
            return res.status(500).json({message:`Error al cerrar sesión: ${err}`})
        }
        res.status(200).json({message:'Sesión cerrada correctamente'})
    });
})

export { authRouter };