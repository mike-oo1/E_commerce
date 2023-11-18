const paymentModel = require("../Models/giftCardPaymentModel")
const deliveryModel = require("../Models/deliverymodel")
const ProductModel = require("../Models/productModel")
const cartModel =require("../Models/cartModel")
const cloudinary =require("cloudinary")


exports.cardPayments = async(req,res)=>{
    try {
        const{FirstName,LastName,ItemName,HouseAddress,ZipCode,Quantity}=req.body
          const data ={
            FirstName,
            LastName,
            ItemName,
            HouseAddress,
            ZipCode,
            Quantity,
            IdentityCardFront:req.file.path,
        }
        console.log(req.body);
        
        let result = null
        if(req.file){
           result = await cloudinary.uploader.upload(req.file.path);
        //    fs.unlinkSync(req.file.path);
        }
       
        const cardPay = new deliveryModel({
          FirstName,
          LastName,
          ItemName,
          HouseAddress,
          ZipCode,
          Quantity,
          IdentityCardFront: result?.secure_url 



        })
      
        console.log(req.file)
        if(!FirstName||!LastName||!ItemName||!HouseAddress||!ZipCode||!Quantity){
            return res.status(400).json({
                message:"Field cant be empty"
            })

        }
        await cardPay.save()
        
        const id = req.params.id
        const getId = await ProductModel.findById(id)
        console.log(getId.Price)
        
        if(!id){
            return res.status(404).json({
                message:"wrong id format",
                data: id,
                data: data,
            })
                
        }else{
        // const quantity= await paymentModel.findById(getId)
   
   console.log(typeof(getId.Price),typeof(Quantity))
        const payment =getId.Price*Quantity
        console.log(payment)
        const totalPrice = payment
        if(totalPrice>10000){
            res.status (400).json({
                message:`pls your total is  $ ${totalPrice} pls pay with btc instead`
            })
                   
        }else{
            res.status(200).json({
                message:"price calculated",
                data: "$"+totalPrice,
                data2:"please proceed to payment with your gift card"
            })

        }
      
      
        }
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

exports.addToCart= async(req,res)=>{
    try {

        const cart =[]
        const id =req.params.id
        const addtocart = await ProductModel.findById(id)
        const cartProduct = await cartModel
        // const carts = await cartMode5
        cart.push(cartProduct,id)
        // cart.push(cartProduct)
        console.log(id);
        
        if(!cart){
            return res.status(400).json({
                messaage:"cannot add to cart"
            })
        }else{
        addtocart.save()

            return res.status(200).json({
                message:"product added to cart successfully",
                data:addtocart.length
                // data2:cartProduct.push(cart)

            })
        }


        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}
exports.deleteItemFromCart= async(req,res)=>{
    try {
        const cart =[]
        const id =req.params.id
        const getProductId = await ProductModel.findById(id)
        const removeItem = await cartModel.findById(id)
        cart.pop(id)
        return res.status(200).json({
            message:"product removed from cart successfully",
            data:removeItem,
            // data:getProductId.Price,
        })

    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}
        
exports.CardPayment = async(req,res)=>{
    try {
        const{GiftCardCode,cardName}=req.body
        const data ={
            GiftCardCode,
            cardName,
            GiftCardImage:req.file.path

        }
        let result = null
        if(req.file){
           result = await cloudinary.uploader.upload(req.file.path);
        //    fs.unlinkSync(req.file.path);
        }
       
        const cardImage = new paymentModel({
            GiftCardCode,
            cardName,
            GiftCardImage :result?.secure_url 
        })
      const ppp=  await new paymentModel(data)
        
        if(GiftCardCode.length!==8){
            return res.status(400).json({
                message:"invalid card code"
            })
        }else if(!cardName){
            return res.status(400).json({
                message:"wrong card name format"
            })
        }else{
      await cardImage.save()

      await ppp.save()


            return res.status(200).json({
                message:"done",
                data:ppp
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

 exports.getCart = async(req,res)=>{
    try {
        const productId =req.params.id
        const getId = await ProductModel.findById(productId)
        // const getCart =await cartModel.find()
        if(!getId){
            return res.status(404).json({
                message:"cart is empty"
            })
        }else{
            return res.status(200).json({
                message:"cart",
                // data:getCart,
                data2:getId
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
 }