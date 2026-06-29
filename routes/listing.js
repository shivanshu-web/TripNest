const express = require("express");
const router = express.Router();
const ExpressError = require("../util/ExpressError");
const Listing = require("../models/listing.js");
const asyncWrap = require("../util/wrapAsyanc.js");

// for JOi validaiton 

const {isLoggedIn}  = require("../middleware.js");
const {saveUrl , isowner,validateListing} = require("../middleware.js");

const ListingController = require("../controllers/listings.js");

// for image process 
const multer  = require('multer')
// for cloud storage 
const {storage} = require("../CloudConfig.js")
const upload = multer({storage })






// new listing

router.get("/new",isLoggedIn,ListingController.new); 
//EDIT route

router.get("/:id/update",isLoggedIn,isowner, /*validateListing, */ asyncWrap(ListingController.edit));

router.route("/")
    .get(  asyncWrap(ListingController.index))
    .post(  isLoggedIn, validateListing,  upload.single("listing[image]"),
         asyncWrap(ListingController.create)
        );

    
  




router.route("/:id") 
    .get( asyncWrap(ListingController.show))
    .put( isowner, asyncWrap(ListingController.update))
    .delete(isLoggedIn, isowner, asyncWrap(ListingController.distroy));



// listing route  , get method no have body so we can not use validatelisting;
//index route
//router.get("/",/*validateListing,*/ asyncWrap(ListingController.index));




// show route

//router.get("/:id", asyncWrap(ListingController.show));

// create route   

//router.post("/", validateListing, asyncWrap(ListingController.create));
 

 
// update route
 
//router.put("/:id", isowner, asyncWrap(ListingController.update));  


// delete listing route

//router.delete("/:id",isLoggedIn, isowner, asyncWrap(ListingController.distroy));


module.exports = router;

