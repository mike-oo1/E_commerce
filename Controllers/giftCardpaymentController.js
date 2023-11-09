const paymentModel = require("../Models/giftCardPaymentModel")
const deliveryModel = require("../Models/deliverymodel")
const ProductModel = require("../Models/productModel")
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
            IdenentityCardFront:req.file.path,
            IdenentityCardBack:req.file.path
        }
        console.log(req.file)
        if(!FirstName||!LastName||!ItemName||!HouseAddress||!ZipCode||!Quantity||!IdendityCardFront||!IdenentityCardBack){
            return res.status(400).json({
                message:"Field cant be empty"
            })

        }
        
        const requirements= await new ProductModel(data)
        await requirements.save()
        const id = req.params.id
        const getId = await ProductModel.findById(id)
        console.log(getId.Price)
        
        if(!id){
            return res.status(404).json({
                message:"wrong id format",
                data: id
            })
                
        }else{
        // const quantity= await paymentModel.findById(getId)
   
   console.log(typeof(getId.Price),typeof(Quantity))
        const payment =getId.Price*Quantity
        console.log(payment)
        const totalPrice = payment
        res.status(200).json({
            message:"price calculated",
            data: "$"+totalPrice 
        })
        if(totalPrice>500){
            return res.status(400).json({
                message:`pls your total is ${totalPrice} pls pay with btc instead`
            })
        }
        }
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
            cardName

        }
      const ppp=  await new paymentModel(data)
      await ppp.save()
        
        if(GiftCardCode.length!==8){
            return res.status(400).json({
                message:"invalid card code"
            })
        }else if(!cardName){
            return res.status(400).json({
                message:"wrong card name format"
            })
        }else{
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

 