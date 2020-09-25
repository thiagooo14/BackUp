const express = require('express');
const axios = require('axios');
const app = express();
const verification = token => {
  const twelvedigits = /^(\d|\w){12}$/gm;
  return twelvedigits.test(token);
};
app.get('/btc/price', async (req, res) => {
  const token = req.headers.authorization;
  const isValid = verification(token);
  if (!isValid) {
    return res.status(401).json('Invalid token');
  }
  const apiBTC = 'https://api.coindesk.com/v1/bpi/currentprice/BTC.json';
  const result = await axios.get(apiBTC).then(({ data }) => data);
  res.status(200).json(result);
});
app.listen(3000);
