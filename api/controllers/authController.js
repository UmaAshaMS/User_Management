import bcryptjs from 'bcryptjs';
import User from '../models/userModel.js';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(400).json({success:false, message: 'User already exists!!' });
        }

            const hashedPassword = bcryptjs.hashSync(password, 10)
            const newUser = new User({ username, email, password: hashedPassword })

            await newUser.save()
            res.status(201).json({ success:true, message: 'New user created' })
        }
    catch (error) {
            next(error)
        }
    };

    export const signin = async (req, res, next) => {
        const { email, password } = req.body
        // if (!email && !password) {
        //     return next(errorHandler(400, 'Email and password are required!'));
        // }

        try {
            const validUser = await User.findOne({ email })
            if (!validUser) {
                return next(errorHandler(404, 'User not found!Enter valid credentials'))
            }
            const validPassword = bcryptjs.compareSync(password, validUser.password)
            if (!validPassword) {
                return next(errorHandler(401, 'Wrong credentials!'))
            }
            const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
            const { password: hashedPassword, ...rest } = validUser._doc;
            res.cookie('access_token', token, {
                httpOnly: true,
                maxAge: 1 * 60 * 60 * 1000,
            }).status(200).json(rest)
        }
        catch (error) {
            next(error)
        }
    };

    export const google = async (req, res, next) => {
        try {
            const user = await User.findOne({ email: req.body.email })
            if (user) {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
                const { password: hashedPassword, ...rest } = user._doc;
                res.cookie('access_token', token, {
                    httpOnly: true,
                    maxAge: 1 * 60 * 60 * 1000,
                }).status(200).json(rest)
            }
            else {
                //if no user found, generate a password(6 digit) for the new user
                const generatedPassword = Math.random().toString(36).slice(-6);
                const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
                const newUser = new User({
                    username: req.body.name.split(' ').join('').toLowerCase() + Math.floor(Math.random() * 10000).toString(),
                    email: req.body.email,
                    password: hashedPassword,
                    profilePicture: req.body.photo
                })

                await newUser.save();
                const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
                res.cookie('access_token', token, {
                    httpOnly: true,
                    maxAge: 1 * 60 * 60 * 1000,
                })

            }
        }
        catch (error) {
            next(error)
        }
    };

    export const signout = (req, res) => {
        res.clearCookie('access_token').status(200).json('Signout Success')
    }

    // export const profile = (req, res) => {
    //     res.status(200).json({ success: true, user: req.user });
    // }

    export const profile = (req, res) => {
        try {
            if (!req.user) {
                return res.status(401).json({ success: false, message: 'Unauthorized: No user info' });
            }
            const { password, ...safeUser } = req.user._doc || req.user;
            res.status(200).json({ success: true, user: safeUser });
        } catch (error) {
            console.error("Error in profile route:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    };
