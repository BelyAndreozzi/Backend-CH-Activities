const path = require("path");

const options = {
    mariaDB: {
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
    }
}

module.exports = { options };