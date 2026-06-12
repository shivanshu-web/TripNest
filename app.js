const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");

const Listing = require("./models/listing.js");
const ejsMate = require("ejs-mate");
const asyncWrap = require("./util/wrapAsyanc.js");
const ExpressError = require("./util/ExpressError");

// for JOi validaiton 
const { listingSchema } = require("./schema.js");
const {reviewSchema} = require("./schema.js");
// Review Schema 
const Review = require("./models/review.js");

const listing = require("./routes/listing.js");
const review = require("./routes/review.js");

// for cookie work or session
const session = require("express-session");

// flash for pop up message
const flash = require("connect-flash");

// for user passport 
const passport = require("passport");
// for local strategy (username , password);
const localstrategy = require("passport-local");

// user model 

const User = require("/models/User.js");


   
 


 
async function main() {              
 
     await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
   
main().then(()=>{    
    console.log("connection successfully"); 
}).catch(()=>{
    console.log("err");      
  
  
});

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


app.get("/",(req,res) =>{
    res.send("root");
});

const sessionOption = {
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized: true,
    cookie :{
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 *1000 ),
        maxAge: 7*24*60 *60*1000,// keep this cookie for 7 days 
        httpOnly:true // prevent from read cookie
    }

}
app.use(session(sessionOption));
app.use(flash());
// a middleware for passport
app.use(passport.initialize());


app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.deleted = req.flash("delete");
    res.locals.updated = req.flash("update");
    next();

});

app.use("/listings",listing);
app.use("/listings/:id/reviews",review);











app.all(/.*/,(req,res,next)=>{
    next(new ExpressError(404,"page not found"));
});




// app.all("/.*/",(req,res,next)=>{
//     next(new ExpressError(404,"page not found"));


// });

// Error handling route 

app.use((err,req,res,next)=>{ 
    let {status = 500,message = "something went wrong"} = err;
    res.status(status).render("error",{err});

});


app.listen(8080,()=>{
    console.log("port is listning on 8080");
})