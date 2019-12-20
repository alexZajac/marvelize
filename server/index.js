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
  if (body.code == 200){
    result.copyright = body.attributionText;
    const characters_results = new Array(8);
    body.data.results.forEach((c, index) => {
        let current_character = {
          id: c.id,
          name: c.name,
          thumbnail: `${c.thumbnail.path}/portrait_incredible.jpg`,
          description: c.description
        };
        characters_results[index] = current_character;
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
    console.log(error);
    console.log("statuscode:", response && response.statusCode);
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
