import admin from "firebase-admin";
import FirebaseObjects from "../helpers/FirebaseObjects.js";

class FirebaseProductManager { 
    constructor(collection){
        this.db = admin.firestore()
        this.productCollection = this.db.collection(collection)
        this.firebaseHelper = new FirebaseObjects();
    }

    

    async getById(id){
        const doc = this.productCollection.doc(id)
        const product = await doc.get()
        const response = product.data()
        return response
    }

    async getAll(){
        const snapshot = await this.productCollection.get()
        const docs = snapshot.docs
        let products = docs.map(doc => {
            return {
                id: doc.id,
                title: doc.data().title,
                price: doc.data().price,
                thumbnail: doc.data().thumbnail
            }
        })
        return products
    }

    async save(product){
        const doc = this.productCollection.doc()
        try {
            await doc.create(this.firebaseHelper
                .mapProductToPlainJsObject(product))
        } catch (error) {
            console.log(error);
        }
        console.log("producto agregado");
    }

    async updateProduct(data,id){
        const doc = this.productCollection.doc(id)
        console.log(doc);
        let updatedProduct = await doc.update(this.firebaseHelper
            .mapProductToPlainJsObject(data))
        return updatedProduct
    }

    async deleteById(id){
        const doc = this.productCollection.doc(id)
        const deletedProduct = await doc.delete()
        return deletedProduct
    }
}

function mapProductToPlainJsObject(object){
    return {title:object.title,price:object.price,thumbnail:object.thumbnail}
}

export { FirebaseProductManager }