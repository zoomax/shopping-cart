const isAuthenticated = function (req , res, next)  { 
    if(req.isAuthenticated()) { 
        next()
    }else { 
        req.flash("error_msg" , "please login first")
        res.redirect("/users/login") ; 
    }
} 

const isNotAuthenticated = function (req , res, next)  { 
    if(!req.isAuthenticated()) { 
        next()
    }else { 
        req.flash("error_msg" , "please logout first")
        res.redirect("/users/profile") ; 
    }
} 
 module.exports =  { 
     isAuthenticated , 
     isNotAuthenticated
 }