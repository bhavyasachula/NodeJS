const express = require("express");
const router = express.Router();

router.get("/admin",(req,res)=>{
   res.render("createproductsadmin");
})

// router.post("/")
module.exports = router;