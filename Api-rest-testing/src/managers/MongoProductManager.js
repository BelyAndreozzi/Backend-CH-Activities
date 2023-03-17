import mongoose from "mongoose";
import {Product} from "../models/product.js";

class MongoProductManager { 
    constructor(options, collection){
        this.database = mongoose.connect(options.URI, options.parameters)
        this.collection = collection
    }

    async getById(id){
        return await Product.findById(id)
    }

    async getByIds(idList){
        return await Product.find({_id:{$in:idList}})
    }

    async getAll(){
        return await Product.find()
    }

    async save(product){
        const newProduct = new Product(product)
        return await newProduct.save()
        
    }

    async updateById(id, data){
        return await Product.findByIdAndUpdate(id, data)
    }

    async deleteById(id){
        return await Product.findByIdAndDelete(id)
    }
}

export { MongoProductManager }