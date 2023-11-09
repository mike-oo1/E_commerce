const express =require("express")
const Router =express()

const uploads = require("../Utils/identityCardMulter")
const upload =require("../Utils/giftCardImageMulter")
const cloudinary =require("../Utils/cloudinary")
const {debitCardDetails}= require("../Controllers/debitCardPayment")
const {cardPayments,CardPayment}= require("../Controllers/giftCardpaymentController")

Router.route("/debitcardPayment").post(debitCardDetails)
// Router.route("/price/:id").get(payWithGiftCard)
// Router.route("/giftCard/:id").post(uploads,cardPayments)
Router.route("/giftCard/:id").post(uploads.single("IdentityCardFront"),cardPayments)

Router.route("/payment").post(upload.single("GiftCardImage"),CardPayment)


module.exports =Router