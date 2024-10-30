class doTree{

  constructor(){
    this.theta = 0;
  }

  display(){
    push();
    line(0,0,0,-300);
    translate(0,-300);
    this.branch(400);
    pop();
  }

  branch(h){
    h *= 0.62;

    if (h > 2) {
      push();    // Save the current state of transformation (i.e. where are we now)
      rotate(this.theta);   // Rotate by theta
      line(0, 0, 0, -h);  // Draw the branch
      translate(0, -h); // Move to the end of the branch
      this.branch(h);       // Ok, now call myself to draw two new branches!!
      pop();     // Whenever we get back here, we "pop" in order to restore the previous matrix state
  
      // Repeat the same thing, only branch off to the "left" this time!
      push();
      rotate(-this.theta);
      line(0, 0, 0, -h);
      translate(0, -h);
      this.branch(h);
      pop();
    }
  }


}