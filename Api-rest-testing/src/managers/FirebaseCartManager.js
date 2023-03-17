import admin from "firebase-admin";
import FirebaseObjects from "../helpers/FirebaseObjects.js";
import { Carrito } from "../objs/Carrito.js";

class FirebaseCartManager {
    constructor(collection) {
        this.db = admin.firestore()
        this.cartCollection = this.db.collection(collection)
        this.firebaseHelper = new FirebaseObjects();
    }

    async getById(id) {
        const doc = this.cartCollection.doc(id)
        const cart = await doc.get()
        const response = cart.data()
        return response
    }

    async getAll() {
        const snapshot = await this.cartCollection.get()
        const docs = snapshot.docs
        let carts = docs.map(doc => {
            return {
                id: doc.id,
                productsId: doc.data().productsId,
                timestamp: doc.data().timestamp
            }
        })
     return carts
    }

    async save(cart) {
        const doc = this.cartCollection.doc()
        return await doc.create(this.firebaseHelper.mapCartToPlainJsObject(cart))
    }

    async updateById(productsId, cartId) {
        const doc = this.cartCollection.doc(cartId)
        const cart = await (await doc.get()).data()
        let updatedCart = await doc.update(this.firebaseHelper
            .mapCartToPlainJsObject(new Carrito(cart.timestamp, [...cart.productsId, ...productsId])))
        return updatedCart
    }

    async deleteById(id) {
        const doc = this.cartCollection.doc(id)
        const deletedCart = await doc.delete()
        return deletedCart
    }

    async deleteProductInCartById(cartId, productId) {
        const doc = this.cartCollection.doc(cartId)
        const cart = await (await doc.get()).data()
        const filter = cart.productsId.filter((elemento => elemento != productId))
        let updatedCart = await doc.update(this.firebaseHelper
            .mapCartToPlainJsObject(new Carrito(cart.timestamp, filter)))
        return updatedCart
    }
}

export { FirebaseCartManager }