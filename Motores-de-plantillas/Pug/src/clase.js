class Productos {
    constructor(title, price, thumbnail) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
    productos = [];
    getProductos() {
        return this.productos;
    }
    getProductById(id) {
        const product = this.productos.find(producto => producto.id == id);
        if (product == undefined) {
            return { error: "Producto no encontrado" };
        } else {
            return product;
        }
    }
    addProduct(product) {
        if (this.productos.length > 0) {
            const auxId = this.productos[this.productos.length - 1].id + 1;
            const obj = {
                id: auxId,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail
            }
            this.productos.push(obj);
            return obj;
        } else {
            const obj = {
                id: 1,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail
            }
            this.productos.push(obj);
            return obj;
        }
    }
    updateProduct(product) {
        const obj = {
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail
        }
        const products = this.productos.find(producto => producto.id === product.id);
        if (products == undefined) {
            return { error: "No existe producto con ese ID" };
        } else {
            const filteredProducts = this.productos.filter(producto => producto.id !== product.id);
            filteredProducts.push(obj);
            this.productos = filteredProducts;
            return { success: "Se ha actualizado el producto", products: this.productos };
        }
    }
    deleteProduct(id) {
        const products = this.productos.find(producto => producto.id == id);
        if (products == undefined) {
            return { error: "No existe producto con ese id" };
        } else {
            const filteredProducts = this.productos.filter(producto => producto.id != id);
            console.log(filteredProducts);
            this.productos = filteredProducts;
            return { success: `Se ha eliminado el producto con el id: ${id}`, productosNuevos: this.productos };
        }
    }
}

module.exports = Productos