let bgc = 255; //initial value
let angleRotate = 0.0;
let bitmap; //image bitmap for brush 2
let bitmap2; //image bitmap for brush 3
let jitter = 0; //r value jitter
let brushSize; //starting brush size of 30 px

function preload(){
  bitmap = loadImage("assets/brushTexture.png");
  bitmap2 = loadImage("assets/brushTexture2.png");
}

function setup() {
  createCanvas(1000,800);
  background(255); //initial canvas is white
  imageMode(CENTER);
  brushSize = 30;
}

function draw(){
  if (mouseIsPressed){
    //selecting brush type
    brushChoice();
  }

  if (keyIsPressed){
    //checking key selection
    keySelect();
  }
}

function brushChoice(){
  brushSelect = key;

  switch (brushSelect){
    case '1':
      dariaO_lightSticks(220, mouseX, mouseY);
      console.log("Brush: Light Sticks selected.");
      break;
    case '2':
      dariaO_coolTriangles(mouseX, mouseY, 20);
      console.log("Brush: Cool Triangles selected.");
      break;
    case '3':
      dariaO_opposite(mouseX, mouseY, 30);
      console.log("Brush: Opposite selected.");
      break;
    case '9':
      dariaO_eraserSolid(mouseX, mouseY);
      console.log("Solid Eraser selected.");
      break;
    case '0':
      dariaO_eraserThin(mouseX, mouseY);
      console.log("Translucent Eraser selected.");
      break;
    default:
      console.log ("No brush is selected.");
      break;
  }
}

function dariaO_lightSticks(c, mx, my){
  //generates rotating lines of jittering hue around green-blue
  translate(mx, my);
  rotate(radians(angleRotate));
  strokeWeight(random(3,10));
  if (bgc == 255){
    stroke(random(255), 255-c, random(255));
  } else {
    stroke(random(255), c, random(255));
  }
  line(0,0,brushSize,0);

  angleRotate+=5;
}

function dariaO_coolTriangles(mx, my, r){
  //generates cool colored triangles of varying width
  colorMode(HSB);
  tint(jitter, random(255), 255);
  let n = random(brushSize-r, brushSize+r);
  translate(mx, my);
  rotate(random(0,360));
  image(bitmap, 0, 0, n, n);
  colorMode(RGB);
  noTint();
  jitter+=5;

  if (jitter >= 255){
    jitter = 0;
  }
}

function dariaO_opposite(mx, my, r){
  //generates a brush that colors in an inverted hue
  let n = random(brushSize-r, brushSize+r);
  translate(mx, my);
  rotate(random(0,360));
  blendMode(DIFFERENCE);
  image(bitmap2, 0, 0, n, n);
  blendMode(BLEND);
}

function dariaO_eraserSolid(mx, my){
  //eraser brush
  fill(bgc);
  noStroke();
  ellipse(mx, my, brushSize)
}

function dariaO_eraserThin(mx, my){
  //eraser brush that is slightly translucent
  fill(bgc, 50);
  noStroke();
  ellipse(mx, my, brushSize);
}

function keySelect(){
  if(key == 'c' || key == 'C'){
    background(bgc);
    console.log("cleared canvas");
  } else if (key == 'z' || key == 'Z'){
    //switching background color between white
    bgc = 255;
    background(bgc);
    console.log("background switched to white " + bgc);
  } else if (key == 'x' || key == 'X'){
    //switching background color to black
    bgc = 0;
    background(bgc);
    console.log("background switched to black " + bgc);
  } else if (key == 'p' || key == 'P'){
    //saving created painting as jpg named ""
    saveCanvas('Creation', 'jpg');
  } else if (key == '<'){
    //decrease brush size
    brushSize -= 10;
    console.log(brushSize);
  } else if (key == '>'){
    //increase brush size
    brushSize += 10;
    console.log(brushSize);
  }
  key = '';
}
