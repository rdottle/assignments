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
var mehimage;
var extrasad;

var w = window.innerWidth;
var h = window.innerHeight;

function preload(){
    goodimage = loadImage("../img/smiley-01.png");
    badimage = loadImage("../img/smiley-2-01-01.png");
    mehimage = loadImage("../img/smiley-3-01.png");
    extrasad = loadImage("../img/extrasad-01.png");
  }

// ***** Setup function ***** //
function setup(){
  button = select('#submit');
  city = select('#city');
  button.mousePressed(queryAPI);
  var cnv = createCanvas(1200, 1200);
  cnv.parent('sketch-holder');
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
    if (temperature > 17){
      image(goodimage, 400, 20, 600, 600);
    }
    else if (temperature > 15 & temperature < 17){
      image(mehimage, 400, 20, 600, 600);
    }
    else if (temperature <= 0){
      image(extrasad, 400, 20, 600, 600);
     }

     else { 
      image(badimage, 400, 20, 600, 600);
    }
    // rect(200, 50, temperature *5, temperature * 5);
  }
  textAlign(LEFT, TOP);
  fill(0);
    if (weatherData){
        textSize(40);
        text(temperature + '\xBA celsius', 50, 20);
        text('humidity at ' + humidity + '%', 500 , 20);
        text(description, 900, 20);
  textAlign(LEFT, BOTTOM);
        textSize(60);
        if (temperature > 17 & temperature ){
          text("Yay, you are warm!", 400, 650);
        }
        else if (temperature > 15 & temperature < 17){
          text("Meh!", 550, 650);
        }

        else if (temperature <= 0){
          text("You are FROZEN!", 400, 650);
        }
        else{
          text("Oh no, you are cold!", 400, 650);
        }
    }
}

