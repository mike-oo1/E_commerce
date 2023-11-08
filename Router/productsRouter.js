const express = require("express")
const Router = express()
const upload=require("../Utils/multer")
const cloudinary=require("../Utils/cloudinary")
const {createProduct,getAllProducts,getOneProduct,updateProduct,deleteProduct,search}= require("../Controllers/createProducts")
const  { userAuth, isAdminAuthorized, isSuperAdminAuthorized}=require("../Middleware/authorizaion")

Router.route("/createProduct").post(upload,createProduct)
Router.route("/getall").get(getAllProducts)
Router.route("/getOneProducts/:id").get(getOneProduct)
Router.route("/updateproduct/:id").put(updateProduct)
Router.route("/deleteproduct/:id").put(userAuth,isAdminAuthorized,isSuperAdminAuthorized,deleteProduct)
Router.route("/search/:searchs").get(search)


module.exports = Router