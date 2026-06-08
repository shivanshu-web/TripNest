const express = require("express");
const router = express.Router();
const ExpressError = require("../util/ExpressError");
const Listing = require("../models/listing.js");
const asyncWrap = require("../util/wrapAsyanc.js");

// for JOi validaiton 
const { listingSchema } = require("../schema.js");




const validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error)
    }else{
        next()
    }
}


// listing route  , get method no have body so we can not use validatelisting;
router.get("/",/*validateListing,*/ asyncWrap(async(req,res)=>{
 const allListings =  await Listing.find({});
 
 res.render("listings/index.ejs",{allListings});
})); 

router.get("/new",(req,res)=>{  

res.render("listings/new.ejs");   
}); 


// show route

router.get("/:id", asyncWrap(async(req,res)=>{

  let {id} = req.params;
  const listing = await Listing.findById(id).populate("reviews");
  
 
  res.render("../views/listings/show.ejs",{listing});
}));

// create route   

router.post("/", validateListing, asyncWrap(async(req,res,next)=>{  
   
    let newlisting = await new Listing(req.body.listing);
    await newlisting.save();

    res.redirect("/listings");

}));
 
//EDIT route

router.get("/:id/update",/*validateListing, */ asyncWrap(async(req,res)=>{
 let {id} = req.params;
 let listing = await Listing.findById(id);
 
 res.render("listings/update.ejs",{listing});
}));
 
// update route
 
router.put("/:id", asyncWrap(async(req,res) => {
let {id} = req.params;
let Ulisting = req.body.listing; 

 await Listing.findByIdAndUpdate(id,{ ...Ulisting });

res.redirect(`/listings/${id}`); 
}));  


// delete listing route

router.delete("/:id", asyncWrap(async(req,res)=>{
let {id} = req.params;

await Listing.findByIdAndDelete(id);
res.redirect("/listings");
}));


module.exports = router;

