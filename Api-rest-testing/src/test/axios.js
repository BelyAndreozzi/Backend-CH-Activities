import axios from 'axios';

const URL = 'http://localhost:8080/api';
import { Producto } from "../objs/Producto.js";

/* const testGetProducts = async () => {
    try {
        const response = await axios.get(`${URL}/productos/`);
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
}
testGetProducts(); */

const testAddProduct = async () => {
    try {
        const product = new Producto('title', 'price', 'thumbnail');
        const response = await axios.post(`${URL}/productos/`, product);
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
}
testAddProduct();