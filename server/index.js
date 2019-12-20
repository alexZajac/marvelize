const express = require('express');
const path = require('path');
const request = require('request');
const dotenv = require("dotenv");
const md5 = require('md5');
dotenv.config();

// Constants
const { PORT, PRIVATE_API_KEY, PUBLIC_API_KEY } = require('./config');
const CHARACTERS_PER_PAGE = 8;
const CLIENT_BUILD_PATH = path.join(__dirname, '../client/build');

const make_request_url = page_number => {
  const timestamp = Date.now();
  const offset = page_number*CHARACTERS_PER_PAGE;
  const md5_hash = md5(timestamp+PRIVATE_API_KEY+PUBLIC_API_KEY);
  return `https://gateway.marvel.com/v1/public/characters?limit=8&offset=${offset}&ts=${timestamp}&apikey=${PUBLIC_API_KEY}&hash=${md5_hash}`;
}

const filter_response = body => {
  let result = {};
  const start_color = "#0F2027";
  const end_colors = ["#33CB83", "#353BCE", "#CC2C2C", "#47788D", "#2CAACD", "#D0AD31", "#D033D0", "#D16D34"]
  if (body.code == 200){
    result.copyright = body.attributionText;
    const characters_results = new Array(CHARACTERS_PER_PAGE);
    // filtering each character
    body.data.results.forEach((c, index) => {
        const n = end_colors.length;
        const rnd_index = Math.floor(Math.random() * n);
        let current_character = {
          id: c.id,
          name: c.name,
          thumbnail: `${c.thumbnail.path}/portrait_incredible.jpg`,
          description: c.description,
          start_color: start_color,
          end_color: end_colors[rnd_index]
        };
        characters_results[index] = current_character;
        // removing used color
        end_colors.splice(rnd_index, 1);
    });
    result.data = characters_results;
  }
  return JSON.stringify(result, null, 3);
}

// App
const app = express();

// Static files
app.use(express.static(CLIENT_BUILD_PATH));

// API
app.get('/api/characters/:page_number', async(req, res) => {
  const page_number = req.params.page_number;
  const req_url = make_request_url(page_number);
  request(req_url, (error, response, body) => {
    res.set('Content-Type', 'application/json');
    const filtered_body = filter_response(JSON.parse(body));
    res.send(filtered_body);
  });
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
  res.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}.`);
});
