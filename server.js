// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express and other dependencies
const express = require("express");
const request = require("request");
// Start up an instance of app
const app = express();

// Cors for cross origin allowance
const cors = require("cors");
// I have cors error -> (error cors header ‘access-control-allow-origin’ missing)
// and I have found this snippet on stackoverflow for fixing it
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Initialize the main project folder
app.use(express.static(__dirname));

// initializing the server
const port = 8080;
app.listen(port, () => console.log(`server is running on port ${port}`));

// Get request for getting weather data
app.get("/weather", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: " you must provide a zip code (The input is empty)",
    });
  } else {
    const appid = "82f99a5bc465e41a262ce355d698f3f2";
    let zipcode = req.query.search; // Dallas, Texas (For testing)
    // I have used units parameter to acquire data in metric units instead of converting it later
    let url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&units=metric&appid=${appid}`;

    // using request api
    request({ url: url }, (error, response) => {
      const data = JSON.parse(response.body);
      if (error) {
        res.send({ error: "cannot connect to the service" });
      } else if (data.cod != 200) {
        //error cases like typing invalid zip code
        res.send({ error: data.cod + " " + data.message });
      } else {
        const temp = data.main.temp;
        const city = data.name;
        res.send({
          location: city,
          temprature: temp,
        });
      }
    });
  }
});
