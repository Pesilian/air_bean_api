import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userDb, orderDb } from '../config/db.js';

// Funktion för att registrera en ny admin
async function registerAdmin(req, res) {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword, isAdmin: true };

    console.log(user); // Kontrollera att isAdmin: true finns i user-objektet

    const newAdmin = await userDb.insert(user);

    // Kontrollera om isAdmin sparas korrekt
    const savedAdmin = await userDb.findOne({ _id: newAdmin._id });
    console.log(savedAdmin); // Kontrollera den sparade admin-användaren

    res.status(201).json(savedAdmin);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to register admin' });
  }
}

// Funktion för att registrera en ny användare
async function registerUser(req, res) {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword };

    const newUser = await userDb.insert(user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Failed to register user' });
  }
}

const SECRET_KEY = 'your-secret-key';

//logga in användare
async function loginUser(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: 'Username and password are required' });
  }

  try {
    const user = await userDb.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, isAdmin: user.isAdmin },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login user' });
  }
}

// Funktion för att hämta en användares orderhistorik
async function getUserOrders(req, res) {
  try {
    const userId = req.params.userId;

    const usersOrder = await orderDb.find({ userId: userId });

    if (usersOrder.length === 0) {
      return res.status(404).json({ error: 'No orders found' });
    }

    res.status(200).json({ orderCount: usersOrder.length, orders: usersOrder });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get users orders' });
  }
}

export { registerAdmin, registerUser, loginUser, getUserOrders };
