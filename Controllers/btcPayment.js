const deliveryModel = require("../Models/deliverymodel")
exports.payWithBtc = async(req,res)=>{
    const{FirstName,LastName,ItemName,HouseAddress,ZipCode} = req.body
    const data ={
        FirstName,
        LastName,
        ItemName,
        HouseAddress,
        ZipCode,
        IdendityCard:req.file
    }
    const deliveryReq =await new deliveryModel(data)  
    if(!FirstName||!LastName||ItemName||!HouseAddress||!ZipCode||!IdendityCard){
        return "fields cant be empty"
    }else{
        await deliveryReq.save(data)
    }
}
// const btcLink =