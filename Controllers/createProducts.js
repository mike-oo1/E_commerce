const productModel =require("../Models/productModel")
const cloudinary =require("cloudinary")

exports.createProduct = async ( req, res ) => {
    try {
        const { ProductName, ProductDescription, ProductSize,Price } = req.body;
        const data = {
            ProductName,
            ProductDescription,
            ProductSize,
            Price,
            ProductImage:req.file.path
    
        } 
        let result = null
        if(req.file){
           result = await cloudinary.uploader.upload(req.file.path);
        //    fs.unlinkSync(req.file.path);
        }
       
        const newProduct = new productModel({
          ProductName,
          ProductDescription,
          ProductSize,
          Price,
          ProductImage: result?.secure_url 
        })
      
       
            if ( newProduct ) {
                await newProduct.save()
                res.status( 201 ).json( {
                    message: "product saved successfully",
                    data: data, 
                    data: newProduct
                })
            } else {
                res.status( 400 ).json( { 
                    message: "Could not create product"
                })
            }

        
        console.log(req.file)

    } catch (err) {
        res.status( 500 ).json( {
            message: err.message
        })
    }
}
exports.getAllProducts = async(req,res)=>{
    try {
        const getAll = await productModel.find()
        if(!getAll){
            return "cannot get products"
        }else{
            return res.status(200).json({
                message:"here are all the products",
                data:getAll
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}
exports.getOneProduct= async(req,res)=>{
    try {
        const id =req.params.id
        const getOne= await productModel.findById(id)
        if(!getOne){
            return res.status(400).json({
                message:"cannot find this product"
            })
        }else{
            return res.status(200).json({
                message:"here is nthe product you searched for",
                data:getOne
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


exports.search = async(req,res)=>{
    try {
        const searchs= req.params.searchs
        const {searchProduct} =req.body
        const data ={
            searchProduct
        }
        const letters =["a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z"]
        
        
        const searchProducts =await productModel.find({letters},searchs)
            // for(let i=0;i<searchProducts.length;i++){
            //     if(searchProducts[i].startsWith("searchProducts")){
            //         searchProducts.sort()
            //         console.log(searchProducts[i])
            //     }
            // }
            if(!searchProducts){
                res.status(404).json({
                    message:"what you searched for is not found"
                })
            }else if(searchProducts.includes(letters)){
                return res.status(200).json({
                    message:"here are the results of your search",
                    data:searchProducts,
                    data:data
                })
            }
        
        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}
exports.updateProduct = async(req,res)=>{
    try {
        const data ={
            ProductName:req.body||ProductName, 
            ProductDescription:req.body||ProductDescription,
            ProductSize:req.body||ProductSize,
            Price:req.body||Price,
            ProductImage:req.file
        }
        
        // const{}=req.body
        const id =req.params.id
        const updateProduct = await  productModel.findByIdAndUpdate(id)
        // await cloudinary.uploader.upload("err,ProductImage")
        if(!updateProduct){
            return res.status(400).json({
                message:"cannot update this product with id "+id
            })
        }else{
            
            // await data.pr
            return res.status(201).json({
                message:"product updated successfully",
                data:updateProduct
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

exports.deleteProduct = async(req,res)=>{
    try {
        const id = req.params.id
     const deleteProduct = await productModel.findByIdAndDelete(id)
     if(!deleteProduct){
        return res.status(400).json({
            message:"cannot delete this product"
        })
     }else{
        return res.status(200).json({
            message:"product deleted successfully",
            data:deleteProduct.$isDeleted
        })
     }

        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}