import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import User from '../models/userModel.js'

dotenv.config();

export const adminLogin = (req, res, next) => {
    const { email, password } = req.body
    try {
        const adminEmail = process.env.ADMIN_EMAIL
        const adminPassword = process.env.ADMIN_PASSWORD

        if (email === adminEmail && password === adminPassword) {
            const token = jwt.sign(email, process.env.JWT_SECRET)
            res.cookie('access_token', token, {
                httpOnly: true,
                maxAge: 1 * 60 * 60 * 1000,
            }).status(200).json({ success: true, message: 'Admin login success' })
        }
        else {
            return res.status(401).
                json({ success: false, message: 'Invalid credentials' })
        }
    }
    catch (error) {
        console.log(error)
        next(error)
    }
};

export const adminLogout = () => {
    res.clearCookie('access_token').status(200).json('Signout Success')
};

export const userDetails = async (req, res) => {
    try {
        const users = await User.find().sort({createdAt : -1})
        res.status(200).json(users)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({message : 'Failed to fetch Users'})
    }
};

export const deleteUser = async(req, res) => {
    try{
        const userId = req.params.userId
        const user = await User.findByIdAndDelete(userId)
        // console.log(user)
        if(!user){
            return res.status(404).json({message : "User not found"})
        }
        res.status(200).json({success: true, message : 'USer deleted', user})  
    }
    catch(error){
        console.log(error)
        res.status(500).json({success: true, message : 'Failed to delete user'})

    }
}

export const updateUser = async(req, res) => {
    try{

    }
    catch(error){
        console.log('Error in updaing user', error)
    }
}
