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