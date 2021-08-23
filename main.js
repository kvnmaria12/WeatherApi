const app = require("./app");
const https = require("https");
const superagent = require("superagent");

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
})

app.post("/weather", (req, res) => {

    const query = req.body.CityName;
    const apiKey = "c2cd39719ecad05f1ba2091eb93c8bc1";
    const units = "metric";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`;

    https.get(url, (response) => {

        // response.on is used to get the actual data from the openweathermap api
        response.on('data', (data) => {

            // The data that we get would be in buffer and we need to beautifully parse it into a json format so we are using the JSON.parse() 
            const weatherData = JSON.parse(data);

            // getting temperature form the api
            const temperature = weatherData.main.temp;

            const weatherDescription = weatherData.weather[0].description;

            const icon = weatherData.weather[0].icon;

            const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

            // and you cannot have two res.send within a given one of these app methods so we are using send.write() so that we can send everything
            res.write(`<h1>The Temperature of ${query} is ${temperature} Degree Celcius </h1>`);
            res.write(`<h1>The Weather is currently ${weatherDescription} </h1>`);
            res.write(`<img src = ${imgURL}>`);
            res.send();
        })

    })
})


// Working with superagent
app.get("/data", (req, res) => {

    const cityName = "India";
    const apiKey = "c2cd39719ecad05f1ba2091eb93c8bc1";
    const units = "metric";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

    superagent
        .get(url)
        .end((err, response) => {

            if (err) return console.log(err);

            res.send(response.body);

        })
})





