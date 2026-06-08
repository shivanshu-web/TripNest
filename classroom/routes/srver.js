const express = require("express");
const app = express();
const path = require("path");

const session = require("express-session");

const flash = require("connect-flash");

// for flash message 
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));

// const cookieParser = require("cookie-parser");
// app.use(cookieParser("seratecode"));







// app.get("/",(req,res)=>{
//     res.send("success");

// });

// app.get("/getsignedcookie" , (req,res)=>{
//     res.cookie()
// })

// app.get("/greet",(req,res)=>{
//     let {name = "none"} = req.cookies;
//     res.send(`${name} welcome to this world `);

// });


// app.get("/cookies",(req,res)=>{

//     res.cookie("fact","good");
//     res.send("cooki send!");

// });



// express sesiion 

const  sessionOption = {
    secret:"mySuperString",
    resave : false,
    saveUninitialized:true,

}

app.use(session(sessionOption));
app.use(flash());



app.use((req,res,next)=>{
    res.locals.massage = req.flash("message");
    res.locals.error = req.flash("error");
    next();

});

app.get("/register" , (req,res)=>{

    let {name = "anyone"} = req.query;
    req.flash("message","you are succsessfully login  ");
 
   
    req.session.name = name;

     res.send(name);


});

app.get("/login" , (req,res) => {
  
    res.render("paper.ejs",{ name : req.session.name});
});


app.get("/request")
// app.get("/test", (req,res)=>{
//     res.send("test successful");
// })







app.listen(3000,(req,res)=>{
    console.log("connection successfully");
});