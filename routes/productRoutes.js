import express from "express"
import { getProduct,createProduct,getProductById,updateProduct,updateProductAfterFiltering,deleteProduct } from "../controllers/productController.js";
import {authenticateUser,authorizeUser} from "../controllers/authenticationController.js"
const router = express.Router();
router.route('/').get(authenticateUser,getProduct).post(authenticateUser,authorizeUser('user','admin'),createProduct).put(authenticateUser,updateProductAfterFiltering).
delete(authenticateUser,authorizeUser('admin'),deleteProduct)
router.route('/:id').get(authenticateUser,getProductById).
put(authenticateUser,updateProduct)
export default router