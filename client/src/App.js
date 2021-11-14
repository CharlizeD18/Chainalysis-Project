import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

/* 
  Get the recommended exchange to buy from based on which one is lower.
*/
function getBuyRecommendation(coinBasePrice, krakenPrice) {
  if (coinBasePrice < krakenPrice) {
    return "Coinbase"
  } else {
    return "Kraken"
  }
};

/* 
  Get the recommended exchange to sell on based on which one is higher.
*/
function getSellRecommendation(coinBasePrice, krakenPrice) {
  if (coinBasePrice > krakenPrice) {
    return "Coinbase"
  } else {
    return "Kraken"
  } 
}

function App() {
  /* 
    Each state is a 2 element array where the first element contains the buy price
    and the second element contains the sell price.
   */
  const [coinbasePrice, setCoinbasePrice] = useState({});
  const [krakenPrice, setKrakenPrice] = useState({});

  /*
  Get the buy and sell prices when the page is refreshed from the backend.
*/
  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios.get('http://localhost:3500/coinbase')
        .then(response => setCoinbasePrice(response.data));

    axios.get('http://localhost:3500/kraken')
        .then(response => setKrakenPrice(response.data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-price-display">
          <div className="App-coinbase">
            <h1>Coinbase Prices:</h1>
            <h3>Bitcoin Buy Price: ${coinbasePrice["bitcoin_buy"]}</h3>
            <h3>Bitcoin Sell Price: ${coinbasePrice["bitcoin_sell"]}</h3>
            <h3>Ethereum Buy Price: ${coinbasePrice["eth_buy"]}</h3>
            <h3>Ethereum Sell Price: ${coinbasePrice["eth_sell"]}</h3>   
          </div>
          <div className="App-kraken">
            <h1>Kraken Prices:</h1>
            <h3>Bitcoin Buy Price: ${krakenPrice["bitcoin_buy"]}</h3>
            <h3>Bitcoin Sell Price: ${krakenPrice["bitcoin_sell"]}</h3>
            <h3>Ethereum Buy Price: ${krakenPrice["eth_buy"]}</h3>
            <h3>Ethereum Sell Price: ${krakenPrice["eth_sell"]}</h3> 
          </div>
        </div>
        <div className="App-recommendations">
          <h1>Buy/Sell Recommendations:</h1>
          <h3>Buy Bitcoin: {getBuyRecommendation(coinbasePrice["bitcoin_buy"], krakenPrice["bitcoin_buy"])}</h3>
          <h3>Sell Bitcoin: {getSellRecommendation(coinbasePrice["bitcoin_sell"], krakenPrice["bitcoin_sell"])}</h3>
          <h3>Buy Ethereum: {getBuyRecommendation(coinbasePrice["eth_buy"], krakenPrice["eth_buy"])}</h3>
          <h3>Sell Ethereum: {getSellRecommendation(coinbasePrice["eth_sell"], krakenPrice["eth_sell"])}</h3>
        </div>
      </header>
    </div>
  );
}

export default App;
