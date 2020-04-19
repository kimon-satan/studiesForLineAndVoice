/*
Waves

- lerp between different types of wave


*/


function setup() //the global instance
{
  noCanvas(); // we don't want to look at this
}

let instances = [];
let definitions = [];

definitions.push(function(p)
{
  let line;
  let cps;

  p.setup = function()
  {
    p.createCanvas(256, 256).style('border','1px solid');



  };

  p.draw = function()
  {

    cps = [];

    cps.push(p.createVector(100,100));
    cps.push(p.createVector(250 * sin(p.frameCount * 0.01),-100));
    cps.push(p.createVector(250 * sin(p.frameCount * 0.01 + PI),-100));
    cps.push(p.createVector(-100,100));

    vertices = calcBezierVertices(100,cps);

    line = new SimpleLine(vertices);




    p.background(255);


    //draw the shape
    p.fill(0);
    p.noStroke();
    p.translate(p.width/2, p.height/2);

    for(let i = 0; i < cps.length; i++)
    {
      p.text(i,cps[i].x + 3, cps[i].y);
      p.ellipse(cps[i].x, cps[i].y, 5);
    }


    p.stroke(0);
    p.noFill();
    p.beginShape();




    for(let i = 0; i < 512; i++)
    {
      let v = line.calcVertex(i/512);


      p.vertex(v.x, v.y);



    }
    p.endShape();

  };

}); //1

definitions.push(function(p)
{
  let cps;
  let keyFrames;
  let env;

  p.setup = function()
  {
    p.createCanvas(256, 256).style('border','1px solid');

    keyFrames = [];

    cps = [];

    cps.push(p.createVector(100,100));
    cps.push(p.createVector(250 ,-100));
    cps.push(p.createVector(-250 ,-100));
    cps.push(p.createVector(-100,100));

    vertices = calcBezierVertices(100,cps);

    let line = new SimpleLine(vertices);

    keyFrames.push(line);

    cps = [];

    cps.push(p.createVector(100,100));
    cps.push(p.createVector(-250,-100));
    cps.push(p.createVector(250,-100));
    cps.push(p.createVector(-100,100));

    vertices = calcBezierVertices(100,cps);

    line = new SimpleLine(vertices);

    keyFrames.push(line);


    data = calcSineEnv(100,0,PI,1,1.5);

    env = new EnvelopeData(data);


  };

  p.draw = function()
  {

    p.background(255);

    //draw the shape
    p.fill(0);
    p.noStroke();

    p.text("lerping" ,20,20);

    p.translate(p.width/2, p.height/2);

    let progress = ((p.millis()/1000)%10)/10;
    let t = env.lin_value(progress);

    p.stroke(0);
    p.noFill();
    p.beginShape();

    for(let i = 0; i < 512; i++)
    {
      let v1 = keyFrames[0].calcVertex(i/512);
      let v2 = keyFrames[1].calcVertex(i/512);
      v1.mult(t);
      v2.mult(1-t);
      let vsum = p5.Vector.add(v1,v2);

      p.vertex(vsum.x, vsum.y);

    }
    p.endShape();

  };

}); //2

definitions.push(function(p)
{
  let line;
  let cps;

  p.setup = function()
  {
    p.createCanvas(256, 256).style('border','1px solid');



  };

  p.draw = function()
  {

    cps = [];

    cps.push(p.createVector(100,100));
    cps.push(p.createVector(250 * sin(p.frameCount * 0.01) ,-100 + sin(p.frameCount * 0.5) * 15));
    cps.push(p.createVector(250 * sin(p.frameCount * 0.01 + PI),-100 + sin(p.frameCount * 0.5 + PI) * 15));
    cps.push(p.createVector(-100,100));

    vertices = calcBezierVertices(100,cps);

    line = new SimpleLine(vertices);




    p.background(255);


    //draw the shape
    p.fill(0);
    p.noStroke();

    p.text("adding distinct motion to control points" ,20,20);
    p.translate(p.width/2, p.height/2);

    for(let i = 0; i < cps.length; i++)
    {
      p.text(i,cps[i].x + 3, cps[i].y);
      p.ellipse(cps[i].x, cps[i].y, 5);
    }


    p.stroke(0);
    p.noFill();
    p.beginShape();




    for(let i = 0; i < 512; i++)
    {
      let v = line.calcVertex(i/512);


      p.vertex(v.x, v.y);



    }
    p.endShape();

  };

}); //3

definitions.push(function(p)
{
  let line;
  let cps;

  p.setup = function()
  {
    p.createCanvas(256, 256).style('border','1px solid');

  };

  p.draw = function()
  {
    let x = p.mouseX - p.width/2;
    let y = p.mouseY - p.height/2;

    cps = [];

    cps.push(p.createVector(100,50));
    cps.push(p.createVector(100 * sin(p.frameCount * 0.01),50 * cos(p.frameCount * 0.01)));
    cps.push(p.createVector(-0,300 ));
    cps.push(p.createVector(100 * sin(p.frameCount * 0.01 + PI),50 * cos(p.frameCount * 0.01 + PI)));
    cps.push(p.createVector(-100,50));

    vertices = calcBezierVertices(100,cps);

    line = new SimpleLine(vertices);




    p.background(255);


    //draw the shape
    p.fill(0);
    p.noStroke();

    p.text("5 control points" ,20,20);
    p.translate(p.width/2, p.height/2);

    for(let i = 0; i < cps.length; i++)
    {
      p.text(i,cps[i].x + 3, cps[i].y);
      p.ellipse(cps[i].x, cps[i].y, 5);
    }


    p.stroke(0);
    p.noFill();
    p.beginShape();




    for(let i = 0; i < 512; i++)
    {
      let v = line.calcVertex(i/512);


      p.vertex(v.x, v.y);



    }
    p.endShape();

  };

}); //4

definitions.push(function(p)
{
  let line;
  let cps;

  p.setup = function()
  {
    p.createCanvas(256, 256).style('border','1px solid');

    cps = [];

    for(let i = 0; i < 50; i++)
    {
      let x = min(random(0,250),random(0,250));
      let y = min(random(0,250),random(0,250));
      x *= random() > 0.5 ? 1 : -1;
      y *= random() > 0.5 ? 1 : -1;

      cps.push(createVector(x,y));
    }

    vertices = calcBezierVertices(512,cps);

    line = new SimpleLine(vertices);
  };

  p.draw = function()
  {
    let x = p.mouseX - p.width/2;
    let y = p.mouseY - p.height/2;






    p.background(255);


    //draw the shape
    p.fill(0);
    p.noStroke();

    p.text("Arbitrary control points" ,20,20);
    p.translate(p.width/2, p.height/2);

    // for(let i = 0; i < cps.length; i++)
    // {
    //   p.text(i,cps[i].x + 3, cps[i].y);
    //   p.ellipse(cps[i].x, cps[i].y, 5);
    // }


    p.stroke(0);
    p.noFill();
    p.beginShape();




    for(let i = 0; i < 512; i++)
    {
      let v = line.calcVertex(i/512);


      p.vertex(v.x, v.y);



    }
    p.endShape();

  };

}); //5


definitions.push(function(p)
{
  let line;
  let cps;

  p.setup = function()
  {
    p.createCanvas(256, 256).style('border','1px solid');

    cps = [];

    let np = 20;

    for(let i = 0; i < np; i++)
    {

      let x = sin(i * TWO_PI/np * 3) * 100;
      let y = -100 + 200 * (i%12)/12;

      cps.push(createVector(x,y));
    }

    vertices = calcBezierVertices(512,cps);

    line = new SimpleLine(vertices);
  };

  p.draw = function()
  {
    let x = p.mouseX - p.width/2;
    let y = p.mouseY - p.height/2;






    p.background(255);


    //draw the shape
    p.fill(0);
    p.noStroke();

    p.text("Attempting something more manipulable" ,20,20);
    p.translate(p.width/2, p.height/2);

    for(let i = 0; i < cps.length; i++)
    {
      p.text(i,cps[i].x + 3, cps[i].y);
      p.ellipse(cps[i].x, cps[i].y, 5);
    }


    p.stroke(0);
    p.noFill();
    p.beginShape();




    for(let i = 0; i < 512; i++)
    {
      let v = line.calcVertex(i/512);


      p.vertex(v.x, v.y);



    }
    p.endShape();

  };

}); //6

definitions.push(function(p)
{
  let line;
  let cps;
  let keyFrames;
  let env;
  let dur;
  let progress;
  let numPoints;

  p.setup = function()
  {
    p.createCanvas(256, 256).style('border','1px solid');



    cps = [];
    keyFrames = [];
    numPoints = 5;

    for(let i = 0; i < numPoints; i++)
    {
      cps.push(createVector(sin(i * TWO_PI/numPoints) * 100, cos(i * TWO_PI/numPoints) * 100));
    }

    myShuffle(cps);
    vertices = calcBezierVertices(100,cps);
    keyFrames.push(new SimpleLine(vertices));
    myShuffle(cps);
    vertices = calcBezierVertices(100,cps);
    keyFrames.push(new SimpleLine(vertices));

    env = new EnvelopeData([0,1]);

    dur = 0.2;


  };

  p.draw = function()
  {
    let x = p.mouseX - p.width/2;
    let y = p.mouseY - p.height/2;

    let old_progress = progress;
    progress = ((p.millis()/1000)%dur)/dur;
    let t = env.lin_value(progress);

    if(progress < old_progress)
    {
      myShuffle(cps);
      vertices = calcBezierVertices(100,cps);
      keyFrames.pop();
      keyFrames.unshift(new SimpleLine(vertices));
    }


    p.background(255);


    //draw the shape
    p.fill(0);
    p.noStroke();

    p.text("Attempting something more manipulable" ,20,20);
    p.translate(p.width/2, p.height/2);

    // for(let i = 0; i < cps.length; i++)
    // {
    //   p.text(i,cps[i].x + 3, cps[i].y);
    //   p.ellipse(cps[i].x, cps[i].y, 5);
    // }


    p.stroke(0);
    p.noFill();
    p.beginShape();




    for(let i = 0; i < 512; i++)
    {
      let v1 = keyFrames[0].calcVertex(i/512);
      let v2 = keyFrames[1].calcVertex(i/512);
      v1.mult(t);
      v2.mult(1-t);
      let vsum = p5.Vector.add(v1,v2);

      p.vertex(vsum.x, vsum.y);

    }
    p.endShape();

  };

}); //7

definitions.push(function(p)
{
  let line;
  let cps;
  let allPoints;
  let keyFrames;
  let env;
  let dur;
  let progress;
  let numPoints;

  p.setup = function()
  {
    p.createCanvas(256, 256).style('border','1px solid');



    cps = [];
    allPoints = [];
    keyFrames = [];
    numPoints = 10;

    for(let i = 0; i < 120; i++)
    {
      allPoints.push(createVector(sin(i * TWO_PI/120) * 100, cos(i * TWO_PI/120) * 100));
    }

    cps = choose(allPoints,numPoints);
    vertices = calcBezierVertices(100,cps);
    keyFrames.push(new SimpleLine(vertices));
    cps = choose(allPoints,numPoints);
    vertices = calcBezierVertices(100,cps);
    keyFrames.push(new SimpleLine(vertices));

    env = new EnvelopeData([0,1]);

    dur = 0.5;


  };

  p.draw = function()
  {
    let x = p.mouseX - p.width/2;
    let y = p.mouseY - p.height/2;

    let old_progress = progress;
    progress = ((p.millis()/1000)%dur)/dur;
    let t = env.lin_value(progress);

    if(progress < old_progress)
    {
      cps = choose(allPoints,numPoints);
      vertices = calcBezierVertices(100,cps);
      keyFrames.pop();
      keyFrames.unshift(new SimpleLine(vertices));

      numPoints = floor(random(3,20));
    }


    p.background(255);


    //draw the shape
    p.fill(0);
    p.noStroke();

    p.text("Improvement on bezier transforms" ,20,20);
    p.translate(p.width/2, p.height/2);

    // for(let i = 0; i < cps.length; i++)
    // {
    //   p.text(i,cps[i].x + 3, cps[i].y);
    //   p.ellipse(cps[i].x, cps[i].y, 5);
    // }


    p.stroke(0);
    p.noFill();
    p.beginShape();




    for(let i = 0; i < 512; i++)
    {
      let v1 = keyFrames[0].calcVertex(i/512);
      let v2 = keyFrames[1].calcVertex(i/512);
      v1.mult(t);
      v2.mult(1-t);
      let vsum = p5.Vector.add(v1,v2);

      p.vertex(vsum.x, vsum.y);

    }
    p.endShape();

  };

}); //8

for(let i = 0; i < definitions.length; i++)
{
  instances.push(new p5(definitions[i]));
}
