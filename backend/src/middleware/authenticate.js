import jwt from 'jsonwebtoken';
const { JWT_KEY } = process.env;

const authenticate = (req, res, next) => {
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
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            status: 'error',
            error: 'Authentication failed'
        });
    }
};

export default authenticate