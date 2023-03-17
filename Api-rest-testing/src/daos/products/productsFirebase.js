import { FirebaseProductManager } from "../../managers/FirebaseProductManager.js";

class FirebaseProductsDao extends FirebaseProductManager{
    constructor(collection){
        super(collection)
    }
}

export {FirebaseProductsDao}