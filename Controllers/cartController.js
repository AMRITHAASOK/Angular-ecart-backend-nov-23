
const carts = require('../Models/cartSchema')

//AddToCart

exports.addToCart =async(req,res)=>{
    //get details
    const {id,title,price,image,quantity}=req.body
    const userId = req.payload
    try{
        const cartitem = await carts.findOne({id,userId})
        if(cartitem){
            cartitem.quantity+=1
            cartitem.grandTotal=cartitem.quantity*cartitem.price
            await cartitem.save();
            res.status(200).json("Product updated successfully")
        }
        else{
            const cartNewProduct = new carts({ id, title, price, image, quantity ,userId });
            cartNewProduct.grandTotal = cartNewProduct.quantity * cartNewProduct.price;
            await cartNewProduct.save();
            res.status(200).json("Product added successfully");
        }
    }
    catch(err){
        res.status(404).json(err)
    }
}



exports.getCart=async(req,res)=>{
    const userId = req.payload
    try{
        const allCartProducts = await carts.find({userId})
        res.status(200).json(allCartProducts)
    }
    catch(err){
        res.status(404).json(err)
    }
}



exports.deleteCart=async(req,res)=>{
    const {id} = req.params
    const userId = req.payload
    try{
        const deleteCartProduct = await carts.deleteOne({id})
        if(deleteCartProduct){
            const allCartProducts = await carts.find({userId})
        res.status(200).json(allCartProducts)
        }
    }
    catch(err){
        res.status(404).json(err)
    }
}



exports.incrementCart=async(req,res)=>{
    const {id} = req.params
    const userId = req.payload
    try{
        //check if product already exists
        const incrementCartProduct = await carts.findOne({id,userId})
        //if product already exists, then increment product quantity by 1 and update the price accordingly
        if(incrementCartProduct){
            incrementCartProduct.quantity+=1
            incrementCartProduct.grandTotal = incrementCartProduct.price*incrementCartProduct.quantity
            //if its updated,then stored to mongodb
            await incrementCartProduct.save()
            //get all the products item details after updating
            const allCartProducts = await carts.find({userId})
            res.status(200).json(allCartProducts)

        }
        else{
            res.status(402).json("item not found")
        }
    }
    catch(err){
        res.status(404).json(err)
    }

}

exports.decrementCart=async(req,res)=>{
    const {id} = req.params
    const userId = req.payload
    try{
        //check if product already exists
        const decrementCartProduct = await carts.findOne({id,userId})
        //if product already exists, then decrement product quantity by 1 and update the price accordingly
        if(decrementCartProduct){
            decrementCartProduct.quantity-=1
            if(decrementCartProduct.quantity==0){
                //if product quantity is 0, then delete product from cart
                const deleteCartProduct = await carts.deleteOne({id})
                if(deleteCartProduct){
                    const allCartProducts = await carts.find({userId})
                res.status(200).json(allCartProducts)
                }
            }
            else{
                //if product quantity is not 0, then update price accordingly
                decrementCartProduct.grandTotal = decrementCartProduct.price*decrementCartProduct.quantity
                //if its updated,then stored to mongodb
                await decrementCartProduct.save()
                //get all the products item details after updating
                const allCartProducts = await carts.find({userId})
                res.status(200).json(allCartProducts)
            }
        }
        else{
            res.status(402).json("item not found")
        }
    }
    catch(err){
        res.status(404).json(err)
    }

}