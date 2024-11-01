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
      //right
      push(); 
      rotate(this.theta);
      line(0, 0, 0, -h); 
      translate(0, -h); 
      this.branch(h);
      pop();
  
      //left
      push();
      rotate(-this.theta);
      line(0, 0, 0, -h);
      translate(0, -h);
      this.branch(h);
      pop();
    }
  }


}