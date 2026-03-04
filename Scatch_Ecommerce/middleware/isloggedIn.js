const usermodel = require("../models/usermodel");
const jwt = require("jsonwebtoken");

module.exports = async (req,res,next)=>{
    let token  = req.cookies.token;

    if(!token)  {
     return res.redirect("/");
    }

    try{
        let decoded = jwt.verify(token,process.env.JWT_KEY);    
        const user = await usermodel.findOne({email:decoded.email}).select("-password");
        if(!user) return res.redirect("/")
        req.user = user;
        next();
    }    
    catch(err){
    return res.redirect("/");
    }


}