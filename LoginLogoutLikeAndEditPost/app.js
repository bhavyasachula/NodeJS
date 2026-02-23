const express = require('express');
const app = express();
const usermodel = require("./models/user");
const postmodel = require("./models/post");
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.render("index");
})
app.get("/profile", isloggedIn, async (req, res) => {
    try {
        const token = req.cookies.token; //getting the cookie from the browser using req.cookies.token
        if (!token) {
            res.redirect("/login");
        }
        let decoded = jwt.verify(token, "shhhhhh") //  getting the data from the cookie this is after the decoding 
        let user = await usermodel.findOne({ email: decoded.email }).populate("posts"); // and finding the user based on the cookie and getting the data/user into the var user
        let post = await postmodel.find({ user: decoded._id });
 
        res.render("profile", { user, post });
    }
    catch (err) {
        res.send("from profile")
    }
})
app.post("/post", isloggedIn, async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect("/login");
    }
    let decoded = jwt.verify(token, "shhhhhh")
    let user = await usermodel.findOne({ email: decoded.email });

    let post = await postmodel.create({
        user: user._id,// from the user data the _id is assigning 
        content: req.body.content // from the post or text area content is assigning when clicked to create a post
    });

    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile")
})

app.get("/login", (req, res) => {
    res.render("login");
})
// registration routee
app.post("/register", async (req, res) => {
    const existeduser = await usermodel.findOne({ email: req.body.email })
    if (existeduser) return res.status(500).send("user already registered");

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
            const user = await usermodel.create({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: hash
            });
            let token = jwt.sign({ email: user.email, _id: user._id }, "shhhhhh");
            res.cookie("token", token);
            res.redirect("/profile  ");
        })

    })
})

app.post("/login", async (req, res) => {

    let registereduser = await usermodel.findOne({ email: req.body.email });
    if (!registereduser) return res.status(500).send("Something went wrong " || "user not found");

    let password = req.body.password;

    bcrypt.compare(password, registereduser.password, (err, result) => {
        if (result) {

            let token = jwt.sign({
                email: registereduser.email,
                _id: registereduser._id
            }, "shhhhhh")
            res.cookie("token", token);
            res.redirect("/profile")

        }
        else res.redirect("/login")
    })
})
app.get("/like/:id", isloggedIn ,async(req,res)=>{
     const token = req.cookies.token; //getting the cookie from the browser using req.cookies
        if (!token) {
            res.redirect("/login");
        }
        let decoded = jwt.verify(token, "shhhhhh")

       
        
    let post = await postmodel.findOne({_id:req.params.id}).populate("user");
    if(post.likes.indexOf(decoded._id) === -1){
    post.likes.push(decoded._id);// Adding or pushing the id into the posts likes array
    }  
    else{   
        post.likes.pop();
    }
    await post.save();
    res.redirect("/profile");
})
app.get("/edit/:id",isloggedIn, async (req,res)=>{
    let post = await postmodel.findOne({_id:req.params.id});
    res.render("edit",{post})
})
app.post("/update/:id",isloggedIn,async (req,res)=>{
    let post = await postmodel.findOneAndUpdate({_id:req.params.id},{content:req.body.content})
    res.redirect("/profile");
})
app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/login")
})
// app.post("/edit/:id",(req,res)=>{

// })
//Middleware 

function isloggedIn(req, res, next) {
    if (req.cookies.token === "") res.send("U must Login");
    try {
        let data = jwt.verify(req.cookies.token, "shhhhhh")
        req.user = data;
        next();
    }
    catch (err) {
        return res.redirect("/login")
    }
}
app.listen(5000, () => {
    console.log("http://localhost:5000/")
});