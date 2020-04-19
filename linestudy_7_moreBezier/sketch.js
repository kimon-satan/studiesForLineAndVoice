/*
Beziers

Ideas -

Only shift one controlPoint at a time - the ends are more significant




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
      allPoints.push(p.createVector(sin(i * TWO_PI/120) * 100, cos(i * TWO_PI/120) * 100));
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

    p.text("Vary the number of points" ,20,20);
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

}); //1

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

    let numAllPoints = 25;

    for(let i = 0; i < numAllPoints; i++)
    {
      allPoints.push(createVector(sin(i * TWO_PI/numAllPoints) * 100, cos(i * TWO_PI/numAllPoints) * 100));
    }

    cps = p.selectControlPoints(numPoints);
    vertices = calcBezierVertices(100,cps);
    keyFrames.push(new SimpleLine(vertices));

    cps = p.selectControlPoints(numPoints);
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
      cps = p.selectControlPoints(numPoints);
      vertices = calcBezierVertices(100,cps);
      keyFrames.pop();
      keyFrames.unshift(new SimpleLine(vertices));

      //numPoints = floor(random(3,20));
    }


    p.background(255);


    //draw the shape
    p.fill(0);
    p.noStroke();

    p.text("Spread points evenly" ,20,20);
    p.translate(p.width/2, p.height/2);


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

  p.selectControlPoints = function(numPoints)
  {
    let _cps = [];
    let id = floor(random(0,allPoints.length)); //starting id

    for(let i = 0; i < numPoints; i++)
    {
      let pid = floor(id + i * allPoints.length/numPoints)%allPoints.length;
      _cps.push(allPoints[pid]);
    }

    return shuffle(_cps);
  }

}); //2

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
  let spread;
  let c_id;

  p.setup = function()
  {
    p.createCanvas(256, 256).style('border','1px solid');

    cps = [];
    allPoints = [];
    keyFrames = [];
    numPoints = 10;
    c_id = 0;

    let numAllPoints = 120;

    for(let i = 0; i < numAllPoints; i++)
    {
      allPoints.push(createVector(sin(i * TWO_PI/numAllPoints) * 100, cos(i * TWO_PI/numAllPoints) * 100));
    }

    spread = 2;

    cps = p.selectControlPoints(numPoints,spread);
    vertices = calcBezierVertices(100,cps);
    keyFrames.push(new SimpleLine(vertices));

    cps = p.selectControlPoints(numPoints,spread);
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
      cps = p.selectControlPoints(numPoints,spread);
      vertices = calcBezierVertices(100,cps);
      keyFrames.pop();
      keyFrames.unshift(new SimpleLine(vertices));

      //numPoints = floor(random(3,20));
    }


    p.background(255);


    //draw the shape
    p.fill(0);
    p.noStroke();

    p.text("Constraining spread and movement of control points" ,20,20);
    p.translate(p.width/2, p.height/2);


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

  p.selectControlPoints = function(numPoints, spread)
  {
    let _cps = [];
    c_id += round(random(-5,5)); //floor(random(0,allPoints.length)); //starting id

    if(c_id < 0)
    {
      c_id += allPoints.length;
    }
    else if(c_id >= allPoints.length)
    {
      c_id -= allPoints.length;
    }

    for(let i = 0; i < numPoints; i++)
    {
      let pid = floor(c_id + i * spread)%allPoints.length;
      _cps.push(allPoints[pid]);
    }

    return shuffle(_cps);
  }




}); //3

definitions.push(function(p)
{
  let line;
  let thetas;
  let keyFrames;
  let env;
  let dur;
  let progress;
  let numPoints;
  let radius;
  let walk;


  p.setup = function()
  {
    p.createCanvas(256, 256).style('border','1px solid');

    keyFrames = [];
    numPoints = 20;
    thetas = [];
    radius = 100;
    walk = 0.25;

    for(let i = 0; i < numPoints; i++)
    {
      thetas.push(random(0,TWO_PI));
    }

    let cps = p.calculateControlPoints(thetas);
    let vertices = calcBezierVertices(100,cps);
    keyFrames.push(new SimpleLine(vertices));

    for(let i = 0; i < numPoints; i++)
    {
      thetas[i] += random(-walk,walk);
    }

    cps = p.calculateControlPoints(thetas);
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
      for(let i = 0; i < numPoints; i++)
      {
        thetas[i] += random(-walk,walk);
      }
      let cps = p.calculateControlPoints(thetas);
      let vertices = calcBezierVertices(100,cps);

      keyFrames.pop();
      keyFrames.unshift(new SimpleLine(vertices));

    }


    p.background(255);


    //draw the shape
    p.fill(0);
    p.noStroke();

    p.text("Random walking control points" ,20,20);
    p.translate(p.width/2, p.height/2);


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


  p.calculateControlPoints = function(_thetas)
  {
    let _cps = [];
    for(let i = 0; i < _thetas.length; i++)
    {
      _cps.push(createVector(sin(_thetas[i]) * radius, cos(_thetas[i]) * radius));
    }
    return _cps;
  }







}); //4

definitions.push(function(p)
{
  let line;
  let thetas;
  let keyFrames;
  let env;
  let dur;
  let progress;
  let numPoints;
  let radius;
  let walk;


  p.setup = function()
  {
    p.createCanvas(256, 256).style('border','1px solid');

    keyFrames = [];
    numPoints = 20;
    thetas = [];
    radius = 100;
    walk = 0.25;

    p.randomSeed(0);
    for(let i = 0; i < numPoints; i++)
    {
      thetas.push(noise(p.random() * 99999,p.frameCount) * TWO_PI * 2);
    }

    let cps = p.calculateControlPoints(thetas);
    let vertices = calcBezierVertices(100,cps);
    keyFrames.push(new SimpleLine(vertices));

    for(let i = 0; i < numPoints; i++)
    {
      thetas[i] += random(-walk,walk);
    }

    cps = p.calculateControlPoints(thetas);
    vertices = calcBezierVertices(100,cps);
    keyFrames.push(new SimpleLine(vertices));

    env = new EnvelopeData([0,1]);

    dur = 1;


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
      p.randomSeed(0);
      for(let i = 0; i < numPoints; i++)
      {

        thetas[i] = noise(p.random() * 99999,p.frameCount * 0.001) * TWO_PI * 2;
      }
      let cps = p.calculateControlPoints(thetas);
      let vertices = calcBezierVertices(100,cps);

      keyFrames.pop();
      keyFrames.unshift(new SimpleLine(vertices));

    }


    p.background(255);


    //draw the shape
    p.fill(0);
    p.noStroke();

    p.text("Using noise instead" ,20,20);
    p.translate(p.width/2, p.height/2);


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


  p.calculateControlPoints = function(_thetas)
  {
    let _cps = [];
    for(let i = 0; i < _thetas.length; i++)
    {
      _cps.push(createVector(sin(_thetas[i]) * radius, cos(_thetas[i]) * radius));
    }
    return _cps;
  }







}); //5

definitions.push(function(p)
{
  let line;
  let thetas;
  let keyFrames;
  let env;
  let dur;
  let progress;
  let numPoints;
  let radius;
  let cps;


  p.setup = function()
  {
    p.createCanvas(256, 256).style('border','1px solid');

    keyFrames = [];
    numPoints = 10;
    thetas = [];
    radius = 100;
    walk = 2;

    p.randomSeed(0);
    for(let i = 0; i < numPoints; i++)
    {
      thetas.push(noise(p.random() * 99999,p.frameCount) * TWO_PI * walk);
    }

    cps = p.calculateControlPoints(thetas);
    let vertices = calcBezierVertices(100,cps);
    keyFrames.push(new SimpleLine(vertices));

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
      p.randomSeed(0);
      for(let i = 0; i < numPoints; i++)
      {
        thetas[i] = noise(p.random() * 99999,p.frameCount * 0.001) * TWO_PI * walk;
      }
      cps = p.calculateControlPoints(thetas);
      let vertices = calcBezierVertices(100,cps);

      keyFrames.pop();
      keyFrames.unshift(new SimpleLine(vertices));

    }


    p.background(255);


    //draw the shape
    p.fill(0);
    p.noStroke();

    p.text("Spreading thetas" ,20,20);
    p.translate(p.width/2, p.height/2);

    // for(let i = 0; i < cps.length; i++)
    // {
    //   p.rect(cps[i].x,cps[i].y,5,5);
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


  p.calculateControlPoints = function(_thetas)
  {
    let _cps = [];
    let inc = radius/(thetas.length*2);

    for(let i = 0; i < _thetas.length; i++)
    {
      _cps.push(createVector(sin(_thetas[i]) * (radius - i * inc), cos(_thetas[i]) * (radius - i * inc)));
    }
    return _cps;
  }


}); //6

definitions.push(function(p)
{
  let line;
  let thetas;
  let keyFrames;
  let env;
  let dur;
  let progress;
  let numPoints;
  let radius;
  let cps;


  p.setup = function()
  {
    p.createCanvas(256, 256).style('border','1px solid');

    keyFrames = [];
    numPoints = 5;
    cps = [];
    radius = 100;
    walk = 2;

    p.randomSeed(0);
    for(let i = 0; i < numPoints; i++)
    {
      let x = map(noise(p.random() * 99999,p.frameCount * 0.01),0.25,0.75,-radius,radius);
      let y = map(noise(p.random() * 99999,p.frameCount * 0.01),0.25,0.75,-radius,radius);
      cps.push(createVector(x,y));
    }

    let vertices = calcBezierVertices(100,cps);
    keyFrames.push(new SimpleLine(vertices));

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
      cps = [];
      p.randomSeed(0);
      for(let i = 0; i < numPoints; i++)
      {
        let x = map(noise(p.random() * 99999,p.frameCount * 0.001),0.25,0.75,-radius,radius);
        let y = map(noise(p.random() * 99999,p.frameCount * 0.001),0.25,0.75,-radius,radius);
        cps.push(createVector(x,y));
      }
      let vertices = calcBezierVertices(100,cps);

      keyFrames.pop();
      keyFrames.unshift(new SimpleLine(vertices));

    }


    p.background(255);


    //draw the shape
    p.fill(0);
    p.noStroke();

    p.text("Noise mapped to cartesian" ,20,20);
    p.translate(p.width/2, p.height/2);

    // for(let i = 0; i < cps.length; i++)
    // {
    //   p.rect(cps[i].x,cps[i].y,5,5);
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


  p.calculateControlPoints = function(_thetas)
  {
    let _cps = [];
    let inc = radius/(thetas.length*2);

    for(let i = 0; i < _thetas.length; i++)
    {
      _cps.push(createVector(sin(_thetas[i]) * (radius - i * inc), cos(_thetas[i]) * (radius - i * inc)));
    }
    return _cps;
  }


}); //7

for(let i = 0; i < definitions.length; i++)
{
  instances.push(new p5(definitions[i]));
}
