const express =require("express")
const uploads = require("../Utils/multer")
const cloudinary =require("../Utils/cloudinary")
const {debitCardDetails}= require("../Controllers/debitCardPayment")
const {cardPayments,CardPayment}= require("../Controllers/giftCardpaymentController")
const Router =express()

Router.route("/debitcardPayment").post(debitCardDetails)
// Router.route("/price/:id").get(payWithGiftCard)
Router.route("/giftCard/:id").post(uploads,cardPayments)
Router.route("/payment").post(CardPayment)


module.exports =Router