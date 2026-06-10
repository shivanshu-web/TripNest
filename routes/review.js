const express = require("express");
//const router = express.Router();
const Listing = require("../models/listing.js");


const asyncWrap = require("../util/wrapAsyanc.js");
const ExpressError = require("../util/ExpressError");

// for JOi validaiton 
const { listingSchema } = require("../schema.js");
const {reviewSchema} = require("../schema.js");
// Review Schema 
const Review = require("../models/review.js");


//When creating the router, enable parameter merging:
const router = express.Router({ mergeParams: true });






// for review middleware to validate on serverside 
const validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error)
    }else{
        next()
    }
}





// review creat 

router.post("/",validateReview, asyncWrap( async(req,res)=>{
    
    let listing = await  Listing.findById(req.params.id);
    
   
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    console.log("review saved ");
    res.redirect(`/listings/${listing.id}`) ;

}));

// delete Review route 
router.delete("/:review_id" , asyncWrap(async(req,res)=>{

    let {id , review_id} = req.params;
    console.log(id);
    let result = await Review.findByIdAndDelete(review_id);
    console.log(result);
    let result1 = await Listing.findByIdAndUpdate(id,{$pull:{reviews:review_id}});
    console.log(result1);
    res.redirect(`/listings/${id}`);
    console.log("deleted");



}));

module.exports = router;