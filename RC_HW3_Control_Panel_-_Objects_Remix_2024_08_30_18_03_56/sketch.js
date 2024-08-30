let points = [];
let mousePoint;
let diag;
let ex;
let objects =[];
let camera;

function preload(){
  ex = loadModel('fire-object.obj');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  diag = sqrt(width*width+height*height);
  mousePoint = new Point(createVector(width / 2, height / 2), diag/8);
  stroke(63,127);
  for (let q = 0; q < 50; q++)
    points.push(new Point(createVector(random(0,width),random(0,height)), diag/12));
  camera = createCamera();
  createSlider
}

function draw() {
  orbitControl();
  camera.lookAt(300, 500, 0);
  strokeWeight(5);
  clear();
  mousePoint.pos.x = mouseX;
  mousePoint.pos.y = mouseY;
  mousePoint.show();
  for (let i = 0; i < points.length; i++) {
    points[i].move();
    points[i].show();
    for (let j = i+1; j < points.length; j++)
      if (points[i] !== points[j] && points[i].sense(points[j]))
        line(points[i].pos.x, points[i].pos.y, points[j].pos.x, points[j].pos.y);
    if (mousePoint.sense(points[i])) {
      line(points[i].pos.x, points[i].pos.y, mousePoint.pos.x, mousePoint.pos.y);
    }
  }
}




class Point {
  constructor(pos_, radar_) {
    let speed;
    this.pos = pos_;
    speed = random(0.5, 1.5);
    let inOffset = 5;
    // choose random points on the canvas to create velocity directions
    let target = createVector(random(inOffset, (width - inOffset)), random(inOffset, (height - inOffset)));
    this.vel = ((target.sub(this.pos)).normalize()).mult(speed);
    this.radar = radar_;
  }
  move() {
    this.pos.add(this.vel);

    if (this.pos.x - 3 > width) {
      this.pos.x = 0;
    } else if (this.pos.x + 3 < 0) {
      this.pos.x = width;
    }
    if (this.pos.y - 3 > height) {
      this.pos.y = 0;
    } else if (this.pos.y + 3 < 0) {
      this.pos.y = height;
    }
  }
  show() {
    translate(0,0,0);
    
    push();
    fill(150);
    noStroke();
    rect(this.pos.x-1, this.pos.y-1, 2,2);
    pop();
    
    push();
    fill(255,0,0);
    stroke(0);
    strokeWeight(0.5);
    translate(this.pos.x-1, this.pos.y-1,0);
    scale(30,-30, 30);
    let fire = model(ex);
    
    pop();
  }
  sense(other) {
    let d = Math.hypot(this.pos.x - other.pos.x, this.pos.y - other.pos.y);
    return (d <= this.radar);
  }
}