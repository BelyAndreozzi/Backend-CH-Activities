import { fs } from "fs";

class ManagerProductos {
    constructor(filename) {
        this.filename = filename
    }

        async getById(id) {
            try {
                let producto
                const contenido = await fs.promises.readFile(this.filename, "utf-8")
                const productos = JSON.parse(contenido)
                producto = productos.find(producto => producto.id == id)
                if (producto == undefined) {
                    throw 'No existe ese producto'
                } else {
                    return producto
                }
            } catch (err) {
                return err
            }
        }/* Recibe un id y devuelve el objeto con ese id, o null si no está. */
    
        async deleteById(id) {
            try {
                const productos = await this.getAll();
                const productosActualizados = productos.filter(elemento => elemento.id != id);
                await fs.promises.writeFile(this.filename, JSON.stringify(productosActualizados, null, 2));
            } catch (err) {
                return "El elemento no pudo ser eliminado"
            }
        } /* Elimina del archivo el objeto con el id buscado. */
    
        /* async deleteAll() {
            try {
                await fs.promises.writeFile(this.filename, JSON.stringify([], null, 2))
            } catch (err) {
                console.log(err);
            }
        } /* Elimina todos los objetos presentes en el archivo. */ 
    
    
        async addProduct(producto) {
            let nuevoId
    
            try {
                if (fs.existsSync(this.filename)) {
                    const contenido = await this.getAll();
                    if (contenido.length > 0) {
                        nuevoId = contenido[contenido.length - 1].id + 1;
                        producto.id = nuevoId
                        contenido.push(producto);
                        await fs.promises.writeFile(this.filename, JSON.stringify(contenido, null, 2));
                    } else {
                        nuevoId = 1;
                        producto.id = nuevoId
                        await fs.promises.writeFile(this.filename, JSON.stringify([producto], null, 2))
                    }
                } else {
                    nuevoId = 1;
                    producto.id = nuevoId
                    await fs.promises.writeFile(this.filename, JSON.stringify([producto], null, 2));
                }
                return nuevoId
            } catch (err) {
                console.log(err);
            }
        } /* Recibe un objeto, lo guarda en el archivo, devuelve el id asignado. */
    
        async getAll() {
            try {
                const contenido = await fs.promises.readFile(this.filename, "utf-8")
                const productos = JSON.parse(contenido)
                return productos
            } catch (err) {
                return "No se pudo leer el archivo"
            }
        } /* Devuelve un array con los objetos presentes en el archivo. */

        async updateProduct(updatedProduct, id) {

            try {
                updatedProduct.id = id
                const contenido = await fs.promises.readFile(this.filename, "utf-8")
                const productos = JSON.parse(contenido)
                const posicionDelProducto = productos.findIndex(producto => producto.id == id)
                console.log(posicionDelProducto);
                productos[posicionDelProducto] = updatedProduct
                await fs.promises.writeFile(this.filename, JSON.stringify(productos, null, 2));
                
                return updatedProduct
            } catch (err) {
                return 'No se pudo actualizar el archivo'
            }
        } /* Actualiza un producto */
        
    }
        
        

export { ManagerProductos }