// responsilb of providing interface for env variables
const dotenv = require('dotenv');
const results = dotenv.config();
if(results.error)
  throw results.error;
const { parsed: envs } = results;
module.exports = envs;