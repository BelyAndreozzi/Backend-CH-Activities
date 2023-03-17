/* import path from "path"; */
import mongoose from "mongoose";

const options = {
    /* mariaDB: {
        client: "mysql",
        connection: {
            host: "127.0.0.1",
            user: "root",
            password: "",
            database: "firstdatabase"
        }
    },
    sqliteDB: {
        client: "sqlite",
        connection: {
            filename: path.join(__dirname, "../database/chatdb.sqlite")
        },
        useNullAsDefault: true
    } */ // no usadas actualmente 
    MongoDB: {
        URI: "mongodb+srv://belen:32175@ecommerce.b823iwp.mongodb.net/ecommerce?retryWrites=true&w=majority",
        parameters: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },

    firebase: {
        type: "service_account",
        project_id: "ecommerce-778be",
        private_key_id: "349f54fbaebd071b2a58f778fbb47ab799d1760b",
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCP5eJjyJhc2sd4\nDnMKSm7F7mV+V/nUqlFuqzhow5dVYjHkRr+EsnKj03TiKTFs5gkP/KMiOjWbcspD\nfF1kJZJcfQvvuo9nEaSaaPODlyAxkw1QNaMzhiVcuAlGYq9o2wpxE60gW5SgVts4\nBVqSxlHhdGM/8xcBC9+3eQRIqMEmIUogNogq/S654fW/ZnRYIJwHDsucZVmQ6dTx\n6mU7DMB9JL347/JLyUxXtR3xp6iARf6Ukqh4fJI0a+IZ16q9/TdPHNj6xEFI3e8A\nTawUDmq499JjDbmFR8A/hwz9Z6YU0DuOWVQlvZxPOfN8lljkQaSUcTKiSTFvbp2N\niB7w7HLTAgMBAAECggEABIOpvoekgAU9DL8nTMNZBkycUoJgDBPryhUFCARa0wrp\nlcfCal9OyWTw3cd9DXWKAz5hv8kjtWS8g7F7HJExLkWeAj9QEGO1TkLMoOw0zllW\nqZWFMTCcK3R6lgKyjg+RHEsJu2IkH4OaDP/d/4zJNNF565+ssRO2SQM65yykIpYM\nuHG3QcM1HTM9crrxg8hE0B/go1tUY8BTjJ8AKwWx0IEcO/XYNZQqf5Gbs+knlqiO\nyCswa/GBphQ01UDBI3SPixss0Au4/Iv+xZIcjwmCNKhnFG9kF4G31FberB3aL8FN\n7juNxDAkiznYqMm7gHJfxRUPqs0aEY+Foo5SCs9hgQKBgQDG1GPUZEBJhPtsEJ1c\nnELPG7LgQl2CV/as0hAseiaiWlEh7cwtvADIMwAxFR941RRkx5RIACY4JtwsPTtU\n6W90H/TQtrROYmchTxIZS+EP1568lEvMD+MB9Z3sjGVBx+1AvPsXzxNyPrQg2KqB\n6h4rxiDC20bojV/LokrCZeRX6wKBgQC5RgqFha8W9hoBd/NllsnN3dNbgmCGpu5D\nZkI3gWn/ex26SqHBJaajjchwqCEmuh3/UDwP5KxRI74qOYyZCqFPrVLgBT2kLJFJ\nA8y9eLql0RXhaFlFQN9Y7W859+qyS3SzJ9hCWOrR/M0PEzAJgd+1ouFG9Dxy4tsf\nW064C1o+uQKBgQCjgnBibtsrWrAEi5lNWrfaaBXvNMR/d2VFdC6W1RFGfG2yMEOz\n7KLcAI0M0Ckkjl6KDlLT70N+8/4mZ2iOiLX+UnVa2pVmzKexDbx9jxgTlidVP8Mh\nmoL9zoZDzKVMtmRW09LOHp4IWqZ5SJTX57dOGk5A0GD8x55a8Sj3uyFQZwKBgQCK\n/tf/6hY8ZK+H8ISi72hA0S2y1nIyMuRHnl0JJUbvi173FuyZafTFeSYqFoigdDrz\nAy+8QLNiQC13oisv2cDBdOfa9zOSinkIzRf6AawNoHoI3G80vIGTRrYOSEdEMcXA\nbqEYzXqFxWHV8HA2gb/ilerqf2smSblYofjBrIqsyQKBgCR/w2w3x4pJx2pl4lj4\nNLwk8uSWZUUrQgjLy+9VDmdr9I2rG69v0dwtNkUS6uedTwk9WL3HNuiaRge6xw1E\naDmKFjW5wOhT+g3wMza9M03RskXs6aI92bGOqylTqBPNJVhk1e3aCOFy2zzrWfX0\nwiGCKiXboJYmU6bh9x9aeGAq\n-----END PRIVATE KEY-----\n",
        client_email: "firebase-adminsdk-zq05a@ecommerce-778be.iam.gserviceaccount.com",
        client_id: "112391730592583158049",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zq05a%40ecommerce-778be.iam.gserviceaccount.com"
    }
}


export default options