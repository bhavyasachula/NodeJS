
// fs.writeFile("hey.txt","heloo nodeejs",function(err){
//     if(err)console.log(" error"); 
//     else console.log("no erori");
// }
// )
// fs.appendFile("hello.txt","btw hello bhavya",function(err){
//     if(err) console.err(err);
//     else console.log("done append");
// })

// fs.rename("hello.txt","hey.txt",function(err){
//     if(err)console.error(err);
//     else console.log("renamed the file");
// })
// fs.copyFile("hey.txt","./copy.txt",function(err){
//     if(err) console.error(err);
//     else console.log("copied");
// // })
// fs.unlink("hey.txt",function(err){
//     if(err)console.log("1");  // used for delete the existing file into the folderr
//     else console.log("0");
// }
// )
// fs.readFile("copy.txt","utf-8",function(err,data){
//     if(err) console.log(err.message);
//     else  console.log(data);
   
// })

// const http = require('http');

// const server = http.createServer((req,res)=>{
//     res.end("baapo ka baap bhavya");
// })
// server.listen(300);
// const path = require("path");
// const des = path.join("C:/Users/91815/Desktop/bank_details_visualizer","index.html")
// fs.copyFile("index.html",des,function(err){
//     if(err){
//         console.error(err.message);
//     }
//     else{console.log("sab changa si")}
// })
 
const express = require('express'); // returns a functions into the variable express
const app = express();  // all the functionality of express comes into the const appp noww
// implementing the middleware --- 
app.use(function(req,res,next){ // req res and next parameters are compulsoryy
    console.log("middleware chalaaa"); 
    next();// to send the response to route we have to use the next function next()
})
app.get("/",function(req,res){
    res.send("baappppo ka baap bhavyaa")
})
app.get("/profile",(req,res,next)=>{
   res.send("baapo ke baap ki profileee");
})
// default Error handler--->
app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(500).send("Something went wrongg");
})
app.listen(3000);