import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CurrencyCard.css';

type CurrencyData = {
  base: string;
  rates: {
    [key: string]: number;
  };
  date: string;
};

const CurrencyCard: React.FC = () => {
  const [currencyData, setCurrencyData] = useState<CurrencyData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('https://api.exchangerate-api.com/v4/latest/USD')
      .then((response) => {
        setCurrencyData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!currencyData) {
    return null;
  }

  const filteredRates = {
    USD: currencyData.rates['USD'],
    EUR: currencyData.rates['EUR'],
  };

  return (
    <div className="currency-card">
      <h2>Exchange Rates</h2>
      <p>Base Currency: {currencyData.base}</p>
      <p>Date: {currencyData.date}</p>
      <table>
        <thead>
          <tr>
            <th>Currency Code</th>
            <th>Currency Name</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(filteredRates).map(([currency, rate]) => (
            <tr key={currency}>
              <td>{currency}</td>
              <td>{currency === 'USD' ? 'United States Dollar' : 'Euro'}</td>
              <td>{rate.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyCard;