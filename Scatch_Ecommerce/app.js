const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const path = require("path");
const cookieparser = require("cookie-parser");
const db = require("./config/mongoose-connection");
const index = require("./routes/index");
const ownerRouter = require("./routes/ownerRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");

const dotenv = require("dotenv");
dotenv.config();

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(cookieparser());


//routers
app.use("/",index);
app.use("/products",productsRouter);
app.use("/users",usersRouter);
app.use("/owner",ownerRouter);



app.listen(2000,()=>{
    console.log("http://localhost:2000/")
})