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
            IdentityCardFront:req.file.path,
            // IdenentityCardBack:req.file.path
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
        
        // await requirements.save()
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
        await cardImage.save()
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

 