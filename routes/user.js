const express = require("express");
//const router = express.Router();
const router = express.Router();
const User = require("../models/User.js");
const asyncWrap = require("../util/wrapAsyanc.js");
const passport = require("passport");

// for redirect post url
const {saveUrl} = require("../middleware.js");

const userController  = require("../controllers/users.js");


router.get("/logout",userController.logout);

router.route("/sinup")
    .get(userController.sinupform )
    .post( asyncWrap(userController.sinupUser));


router.route("/login")
    .get(userController.login )
    .post(
    saveUrl,
    passport.authenticate("local",
        {
            failureRedirect: "/login",
            failureFlash: true
        }), userController.loginUser

    );



// router.get("/sinup",userController.sinupform );

// router.post("/sinup", asyncWrap(userController.sinupUser));


// router.get("/login",userController.login );

// router.post("/login",
//     saveUrl,
//     passport.authenticate("local",
//         {
//             failureRedirect: "/login",
//             failureFlash: true
//         }), userController.loginUser

//     );


module.exports = router;