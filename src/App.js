import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`)
      .then(response => response.json())
      .then(data => {
        setExchangeRate(data.rates);
      })
      .catch(error => console.log(error));
  }, [baseCurrency]);

  useEffect(() => {
    if (exchangeRate[targetCurrency]) {
      setConvertedAmount(amount * exchangeRate[targetCurrency]);
    }
  }, [amount, exchangeRate, targetCurrency]);

  const handleBaseCurrencyChange = (event) => {
    setBaseCurrency(event.target.value);
  };

  const handleTargetCurrencyChange = (event) => {
    setTargetCurrency(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <div className="App">
      <h1>Conversor de Moedas</h1>
      <div>
        <label htmlFor="baseCurrency">Moeda Base:</label>
        <select id="baseCurrency" value={baseCurrency} onChange={handleBaseCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="BRL">BRL</option>
        </select>
      </div>
      <div>
        <label htmlFor="targetCurrency">Moeda Alvo:</label>
        <select id="targetCurrency" value={targetCurrency} onChange={handleTargetCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="BRL">BRL</option>
        </select>
      </div>
      <div>
        <label htmlFor="amount">Quantidade:</label>
        <input type="number" id="amount" value={amount} onChange={handleAmountChange} />
      </div>
      <div>
        <h2>Valor Convertido:</h2>
        <p>{convertedAmount.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default App;
