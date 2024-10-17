//shapes generated counters
let t = 0; //triangle
let e = 0; //ellipse
let r = 0; //rectangle
let p = 0; //point
let l = 0; //line

//fun counters
let minOneCount = 0;// --
let minCount = 0;// -=
let mulCount = 1;// *=
let divCount = 2;// /=


function setup() {
  //setting up blank canvas of 500x500, black background
  createCanvas(500,500);
  background(0);
  noStroke();
  frameRate(15); //to avoid epileptic effect at full fps speed
}

function draw() {
  //refreshing background to create fading-away effect for previously drawn shapes
  background(0, 20);

  //new RGB values
  let ranR = random(255);
  let ranG = random(255);
  let ranB = random(255);

  //generates x,y coords based on generated R and G values
  let eX = ranR * 2;
  let eY = ranG * 2;
  
  //display generated RGB Values
  console.log("Generated RGB Values\nR: " + ranR + "\nG: " + ranG + "\nB: " + ranB);
  
  
  if (mouseIsPressed){ //runs visual when mouse is pressed
    
    if (mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0){
      //draw radiating lines from grid pattern that follow pressed mouse when inside canvas
      for (let i = 100; i < 400; i += 30) {
        for (let j = 100; j < 400; j += 30) {
          //resetting strokeWeight
          strokeWeight(1);

          //generating greyscale value
          let gVal = random(255);
          //determining starting coords for lines based on for loop within small grid
          let iCoord = i + 10;
          let jCoord = j + 10;
          
          //Setting line color to randomly generated greyscale val
          stroke(gVal, random(255));
          //Generate line from grid point (i,j) to current mouse position
          line(iCoord, jCoord, mouseX, mouseY);

          console.log("New line has a greyscale value of " + gVal + "\nConnecting to coords: " + iCoord + ", " + jCoord + "\nMouse is at: " + mouseX + ", " + mouseY);
          
          
        }
      }
      l+=100;

    } else {
      noFill();

      //creating new rectangle with random greyscale value and stroke weight
      let gRectVal = random(255);
      stroke(gRectVal, random(255));
      strokeWeight(random(5));
      rect(eX, eY, random(10), random(10));

      //creating point at opposing coords to rectangle with new greyscale value, but same stroke weight
      let gPointVal = random(255);
      stroke(gPointVal);
      point(eY, eX);
      
      console.log("New Rectangle at (" + eX + ", " + eY + ") with greyscale value: " + gRectVal + "\nNew Point at (" + eY + ", " + eX + ") with greyscale value: " + gPointVal);
      
      r++;
      p++;
    }

  } else { //runs visual when mouse is not pressed (idle)
    //clearing stroke value so generated shapes have no border
    noStroke();
    
    if (mouseX < 500 && mouseY < 500 && mouseX > 0 && mouseY > 0){ //runs cluster of ellipses around mouse coords when it is within canvas border
      
      //cluster of ellipses will now be randomly generated only within 40x40 space around mouse coords
      eX = (mouseX - 20) + random(40);
      eY = (mouseY - 20) + random(40);
      
      //ellipses have hue based on mouse position
      fill(mouseX, mouseY, ranB);
      ellipse(eX, eY, random(10), random(10));

      console.log("Mouse is at coords: " + mouseX + ", " + mouseY);

      e++;
    } else { //runs blinking triangles across whole canvas when mouse is not within canvas borders
      
      fill(ranR, ranG, ranB);

      //new size coefficients to randomize size and rotation of triangles
      let n = random(10);
      let m = random(3);
      triangle(eX,eY,eX-n,eY+n*m,eX+n*m,eY+n);

      //rounding triangle coords to properly display in console log
      let x1 = Math.round(eX);
      let y1 = Math.round(eY);
      let x2 = Math.round(eX - n);
      let y2 = Math.round(eY + n * m);
      let x3 = Math.round(eX + n * m);
      let y3 = Math.round(eY + n);
      console.log("Triangle points are at: (" + x1 + ", " + y1 + ") (" + x2 + ", " + y2 + ") (" + x3 + ", " + y3 + ")");

      t++;
    }
  }

  //print to console, stats of shapes generated each draw
  console.log("# of Lines generated this session: " + l + "\n# of Rectangles generated this session: " + r + "\n# of Points generated this session: " + p + "\n# of Ellipses generated this session: " + e + "\n# of Triangles generated this session: " + t);

  //fun counters execution that were not otherwised used
  minOneCount--;
  minCount-=10;
  mulCount*=2;
  divCount/=2;

  console.log("Other operator shortcuts changing: \n--: " + minOneCount + "\n-=: " + minCount + "\n*=: " + mulCount + "\n/=: " + divCount);
} //end of draw loop
