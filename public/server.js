const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Sample tests list (Quizard jaisa)
const tests = [
  { id: 'practice-14', name: 'Practice Test-14', date: '25/01/2026', questions: 180 },
  { id: 'aits-4', name: 'AIT:4', date: '18/01/2026', questions: 180 },
  { id: 'practice-13', name: 'Practice Test-13', date: '28/12/2025', questions: 180 },
  // Add more
];

// API to get test list
app.get('/api/tests', (req, res) => {
  res.json(tests);
});

// API to get questions for a test (sample)
app.get('/api/test/:id/questions', (req, res) => {
  const testId = req.params.id;
  // Real me DB se le, abhi sample
  const sampleQuestions = [
    {
      question: "NEET 2026 me kitne questions hote hain?",
      options: ["180", "200", "150", "120"],
      answer: "180"
    },
    // Add 179 more
  ];
  res.json(sampleQuestions);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Resonance Quiz server chal raha hai port ${port} pe!`);
});
