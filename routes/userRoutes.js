import {signUp,signIn,updateUserRole,authenticateUser,authorizeUser,deleteUser} from '../controllers/authenticationController.js'
import express from 'express'
const router= express.Router()
router.post('/signup',signUp)
router.post('/signin',signIn)
router.delete('/deleteUser/:id',authenticateUser,authorizeUser('admin'),deleteUser)
router.patch('/assignRole/:id',authenticateUser,authorizeUser('admin'),updateUserRole)
export default router