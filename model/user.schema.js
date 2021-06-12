const mongoose = require("mongoose");

const userDataSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model("users",userDataSchema);