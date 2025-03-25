// https://editor.p5js.org/kreier/sketches/IrqaPR3nC
//
// Instructions:
//
// 1) Create training data:
//   - click anywhere in the Preview field to set a
//     location for note C
//   - press the keys 'd', 'e', 'f', 'g' or 'a' for
//     a different note (or area label)
//
//  2) Training
//   - press 't' to start training your model. it
//     might take some seconds to load the model
//   - continue training by pressing 'c'
//
//  3) Inference or Prediction
//   - Click anywhere in the Preview field to get a
//     predicted note (with color) for this location 
//   - Press 's' to save model and its parameters
//
//  This system operates as a state machine. The
//  initial state is 'collection', after 'training'
//  it switches to 'prediction'.
//
let model;
let targetLabel = 'C';
let state = 'collection';
let env, wave, startTime;
let changedLabel = false;
let collectedData = false;
let trained_epochs = 0;

let notes = {
  C: 261.62,
  D: 293.66,
  E: 329.63,
  F: 349.23,
  G: 392.00,
  A: 440.00
}

let colors = {
  C: 'rgba(255,  0,  0, 0.4)',
  D: 'rgba(  0, 255, 0, 0.4)',
  E: 'rgba( 0,  0, 255, 0.4)',
  F: 'rgba(255, 255, 0, 0.4)',
  G: 'rgba(0, 255, 255, 0.4)',
  A: 'rgba(255, 0, 255, 0.4)'
}

function setup() {
  createCanvas(400, 440);
  
  let  options = {
    inputs: ['x', 'y'],
    outputs: ['label'],
    task:  'classification',
    debug: 'true',
  }
  model = ml5.neuralNetwork(options);
  
  env = new p5.Envelope();
  env.setADSR(0.05, 0.1, 0.5, 1);
  env.setRange(1.2, 0); 
  wave = new p5.Oscillator(); 
  wave.setType('sine');
  wave.start();
  wave.freq(440);
  wave.amp(env);
  
  background(255);
  stroke(0);
  rect(0, 0, 400, 400);
  printState();
  
  trainButton = createButton('Start Training');
  trainButton.position(20, 480);
  trainButton.mousePressed(startTraining);
  continueButton = createButton('Continue Training');
  continueButton.position(140, 480);
  continueButton.mousePressed(continueTraining);
  exportButton = createButton('Export Model');
  exportButton.position(290, 480);
  exportButton.mousePressed(saveModel);
  buttonC = createButton('C');
  buttonD = createButton('D');
  buttonE = createButton('E');
  buttonF = createButton('F');
  buttonG = createButton('G');
  buttonA = createButton('A');
  buttonC.position(110, 445);
  buttonD.position(160, 445);
  buttonE.position(210, 445);
  buttonF.position(260, 445);
  buttonG.position(310, 445);
  buttonA.position(360, 445);
  buttonC.mousePressed(noteC);
  buttonD.mousePressed(noteD);
  buttonE.mousePressed(noteE);
  buttonF.mousePressed(noteF);
  buttonG.mousePressed(noteG);
  buttonA.mousePressed(noteA);
}

function keyPressed() {
  if (key == 't') {
    startTraining();
  } else if (key == 'c' && state == 'prediction') {
    continueTraining();
  } else if (key == 's' && state == 'prediction') {
    saveModel();
  } else if (key == 'r' && state == 'prediction') {
    randomPrediction();
  } else if (key == 'x' && state == 'prediction') {
    randomPredictions();
  } else {
    checkLabel(key.toUpperCase());
  }
}

function startTraining() {
  if (changedLabel && collectedData) {
    state = 'training';
    printState();
    console.log('Starting training.');
    console.log('Loading model, this might take a few seconds.');
    model.normalizeData();
    let options = {
      epochs: 200
    }
    trained_epochs = 200;
    model.train(options, whileTraining, finishedTraining);    
  } else {
    console.log('You must first collect at least two different data points.')
  }

}

function whileTraining(epochs, loss) {
  console.log(epochs);
}

function finishedTraining() {
  console.log('finished training. epochs trained: ', trained_epochs);
  state = 'prediction';
  printState();
}

function mousePressed() {
  if (mouseY < 400) {
    let inputs = {
      x: mouseX,
      y: mouseY
    }
    if (state == 'collection') {
      let target = {
        label: targetLabel
      }
      model.addData(inputs,target);
      stroke(0);
      noFill();
      ellipse(mouseX, mouseY, 24);
      fill(0);
      noStroke();
      textAlign(CENTER,CENTER);
      text(targetLabel, mouseX, mouseY);
      wave.freq(notes[targetLabel]);
      env.play();
      collectedData = true;
    } else if (state == 'prediction') {
      model.classify(inputs, gotResults);
    }    
  }

}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // console.log(results);
  let label = results[0].label;
  console.log(label);
  stroke(0);
  // fill(0, 0, 255, 100);
  fill(colors[label]);
  // console.log(colors[label]);
  ellipse(mouseX, mouseY, 24);
  fill(0);
  noStroke();
  textAlign(CENTER,CENTER);
  text(label, mouseX, mouseY);
  wave.freq(notes[label]);
  env.play();
}

function autoResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // console.log(results);
  let label = results[0].label;
  stroke(0);
  fill(colors[label]);
  // console.log(colors[label]);
  ellipse(rx, ry, 24);
  fill(0);
  noStroke();
  textAlign(CENTER,CENTER);
  text(label, rx, ry);
  wave.freq(notes[label]);
  env.play();
}

function printState() {
  noStroke();
  fill(255, 255, 255);
  rect(0, 400, 400, 35);
  x_highlight = 100;
  if (state == 'training') {   x_highlight = 200; }
  if (state == 'prediction') { x_highlight = 300; }
  fill(180, 180, 255); 
  stroke(0);
  rect(x_highlight, 411, 99, 22);
  fill(colors[targetLabel]);
  rect(5, 411, 22, 22);
  textSize(14);
  noStroke();
  fill(0); // Black text
  textAlign(CENTER, CENTER);
  text(targetLabel, 16, 423);
  text("State:", 70, 423);  
  text("Collection", 150, 423);
  text("Training", 250, 423);
  text("Prediction", 350, 423);
}

async function randomPrediction() {
  rx = random(400);
  ry = random(400);
  let pos = {
    x: rx,
    y: ry
  }
  model.classify(pos, autoResults);  
}

async function randomPredictions() {
  startTime = millis();
  while (millis() - startTime < 1000) { // Run for 1 second
    await randomPrediction(); // Wait for the function to complete
    //requestAnimationFrame(randomPrediction);
    await new Promise(resolve => setTimeout(resolve, 20)); // 50ms delay
  }
}

function continueTraining() {
  if ( trained_epochs < 100) {
    console.log("You first have to start the training.");
  } else {
    console.log('continue training');
    state = 'training';
    printState();
    trained_epochs += 100;
    let options = { epochs: 100};
    model.train(options, whileTraining, finishedTraining);
  }
}

function saveModel() {
  console.log('export model.');
  model.save();  
}

function checkLabel(label) {
  if( label === 'C' || label === 'D' || label === 'E' || label === 'F' || label === 'G' || label === 'A' ) {
    if (targetLabel != label) {
      changedLabel = true;
    }
    targetLabel = label;
    printState();    
  }
}

function noteC() { checkLabel('C'); }
function noteD() { checkLabel('D'); }
function noteE() { checkLabel('E'); }
function noteF() { checkLabel('F'); }
function noteG() { checkLabel('G'); }
function noteA() { checkLabel('A'); }

// function draw() {
//   background(220);
// }
