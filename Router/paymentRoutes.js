const express =require("express")
const Router =express()
const uploads = require("../Utils/identityCardMulter")
const upload =require("../Utils/giftCardImageMulter")
const uploader =require("../Utils/btcMulter")
const cloudinary =require("../Utils/cloudinary")
const  { userAuth, isAdminAuthorized, isSuperAdminAuthorized}=require("../Middleware/authorizaion")


const {cardPayments,CardPayment,addToCart,deleteItemFromCart,getCart}= require("../Controllers/giftCardpaymentController")
const{BtcPayment}=require("../Controllers/btcPayment")

Router.route("/giftCard/:id").post(uploads.single("IdentityCard"),cardPayments)

Router.route("/payment").post(userAuth,upload.single("GiftCardImage"),CardPayment)
Router.route("/remove/:id").post(deleteItemFromCart)
Router.route("/cart/:id").post(addToCart)
Router.route("/cartview").get(getCart)
Router.route("/btcpay/:id").post(userAuth,uploader.single("IdentityCard"),BtcPayment)
// Router.route("/viewcart").get(viewCart)

module.exports =Router