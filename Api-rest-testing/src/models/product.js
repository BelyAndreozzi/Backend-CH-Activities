import mongoose from "mongoose";


const productCollection = "productos";

const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        thumbnail: { type: String, required: true }
    }
);

export const Product = mongoose.model(productCollection, productSchema)