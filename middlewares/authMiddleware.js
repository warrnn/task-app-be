import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export async function protect(req, res, next) {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id);

            if (!req.user) {
                return res.status(401).json({
                    message: "User not fount or authentication failed"
                });
            }

            return next();
        } catch (err) {
            console.error('Authentication error:', err);
            return res.status(401).json({
                message: "Invalid token or token has been expired"
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            message: "Access denied"
        });
    }
}