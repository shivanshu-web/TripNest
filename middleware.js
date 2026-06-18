
// this is for user authontication middleware;
module.exports.isLoggedIn = (req,res,next)=>{
    
    
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.orignalUrl;
        req.flash("error" , "you must be loged in to create listing");
       return res.redirect("/login");
    }
    
    next();  
}

module.exports.saveUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
        
    }
}