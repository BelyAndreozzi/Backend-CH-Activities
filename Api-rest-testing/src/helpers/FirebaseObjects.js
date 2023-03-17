class FirebaseObjects{
    mapProductToPlainJsObject(object){
        return {title:object.title,price:object.price,thumbnail:object.thumbnail}
    }

    mapCartToPlainJsObject(object){
        return object.timestamp!=undefined?{timestamp:object.timestamp,productsId:object.productsId}:
        {productsId:object.productsId}
    }
}

export default FirebaseObjects
