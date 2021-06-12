const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    type : {
        type : String,
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        required : true
    }
});

module.exports = mongoose.model('contacts',contactSchema);