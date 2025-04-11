import express from 'express'
const router = express.Router()
import {addUser, adminLogin, adminLogout, deleteUser, userDetails} from '../controllers/adminController.js'
import { updateUser } from '../controllers/adminController.js'
import upload from '../utils/multer.js'

router.post('/admin/login',adminLogin)
router.get('/admin/userDetails', userDetails  )
router.post('/admin/addUser', addUser)
router.put('/admin/updateUser/:userId',upload.single('profilePicture'), updateUser)
router.delete('/admin/deleteUser/:userId', deleteUser)
router.get('/admin/logout', adminLogout)

export default router;