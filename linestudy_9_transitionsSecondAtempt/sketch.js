/*
Transition

//problem how to join two lines with a bezier

//a clue
//http://www.inf.ed.ac.uk/teaching/courses/cg/d3/bezierJoin.html

//- perhaps easier with just beziers
//- perhaps better to use some other method - eg. lerping direction or a physical model ?

*/



let aVec;
let bVec;
let aPos;
let bPos;

let bezier;
let tightness;

function setup()
{
  createCanvas(512,512);

  aVec = createVector(0,100);
  bVec = createVector(0,100);
  aPos = createVector(-50,0);
  bPos = createVector(50,0);

  tightness = 0;


}

function draw()
{

  background(255);
  noFill();
  stroke(0);
  push();
  translate(width/2, height/2);

  let aPoints = [];
  let bPoints = [];

  let va = p5.Vector.div(aVec,2);
  aPoints.push(p5.Vector.sub(aPos,va));
  aPoints.push(p5.Vector.add(aPos,va));

  let vb = p5.Vector.div(bVec,2);
  bPoints.push(p5.Vector.sub(bPos,vb));
  bPoints.push(p5.Vector.add(bPos,vb));

  line(aPoints[0].x, aPoints[0].y, aPoints[1].x, aPoints[1].y);

  line(bPoints[0].x, bPoints[0].y, bPoints[1].x, bPoints[1].y);

  let cps = calcCatmullRomControlPoints(aPoints[1],bPoints[1],va,vb, tightness);


  for(let i = 0; i < cps.length; i++)
  {
    ellipse(cps[i].x,cps[i].y,5);
  }

  let bezier = calcBezierVertices(100,cps);

  stroke(0,0,255);

  beginShape();
  for(let i = 0; i < bezier.length; i++)
  {
    vertex(bezier[i].x,bezier[i].y);
  }
  endShape();



  fill(0);
  noStroke();

  text("a", aPoints[0].x, aPoints[0].y);
  text("b", bPoints[0].x, bPoints[0].y);
  pop();

  text("tightnesst: " + tightness, 20,20);


}

function keyPressed()
{
  if(key == 's')
  {
    aVec.rotate(0.1);
  }
  else if(key == 'a')
  {
    aVec.rotate(-0.1);
  }

  if(key == 'x')
  {
    bVec.rotate(0.1);
  }
  else if(key == 'z')
  {
    bVec.rotate(-0.1);
  }

}
