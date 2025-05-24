require('dotenv').config();
const axios = require('axios');
const cache = require('./cache');

const API_KEY = process.env.OPENWEATHER_API_KEY;

async function getCurrentWeather(pincode) {
    const cached = cache.get(`weather_${pincode}`);
    if (cached) return cached;

    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${pincode},IN&appid=${API_KEY}&units=metric`;

    try {
        const response = await axios.get(url);
        cache.set(`weather_${pincode}`, response.data);
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to fetch current weather.");
    }
}

module.exports = { getCurrentWeather };
