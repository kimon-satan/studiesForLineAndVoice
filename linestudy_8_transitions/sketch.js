/*
Transition

//problem how to join two lines with a bezier

//a clue
//http://www.inf.ed.ac.uk/teaching/courses/cg/d3/bezierJoin.html

//- perhaps easier with just beziers
//- perhaps better to use some other method - eg. lerping direction or a physical model ?

*/


let keyFrames;

function setup()
{
  createCanvas(512,512);
  keyFrames = [];

  let vertices = [];

  for(let i = 0; i < 4; i++)
  {
    let theta = i * TWO_PI/4  + PI/5;
    let r = width/4;
    vertices.push(createVector(sin(theta) * r,cos(theta) * r ));
  }

  keyFrames.push(new SimpleLine(vertices));

  vertices = [];

  for(let i = 0; i < 3; i++)
  {
    let theta = i * TWO_PI/3 + PI;
    let r = width/3;
    vertices.push(createVector(sin(theta) * r,cos(theta) * r ));
  }

  keyFrames.push(new SimpleLine(vertices));


}

function draw()
{
  background(255);
  noFill();
  stroke(0);
  translate(width/2, height/2);

  beginShape();
  for(let i = 0; i < 100; i++)
  {
    let v = keyFrames[0].calcVertex(i/100);
    vertex(v.x, v.y);
  }
  endShape();

  beginShape();
  for(let i = 0; i < 100; i++)
  {
    let v = keyFrames[1].calcVertex(i/100);
    vertex(v.x, v.y);
  }
  endShape();




  for(let i = 0; i < 100; i++)
  {
    let v1 = keyFrames[0].calcVertex(i/99);
    ellipse(v1.x, v1.y,5);

    let v2 = keyFrames[1].calcVertex(i/99);
    ellipse(v2.x, v2.y,5);
  }


////calculate the joining bezier

  let perc = 0.01;
  let mag = 100;

  let controlPoints = [];
  for(let i = 0; i < 3; i++)
  {
    let v = keyFrames[0].calcVertex((1-perc) + perc * i/2);
    controlPoints.push(v);
  }

  let d = createVector(0,0);

  for(let i = 1; i < controlPoints.length; i++)
  {
    let v = p5.Vector.sub(controlPoints[i], controlPoints[i-1]);
    d.add(v);
  }

  d.setMag(mag);
  controlPoints.push(p5.Vector.add(controlPoints[controlPoints.length-1], d));

  let controlPointsB = [];
  for(let i = 2; i >= 0; i--)
  {
    let v = keyFrames[1].calcVertex(perc * i/3);
    controlPointsB.push(v);
  }

  let d2 = createVector(0,0);

  for(let i = controlPointsB.length - 1; i >=1; i--)
  {
    let v = p5.Vector.sub(controlPointsB[i], controlPointsB[i-1]);
    d2.add(v);
  }

  d2.setMag(mag);

  controlPoints.push(p5.Vector.add(controlPointsB[controlPointsB.length-1], d2));

  controlPoints = controlPoints.concat(controlPointsB);

  let vertices = calcBezierVertices(100,controlPoints);

  beginShape();
  for(let i = 0; i < vertices.length; i++)
  {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape();


  for(let i = 0; i < controlPoints.length; i++)
  {
    fill(0)
    ellipse(controlPoints[i].x, controlPoints[i].y, 5);
  }


  noLoop();

}
