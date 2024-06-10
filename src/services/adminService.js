import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { adminDb } from '../config/db.js';

// Funktion för att registrera en ny admin
async function registerAdmin(req, res) {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword };

    const newAdmin = await adminDb.insert(user);
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(400).json({ error: 'Failed to register admin' });
  }
}

const SECRET_KEY = 'your-secret-key';

//Admin login
async function adminLogIn(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: 'Username and password are required' });
  }

  try {
    const user = await adminDb.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login admin' });
  }
}

export { adminLogIn, registerAdmin };
