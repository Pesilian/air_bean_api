import bcrypt from 'bcrypt';
import { userDb } from '../config/db.js';

// Funktion för att registrera en ny admin
async function registerAdmin(req, res) {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword, isAdmin: true };

    const newAdmin = await userDb.insert(user);
    res.status(201).json(newAdmin);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to register admin' });
  }
}

export { registerAdmin };
