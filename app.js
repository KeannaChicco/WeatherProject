const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  
  const city = req.body.city;
  const apiKey = "&appid=3288a29d2136866f10fc5081bdff2878&units=metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const weatherDescription = weatherData.weather[0].description
    console.log(weatherDescription);
    const cityName = weatherData.name;
    console.log(cityName);
    const icon = weatherData.weather[0].icon;
    const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png";

    res.type("html");
    res.write("The weather is currently " + weatherDescription);
    res.write("The temperature in " + cityName + " is " + temp);
    res.write("<img src=" + imageURL + ">");
    res.send();
    });
  });
});




app.listen(3000, function(){
  console.log("Server has started on port 3000");
});
