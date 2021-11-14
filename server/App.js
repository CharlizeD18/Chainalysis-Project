import express from 'express';

// var Client = require('coinbase').Client;
// var client = new Client({
//   'apiKey': 'API KEY',
//   'apiSecret': 'API SECRET',
//   strictSSL:false 
// });
import fetch from 'node-fetch';
import cors from 'cors';
const app = express()
const port = 3500
const COINBASE_BASE_URL = "https://api.coinbase.com/v2";
const BLOCKCHAIN_BASE_URL = "https://api.kraken.com/0/";

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/coinbase', async (req, res) => {
  var response_data = {};
  const bitcoin_price_res = await fetch(`${COINBASE_BASE_URL}/prices/BTC-USD/buy`);
  const bitcoin_data = await bitcoin_price_res.json();
  response_data["bitcoin_buy"] = bitcoin_data.data.amount;

  const bitcoin_sell_res = await fetch(`${COINBASE_BASE_URL}/prices/BTC-USD/sell`);
  const bitcoin_sell_data = await bitcoin_sell_res.json();
  response_data["bitcoin_sell"] = bitcoin_sell_data.data.amount;

  const eth_price_res = await fetch(`${COINBASE_BASE_URL}/prices/ETH-USD/buy`);
  const eth_data = await eth_price_res.json();
  response_data["eth_buy"] = eth_data.data.amount;

  const eth_sell_res = await fetch(`${COINBASE_BASE_URL}/prices/ETH-USD/sell`);
  const eth_sell_data = await eth_sell_res.json();
  response_data["eth_sell"] = eth_sell_data.data.amount;

  console.log(response_data);
  res.send(response_data)
})

app.get('/kraken', async (req, res) => {
  var response_data = {};
  const bitcoin_price_res = await fetch(`${BLOCKCHAIN_BASE_URL}public/Ticker?pair=XBTUSD`);
  const bitcoin_data = await bitcoin_price_res.json();
  response_data["bitcoin_buy"] = bitcoin_data.result.XXBTZUSD.a[0];
  response_data["bitcoin_sell"] = bitcoin_data.result.XXBTZUSD.b[0];

  const eth_price_res = await fetch(`${BLOCKCHAIN_BASE_URL}public/Ticker?pair=ETHUSD`);
  const eth_data = await eth_price_res.json();
  console.log(eth_data);
  response_data["eth_buy"] = eth_data.result.XETHZUSD.a[0];
  response_data["eth_sell"] = eth_data.result.XETHZUSD.b[0];

  console.log(response_data);
  res.send(response_data)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})