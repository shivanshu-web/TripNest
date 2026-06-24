
const User = require("../models/User.js")

// reder form route 

module.exports.sinupform = (req, res) => {
    res.render("./users/sinup.ejs");
}

// sinup route 
module.exports.sinupUser = async (req, res) => {
    try {
        let { username, password, email } = req.body;
        const newUser = new User({ username, email });
        const user = await User.register(newUser, password);
        req.login(user, (err) => {
            if (err) {
                req.flash("error", "Try again");
                res.redirect("/login");
            } else {
                req.flash("success", "you sinup successfully");
                res.redirect("/listings");

            }
        });

    } catch (e) {
        req.flash("error", e.message);

        res.redirect("/sinup");
    }
}


// login  get form

module.exports.login = (req, res) => {
     res.render("users/login.ejs")
}


module.exports.loginUser = async (req, res) => {
       
        req.flash("success", "Welcome to Wnaderlust ! you are loged in ");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);

    }

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings")

    })
}