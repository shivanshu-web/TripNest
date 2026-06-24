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

const  ReviewController = require("../controllers/reviews.js");











// review creat 

router.post("/",isLoggedIn,validateReview,  asyncWrap(ReviewController.createReview));

// delete Review route 
router.delete("/:review_id" ,isLoggedIn, isReviewOuthor , asyncWrap(ReviewController.distroyReview));

module.exports = router;