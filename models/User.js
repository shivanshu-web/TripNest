const mongoose = require("mongoose");

const passportLocalMongoose =
    require("passport-local-mongoose").default;




const userSchema =  new mongoose.Schema({
    email:{
        type:String,
        required: true
    }

});

// it auto add pass , username ,convert.hash , compare pass;
console.log(passportLocalMongoose);
userSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model("User",userSchema);