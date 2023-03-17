import { MongoCartManager } from "../../managers/MongoCartManager.js";

class MongoCartsDao extends MongoCartManager{
    constructor(options, collection){
        super(options, collection)
    }
}

export {MongoCartsDao}