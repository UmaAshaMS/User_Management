import express from 'express'
const router = express.Router()
import {test, updateUser} from '../controllers/userController.js'
import { verifyUser } from '../utils/verifyUSer.js'
import upload from '../utils/multer.js'

router.get('/', test) 
router.put('/updateUser/:userId',verifyUser, upload.single('profilePicture'), updateUser)

export default router;