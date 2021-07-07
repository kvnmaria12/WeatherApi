const express = require('express');
const https = require('https');

const app = express();

app.use(express.json());//middleware for json
app.use(express.urlencoded({ urlencoded: true })); // middleware for form

app.use(express.static('public'))

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html');
})

app.post('/', (req, res) => {

    const query = req.body.cityName;
    const apiKey = 'c2cd39719ecad05f1ba2091eb93c8bc1';
    const units = 'metric';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`;

    https.get(url, (response) => {

        // response.on is used to get the actual data from the openweathermap api
        response.on('data', (data) => {

            // The data that we get would be in hexacode and we need to beautifully parse it into a json format so we are using the JSON.parse() 
            const weatherData = JSON.parse(data);

            // getting temperature form the api
            const temperature = weatherData.main.temp;

            const weatherDescription = weatherData.weather[0].description;

            const icon = weatherData.weather[0].icon;

            const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

            // and you cannot have two res.send within a given one of these app methods so we are using send.write() so that we can send everything
            res.write(`<h1>The Temperature of ${req.body.cityName} is ${temperature} Degree Celcius </h1>`);
            res.write(`<h1>The Weather is currently ${weatherDescription} </h1>`);
            res.write(`<img src = ${imgURL}>`);
            res.send();
        })

    })

})
// listening on the port 5000
app.listen(5000, () => console.log('Server Started on the port 5000'));



