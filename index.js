require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');


// Basic Configuration
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json())

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', (req, res) => {
  const originalUrl = req.body.url;

  let urlDatabase = [];
let nextShortUrl = 1;

  

  // Generate a short URL
  const shortUrl = nextShortUrl++;
  urlDatabase.push({ originalUrl, shortUrl });

  res.json({ original_url: originalUrl, short_url: shortUrl });
});

app.get('/api/shorturl/:shortUrl', (req, res) => {
  const shortUrl = parseInt(req.params.shortUrl);

  // Find the original URL in the database
  const entry = urlDatabase.find((entry) => entry.shortUrl === shortUrl);

  if (!entry) {
    return res.json({ error: 'short url not found' });
  }

  res.redirect(entry.originalUrl);
});



app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});