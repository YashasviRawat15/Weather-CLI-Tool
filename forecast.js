require('dotenv').config();
const axios = require('axios');
const cache = require('./cache');
const { DateTime } = require('luxon');

const API_KEY = process.env.OPENWEATHER_API_KEY;

async function getForecast(pincode) {
    const cached = cache.get(`forecast_${pincode}`);
    if (cached) return cached;

    const url = `https://api.openweathermap.org/data/2.5/forecast?zip=${pincode},IN&appid=${API_KEY}&units=metric`;

    try {
        const response = await axios.get(url);
        const forecastList = response.data.list;

        const tomorrow = DateTime.now().plus({ days: 1 }).toFormat('yyyy-LL-dd');

        const forecast = forecastList.find(entry => entry.dt_txt.startsWith(tomorrow));
        if (forecast) {
            cache.set(`forecast_${pincode}`, forecast);
            return forecast;
        } else {
            throw new Error("Tomorrow's forecast not found.");
        }
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to fetch forecast.");
    }
}

module.exports = { getForecast };
