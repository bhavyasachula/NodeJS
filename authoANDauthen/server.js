const express = require('express');
const app = express();
const cookieParser = require('cookie-parser'); 
const path = require('path');
const userModel = require("./models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { render } = require('ejs');

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.render("index")
});
app.post("/create",(req,res)=>{
      var username = req.body.username;
    var email = req.body.email;
    var password= req.body.password;
    
 bcrypt.genSalt(10,(err,salt)=>{        
     bcrypt.hash(password,salt,async(err,hash)=>{

        let createdUser = await userModel.create({
        username:username,
        email:email,
        // password:password
        password:hash // note :- hash is passed as the encryted password
    
    }) 
   let token = jwt.sign({email},"shhhhhhhh");
   res.cookie("token",token);
    res.send(createdUser);
        })
    })
  

    
})
app.get("/logout",(req,res)=>{
    res.cookie("token","");
    res.redirect("/");
})
app.get("/login",(req,res)=>{
    res.render("login");
});
app.post("/login", async(req,res)=>{
    console.log(req.body.email);
    console.log(req.body.password);
    let email = req.body.email;
    let user = await userModel.findOne({email:req.body.email});

    if(!user) return res.send("something went wrong")
    bcrypt.compare(req.body.password,user.password,function(err,result){
        if(result){
            let token = jwt.sign({email},"shhhhhhhh")
            res.cookie("token",token);
            res.send("You are logged in");
        }
        else res.send("something went wrong")
    })
    
  
})
app.listen(2000);
 