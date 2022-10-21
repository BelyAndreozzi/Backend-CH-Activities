const fs = require("fs")

class Contenedor {
    constructor(filename) {
        this.filename = filename
    }


    async getById(id) {
        try {
            let producto
            const contenido = await fs.promises.readFile(this.filename, "utf-8")
            const productos = JSON.parse(contenido)
            producto = productos.find(producto => producto.id === id)
            return producto == undefined ? null : producto
        } catch (err) {
            return 'No se pudo leer el archivo'
        }
    }/* Recibe un id y devuelve el objeto con ese id, o null si no está. */

    async deleteById(id) {
        try {
            const productos = await this.getAll();
            const nuevosProductos = productos.filter(elemento => elemento.id !== id);
            await fs.promises.writeFile(this.filename, JSON.stringify([nuevosProductos], null, 2));
        } catch (err) {
            return "El elemento no pudo ser eliminado"
        }
    } /* Elimina del archivo el objeto con el id buscado. */

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.filename, JSON.stringify([], null, 2))
        } catch (err) {
            console.log(err);
        }
    } /* Elimina todos los objetos presentes en el archivo. */


    async save(producto) {
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
                    producto.id = 1;
                    nuevoId = producto.id
                    await fs.promises.writeFile(this.filename, JSON.stringify([producto], null, 2))
                }
            } else {
                producto.id = 1;
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
            return 'No se pudo leer el archivo'
        }
    }
} /* Devuelve un array con los objetos presentes en el archivo. */

const productoA = {
    title: 'Escuadra',
    price: 123.45,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
}
const productoB = {
    title: 'Calculadora',
    price: 234.56,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
}

const productoC = {
    title: 'Globo Terráqueo',
    price: 345.67,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
}

const usarProductos = new Contenedor("productos.txt");
console.log(usarProductos);

const getData = async () => {
    //guardar un producto
    await usarProductos.save(productoA);
    await usarProductos.save(productoB);
    await usarProductos.save(productoC);
    const productos = await usarProductos.getAll();
    console.log("productos",productos);
    const productoEncontrado = await usarProductos.getById(1);
    console.log("producto encontrado>", productoEncontrado);
    await usarProductos.deleteById(1) ;
}
getData();