const mongoose = require("mongoose");

const usermodel= mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    products:Array,
    contact:Number,
    picture:String
})

module.exports = mongoose.model("user",usermodel);
