const mongoose = require("mongoose");

mongoose
.connect("mongodb://localhost:27017/scatch")
.then(()=>{
   
})
.catch((err)=>{
    console.log(err.message);
})
module.exports = mongoose.connection;