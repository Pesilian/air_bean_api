import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key';

function authenticateToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ error: 'Accsess denied.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.log('Invalid token');
    res.status(401).json({ error: 'Accsess denied' });
  }
}

export { authenticateToken };
