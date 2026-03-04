const express = require("express");
const isloggedIn = require("../middleware/isloggedIn");
const productmodel = require("../models/productmodel");
const router = express.Router();

router.get("/",(req,res)=>{
     res.render("registerAlogin");
})

router.get("/shop",isloggedIn, async (req,res)=>{
     let products = await productmodel.find();

     res.render("shop",{products});
})

module.exports = router;