// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const listingSchema = new Schema({

//     title:{
//       type:String,
//       required:  true,
//     },
//     description:String,
    
//     image: {
//     filename: {
//       type: String,
//       default: "listingimage",
//     },
//     url: {
//       type: String,
//       default: "https://plus.unsplash.com/premium_photo-1670275658563-450157cc6e34?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

//       // 👇 THIS IS WHERE `set` GOES
//       set: (v) => (v === "" ? "https://plus.unsplash.com/premium_photo-1670275658563-450157cc6e34?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v),
//     },
//     default: ()  =>  ({}),
//   },
//     price:Number,
//     location:String,
//     country: String

// });

// const Listing = mongoose.model("Listing",listingSchema);

// module.exports = Listing;


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,

  image: {
    type: String,
    default:
      "https://plus.unsplash.com/premium_photo-1670275658563-450157cc6e34?q=80&w=688&auto=format&fit=crop",
    set: (v) =>
      v === ""
        ? "https://plus.unsplash.com/premium_photo-1670275658563-450157cc6e34?q=80&w=688&auto=format&fit=crop"
        : v,
  },
 
  price: Number,
  location: String,
  country: String,
});

module.exports = mongoose.model("Listing", listingSchema);
