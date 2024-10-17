   
    
   //Example 2.3.4 introduces tranformation tools and a wrapper functions
   // this containerizes the image and then controls 
   //it from outside the function that draws the image.
    

  let counter = 0;

   function setup() {
    createCanvas(800, 400);
  }
  
  function draw() {
    background(50);
    stroke(0);
    strokeWeight(8);
    noFill();
    push();
      translate(mouseX, mouseY);
      rotate(radians(counter));
      makeFace();
    pop();

  }
  
  function mouseMoved(){
    let d = dist(mouseX, mouseY, pmouseX, pmouseY);
    counter += d;

    console.log("Face has rotated a total of: " + counter + " degrees");
  }

  function makeFace() { 
    // draw a face!
    //note that is based on an origin being in the top left corner
    fill(255);
    noStroke();
    ellipse(50, 5, 180, 150);
    ellipse(50, 60, 150, 75);
    stroke(0);

    fill(0);
    ellipse(0, 0, 40, 40);
    fill(0,220,220);
    ellipse(100, 0, 40, 40);
    point(100,0);
    fill(255);
    arc(50, 50, 100, 50, 0, PI);
    line(17, 50, 17, 65);
    line(33, 50, 33, 70);
    line(50, 50, 50, 70);
    line(67, 50, 67, 70);
    line(83, 50, 83, 65);
    line(0,50,100,50);
    
    line(50,30,47,35);
    line(50,30,53,35);
  }
  