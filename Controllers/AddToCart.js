// const cartModel = require("../Models/cartModel")
// const products =require("../Models/productModel")

// // exports.addItem = async(req,res)=>{
// //     try {
// //         const cart =[]
// //         const {Product,Quantity}=req.body
// //         const addToCart = await cartModel.
// //     } catch (error) {
        
// //     }
// // }

// exports.addItem = async(req,res)=>{
//     try {
//         const cart =[]
//         const{Quantity}= req.body
//         const add = await cartModel.find({Quantity})
//         if(add){
//             add.push(cart)
//             return res.status(200).json({
//                 message:"item added successfully",
//                 data:add
//             })
//         }else{
//             return "unable to add item to cart"
//         }
        
//     } catch (error) {
//        return res.status(500).json({
//         message:error.message
//        })
//     }
  
// }

// exports.RemoveItem = async(req,res)=>{
//     try {
//         const bin =[]
//         const remove = await cartModel.find({Quantity})
//         if(remove){
//             remove.pop(bin)
//             return res.status(200).json({
//                 message:"item removed successfully"
//             })
//         }
//     } catch (error) {
//         return res.status(500).json({
//             message:error.message
//            })
//     }
// }

// exports.addToCartAndPay = async(req,res)=>{
//     try {
//         // const 
//     } catch (error) {
        
//     }
// }
