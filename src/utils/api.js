// src/utils/api.js
import axios from 'axios';

const BASE_URL = 'https://api.exchangerate-api.com/v4/latest';

export const fetchExchangeRates = async (baseCurrency) => {
  try {
    const response = await axios.get(`${BASE_URL}/${baseCurrency}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch exchange rates');
  }
};
