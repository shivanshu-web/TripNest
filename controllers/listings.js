
const Listing = require("../models/listing.js");

// index route
module.exports.index = async(req,res)=>{
 const allListings =  await Listing.find({});
 
 res.render("listings/index.ejs",{allListings});
};

// new route
module.exports.new = (req,res)=>{ 
        
res.render("listings/new.ejs");   
}

// show route 
module.exports.show = async(req,res)=>{

  let {id} = req.params;
  const listing = await Listing.findById(id)
  .populate({path:"reviews" , populate:{path: "author"} })
  .populate("owner");
  
 if(!listing){
    req.flash("error","listing you are requested is not exist");
   return res.redirect("/listings");
 }
 
  res.render("../views/listings/show.ejs",{listing});
}


// crete route 
module.exports.create = async(req,res,next)=>{  

    let url = req.file.path;
    let filename = req.file.filename;
    
    let newlisting = await new Listing(req.body.listing);
    newlisting.owner = req.user._id;
    newlisting.image = {url,filename};
    await newlisting.save();
    req.flash("success","New listing created");

    res.redirect("/listings");

}

// edit route 

module.exports.edit = async(req,res)=>{
 let {id} = req.params;
 let listing = await Listing.findById(id);
 
 res.render("listings/update.ejs",{listing});
}

// update route 

module.exports.update = async(req,res) => {
let {id} = req.params;
let Ulisting = req.body.listing; 
req.flash("update","Listing Update successfully");

 await Listing.findByIdAndUpdate(id,{ ...Ulisting });

res.redirect(`/listings/${id}`); 
}

// delete route 

module.exports.distroy = async(req,res)=>{
let {id} = req.params;
req.flash("delete","Listing Deleted successfully");

await Listing.findByIdAndDelete(id);
res.redirect("/listings");
}
