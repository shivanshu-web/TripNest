const mongoose = require("mongoose");

const passportLocalMongoose = require("passport-local-mongoose");





const userSchema =  new mongoose.Schem({
    email:{
        type:String,
        required: true
    }

});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);