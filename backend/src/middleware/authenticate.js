import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
const { JWT_KEY } = process.env;

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            status: 'error',
            error: 'Authentication failed: No token provided'
        });
    }
    
    const authToken = authHeader.split(" ")[1];
    if (!authToken) {
        return res.status(401).json({
            status: 'error',
            error: 'Authentication failed'
        });
    }
    try {
        const decoded = jwt.verify(authToken, JWT_KEY);
        const user = await User.findOne({ email: decoded.email })
        // Reject tokens issued before the password was last changed or reset
        const tokenIssuedBeforePasswordChange = user?.passwordChangedAt && decoded.iat * 1000 < user.passwordChangedAt.getTime();
        if (!user || tokenIssuedBeforePasswordChange) {
            return res.status(401).json({
                status: 'error',
                error: 'Authentication failed'
            });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            status: 'error',
            error: 'Authentication failed'
        });
    }
};

export default authenticate