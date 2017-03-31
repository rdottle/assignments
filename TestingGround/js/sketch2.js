// ***** Global variables ***** //
var refugeeTable;
var topRefugeesTable = new p5.Table;
var maxLabel = 0;
var maxTotal = 0;
var startChartY = 100;
var selectedButton = 5; 
var maxLength = 600;
var headers = ['Country','Refugees','Asylum-seekers','Returned refugees','IDPs','Returned IDPs','Stateless','Others of concern','Total']

// ***** Preload function ***** //
function preload(){
    refugeeTable = loadTable('../data/RefugeesUNHCR.csv', 'csv', 'header');
    console.log('Done loading table...');
}

// ***** Setup function ***** //
function setup(){
    createCanvas(900, 1000);
    textSize(12);
    console.log('Setup complete...');
    print(refugeeTable.getRowCount() + ' rows loaded...');
    print(refugeeTable.getColumnCount() + ' columns loaded...');
    for (var i = 0; i < refugeeTable.getRowCount(); i++) {
        maxLabel = max(refugeeTable.getString(i, 'Country').length, maxLabel);
    }
    print('Maximum total is ' + maxTotal);
    print('Maximum label length is ' + maxLabel);
    createNewTable();
}

// ****** Create new table function ******** //
function createNewTable(){
    for (var i = 0; i < headers.length; i++) {
        topRefugeesTable.addColumn(headers[i]);
    }
    for (var i = 0; i < refugeeTable.getRowCount(); i++) {
        var totalRefugees = refugeeTable.getNum(i, 'Total');
        if (totalRefugees >= 100000) {
            var newRow = topRefugeesTable.addRow()
                        for (var j = 0; j < headers.length; j++) {
                            newRow.setString(headers[j], refugeeTable.getString(i, headers[j]));
                        }
        }
    }
    print('New top refugee table created...');
        print(topRefugeesTable);
}

function drawButtons(){
  noFill();
  stroke(0);
  strokeWeight(1);
  for (var i = 1; i < headers.length; i++) { //*** Note that we are starting this loop from '1' in order to skip the first column that contains the country names.
    if (i == selectedButton) {
      fill(178, 178, 178);
    }
    else {
      fill(255);
    }
    rect(50 + i * 80, 50, 75, 20);
  }
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(8);
  for (var i = 1; i < headers.length; i++) { //*** Note that we are starting this loop from '1' in order to skip the first column that contains the country names.
    text(headers[i], 90 + i * 80, 60);
  }
}

function mousePressed(){
  if (mouseX > 130 && mouseX < 205 && mouseY > 50 && mouseY < 70){
    selectedButton = 1;
  }
  if (mouseX > 210 && mouseX < 285 && mouseY > 50 && mouseY < 70){
    selectedButton = 2;
  }
  if (mouseX > 290 && mouseX < 365 && mouseY > 50 && mouseY < 70){
    selectedButton = 3;
  }
  if (mouseX > 370 && mouseX < 445 && mouseY > 50 && mouseY < 70){
    selectedButton = 4;
  }
  if (mouseX > 450 && mouseX < 525 && mouseY > 50 && mouseY < 70){
    selectedButton = 5;
  }
  if (mouseX > 530 && mouseX < 605 && mouseY > 50 && mouseY < 70){
    selectedButton = 6;
  }
  if (mouseX > 610 && mouseX < 685 && mouseY > 50 && mouseY < 70){
    selectedButton = 7;
  }
  if (mouseX > 690 && mouseX < 765 && mouseY > 50 && mouseY < 70){
    selectedButton = 8;
  }
}


function drawCountries(category){
    fill(0);
    noStroke();
    textAlign(LEFT, TOP);
    var maxTotal = 0;
    for (var i = 0; i < topRefugeesTable.getRowCount(); i++) {
    	maxTotal = max(topRefugeesTable.getNum(i, category), maxTotal); 
    }
    for (var i = 0; i < topRefugeesTable.getRowCount(); i++) {
        var total = topRefugeesTable.getNum(i, category);
        var length = map(total, 0, maxTotal, 0, maxLength);
        rect(maxLabel * 5, 2 + startChartY + 14*i, length, 12);
        textSize(12);
        text(nfc(total, 0), maxLabel * 5 + length + 5, startChartY + 14*i);
    }
    textAlign(RIGHT, TOP);
    for (var i = 0; i < topRefugeesTable.getRowCount(); i++) {
        textSize(12);
        text(topRefugeesTable.getString(i, 'Country'), maxLabel * 5 - 5, startChartY + 14*i);
    }
}

function drawCountryDetails(xPos, yPos){
    textAlign(LEFT, TOP);
  fill(0);
    if (yPos > 105 && yPos < 885){
        var selectedCountry = floor((yPos - 105) / 14);
        textSize(24);
        text(topRefugeesTable.getString(selectedCountry, 'Country'), 750, 105);
        textSize(12);
        text('Refugees: ' + nfc(topRefugeesTable.getNum(selectedCountry, 'Refugees'), 0), 750, 135);
        text('IDPs: ' + nfc(topRefugeesTable.getNum(selectedCountry, 'IDPs'), 0), 750, 150);
        text('Stateless: ' + nfc(topRefugeesTable.getNum(selectedCountry, 'Stateless'), 0), 750, 165);
        text('Total: ' + nfc(topRefugeesTable.getNum(selectedCountry, 'Total'), 0), 750, 180);
    }
}

// ***** Draw function ***** //
function draw(){
    background(255);
    // drawCountries(refugeeTable);
    drawCountries(headers[selectedButton]);
    noStroke();
    fill(0);
   	drawButtons();
   	text(str(mouseX) + ',' + round(str(mouseY)), mouseX, mouseY);
   	drawCountryDetails(mouseX, mouseY);
}
