import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from './db.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Helper: find user by username
const findUser = async (username) => {
  await db.read();
  return db.data.users.find(u => u.username === username);
};

// Register endpoint (with name, username, password)
router.post('/register', async (req, res) => {
  const { name, username, password } = req.body;
  if (!name || !username || !password) return res.status(400).json({ error: 'Missing name, username, or password' });
  if (await findUser(username)) return res.status(409).json({ error: 'User already exists' });
  const hash = await bcrypt.hash(password, 10);
  db.data.users.push({ name, username, password: hash });
  await db.write();
  res.json({ success: true });
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await findUser(username);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

export default router;
