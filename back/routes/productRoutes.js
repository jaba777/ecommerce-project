import express from 'express';
import { requireSignin,isAdmin } from '../middlewares/authMiddleware.js';
import {createProductController,
    getProductController,
    getSingleProductController,
    productPhotoController,
    updateProductController,
    deleteProductController,
    productFiltersController,
    productCountController,
    productListController,
    searchProductController,
    relatedProductController,
    productCategoryController,
    braintreeTokenController,
    brainTreePaymentController
} from '../controllers/productController.js';
import formidable from 'express-formidable';

const router = express.Router();

// routes
router.post('/create-product',requireSignin,isAdmin,formidable(),createProductController)

//update product
router.put('/update-product/:pid',requireSignin,isAdmin,formidable(),updateProductController)

//get products
router.get('/get-product',getProductController)

// get single product
router.get('/get-product/:slug',getSingleProductController)

//get photo
router.get('/product-photo/:pid', productPhotoController)

//delete product
router.delete('/delete-product/:pid',deleteProductController);

//filter product

router.post('/product-filters',productFiltersController)

//product Count
router.get('/product-count',productCountController)

//product per page
router.get('/product-list/:page',productListController);

//Search product

router.get('/search/:keyword',searchProductController)

//similar product 
router.get('/related-product/:pid/:cid', relatedProductController);

//category wise product
router.get('/product-category/:slug', productCategoryController);

//payments routes
//token
router.get('/braintree/token', braintreeTokenController);

//payments

router.post('/braintree/payment',requireSignin,brainTreePaymentController)



export default router