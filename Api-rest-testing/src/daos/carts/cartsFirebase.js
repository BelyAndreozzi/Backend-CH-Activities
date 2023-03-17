import { FirebaseCartManager } from "../../managers/FirebaseCartManager.js";

class FirebaseCartsDao extends FirebaseCartManager{
    constructor(collection){
        super(collection)
    }
}

export {FirebaseCartsDao}
