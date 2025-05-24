const express = require('express');
const app = express();
const { normalizePincode } = require("./utils");
const { getCurrentWeather } = require("./weather");
const { getForecast } = require("./forecast");

app.get('/weather', async (req, res) => {
    try {
        const pincode = normalizePincode(req.query.pincode);
        const weather = await getCurrentWeather(pincode);
        const forecast = await getForecast(pincode);

        res.json({
            today_weather: weather,
            tomorrow_forecast: forecast
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
