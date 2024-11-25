// src/components/CurrencyConverter.jsx
import React, { useState, useEffect } from 'react';
import { fetchExchangeRates } from '../utils/api';
import './CurrencyConverter.scss';

const CurrencyConverter = () => {
  const [rates, setRates] = useState({});
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      try {
        const data = await fetchExchangeRates(baseCurrency);
        setRates(data.rates);
        setError('');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [baseCurrency]);

  useEffect(() => {
    if (rates[targetCurrency]) {
      setConvertedAmount((amount * rates[targetCurrency]).toFixed(2));
    }
  }, [amount, targetCurrency, rates]);

  return (
    <div className="currency-converter">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div>
          <div className="form-group">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
            />
            <select
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
            >
              {Object.keys(rates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <select
              value={targetCurrency}
              onChange={(e) => setTargetCurrency(e.target.value)}
            >
              {Object.keys(rates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <p>
            Converted Amount: <strong>{convertedAmount} {targetCurrency}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
