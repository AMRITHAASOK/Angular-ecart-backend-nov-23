const wishlists = require('../Models/wishlistSchema')

//Add to wishlist
exports.addToWishlist = async(req,res)=>{

    const {id,title,price,image} =req.body;
    //add details of the product to the db
    const userId = req.payload
    try{
        //check the product id is present in the wishlist
        const item = await wishlists.findOne({id,userId})
        if(item){
            res.status(401).json("Product is already in the wishlist")
        }
        else{
            const product = new wishlists({
                id,title,price,image,userId
            })
          await product.save();
          res.status(200).json("Product added successfully")

        }
    }
    catch(err){
        res.status(404).json(err)
    }
}

exports.getWishlist = async(req,res) => {
    //add details of the product to the db
    const userId = req.payload
    try{
        const wishlist = await wishlists.find({userId})
        res.status(200).json(wishlist)
    }
    catch(err){
        res.status(404).json(err)
    }

}

exports.deleteWishlist = async(req,res) => {
    const {id} = req.params
    const userId = req.payload
    try{
        const deleteItem = await wishlists.deleteOne({id})
        if(deleteItem){
            const wishlist = await wishlists.find({userId})
            res.status(200).json(wishlist)
        }
    }
    catch(err){
        res.status(404).json(err)
    }
}