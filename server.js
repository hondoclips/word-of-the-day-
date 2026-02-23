const express = require('express');
const { generateHTML } = require('./generate-daily-post');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (wizard.png, etc.)
app.use(express.static(path.join(__dirname)));

// Daily post HTML
app.get('/', (req, res) => {
    const html = generateHTML();
    res.send(html);
});

app.get('/daily-post', (req, res) => {
    const html = generateHTML();
    res.send(html);
});

app.listen(PORT, () => {
    console.log(`WOTD Server running on port ${PORT}`);
});
