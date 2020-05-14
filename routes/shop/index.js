var express = require('express');
var router = express.Router();
const shopController = require("../../controllers/shop-controller") ; 
const {isAuthenticated , isNotAuthenticated} = require("../../utils/auth-gaurd") ; 
/* GET home page. */
router.get('/',shopController.getShop);
router.get("/cart",isAuthenticated ,shopController.getCart)
router.get("/cart/:id",isAuthenticated ,shopController.getAddToCart)
router.get("/checkout",isAuthenticated ,shopController.getCheckout) 
router.post("/charge" ,isAuthenticated , shopController.postCharge) ; 
router.get("/completed",isAuthenticated ,shopController.getCompleted)



module.exports = router;
