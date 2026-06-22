const Listing = require("./models/listing.js");
const Review = require("./models/review.js");

const ExpressError = require("./util/ExpressError");
const { listingSchema , reviewSchema } = require("./schema.js");

// this is for user authontication middleware;
module.exports.isLoggedIn = (req,res,next)=>{
    
    
    if(!req.isAuthenticated()){
        
        req.session.redirectUrl = req.originalUrl;
        req.flash("error" , "you must be loged in to create listing");
       return res.redirect("/login");
    }
    
    next();    
}

module.exports.saveUrl = (req,res,next)=>{
    
    
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
        console.log(res.locals.redirectUrl);
        
        
    }
    next();
}

module.exports.isowner = async(req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if (!res.locals.currUser._id.equals(listing.owner)){
        req.flash("error" , "you don't have permission to edit");
        return res.redirect(`/listings/${id}`);

    }
    next();

}


module.exports.validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error)
    }else{
        next()
    }
}



// for review middleware to validate on serverside 
module.exports.validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error)
    }else{
        next()
    }
}

module.exports.isReviewOuthor = async(req,res,next)=>{
    let  { id , review_id} = req.params;
    let review = await Review.findById(review_id);
   
    if (!res.locals.currUser._id.equals(review.author)){
        
        req.flash("error" , "you don't have permission to delete");
        return res.redirect(`/listings/${id}`);

    }
    next();

}
