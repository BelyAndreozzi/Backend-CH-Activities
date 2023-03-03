import mongoose from "mongoose";
import { envConfig } from "./envConfig.js";

//Database connection 
export const connectMongoDB = () => {
    mongoose.set('strictQuery', false)
    mongoose.connect(envConfig.BASE_DE_DATOS, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (error) => {
        if (error) console.log("Conexión fallida");
        console.log("Base de datos conectada");
    })
}