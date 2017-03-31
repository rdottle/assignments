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

// ***** Setup function ***** //
function setup(){
  button = select('#submit');
  city = select('#city');
  button.mousePressed(queryAPI);
  createCanvas(800, 800);
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
   }

// ***** Draw function ***** //
function draw(){
  noFill();
  stroke(0);
  if (weatherData){
    rect(200, 200, temperature *5, temperature * 5);
  }
  textAlign(LEFT, TOP);
  fill(0);
    if (weatherData){
        textSize(24);
        text(temperature, 200, 300);
    }

}

