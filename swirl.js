
var canvas;

let symmetry = 12;
let angle = 360/symmetry;
let rot = 0;
let squish;

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}

function setup(){
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', '-1');
  //background(20);
  
  angleMode(DEGREES);
}

function draw(){
  background(0,20);

  if (frameCount % 4 == 0){
    squish = sin(rot);
  }

  push();
  translate(width/2, height/2);
  rotate(rot/2);

  for (let i = 0; i < symmetry; i++){
    rotate(angle);
    stroke(252, 189, 63, 30);
    //strokeWeight(5);
    noFill();
    angleMode(RADIANS);
    arc(0,0, canvas.width/5*(squish+0.5),canvas.height/1.5, QUARTER_PI, HALF_PI+QUARTER_PI);
    angleMode(DEGREES);

    noStroke()
    fill(100, 138, 47, 12)
    rect(canvas.width/5,canvas.width/5,60,60,70,70,5,70);
  }
  pop();

  push();
  let w = canvas.width/10 + (40*cos(frameCount))
  let h = canvas.height

  translate(width/2, height/2);
  rotate(rot);
  for (let i = 0; i < (symmetry*3); i++){
    rotate(angle/3);
    stroke(245, 229, 54, 3);
    strokeWeight(10);
    line(w, w, h, h)
  }
  pop();

  rot+=0.12;

}