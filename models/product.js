
const mongoose  = require("mongoose")
const Schema = mongoose.Schema ; 
const ProductSchema = new Schema({
    imagePath : {
        type : String , required : true 
    } , 
    title : {
        type :String , 
        required : true
    } , 
    price : { 
        type : Number , 
        required : true  
    } , 
    description :  { 
        type : String , 
        required : true 
    }
}) ; 



module.exports = mongoose.model("products" , ProductSchema) ; 