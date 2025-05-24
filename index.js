const readline = require("readline-sync");
const { normalizePincode } = require("./utils");
const { getCurrentWeather } = require("./weather");
const { getForecast } = require("./forecast");

(async function main() {
    while (true) {
        try {
            const input = readline.question("\nEnter Indian Pincode (or type 'exit'): ");
            if (input.toLowerCase() === 'exit') break;

            const pincode = normalizePincode(input);

            const weather = await getCurrentWeather(pincode);
            const forecast = await getForecast(pincode);

            console.log(`\nCurrent Weather in ${weather.name}:`);
            console.log(`  Temp: ${weather.main.temp}°C`);
            console.log(`  Weather: ${weather.weather[0].description}`);

            console.log(`\nTomorrow Forecast:`);
            console.log(`  Time: ${forecast.dt_txt}`);
            console.log(`  Temp: ${forecast.main.temp}°C`);
            console.log(`  Weather: ${forecast.weather[0].description}`);
        } catch (err) {
            console.error(` ${err.message}`);
        }
    }
})();
