import express from "express";
import {buildSchema} from "graphql";
import {graphqlHTTP} from "express-graphql";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>console.log(`Server listening on port ${PORT}`));


//GraphQL Schema Products
const graphqlSchema = buildSchema(`
    type Product{
        id:Int,
        name:String,
        price:Int,
        thumbnail:String
    }

    input ProductInput{
        name:String,
        price:Int,
        thumbnail:String
    }
    
    type Query{
        getProducts: [Product],
        getProductById(id:Int): Product
    }

    type Mutation{
        createProduct(product:ProductInput): Product,
        deleteProduct(id:Int): String,
        updateProduct(id:Int, product:ProductInput): Product
    }
`)

let products = []

const root = {
    getProducts: () => {
        return products
    },

    getProductById: ({id}) => {
        const productFound = products.find(product => product.id === id)
        if(productFound){
            return productFound
        }else{
            return null
        }
    },

    createProduct: ({product}) => {
        let newId 
        if(!products.length){
            newId = 1
        }else{
            newId = products[products.length - 1].id + 1
        }
        
        const newProduct = {
            id: newId,
            ...product
        }
        products.push(newProduct)
        return newProduct
    },

    deleteProduct: ({id}) => {
        const productIndex = products.findIndex(product => product.id === id)
        if(productIndex > -1){
            products.splice(productIndex, 1)
            return `Product  deleted`
        }else{
            return `Product  not found`
        }
    },

    updateProduct: ({id, product}) => {
        const productIndex = products.findIndex(product => product.id === id)
        if(productIndex > -1){
            products[productIndex] = {
                ...products[productIndex],
                ...product
            }
            return products[productIndex]
        }else{
            return null
        }
    }
}


// enlace del esquema y los metodos 
app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: root,
    graphiql: true
}))

app.get("/product", (req, res) => {
    res.json({title: "Product", price: 10})
})
