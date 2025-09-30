const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

const users = []; // This should be replaced with a database in a real application
const secretKey = 'secretKey'
// Register route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Store the new user
  users.push({ username, password: hashedPassword });

  res.status(201).json({ message: 'User registered successfully' });
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find the user
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Check the password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Create a JWT
  const accessToken = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1d' });

  res
    .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
    .header('Authorization', accessToken)
    .send(user);
});

// RefreshToken route
router.post('/refresh', (req, res) => {
  const refreshToken = req.cookies['refreshToken'];
  if (!refreshToken) {
    return res.status(401).send('Access Denied. No refresh token provided.');
  }

  try {
    const decoded = jwt.verify(refreshToken, secretKey);
    const accessToken = jwt.sign({ user: decoded.user }, secretKey, { expiresIn: '1h' });

    res
      .header('Authorization', accessToken)
      .send(decoded.user);
  } catch (error) {
    return res.status(400).send('Invalid refresh token.');
  }
});

// Protected route
const authenticate = (req, res, next) => {
  const accessToken = req.headers['authorization'];
  const refreshToken = req.cookies['refreshToken'];

  if (!accessToken && !refreshToken) {
    return res.status(401).send('Access Denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(accessToken, secretKey);
    req.user = decoded.user;
    next();
  } catch (error) {
    if (!refreshToken) {
      return res.status(401).send('Access Denied. No refresh token provided.');
    }

    try {
      const decoded = jwt.verify(refreshToken, secretKey);
      const accessToken = jwt.sign({ user: decoded.user }, secretKey, { expiresIn: '1h' });

      res
        .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
        .header('Authorization', accessToken)
        .send(decoded.user);
    } catch (error) {
      return res.status(400).send('Invalid Token.');
    }
  }
};

router.get('/protected', authenticate, (req, res) => {
  res.send('Welcome to the protected route');
});

module.exports = router;
