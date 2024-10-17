
let r1_speedX, r1_speedY, r1_x, r1_y;
let r2_speedX, r2_speedY, r2_x, r2_y;
let r3_speedX, r3_speedY, r3_x, r3_y;
let r4_speedX, r4_speedY, r4_x, r4_y;

let f, floor, carpet, bouquet; //complex data types

//table locations
let tx1, ty1;
let tx2, ty2;

//bouquet rotation var
let fAngle = 0;

function preload(){
  f = loadFont("assets/ChakraPetch-Regular.ttf");
  floor = loadImage("assets/floor.png");
  carpet = loadImage("assets/carpet.png");
  bouquet = loadImage("assets/bouquet.png");
}

function setup(){
  createCanvas(800, 800);
  background(255);
  textFont(f);

  stroke(0);
  strokeWeight(1);
  angleMode(RADIANS);

  //generating new table locations
  tx1 = random(200,600);
  ty1 = random(200,250);
  tx2 = random(200,650);
  ty2 = random(500,650);
  
  //generating roombas origin points and speeds
  r1_speedX = random(-1.5,1.5);
  r1_speedY = random(-1.5,1.5);
  r1_x = random(30,width-30);
  r1_y = random(30,height-30);

  r2_speedX = random(-3,3);
  r2_speedY = random(-3,3);
  r2_x = random(30,width-30);
  r2_y = random(30,height-30);

  r3_speedX = random(-3,3);
  r3_speedY = random(-3,3);
  r3_x = random(30,width-30);
  r3_y = random(30,height-30);

  r4_speedX = random(-3,3);
  r4_speedY = random(-3,3);
  r4_x = random(30,width-30);
  r4_y = random(30,height-30);
}

function draw(){
  doRoomDraw(600,700); //redraw Room setting
  doRoombaMove(); //roomba movement logic

  //establishing roombas
  doRoomba(color(237, 163, 59), 'Room-zoom', '', r1_x, r1_y, r1_speedX, r1_speedY);
  doRoomba(color(35, 89, 73), 'Zoomer2', 'knife', r2_x, r2_y, r2_speedX, r2_speedY);
  doRoomba(color(156, 64, 96), 'Beatrice', 'hat', r3_x, r3_y, r3_speedX, r3_speedY);
  doRoomba(color(133, 213, 237), 'Peace', 'spoon', r4_x, r4_y, r4_speedX, r4_speedY);

  //establishing tables
  doAddTable('Table 1', 1.5, 90, 'flower', tx1, ty1);
  doAddTable('Table 2', 1, 180, 'utensils', tx2, ty2);
}

function doRoomDraw(cw, ch){
  //drawing floor and carpet
  image(floor, 0, 0, width, height);
  imageMode(CENTER);
  image(carpet, width/2, height/2, cw, ch);
  imageMode(CORNER);
}

function doAddTable(name, s, angle, dec, lx, ly){
  //table generation and customization
  push();
  translate(lx, ly);
  rotate(radians(angle));
  scale(s);
  fill(74, 43, 13);
  rect(0, 0, 120, 80);

  //table decoration
  switch(dec){
    case 'flower':
      push();
      translate(60,40);
      doAddFlower();
      pop();
      describeElement(name, 'Bouquet added.', LABEL);
      break;
    case 'utensils':
      push();
      scale(1/s);
      translate(100+(s*20), 70);
      rotate(radians(180));
      translate(30,40);
      doAddKnife();
      translate(30,0)
      doAddPlate();
      translate(22,-20);
      doAddSpoon();
      pop();
      describeElement(name, 'Plate and Utensils added.', LABEL);
      break;
    default:
      describeElement(name, 'No decorations.', LABEL);
  }
  pop();
}

function doRoomba(color, name, acc, lx, ly, sx, sy){
  //roomba generation and customization
  push();
  
  translate(lx, ly);
  rotate(atan2(sx, -sy));
  stroke(30); //setting outline color
  fill(color);
  ellipse(0, 0, 60, 60); //body w/ custom color
  fill(0);
  ellipse(0, 0, 27, 27); //outer button - static
  fill(220);
  ellipse(0, 0, 9, 9); //inner button - static
  noFill();
  strokeWeight(4);
  arc(0, 0, 60, 60, PI, 2*PI); //large bumper - static
  arc(0, 0, 40, 40, PI+0.4, (2*PI)-0.4); //handle - static
  strokeWeight(1);
  fill(0);
  ellipse(0, -28, 5, 5); //front bumper button

  //accessories!
  switch(acc){
    case 'knife':
      push();
      translate(27,0);
      rotate(radians(20));
      doAddKnife();
      pop();
      describeElement(name, " equipped Knife!", LABEL);
      break;
    case 'hat':
      push();
      translate(-22,-22);
      rotate(radians(-40));
      doAddHat();
      pop();
      describeElement(name, " equipped Hat!", LABEL);
      break;
    case 'spoon':
      push();
      translate(35,-20);
      rotate(radians(30));
      doAddSpoon();
      pop();
      describeElement(name, " equipped Spoon!", LABEL);
      break;
    default:
      describeElement(name, "No accessory equipped.", LABEL);
  }

  fill(255);
  textAlign(CENTER);
  text(name, 0, 23); //Roomba name
  pop();
}

//add a knife graphic
function doAddKnife(){
  stroke(0);
  fill(220);
  arc(0, 0, 10, 40, PI+HALF_PI, 0);
  line(0, 0, 0, -20);
  fill(0);
  rect(0, 0, 6, 20);
}

//add a hat graphic
function doAddHat(){
  fill(100);
  ellipse(0,0,30,7);
  noStroke();
  rect(-9,-6,18,6);
  stroke(0);
  line(9,0,9,-6);
  line(-9,0,-9,-6);
  ellipse(0,-6,18,5);
}

//add a flower graphic
function doAddFlower(){
  fill(212, 245, 255);
  ellipse(0, 0, 45, 45);
  ellipse(0, 0, 20, 20);
  imageMode(CENTER);
  push();
  rotate(radians(fAngle));
  image(bouquet, 0, 0, 60, 60);
  pop();
  imageMode(CORNER);
}

//add a spoon graphic
function doAddSpoon(){
  stroke(0);
  fill(220);
  rect(3, 10, 4, 30);
  ellipseMode(CORNER);
  ellipse(0, 0, 10, 15);
  ellipseMode(CENTER);
  noStroke();
  rect(3.75, 10, 2.5, 10);
  stroke(0);
}

//add a plate graphic
function doAddPlate(){
  fill(220);
  ellipse(0, 0, 40, 40);
  ellipse(0, 0, 25, 25);
}

function doRoombaMove(){
  //Roomba movement logic

  //dist calc for roombas 1 and 2 only
  let d = dist(r1_x, r1_y, r2_x, r2_y);
  
  //rotation calc for facing forward
  let vx = r2_x - r1_x;
  let vy = r2_y - r1_y;
  let a = atan2(vy, vx);
  a = abs(a);

  //checking for collision
  if (d <= 60){
    if (d < 50){
      //edge case if generate on top of one another, have roomba2 relocated
      r2_x = random(30,width-30);
      r2_y = random(30,height-30);
    }

    //backstep in case of collision between roombas 1 and 2 only
    //trying to prevent clipping and getting stuck together
    r1_speedY = -r1_speedY;
    r2_speedY = -r2_speedY;
    r1_speedX = -r1_speedX;
    r2_speedX = -r2_speedX;

  } else {
    //collision of rommbas with walls of room
    if (r1_x < 30 || r1_x > (width-30)){
      r1_speedX = -r1_speedX;
    }
    if (r1_y < 30 || r1_y > (height-30)){
      r1_speedY = -r1_speedY;
    }
  
    if (r2_x < 30 || r2_x > (width-30)){
      r2_speedX = -r2_speedX;
    }
    if (r2_y < 30 || r2_y > (height-30)){
      r2_speedY = -r2_speedY;
    }

    if (r3_x < 30 || r3_x > (width-30)){
      r3_speedX = -r3_speedX;
    }
    if (r3_y < 30 || r3_y > (height-30)){
      r3_speedY = -r3_speedY;
    }

    if (r4_x < 30 || r4_x > (width-30)){
      r4_speedX = -r4_speedX;
    }
    if (r4_y < 30 || r4_y > (height-30)){
      r4_speedY = -r4_speedY;
    }
  }
  
  //move roomba forward
  r1_x += r1_speedX;
  r1_y += r1_speedY;
  r2_x += r2_speedX;
  r2_y += r2_speedY;
  r3_x += r3_speedX;
  r3_y += r3_speedY;
  r4_x += r4_speedX;
  r4_y += r4_speedY;
}

//change bouquet rotation angle
function mousePressed(){
  fAngle += 20;
}