require('dotenv').config();
const readline = require('readline');
const { getCurrentWeather } = require('./weather');
const { getForecast } = require('./forecast');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askPincode() {
  rl.question('Enter Indian Pincode (6 digits) or type "exit": ', async (pincode) => {
    if (pincode.toLowerCase() === 'exit') {
      rl.close();
      return;
    }

    if (!/^\d{6}$/.test(pincode)) {
      console.log('Invalid Pincode. Try again.');
      askPincode();
      return;
    }

    try {
      const weather = await getCurrentWeather(pincode);
      const forecast = await getForecast(pincode);

      console.log('\nCurrent Weather:');
      console.log(`Location: ${weather.name}`);
      console.log(`Temp: ${weather.main.temp}°C`);
      console.log(`Condition: ${weather.weather[0].description}`);

      console.log('\nTomorrow’s Forecast:');
      console.log(`Temp: ${forecast.main.temp}°C`);
      console.log(`Condition: ${forecast.weather[0].description}`);
      console.log('\n-----------------------------\n');

    } catch (err) {
      console.error('Error:', err.message || err);
    }

    askPincode();  // loop back
  });
}

askPincode();
