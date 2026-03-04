const express = require("express");
const router = express.Router();
const usermodel = require("../models/usermodel");
const {registerUser,loginUser,logout} = require("../controllers/authController");
const {generateToken} = require("../utils/generateToken");
router.get("/",(req,res)=>{
    res.send("in user router")
})

router.post("/register",registerUser);

router.post("/login",loginUser);

router.get("/logout",logout);

module.exports = router;