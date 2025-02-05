// Example of simple authentication middleware
const authMiddleware = (req, res, next) => {
    // Check if the request has a valid authorization token
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // You could verify the token here (e.g., JWT)
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
