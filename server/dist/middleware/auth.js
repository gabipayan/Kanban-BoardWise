import jwt from 'jsonwebtoken';
// Middleware para autenticar token
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    //const authHeader = req.headers['Authorization'];
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        console.log('❌ No Authorization header');
        res.status(401).json({ message: 'Unauthorized: No token provided' });
        return;
    }
    const token = authHeader.split(' ')[1]; // Bearer <token>
    if (!token) {
        console.log('❌ Token not found');
        res.status(401).json({ message: 'Unauthorized: Invalid token format' });
        return;
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY || '', (err, user) => {
        if (err || !user) {
            console.log('❌ Token verification failed');
            res.status(403).json({ message: 'Forbidden: Invalid token' });
            return;
        }
        console.log('✅ Token validated:', user);
        req.user = user;
        next(); // Todo bien, pasamos al siguiente middleware
    });
};
