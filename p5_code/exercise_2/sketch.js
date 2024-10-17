
let cSize;
let gridSize;
let grid;
let qGZ; //quarter of gridsize
let apple = 0;
let appleSteps = 0; //steps since apple eaten
let pear = 0;
let pearSteps = 0; //steps since apple eaten
let orange = 0;
let orangeSteps = 0; //steps since apple eaten
let steps = 0; //steps total
let cx; //current position x
let cy; //current position y
let bgc; //background color
let wR; //worm color red value
let wG; //worm color green value
let wB; //worm color blue value
let f; //font
let n; //text nom
let hgA; //text hungry for apple
let hgO; //text hungry for orange
let hgP; //text hungry for pear
let img; //temp apple image
let imgP; //temp pear image
let imgO; //temp orange image
let appRed;
let appGreen;
let orangeImg; //orange image
let pearImg; //pear image
let ax; //apple position x
let ay; //apple position y
let px; //pear position x
let py; //pear position y
let ox; //orange position x
let oy; //orange position y
let isCodeWorking = true;
let orangeBlue = false;
let pearPink = false;

function preload() {
    img = loadImage("assets/apple.png");
    imgP = loadImage("assets/pear.png");
    imgO = loadImage("assets/orange.png");
    appRed = loadImage("assets/apple.png");
    appGreen = loadImage("assets/apple_green.png");
    pearImg = loadImage("assets/pear.png");
    orangeImg = loadImage("assets/orange.png");
    f = loadFont("assets/gloria.ttf");
}

function setup() {

    cSize = 400;
    createCanvas(cSize, cSize);
    noStroke();
    background(255);
    bgc = color(255,50);

    //default worm color
    wR = 240;
    wG = 174;
    wB = 144;

    gridSize = 20;
    grid = cSize/gridSize;
    qGZ = gridSize/4;
    n = "NOM!";
    hgA = "hungry.. for apple";
    hgP = "hungry.. for pear";
    hgO = "hungry.. for orange";

    cx = cSize/2;
    cy = cSize/2;
    ax = randomPos();
    ay = randomPos();
    px = randomPos();
    py = randomPos();
    ox = randomPos();
    oy = randomPos();
    rectMode(CORNER);
    textAlign(RIGHT, TOP);
    textSize(gridSize - 5);
    textFont(f);
}

function draw() {

    if (!isCodeWorking){
        console.log("Something is terribly wrong.");
    }

    if (steps == 0){
        image(img, ax, ay, gridSize, gridSize);
        image(imgP, px, py, gridSize, gridSize);
        image(imgO, ox, oy, gridSize, gridSize);
    }

    if (keyIsPressed){
        if (keyCode == 48){
            //press 0, reset fruit colors
            img = appRed;
            orangeBlue = false;
            pearPink = false;
        } else if (keyCode == 49){
            //press 1, apple is Green
            img = appGreen;
        } else if (keyCode == 50){
            //press 2, tint orange blue boolean true
            orangeBlue = true;
            console.log("blue");
        } else if (keyCode == 51){
            //press 3, tint pear pink boolean true
            pearPink = true;
            console.log("pink");
        }
    
        keyCode = null;
        checkMove();

        if (orangeBlue){
            image(img, ax, ay, gridSize, gridSize);
            image(imgP, px, py, gridSize, gridSize);
            colorMode(HSB);
            tint(203, 82, 89);
            image(orangeImg, ox, oy, gridSize, gridSize);
            noTint();
            colorMode(RGB);
        } else if (pearPink) {
            image(img, ax, ay, gridSize, gridSize);
            tint(237, 95, 221);
            image(pearImg, px, py, gridSize, gridSize);
            noTint();
            image(imgO, ox, oy, gridSize, gridSize);
        } else {
            image(img, ax, ay, gridSize, gridSize);
            image(imgP, px, py, gridSize, gridSize);
            image(imgO, ox, oy, gridSize, gridSize);
        }
    }

    if (mouseIsPressed){
        console.log("Is Code Working?: " + isCodeWorking);
    }

}

function checkMove(){
    
    switch(key){
    case 'w':
        cy-= gridSize;
        steps++;
        appleSteps++;
        orangeSteps++;
        pearSteps++;
        console.log("Up. Steps: " + steps + "\nSteps since last apple: " + appleSteps + "\nSteps since last orange: " + orangeSteps + "\nSteps since last pear: " + pearSteps);
        
        fill(wR, wG, wB);
        rect(cx, cy, gridSize, gridSize);
        checkFruit();
        checkFade();
        console.log("Apples eaten: " + apple + "\nOranges eaten: " + orange + "\nPears eaten: " + pear);
        break;
    case 'a':
        cx-= gridSize;
        steps++;
        appleSteps++;
        orangeSteps++;
        pearSteps++;
        console.log("Left. Steps: " + steps + "\nSteps since last apple: " + appleSteps + "\nSteps since last orange: " + orangeSteps + "\nSteps since last pear: " + pearSteps);

        fill(wR, wG, wB);
        rect(cx, cy, gridSize, gridSize);
        checkFruit();
        checkFade();
        console.log("Apples eaten: " + apple + "\nOranges eaten: " + orange + "\nPears eaten: " + pear);
        break;
    case 's':
        cy+= gridSize;
        steps++;
        appleSteps++;
        orangeSteps++;
        pearSteps++;
        console.log("Down. Steps: " + steps + "\nSteps since last apple: " + appleSteps + "\nSteps since last orange: " + orangeSteps + "\nSteps since last pear: " + pearSteps);

        fill(wR, wG, wB);
        rect(cx, cy, gridSize, gridSize);
        checkFruit();
        checkFade();
        console.log("Apples eaten: " + apple + "\nOranges eaten: " + orange + "\nPears eaten: " + pear);
        break;
    case 'd':
        cx+= gridSize;
        steps++;
        appleSteps++;
        orangeSteps++;
        pearSteps++;
        console.log("Right. Steps: " + steps + "\nSteps since last apple: " + appleSteps + "\nSteps since last orange: " + orangeSteps + "\nSteps since last pear: " + pearSteps);

        fill(wR, wG, wB);
        rect(cx, cy, gridSize, gridSize);
        checkFruit();
        checkFade();
        console.log("Apples eaten: " + apple + "\nOranges eaten: " + orange + "\nPears eaten: " + pear);
        break;
    default:
        console.log("No movement")
        break;
    }

    key = ""; //resetting key
}

function checkFruit(){

    if (cx == ax && cy == ay){
        console.log("eaten apple");
        ax = randomPos();
        ay = randomPos();
        image(img, ax, ay, gridSize, gridSize);
        appleSteps = 0;
        apple++;

        fill(20);
        text(n, randomPos(), randomPos());
        console.log(ax + ", " + ay);
    } else if (appleSteps > 30 || appleSteps < 0){
        fill(20);
        text(hgA, randomPos(), randomPos());
    }

    if (cx == px && cy == py){
        console.log("eaten pear");
        px = randomPos();
        py = randomPos();
        image(imgP, px, py, gridSize, gridSize);
        pearSteps = 0;
        pear++;

        fill(20);
        text(n, randomPos(), randomPos());
        console.log(px + ", " + py);
    } else if (pearSteps > 30 || pearSteps <= 0){
        fill(20);
        text(hgP, randomPos(), randomPos());
    }

    if (cx == ox && cy == oy){
        console.log("eaten orange");
        ox = randomPos();
        oy = randomPos();
        image(imgO, ox, oy, gridSize, gridSize);
        orangeSteps = 0;
        orange++;

        fill(20);
        text(n, randomPos(), randomPos());
        console.log(ox + ", " + oy);
    } else if (orangeSteps >= 30){
        fill(20);
        text(hgO, randomPos(), randomPos());
    }
}

function checkFade(){
    if (steps % 2 == 0){
        fill(255, 40);
        rect(0, 0, cSize, cSize);
    }
}

function mouseMoved(){
    wR = random(250) + 2;
    wG = random(250) + 2;
    wB = random(250) + 2;
    console.log("Worm color set: random" + "\nRGB Value of: " + wR + ", " + wG + ", " + wB);
}

function keyPressed(){
    console.log("Key was pressed.");
}

function mousePressed(){
    console.log("Mouse was pressed.");
}

function randomPos(){
    let n = round(random(1,(cSize/gridSize)-1))*gridSize;
    return n;
}

