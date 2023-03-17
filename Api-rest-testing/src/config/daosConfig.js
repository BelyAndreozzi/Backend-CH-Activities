import options from "./databaseConfig.js"

let ManagerDaoCarts
let ManagerDaoProducts

let databaseType = "mongoDB"

switch (databaseType) {
    case "mongoDB":
        const {MongoCartsDao} = await import("../daos/carts/cartsMongo.js")
        const {MongoProductsDao} = await import ("../daos/products/productsMongo.js")
        ManagerDaoCarts = new MongoCartsDao(options.MongoDB, 'carritos')
        ManagerDaoProducts = new MongoProductsDao(options.MongoDB, 'productos')
        break;

    default:
        break;
}

export {ManagerDaoCarts, ManagerDaoProducts}