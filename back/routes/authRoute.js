import express from 'express';
import { registerController,
    loginController,testController,
    forgotPasswordController, 
    updateProfileController,
    getOrdersController,
    getAllOrdersController,
    orderStatusController
} from '../controllers/authController.js';
import {requireSignin,isAdmin} from '../middlewares/authMiddleware.js';


const router=express.Router();

//register
router.post('/register',registerController);

//Login
router.post('/login',loginController);

//FORGOT Password

router.post('/forgot-password', forgotPasswordController)

//test routes
router.get('/test',requireSignin,isAdmin,testController);

//protected route auth

router.get('/user-auth',requireSignin,(req,res)=>{
    res.status(200).send({ ok: true });
    
})

//protected admin route out

router.get('/admin-auth',requireSignin,isAdmin,(req,res)=>{
    res.status(200).send({ ok: true });
    
})

//update profile
router.put('/profile',requireSignin, updateProfileController)

//orders
router.get('/orders',requireSignin,getOrdersController);

//All orders
router.get('/all-orders',requireSignin,isAdmin,getAllOrdersController);

//order status update

router.put('/order-status/:orderId',requireSignin,isAdmin,orderStatusController)


export default router