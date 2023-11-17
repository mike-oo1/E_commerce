const express =require("express")
const Router =express()
const uploads = require("../Utils/identityCardMulter")
const upload =require("../Utils/giftCardImageMulter")
const cloudinary =require("../Utils/cloudinary")
const {debitCardDetails}= require("../Controllers/debitCardPayment")
const {cardPayments,CardPayment,addToCart,deleteItemFromCart,getCart}= require("../Controllers/giftCardpaymentController")

Router.route("/debitcardPayment").post(debitCardDetails)
Router.route("/giftCard/:id").post(uploads.single("IdentityCardFront"),cardPayments)

Router.route("/payment").post(upload.single("GiftCardImage"),CardPayment)
Router.route("/remove/:id").post(deleteItemFromCart)
Router.route("/cart/:id").post(addToCart)
Router.route("/cartview").get(getCart)
// Router.route("/viewcart").get(viewCart)

module.exports =Router