const express = require('express')
const productController = require('../Controllers/productController')
const userController = require('../Controllers/userController')
const wishlistController = require('../Controllers/wishlistController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const cartController = require('../Controllers/cartController')
const router = express.Router()

//getAllProducts
router.get('/allProducts',productController.getAllProducts)

//register
router.post('/user/register',userController.register)

//login
router.post('/user/login',userController.login)

//view a product
router.get('/viewProduct/:id',productController.viewProduct)

//add to wish list
router.post('/addToWishlist',jwtMiddleware,wishlistController.addToWishlist)

//get wishlist
router.get('/getWishlist',jwtMiddleware,wishlistController.getWishlist)


router.delete('/deleteWishlist/:id',jwtMiddleware,wishlistController.deleteWishlist)

//add to cart
router.post('/addCart',jwtMiddleware,cartController.addToCart)


// //get cart items
router.get('/getCart',jwtMiddleware,cartController.getCart)


router.delete('/deleteCart/:id',jwtMiddleware,cartController.deleteCart)


router.get('/incrementCart/:id',jwtMiddleware,cartController.incrementCart)

router.get('/decrementCart/:id',jwtMiddleware,cartController.decrementCart)

module.exports = router