const mongoose = require("mongoose");
const ProductModel = require("../models/product");
const products = [
    new ProductModel({
        imagePath: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/6804057863365?$pdpL$&fmt=webp&qlt=70",
        description: "a wonderful cup for kids imaginary parties espcially little girls",
        price: 10,
        title: "frozen cup",
    }),
    new ProductModel({
        imagePath: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/6804057863365?$pdpL$&fmt=webp&qlt=70",
        description: "a wonderful cup for kids imaginary parties espcially little girls",
        price: 10,
        title: "frozen cup",
    }),
    new ProductModel({
        imagePath: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/6804057863365?$pdpL$&fmt=webp&qlt=70",
        description: "a wonderful cup for kids imaginary parties espcially little girls",
        price: 10,
        title: "frozen cup",
    })
    , new ProductModel({
        imagePath: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/6804057863365?$pdpL$&fmt=webp&qlt=70",
        description: "a wonderful cup for kids imaginary parties espcially little girls",
        price: 10,
        title: "frozen cup",
    })
]
connect()

function closeConnection() {
    mongoose.disconnect();
}
function connect() {
    mongoose.connect("mongodb://localhost:27017/shopping-cart", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    }).then((result) => {
        console.log('db connected')
        products.forEach((product, index) => {
            product.save().catch((err) => {
                console.log(err.message);
            });
           
        });
    }).catch(err => {
            console.log(err.message);
        })
} 