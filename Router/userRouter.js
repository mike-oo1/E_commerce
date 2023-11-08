const express =require("express")
const Router =express()
const{signUp,login,userVerify,UpgradeAdminToSuperAdmin,changePassword,signOut}=require("../Controllers/userController")
Router.route("/signup").post(signUp)
Router.route("/userverify/:id/:token").put(userVerify)
Router.route("/login").post(login)
Router.route("/upgrade/:id").put(UpgradeAdminToSuperAdmin)
Router.route("/changePassword/:id").put(changePassword)
Router.route("/signout/:id").post(signOut)

module.exports=Router