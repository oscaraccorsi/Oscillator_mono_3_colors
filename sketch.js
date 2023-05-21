let mic;
const osc = new p5.Oscillator();
//let frRate = [1, 2, 3, 5, 8, 13, 21];
let fr = [2, 3, 5, 8, 13];
let rnd;

let y1;
let h, w;
let low = 30;
let high = 1000;
let hi = 0;
let vol, volVoice;
let col;
let value;
let r, g, b;
let scarto;
let ritRev = 6;
let x, y;
let coeff;
let speed=1;


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.start();
  osc.start();
  reverb = new p5.Reverb();
  //reverb.process(osc, ritRev, 0, false);
  
  frameRate(random(fr));
  noStroke();
  rectMode(CENTER);
  r = 0;
  g = 255;
  b = 0;
  scarto = 0;
  x = 0;
  y = 0;
  coeff = ((high-low)/windowHeight);
  
  //setInterval(chColor, 1000*10);
}


function draw() { 
  background(0, 50);
  rnd = random(0, 100);
  noStroke();
  volVoice = mic.getLevel();
  
  let pitch =  int(random(low, high+=coeff));
  let vol = random(0, 0.9);
  
  osc.freq(pitch);
  osc.amp(vol);
  
  y1 = map(pitch, low, high, windowHeight, y);
  h = map(pitch, low, high, 100 , 1);
  w = map(vol, 0, 1, 50, 1);
  
  scarto = scarto+w;
  fill(r, g, b, vol*255);
  rect(scarto+(w*2), y1, w, h);
  
  if (scarto >= windowWidth) {
    scarto = 0;
  }
  
  if (pitch > 420 && pitch < 460) {
    chColor();
  }
  
  drawLine();
  console.log(high, y);
}
function resetSketch() {
  //background(0);
  fr = int(random(frRate));
  frameRate(fr);   
}


function chColor() {
  ritRev = int(random(0, 10));
  reverb.process(osc, ritRev, 0, false);
  
  let boh = random(120);
  if (boh < 40) {
    r = 255;
    g = 0;
    b = 0;
  }
  else if (boh > 40 && boh < 80) {
    r = 0;
    g = 0;
    b = 255;
  }
  else if (boh > 80 && boh < 110) {
    r = 0;
    g = 255;
    b = 0;
  }
  else if (boh > 110) {
    r = 255;
    g = 255;
    b = 255;  
  }
  
}

function drawLine() {
  stroke(100 , 0, 255, 100);
  line(x, y, windowWidth, y);
  
  if (y == windowHeight || y == 0) {
    speed = -speed;
    coeff = -coeff;
    frameRate(random(fr));
  }
  y -= speed;
  if (volVoice >= 0.3) {
    frameRate(random(fr));
  }
}
