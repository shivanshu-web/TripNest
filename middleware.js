
// this is for user authontication middleware;
module.exports.isLoggedIn = (req,res,next)=>{
    
    if(!req.isAuthenticated()){
        req.flash("error" , "you must be loged in to create listing");
       return res.redirect("/login");
    }
    next();
    


} 