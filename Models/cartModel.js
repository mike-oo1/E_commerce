const mongoose =require ("mongoose")
const cartModel = new mongoose.Schema({
    Product:{
        type:String,
        required:[true,"product  is required"]
    },
    Quantity:{
        type:Number,
        required:[true,"quantity is required"]
    },
    TotalPrice:{
        type:Number,
        default:0 
    }
})

const Cart = mongoose.model("AddToCart",cartModel)

module.exports = Cart
