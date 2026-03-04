const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/productmodel");


router.post("/create", upload.single("image"), async (req, res) => {

    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    try {
        let product = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor
        })
        if(product){
            console.log("product created succesfully")
            res.redirect("/owner/admin")
           
        }
    } catch(err){
        return res.send(err.message)
    }

})

module.exports = router;