const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");

const Listing = require("./models/listing.js");





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
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));


app.get("/",(req,res) =>{
    res.send("root");
});

// listing route 
app.get("/listings",async(req,res)=>{
 const allListings =  await Listing.find({});
 
 res.render("listings/index.ejs",{allListings});
});

app.get("/listings/new",(req,res)=>{

res.render("listings/new.ejs");
});


// show route

app.get("/listings/:id", async(req,res)=>{

  let {id} = req.params;
  const listing = await Listing.findById(id);
  
 
  res.render("listings/show.ejs",{listing});
});

// new route 

app.post("/listings", async(req,res)=>{

   
    let newlisting = await new Listing(req.body.listing);
    await newlisting.save();

    res.redirect("listings");

});

//EDIT route

app.get("/listings/:id/update", async(req,res)=>{
 let {id} = req.params;
 let listing = await Listing.findById(id);
 
 res.render("listings/update.ejs",{listing});
});

// update route

app.put("/listings/:id",async(req,res) => {
let {id} = req.params;
let Ulisting = req.body.listing;

 await Listing.findByIdAndUpdate(id,{ ...Ulisting });

res.redirect(`/listings/${id}`);
});





// app.get("/listing",(req,res)=>{
//   let sampleL = new Listing({
//     title:"my house",
//     description:"it is too beatiful ",
//     price: 2000,
//     location:"auraiya",
//     country:"India",

//   });

//   sampleL.save().then((res)=>{
//     console.log(res);
//     console.log("save it ");
//   }).catch((err)=>{
//     console.log(err);
//   })

// });


app.listen(8080,()=>{
    console.log("port is listning on 8080");
})