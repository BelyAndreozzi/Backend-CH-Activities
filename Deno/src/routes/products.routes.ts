import { Router } from "../../deps.ts";
import { getProducts, getProductById, createProduct, updateProductById, deleteProductById } from "../controllers/products.controller.ts";

export const productRouter = new Router()
.get("/products", getProducts)
.get("/products/:id", getProductById)
.post("/products", createProduct)
.put("/products/:id", updateProductById)
.delete("/products/:id", deleteProductById)