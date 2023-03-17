import mongoose from "mongoose";


const cartCollection = "carritos";

const cartSchema = new mongoose.Schema(
    {
        timestamp: { type: String, required: true },
        productsId: { type: Array, required: true }
    }
);


export const Cart = mongoose.model(cartCollection, cartSchema)