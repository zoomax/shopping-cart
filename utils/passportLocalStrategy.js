const localStrategy = require("passport-local").Strategy;
const UserModel = require("../models/user");
const bcrypte = require("bcryptjs");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const {validationResult}  = require("express-validator") ; 

const authenticateUser = async function (req,email, password, done) {
    let errors = validationResult(req)
    if(!errors.isEmpty()) {  
        return done(null , false , req.flash("errors" ,errors.array() ))
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
        return done(null, false, { message: "no user with that email" })
    } else {
        let isMatch = await bcrypte.compare(password, user.password);
        if (isMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: "password incorrect" })
        }
    }

}

function initializePassport(passport) {

    passport.use(
        new localStrategy({
            usernameField: "email" , 
            passwordField  :"password" , 
            passReqToCallback : true
        }, authenticateUser)
    )
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser(async (id, done) => {
        await UserModel.findById(new ObjectId(id).toString().trim(), (err, user) => {
            return done(err, user);
        })
    });

}

module.exports = initializePassport