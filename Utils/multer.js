const multer =require("multer")
const path = require("path")
const myMulter = multer.diskStorage(
    {
        destination:(req,file,cb)=>{
            cb(null,"Uploads")
        },
        filename:(req,file,cb)=>{
            cb(null,file.originalname)
        }
    }
)
// const mymulter = multer.diskStorage(
//     {
//         destination:(req,file,cb)=>{
//             cb(null,"paymentPictures")
//         },
//         filename:(req,file,cb)=>{
//             cb(null,file.originalname)
//         }
//     }
// )


const fileType =(req,file,cb)=>{
    const extName =path.extname(file.originalname)
    if(extName == ".png" || extName == ".jpg" || extName == "jpeg" || extName == ".svg"){
        cb(null,true)
    }else{
        cb(new Error("wrong format"),false)
    }
}

// const fileTypes =(req,file,cb)=>{
//     const extName =path.extname(file.originalname)
//     if(extName == ".png" || extName == ".jpg" || extName == "jpeg" || extName == ".svg"){
//         cb(null,true)
//     }else{
//         cb(new Error("wrong format"),false)
//     }
// }

const upload=multer({storage:myMulter,limits:{fileSize:10000000},fileFilter:fileType}).single("ProductImage")

// const uploads=multer({storage:mymulter,limits:{fileSize:10000000},fileFilter:fileTypes}).single("paymentPictures")

module.exports=upload
// module.exports=uploads