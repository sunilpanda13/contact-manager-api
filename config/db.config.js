const { mongodbUsername, mongodbPassword } = require("./env.config");

const config = {
    uri : `mongodb+srv://${mongodbUsername}:${mongodbPassword}@contactmanager.ltuwy.mongodb.net/contactManagerdb?retryWrites=true&w=majority`
}

module.exports = config;