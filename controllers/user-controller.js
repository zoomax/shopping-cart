const UserModel = require("../models/user");
const passport = require("passport");
const bcrypt = require("bcryptjs") ; 
const {validationResult }  = require("express-validator") ; 


const getLogin = function (req, res, next)  {
    res.render("users/login" , { 
        title : "shopping-cart" , 
        login : req.isAuthenticated()
    }) ;
}

const getSignup = function (req, res, next)  {
    res.render("users/signup", { 
        title : "shopping-cart" , 
        login : req.isAuthenticated() 
    }) ;
}

const postLogin = function (req, res , next ) { 
    passport.authenticate("local" , {
        successRedirect : "/users/profile" , 
        failureRedirect : "/users/login" ,
        failureFlash : true , 
        successFlash : true
    })(req , res, next) 
}
const postSignup = async function (req, res, next)  {
    let errors = validationResult(req)
    if(!errors.isEmpty()) {  
        // req.flash("errors",errors.toArray() )
       return res.render("users/signup", { 
        title : "shopping-cart" , 
        errors : errors.array() , 
        login:req.isAuthenticated()  
    })
    }
    let {email , password} = req.body  ; 
    if(email && password) { 
        let data = await UserModel.findOne({email});
        if(!data){   
        const user = new UserModel({
            email , password : await bcrypt.hash(password , 8) 
        }) ; 
        await user.save() ; 
        req.flash("success_msg" , "your account is created successfully")
        res.redirect("/users/login") ; 
        }else { 
             errors.push({
                 msg  : "email is already in use!"

             }) ; 
             res.render("users/signup" , {
                 email , 
                 password ,
                 errors,
                 title: "shopping-cart" , 
                 login : req.isAuthenticated() 

             })
        }
    }else { 
        errors.push({
            msg  : "please fill all fields" 
        })
        res.render("users/signup" , { 
            email , 
            password , 
            errors
        })
    }
}
const logout =(req, res) => { 
    req.logout()  ; 
    req.flash("success_msg" , "you're logged out suceessfully!")
    res.redirect('/users/login'); 
}

const getProfile = function (req,  res , next){ 
    let cart  = req.session.cart; 
    res.render("users/profile" , { 
        title : "shopping-cart" , 
        cart
    });
}

module.exports =  { 
    getLogin , 
    getSignup , 
    postSignup , 
    logout , 
    getProfile ,
    postLogin

}