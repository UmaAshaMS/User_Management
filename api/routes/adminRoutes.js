import express from 'express'
const router = express.Router()
import {adminLogin, adminLogout, deleteUser, userDetails} from '../controllers/adminController.js'
import { updateUser } from '../controllers/adminController.js'

router.post('/admin/login',adminLogin)
router.get('/admin/userDetails', userDetails  )
router.put('/admin/updateUser/:userId', updateUser)
router.delete('/admin/deleteUser/:userId', deleteUser)
router.get('/admin/logout', adminLogout)

export default router;