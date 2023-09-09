require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const bodyParser = require("body-parser");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});


const generateShortUrl = () => {
  return Math.floor(Math.random() * 1000) + 1;
};

// Daftar penyimpanan untuk URL pendek
const urlStorage = new Map();
let shortUrlCounter = 1;


app.post('/api/shorturl', (req, res) => {
  const originalUrl = req.body.url;

    // Validasi URL harus dimulai dengan "https://"
  const urlRegex = /^https:\/\/.*/;

  if (!urlRegex.test(originalUrl)) {
    return res.json({ error: 'Invalid URL' });
  }

  
const shortUrl = shortUrlCounter++;

const generateShortUrl = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const urlStorage = new Map();
let shortUrlCounter = generateShortUrl(10, 9999);

app.post("/api/shorturl", (req, res) => {
  const originalUrl = req.body.url;

  // Simpan URL pendek dalam penyimpanan
  const shortUrl = shortUrlCounter++;

  urlStorage.set(shortUrl, originalUrl);

  res.json({ original_url: originalUrl, short_url: shortUrl });
});


app.get('/api/shorturl/:short_url', (req, res) => {
  const shortUrl = parseInt(req.params.short_url);

  if (urlStorage.has(shortUrl)) {
    const originalUrl = urlStorage.get(shortUrl);
    res.redirect(originalUrl);
  } else {
    res.json({ error: 'URL pendek tidak ditemukan' });
  }
});


app.get('/api/shorturl/:short_url', (req, res) => {
  const shortUrl = parseInt(req.params.short_url);

  if (urlStorage.has(shortUrl)) {
    const originalUrl = urlStorage.get(shortUrl);
    res.redirect(originalUrl);
  } else {
    res.json({ error: 'URL pendek tidak ditemukan' });
  }
});


app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
