const express = require("express");
const router = express.Router();
const ExpressError = require("../util/ExpressError");
const Listing = require("../models/listing.js");
const asyncWrap = require("../util/wrapAsyanc.js");

// for JOi validaiton 

const {isLoggedIn}  = require("../middleware.js");
const {saveUrl , isowner,validateListing} = require("../middleware.js");










// listing route  , get method no have body so we can not use validatelisting;
router.get("/",/*validateListing,*/ asyncWrap(async(req,res)=>{
 const allListings =  await Listing.find({});
 
 res.render("listings/index.ejs",{allListings});
}));

// new listing

router.get("/new",isLoggedIn,(req,res)=>{ 
        
res.render("listings/new.ejs");   
}); 


// show route

router.get("/:id", asyncWrap(async(req,res)=>{

  let {id} = req.params;
  const listing = await Listing.findById(id)
  .populate({path:"reviews" , populate:{path: "author"} })
  .populate("owner");
  
 if(!listing){
    req.flash("error","listing you are requested is not exist");
    res.redirect("/listings");
 }
 
  res.render("../views/listings/show.ejs",{listing});
}));

// create route   

router.post("/", validateListing, asyncWrap(async(req,res,next)=>{  
   
    let newlisting = await new Listing(req.body.listing);
    newlisting.owner = req.user._id;
    await newlisting.save();
    req.flash("success","New listing created");

    res.redirect("/listings");

}));
 
//EDIT route

router.get("/:id/update",isLoggedIn,isowner, /*validateListing, */ asyncWrap(async(req,res)=>{
 let {id} = req.params;
 let listing = await Listing.findById(id);
 
 res.render("listings/update.ejs",{listing});
}));
 
// update route
 
router.put("/:id", isowner, asyncWrap(async(req,res) => {
let {id} = req.params;
let Ulisting = req.body.listing; 
req.flash("update","Listing Update successfully");

 await Listing.findByIdAndUpdate(id,{ ...Ulisting });

res.redirect(`/listings/${id}`); 
}));  


// delete listing route

router.delete("/:id",isLoggedIn, isowner, asyncWrap(async(req,res)=>{
let {id} = req.params;
req.flash("delete","Listing Deleted successfully");

await Listing.findByIdAndDelete(id);
res.redirect("/listings");
}));


module.exports = router;

