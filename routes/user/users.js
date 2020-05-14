const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user-controller");
const { isAuthenticated, isNotAuthenticated } = require("../../utils/auth-gaurd");
const { check, validationResult } = require("express-validator");


// login 
router.get("/login", isNotAuthenticated, userController.getLogin);
router.post("/login",
  [
    check("email").notEmpty().isEmail(),
    check("password").notEmpty().isLength({ min: 7 })
  ], userController.postLogin);
// signup 
router.get("/signup", isNotAuthenticated, userController.getSignup);
router.post("/signup",
  [
    check("email").notEmpty().isEmail(),
    check("password").notEmpty().isLength({ min: 7 })
  ], userController.postSignup);
// profile
router.get("/profile", isAuthenticated, userController.getProfile);
//logout
router.get("/logout", isAuthenticated, userController.logout);



// exporting router
module.exports = router;




