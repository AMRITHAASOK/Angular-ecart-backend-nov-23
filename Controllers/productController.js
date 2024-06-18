const products = require('../Models/productSchema')


//get all products  
exports.getAllProducts = async (req,res)=>{
    try{
        const allProducts = await products.find()
        res.status(200).json(allProducts)
    }
    catch(err){
        res.status(404).json(err)
    }
}

//view a particular product 
exports.viewProduct = async (req,res)=>{
    try{
        const {id}=req.params
        const viewProduct = await products.findOne({id})
        res.status(200).json(viewProduct)
    }
    catch(err){
        res.status(404).json(err)
    }
}