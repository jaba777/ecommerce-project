import express from 'express';
import { requireSignin,isAdmin } from '../middlewares/authMiddleware.js';
import {
    createCategoryController,
    updateCategoryController, 
    categoryController, 
    singleCategoryController,
    deleteCategoryController
} from '../controllers/categoryController.js';

const router=express.Router();



// create category
router.post('/create-category',requireSignin,isAdmin,createCategoryController);

// update category

router.put('/update-category/:id',requireSignin,isAdmin,updateCategoryController)

//getAll category
router.get('/get-category', categoryController)

//Single category
router.get('/single-category/:slug', singleCategoryController);

// Delete category

router.delete('/delete-category/:id',requireSignin,isAdmin, deleteCategoryController)

export default router;