// Example server.js
const express = require('express');
const OpenAI = require('openai');

const app = express();
const port = 3002;

const openai = new OpenAI({ apiKey: 'YOUR_API_KEY' });

app.post('/suggestDepartments', async (req, res) => {
  const { grievance } = req.body;

  try {
    const suggestedDepartments = await suggestDepartments(grievance);
    res.json({ suggestedDepartments });
  } catch (error) {
    console.error('Error suggesting departments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
