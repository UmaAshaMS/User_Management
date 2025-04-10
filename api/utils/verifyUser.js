// middleware/verifyUser.js
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const verifyUser = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: 'User deleted or not found' });
    }

    req.user = user; // Attach user to request
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};
