const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const passport = require("passport");
const isAuthenticated = require("../config/isAuthenticated");

router.get("/",userController.login);
router.get("/dashboard", isAuthenticated, (req, res) => {
    res.render("dashboard", {
        userName: req.user.name
    })
});

router.get("/login",userController.login);
router.get("/logout", (req, res) => {
    req.logout();
    return res.redirect('/login');
});

router.post('/login',(req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next)
})


router.get("/register",userController.register);
router.get("/users",userController.getusers);
router.post("/user",userController.addUser)

module.exports = router;