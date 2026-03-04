const usermodel = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const {generateToken} = require("../utils/generateToken");

module.exports.registerUser = async function (req, res) {
    let { fullname, password, email } = req.body;

    let registereduser = await usermodel.findOne({ email });
    if (registereduser) return res.send("U have already registered your account");
    else {
        bcrypt.genSalt(7, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message);
                else {
                    const user = await usermodel.create({
                        fullname,
                        password: hash,
                        email
                    })
                let token = generateToken(user);
                res.cookie("token",token);
                res.redirect("/shop");
                }
            })

        })
    }
}
module.exports.loginUser =  async(req,res)=>{
    let {email,password} =req.body;

    let user = await usermodel.findOne({email:email});

    if(!user) return res.redirect("/").status(500);
    
   bcrypt.compare(password,user.password,function(err,result){
     
    if(result){
        let token = generateToken(user);
        res.cookie("token",token);    
        res.redirect("/shop")
    } 
    else return res.send("email or password is incorrect");

});

   

}
module.exports.logout = (req,res)=>{
  
    res.clearCookie("token");
    res.redirect("/")
}