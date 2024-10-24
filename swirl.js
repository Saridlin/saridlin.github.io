
var canvas;

let symmetry = 12;
let angle = 360/symmetry;
let rot = 0;
let squish;

counter = 1;

let bloom = new Array(10)

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}

function setup(){
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', '-1');
  //background(20);
  
  angleMode(DEGREES);

  for (let i = 0; i < bloom.length; i++){
    /*
    TO DO
    Off set the positions by using i * each "row" of canvas height and column
    Pseudo grid-like behavior
    */
    bloom[i] = new Bloom(random(canvas.width), random(canvas.height), random(0.5,1.5), random(5)*200);
  }
}

function draw(){
  background(0,20);


  if (frameCount % 2 == 0){
    squish = sin(rot);
  }

  for (let i = 0; i < bloom.length; i++){
    bloom[i].display(); 
  }

  rot+=0.12;
}


class Bloom{

  lx;
  ly;
  sc;
  offset;

  constructor(x, y, s, o){
    this.lx = x;
    this.ly = y;
    this.sc = s
    this.offset = o;
  }

  display(){

    push();
    let w = canvas.width/20 + (10*cos(frameCount))
    let h = canvas.height/10

    translate(this.lx, this.ly);
    scale(sin(this.offset*0.15)*this.sc);
    rotate(rot);
    for (let i = 0; i < (symmetry*3); i++){
      rotate(angle/3);
      stroke(245, 229, 54, 3);
      strokeWeight(5);
      gradientLine(w, w, h, h, color(59, 57, 10, 40), color(0,0,0,40));
    }
    pop();

    push();
    translate(this.lx, this.ly);
    scale(sin(this.offset*0.15));
    rotate(rot/2);

    for (let i = 0; i < symmetry; i++){
      rotate(angle);
      stroke(252, 189, 63, 30);
      //strokeWeight(5);
      noFill();
      angleMode(RADIANS);
      arc(0,0, canvas.width/20*(squish),canvas.height/12, QUARTER_PI, HALF_PI+QUARTER_PI);
      angleMode(DEGREES);

      noStroke()
      fill(100, 138, 47)
      rect(canvas.width/20,canvas.width/20,10,10,30,30,0,30);
    }
    pop();

    this.offset+=1;

  }

}

function gradientLine(x1, y1, x2, y2, c1, c2){
  let grad = this.drawingContext.createLinearGradient(x1, y1, x2, y2);
  grad.addColorStop(0,c1);
  grad.addColorStop(1,c2);

  this.drawingContext.strokeStyle = grad;

  line(x1, y1, x2, y2);
}
