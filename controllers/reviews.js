
const Listing = require("../models/listing.js")
const Review = require("../models/review.js")


// create review route 

module.exports.createReview = async(req,res)=>{
    
    let listing = await  Listing.findById(req.params.id);
    
   
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    console.log("review saved " , newReview);
    res.redirect(`/listings/${listing.id}`) ;

}


// distroy route 

module.exports.distroyReview = async(req,res)=>{

    let {id , review_id} = req.params;
   
    let result = await Review.findByIdAndDelete(review_id);
   
    let result1 = await Listing.findByIdAndUpdate(id,{$pull:{reviews:review_id}});
   
    res.redirect(`/listings/${id}`);
    console.log("deleted");



}