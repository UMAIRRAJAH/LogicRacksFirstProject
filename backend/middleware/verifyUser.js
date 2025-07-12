// middleware/verifyUser.js
import jwt from 'jsonwebtoken';

export const verifyUser = (req, res, next) => {
  const token = req.headers.token;
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.userId = decoded.id || decoded._id; 
     req.user = decoded;
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    res.status(403).json({ success: false, message: 'Invalid token' });
  }
};
