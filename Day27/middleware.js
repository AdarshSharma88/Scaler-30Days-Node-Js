const jwt = require('jsonwebtoken');

function authenticateAndAuthorize(requiredRole) {
    return (req, res, next) => {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized - Token not provided' });
        }try {
            const decoded = jwt.verify(token, 'your-secret-key'); 
            if (!decoded || !decoded.role || decoded.role !== requiredRole) {
                return res.status(403).json({ message: 'Forbidden - Insufficient permissions' });
            }

            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }
    };
}

module.exports = authenticateAndAuthorize;
