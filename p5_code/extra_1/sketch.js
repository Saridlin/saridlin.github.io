// Example 2.3.2  Bounce Vector Movement Code
let speedX, speedY, loX, loY;
let dvd;
let h;

function preload(){
    dvd = loadImage("assets/dvd_logo.png");
}

function setup() {
    background(0);
    createCanvas(800, 500);
    speedX = random(1, 2);
    speedY = random(-2, -1);
    loX = 0;
    loY = 0;
    h = 0;
    colorMode(HSB);
}

function draw() {
    background(0, 0.25);
    if (loX < 0) {
        speedX = -speedX;
    }
    if (loX > (width-100)) {
        speedX = -speedX;
    }

    if (h >= 360){
        h = 0;
    }

    // this is the short hand way of doing the same as the 2 'ifs' above
    // this uses or '||'
    if ((loY < 0) || (loY > (height-50))) {
        speedY = -speedY;
    }

    // update the position of the ball and print to screen
    loX += speedX;
    loY += speedY;

    h+=0.1;

    ball(loX,loY);
    
}

  function ball(lx,ly) {
    tint(h, 200, 100)
    image(dvd, lx, ly, 100, 50);
    console.log("ball");
  }