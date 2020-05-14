const ProductModel = require("../models/product");
const CartModel = require("../models/cart");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const stripe = require("stripe")(process.env.STRIPE_PUBLISHIBLE_KEY)


const getShop = async function (req, res, next) {
    try {
        console.log("cart =>", req.session.cart);
        let cart = req.session.cart;
        const products = await ProductModel.find();
        res.render("shop/index", {
            title: "shopping-cart",
            products,
            cart
        })
    } catch (err) {
        console.log(err)
    }
}

const getAddToCart = async function (req, res, next) {
    try {
        let oldCart = req.session.cart || {}
        const cart = new CartModel(oldCart);
        let id = req.params.id;
        const product = await ProductModel.findById(new ObjectId(id));
        if (product) {
            cart.add(product, product._id);
            req.session.cart = cart;
            req.flash("cart", cart);
        }
        res.redirect("/shop")
    } catch (err) {
        console.log(err)
    }
}


const getCart = function (req, res, next) {
    let cart = req.session.cart
    if (!cart) {
        res.render("shop/cart", {
            title: "shopping-cart",
            cart
        })
    } else {
        console.log("products from cart => ", cart);
        res.render("shop/cart", {
            title: "shopping-cart",
            cart

        })
    }
}

const getCompleted = function (req, res, next) {
    let cart = req.session.cart
        res.render("shop/completed", {
            title: "shopping-cart",
            cart
        })
}

const getCheckout = function (req, res, next) {

    if (!req.session.cart) {
        res.redirect("/shop/cart")
    } else {
        console.log("cart-controller =>", req.session.cart)
        let cart = req.session.cart;
        console.log("products from cart => ", cart);
        res.render("shop/checkout", {
            title: "shopping-cart",
            cart,
            user: req.user

        })
    }
}


const postCharge = function (req, res, next) {
    try {
        stripe.customers
            .create({
                name: req.body.name,
                email: req.body.email,
                source: req.body.stripeToken
            })
            .then(customer =>
                stripe.charges.create({
                    amount: req.body.amount * 100,
                    currency: "usd",
                    customer: customer.id
                })
            )
            .then(() => {
                delete req.session.cart;
                let cart = req.session.cart
                console.log(cart);
                res.redirect("/shop/completed")
            })
            .catch(err => console.log(err));
    } catch (err) {
        res.send(err);
    }

}



module.exports = {
    getShop,
    getCart,
    getAddToCart,
    getCheckout,
    postCharge , 
    getCompleted
}