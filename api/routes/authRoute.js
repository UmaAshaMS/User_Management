import express from 'express'
import {signin, signup, google, signout, profile} from '../controllers/authController.js'
import { verifyUser } from '../utils/verifyUSer.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/google', google)
router.get('/signout', signout)

router.get('/profile', verifyUser, profile)

export default router