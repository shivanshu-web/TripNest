const express = require("express");
//const router = express.Router();
const router = express.Router();
const User = require("../models/User.js");
const asyncWrap = require("../util/wrapAsyanc.js");
const passport = require("passport");




router.get("/sinup", (req, res) => {
    res.render("./users/sinup.ejs");
});

router.post("/sinup", asyncWrap(async (req, res) => {
    try {
        let { username, password, email } = req.body;
        const newUser = new User({ username, email });
        const user = await User.register(newUser, password);
        req.login(user,(err)=>{
            if(err){
                

            }
        });
        req.flash("success","you sinup successfully");
        res.redirect("/listings");
    } catch (e) {
        req.flash("error", e.message);

        res.redirect("/sinup");
    }
}));


router.get("/login", (req, res) => {
    res.render("users/login.ejs")

});

router.post("/login",
    passport.authenticate("local",
        {
            failureRedirect: "/login",
            failureFlash: true
        }),

    async (req, res) => {
        req.flash("success", "Welcome to Wnaderlust ! you are loged in ");
        res.redirect("/listings");
       
    });

router.get("/logout",(req,res, next)=>{
    req.logout((err)=>{
        if(err){
          return  next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings")

    })
})
module.exports = router;