class Usuario {
    constructor(nombre, apellido, libros = [], mascotas = []) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    }

    addMascotas(mascota) {
        this.mascotas.push(mascota);
    }

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(titulo, autor) {
        this.libros.push({ titulo, autor: autor });
    }

    getBookNames() {
        return this.libros.map((book) => book.titulo);
    }
}

const usuario1 = new Usuario(
    "Belen",
    "Andreozzi",
    [{ titulo: "Los vecinos mueren en las novelas", autor: "Sergio Aguirre" }],
    ["gato negro", "gato bicolor", "gato tricolor"]
);

const usuario2 = new Usuario(
    "Nicolás",
    "Fresco",
    [{ titulo: "The Walking Dead", autor: "Robert Kirkman, Tony Moore" }],
    ["gato atigrado", "perro"]
);

console.log(usuario1.getFullName());
console.log({ cantidad: usuario1.countMascotas() });
usuario1.addBook("A Game of Thrones", "George R. R. Martin");
console.log(usuario1.getBookNames());


console.log(usuario2.getFullName());
usuario2.addMascotas("gato negro")
console.log({ cantidad: usuario2.countMascotas() });
console.log(usuario2.getBookNames());