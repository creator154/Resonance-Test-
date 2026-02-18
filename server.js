const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// JWT Secret (Render config vars me set kar dena)
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_change_this';  // change kar dena

// Middleware to verify token (PW Quizard jaisa)
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token nahi diya! Bearer token daal.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;  // optional: user info store kar sakta hai
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Protected API for tests list (token ke bina nahi milega)
app.get('/api/tests', verifyToken, (req, res) => {
  const tests = [
    { id: 'practice-14', name: 'Practice Test-14', date: '25/01/2026', questions: 180 },
    { id: 'aits-4', name: 'AIT:4', date: '18/01/2026', questions: 180 },
    { id: 'practice-13', name: 'Practice Test-13', date: '28/12/2025', questions: 180 }
  ];
  res.json(tests);
});

// Simple login route to generate token (PW jaise)
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // Dummy check (real me DB se verify kar)
  if (username === 'dev' && password === 'password123') {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '2h' });  // 2 hours expiry
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Wrong credentials' });
  }
});

// Quiz page (optional protected bana sakta hai)
app.get('/test.html', verifyToken, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'test.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Resonance Quiz chal raha hai port ${port} pe!`);
});
