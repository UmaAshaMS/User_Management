import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import User from '../models/userModel.js'
import cloudinary from '../utils/cloudinary.js'
import bcryptjs from 'bcryptjs';

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
        const users = await User.find().sort({ createdAt: -1 })
        res.status(200).json(users)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Failed to fetch Users' })
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId
        const user = await User.findByIdAndDelete(userId)
        // console.log(user)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json({ success: true, message: 'USer deleted', user })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: true, message: 'Failed to delete user' })

    }
}

export const updateUser = async (req, res) => {
    console.log('Reached admin api for edit user')
    try {
        const { username } = req.body;

        let profileUrl

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            profileUrl = result.secure_url;
        }

        const userId = req.params.userId
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const updatedUser = await User.findByIdAndUpdate(userId,
            {
                username,
                profilePicture: profileUrl || user.profilePicture
            },
            { new: true })

        res.status(200).json({ success: true, message: 'Profile Updated', updatedUser })
    }

    catch (error) {
        console.log('Error in updaing user', error)
    }
}

export const addUser = async(req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(req.body)

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = bcryptjs.hashSync(password.toString(), 10);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            
        });

        await newUser.save();

        res.status(201).json({ success: true, newUser });
    }
    catch (error) {
        console.log("Error :", error)
    }
}
