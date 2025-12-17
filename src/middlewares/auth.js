import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const auth = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided, authorization denied',
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        
        // Get user from token
        const user = await User.findById({_id : decoded.id}).populate('roleTitle');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found',
            });
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (error) {      
        return res.status(401).json({
            success: false,
            message: error.message || 'Invalid token',
        });
    }
};

export const role = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required',
                statusCode: 401,
            });
        }

        if (!allowedRoles.includes(req.user.roleTitle.title)) {
            return res.status(403).json({
                success: false,
                message: 'You do not have permission to perform this action',
                statusCode: 403,
            });
        }

        next();
    };
};
