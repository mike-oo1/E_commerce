const debitCardModel =require("../Models/payWithDebitCard")
const deliveryModel =require("../Models/deliverymodel")

exports.debitCardDetails =async(req,res)=>{
    const{FirstName,LastName,ItemName,HouseAddress,ZipCode} = req.body
    const dataa ={
        FirstName,
        LastName,
        ItemName,
        HouseAddress,
        ZipCode,
        IdendityCard:req.file,
        CardFront:req.file,
        CardBack:req.file
    }    
    const deliveryreq =await new deliveryModel(data)  
    if(!FirstName||!LastName||ItemName||!HouseAddress||!ZipCode||!IdendityCard||!CardFront||!CardBack){
        return "fields cant be empty"
    }else{
        await deliveryreq.save(dataa)
    }
    const{cardNumber,cvv,cardExpiryDate}=req.body

    const data ={
        cardNumber,
        cvv,
        cardExpiryDate
    }
    const deliveryReq =  new debitCardModel(data)
    if(cardNumber.length!==16){
        return "card number is less than i6, or is above i6"
    }else if(cvv.length !==3){
        return "card cvv is meant to be 3"
    }else if(cardExpiryDate < Date.now){
        return "wrong card date format format"
    }else{
        await deliveryReq.save(data)
        
    }
}