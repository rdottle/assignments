// ***** Global variables ***** //
var apiKey = 'a2e480743e2a56e46be33ebbcff7f6b1';
var baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
var city;
var units = 'metric';
var weatherData;
var temperature = 0;
var humidity = 0;
var button;
var cityinfo;
var x,y;
var description;
var goodimage;
var badimage;


function preload(){
     goodimage = loadImage("../img/smiley-01.png");
    badimage = loadImage("../img/smiley-2-01.png");
  
  }

// ***** Setup function ***** //
function setup(){
  button = select('#submit');
  city = select('#city');
  button.mousePressed(queryAPI);
  createCanvas(1000, 1000);
  x = width/2;
  y = height;
}

function queryAPI(){
  var query = baseURL + city.value() + '&apiKey=' + apiKey + '&units=' + units;
  loadJSON(query, getWeatherData);
  
}

function getWeatherData(apiData){
  weatherData = apiData;
  temperature = weatherData.main.temp;
  humidity = weatherData.main.humidity;
  cityinfo = weatherData;
  console.log(weatherData);
  description = weatherData.weather[0].description;
   }

// ***** Draw function ***** //
function draw(){
  background(255);
  noFill();
  stroke(0);
  if (weatherData){
    if (temperature > 15){
      image(goodimage, 200, 50, temperature*5, temperature*5);
    }
    else{
      image(badimage, 200, 50, temperature*5, temperature*5);
    }
    // rect(200, 50, temperature *5, temperature * 5);
  }
  textAlign(LEFT, TOP);
  fill(0);
    if (weatherData){
        textSize(24);
        text(temperature + '\xBA Celsius', 300 + (temperature * 5), 50);
        text(humidity, 500 + (temperature*5), 50);
        text(description, 600 + (temperature*5), 50);
    }

}

