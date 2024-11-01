let canvas; //canvas object

let flock;
let tree;
let bloom = new Array(10);

let num = 400; //num of boids
let count = 1;
let symmetry = 12;
let angle = 360/symmetry;
let rot = 0;
let squish;

let recMode = false;
let play = false;

function setup(){
  canvas = createCanvas(1920, 1080);

  colorMode(HSB);
  angleMode(DEGREES);
  //frameRate(4);
  noLoop();

  flock = new doFlock();
  tree = new doTree();

  //populating Flock with Boid objects in tree branches
  for (let i = 0; i < num; i++){
    let x = 560 + (i*2);
    let y = (x-960)*(x-960)*0.0016875+162;
    let b = new doBoid(x, y, color(0,0,100));
    flock.addBoid(b);
  }

  //populating blooms
  for (let i = 0; i < bloom.length; i++){
    bloom[i] = new Bloom(random(canvas.width), random(canvas.height), random(0.5,1.5), random(5)*200);
  }

}


function draw(){

  //Act ONE
  if (frameCount < 300){
    background(0);
    console.log("Act ONE");
    
    if(frameCount % 2 == 0){
      squish = sin(rot);
    }
    for (let i = 0; i < bloom.length; i++){
      bloom[i].display();
    }
    rot+=0.12;

    tree.theta = (count/300 * 70);
    push();
    translate(width/2,height);
    stroke(0,0,2*count);
    strokeWeight(100/count);
    tree.display();
    pop();
    count+=0.3;

    //Act TWO
  } else if (frameCount < 600){
    background(0, 0.06);
    console.log("Act TWO");
    
    angleMode(DEGREES);
    if(frameCount % 2 == 0){
      squish = sin(rot);
    }
    for (let i = 0; i < bloom.length; i++){
      bloom[i].display();
    }
    rot+=0.12;

    angleMode(RADIANS);
    flock.run();

    //Act THREE
  } else if (frameCount < 1800){
    console.log("Act THREE");

    for (let i = 0; i < flock.boids.length; i++){
      flock.boids[i].maxspeed = -10;
      flock.boids[i].c = 0.1;
      flock.boids[i].w /= 1.001;
      flock.boids[i].h /= 1.001;
    }

    flock.run();

    //Act FOUR
  } else {
    background(0,0.06);
    console.log("Act FOUR");

    for (let i = 0; i < flock.boids.length; i++){
      flock.boids[i].maxspeed += 0.05;
      flock.boids[i].w *= 1.0022;
      flock.boids[i].h *= 1.0022;

      let h = flock.boids[i].position.y/6;
      let s = (flock.boids[i].position.x%8)*6;
      if (frameCount % 4){
        flock.boids[i].color = color(h,s, 100, 0.5)
      }
    }
    flock.run();
  }

  if (frameCount < 2700){
    if (key == ' '){
      describe('Animation Playing.', LABEL);
    } else {
      describe('Animation Stopped.', LABEL );
    }
  } else if (frameCount > 2800){
    describe('Animation Complete.', LABEL);
    noLoop();
  }

  recordit();
}


//Blooms in background of act 1 & 2
class Bloom{
  constructor(x, y, s, o){
    this.lx = x;
    this.ly = y;
    this.sc = s
    this.offset = o;
  }

  display(){
    push();
    let w = canvas.width/20 + (10*cos(frameCount));
    let h = canvas.height/10;

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
      noFill();
      angleMode(RADIANS);
      arc(0,0, canvas.width/20*(squish),canvas.height/12, QUARTER_PI, HALF_PI+QUARTER_PI);
      angleMode(DEGREES);

      noStroke();
      fill(100, 138, 47);
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

//for controlling recording
function keyPressed() {
  if (keyIsPressed === true) {
      let k = key;
      console.log("k is " + k);

      if (k == 's' || k == 'S') {
          //console.log("Stopped Recording");
          //recMode = false;
          noLoop();
      }

      if (k == ' ') {
          //console.log("Start Recording");
          //recMode = true;
          loop();
          play = true;
      }
  }
}

//recording function
function recordit() {
  if (recMode == true) {
      let ext = nf(frameCount, 4);
      saveCanvas(canvas, 'frame-' + ext, 'jpg');
      console.log("rec " + ext);
  }
}