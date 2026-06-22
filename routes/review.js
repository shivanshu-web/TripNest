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

const {validateReview ,isLoggedIn , isReviewOuthor } = require("../middleware.js");










// review creat 

router.post("/",isLoggedIn,validateReview,  asyncWrap( async(req,res)=>{
    
    let listing = await  Listing.findById(req.params.id);
    
   
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    console.log("review saved " , newReview);
    res.redirect(`/listings/${listing.id}`) ;

}));

// delete Review route 
router.delete("/:review_id" ,isLoggedIn, isReviewOuthor , asyncWrap(async(req,res)=>{

    let {id , review_id} = req.params;
   
    let result = await Review.findByIdAndDelete(review_id);
   
    let result1 = await Listing.findByIdAndUpdate(id,{$pull:{reviews:review_id}});
   
    res.redirect(`/listings/${id}`);
    console.log("deleted");



}));

module.exports = router;