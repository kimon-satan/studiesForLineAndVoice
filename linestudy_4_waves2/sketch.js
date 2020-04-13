/*
Waves

- create as many different wave scenes as possible using additive synthesis
- limit to two synths only ?
- no transitions or envelopes / fixed states only


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
  let sineGen_1;
  let sineGen_2;
  let inc_1;
  let inc_2;

  p.setup = function()
  {
    p.createCanvas(512, 256).style('border','1px solid');
    let vertices = [];

    for(let i = 0; i < 100; i++)
    {
      vertices.push(p.createVector(-p.width/2 + i * p.width/100,0));
    }
    line = new SimpleLine(vertices);

    sineGen_1 = new SineGen(0.5,50,0);
    sineGen_2 = new SineGen(0.75,10,0);

    inc_1 = 0.05;
    inc_2 = 0.2;
  };

  p.draw = function()
  {
    sineGen_1.update(inc_1);
    sineGen_2.update(inc_2);

    p.background(255);

    p.fill(0);
    p.noStroke();
    p.text("inc_1: " + inc_1, 20, 20);
    p.text("sineGen_1.amp: " + sineGen_1.amp, 20, 40);
    p.text("sineGen_1.freq: " + sineGen_1.freq, 20, 60);
    p.text("inc_2: " + inc_2, 200, 20);
    p.text("sineGen_2.amp: " + sineGen_2.amp, 200, 40);
    p.text("sineGen_2.freq: " + sineGen_2.freq, 200, 60);

    //draw the shape
    p.stroke(0);
    p.noFill();
    p.translate(p.width/2, p.height/2);

    p.beginShape();
    for(let i = 0; i < 512; i++)
    {
      let v = line.calcVertex(i/512);
      let y = (sineGen_1.value(i/512) * 0.5 + sineGen_2.value(i/512) * 0.5);
      p.vertex(v.x,v.y + y);
    }
    p.endShape();

  };
}); //1

definitions.push(function(p)
{
  let line;
  let sineGen_1;
  let sineGen_2;
  let inc_1;
  let inc_2;

  p.setup = function()
  {
    p.createCanvas(512, 256).style('border','1px solid');
    let vertices = [];

    for(let i = 0; i < 100; i++)
    {
      vertices.push(p.createVector(-p.width/2 + i * p.width/100,0));
    }
    line = new SimpleLine(vertices);

    sineGen_1 = new SineGen(0.5,50,0);
    sineGen_2 = new SineGen(1.5,10,0);

    inc_1 = 0.05;
    inc_2 = 0.23;
  };

  p.draw = function()
  {

    sineGen_1.update(inc_1);
    sineGen_2.update(inc_2);

    p.background(255);

    p.fill(0);
    p.noStroke();
    p.text("inc_1: " + inc_1, 20, 20);
    p.text("sineGen_1.amp: " + sineGen_1.amp, 20, 40);
    p.text("sineGen_1.freq: " + sineGen_1.freq, 20, 60);
    p.text("inc_2: " + inc_2, 200, 20);
    p.text("sineGen_2.amp: " + sineGen_2.amp, 200, 40);
    p.text("sineGen_2.freq: " + sineGen_2.freq, 200, 60);

    //draw the shape
    p.stroke(0);
    p.noFill();
    p.translate(p.width/2, p.height/2);

    p.beginShape();
    for(let i = 0; i < 512; i++)
    {
      let v = line.calcVertex(i/512);
      let y = (sineGen_1.value(i/512) * 0.5 + sineGen_2.value(i/512) * 0.5);
      p.vertex(v.x,v.y + y);
    }
    p.endShape();

  };

}); //2

definitions.push(function(p)
{
  let line;
  let sineGen_1;
  let sineGen_2;
  let inc_1;
  let inc_2;

  p.setup = function()
  {
    p.createCanvas(512, 256).style('border','1px solid');
    let vertices = [];

    for(let i = 0; i < 100; i++)
    {
      vertices.push(p.createVector(-p.width/2 + i * p.width/100,0));
    }
    line = new SimpleLine(vertices);

    sineGen_1 = new SineGen(0.5,50,0);
    sineGen_2 = new SineGen(0.5,50,0);

    inc_1 = 0.2;
    inc_2 = 0.25;
  };

  p.draw = function()
  {

    sineGen_1.update(inc_1);
    sineGen_2.update(inc_2);

    p.background(255);

    p.fill(0);
    p.noStroke();
    p.text("inc_1: " + inc_1, 20, 20);
    p.text("sineGen_1.amp: " + sineGen_1.amp, 20, 40);
    p.text("sineGen_1.freq: " + sineGen_1.freq, 20, 60);
    p.text("inc_2: " + inc_2, 200, 20);
    p.text("sineGen_2.amp: " + sineGen_2.amp, 200, 40);
    p.text("sineGen_2.freq: " + sineGen_2.freq, 200, 60);

    //draw the shape
    p.stroke(0);
    p.noFill();
    p.translate(p.width/2, p.height/2);

    p.beginShape();
    for(let i = 0; i < 512; i++)
    {
      let v = line.calcVertex(i/512);
      let y = (sineGen_1.value(i/512) * 0.5 + sineGen_2.value(i/512) * 0.5);
      p.vertex(v.x,v.y + y);
    }
    p.endShape();

  };

}); //3

definitions.push(function(p)
{
  let line;
  let sineGen_1;
  let sineGen_2;
  let inc_1;
  let inc_2;

  p.setup = function()
  {
    p.createCanvas(512, 256).style('border','1px solid');
    let vertices = [];

    for(let i = 0; i < 100; i++)
    {
      vertices.push(p.createVector(-p.width/2 + i * p.width/100,0));
    }
    line = new SimpleLine(vertices);

    sineGen_1 = new SineGen(0.5,50,0);
    sineGen_2 = new SineGen(0.47,20,0);

    inc_1 = 0.1;
    inc_2 = 0.25;
  };

  p.draw = function()
  {

    sineGen_1.update(inc_1);
    sineGen_2.update(inc_2);

    p.background(255);

    p.fill(0);
    p.noStroke();
    p.text("inc_1: " + inc_1, 20, 20);
    p.text("sineGen_1.amp: " + sineGen_1.amp, 20, 40);
    p.text("sineGen_1.freq: " + sineGen_1.freq, 20, 60);
    p.text("inc_2: " + inc_2, 200, 20);
    p.text("sineGen_2.amp: " + sineGen_2.amp, 200, 40);
    p.text("sineGen_2.freq: " + sineGen_2.freq, 200, 60);

    //draw the shape
    p.stroke(0);
    p.noFill();
    p.translate(p.width/2, p.height/2);

    p.beginShape();
    for(let i = 0; i < 512; i++)
    {
      let v = line.calcVertex(i/512);
      let y = (sineGen_1.value(i/512) * 0.5 + sineGen_2.value(i/512) * 0.5);
      p.vertex(v.x,v.y + y);
    }
    p.endShape();

  };

}); //4

definitions.push(function(p)
{
  let line;
  let sineGen_1;
  let sineGen_2;
  let inc_1;
  let inc_2;

  p.setup = function()
  {
    p.createCanvas(512, 256).style('border','1px solid');
    let vertices = [];

    for(let i = 0; i < 100; i++)
    {
      vertices.push(p.createVector(-p.width/2 + i * p.width/100,0));
    }
    line = new SimpleLine(vertices);

    sineGen_1 = new SineGen(0.5,50,0);
    sineGen_2 = new SineGen(2,10,0);

    inc_1 = 0.1;
    inc_2 = 0.5;
  };

  p.draw = function()
  {

    sineGen_1.update(inc_1);
    sineGen_2.update(inc_2);

    p.background(255);

    p.fill(0);
    p.noStroke();
    p.text("inc_1: " + inc_1, 20, 20);
    p.text("sineGen_1.amp: " + sineGen_1.amp, 20, 40);
    p.text("sineGen_1.freq: " + sineGen_1.freq, 20, 60);
    p.text("inc_2: " + inc_2, 200, 20);
    p.text("sineGen_2.amp: " + sineGen_2.amp, 200, 40);
    p.text("sineGen_2.freq: " + sineGen_2.freq, 200, 60);

    //draw the shape
    p.stroke(0);
    p.noFill();
    p.translate(p.width/2, p.height/2);

    p.beginShape();
    for(let i = 0; i < 512; i++)
    {
      let v = line.calcVertex(i/512);
      let y = (sineGen_1.value(i/512) * 0.5 + sineGen_2.value(i/512) * 0.5);
      p.vertex(v.x,v.y + y);
    }
    p.endShape();

  };

}); //5

definitions.push(function(p)
{
  let line;
  let sineGen_1;
  let sineGen_2;
  let inc_1;
  let inc_2;

  p.setup = function()
  {
    p.createCanvas(512, 256).style('border','1px solid');
    let vertices = [];

    for(let i = 0; i < 100; i++)
    {
      vertices.push(p.createVector(-p.width/2 + i * p.width/100,0));
    }
    line = new SimpleLine(vertices);

    sineGen_1 = new SineGen(0.5,200,0);
    sineGen_2 = new SineGen(2,10,0);

    inc_1 = 0.01;
    inc_2 = 0.5;
  };

  p.draw = function()
  {

    sineGen_1.update(inc_1);
    sineGen_2.update(inc_2);

    p.background(255);

    p.fill(0);
    p.noStroke();
    p.text("inc_1: " + inc_1, 20, 20);
    p.text("sineGen_1.amp: " + sineGen_1.amp, 20, 40);
    p.text("sineGen_1.freq: " + sineGen_1.freq, 20, 60);
    p.text("inc_2: " + inc_2, 200, 20);
    p.text("sineGen_2.amp: " + sineGen_2.amp, 200, 40);
    p.text("sineGen_2.freq: " + sineGen_2.freq, 200, 60);

    //draw the shape
    p.stroke(0);
    p.noFill();
    p.translate(p.width/2, p.height/2);

    p.beginShape();
    for(let i = 0; i < 512; i++)
    {
      let v = line.calcVertex(i/512);
      let y = (sineGen_1.value(i/512) * 0.5 + sineGen_2.value(i/512) * 0.5);
      p.vertex(v.x,v.y + y);
    }
    p.endShape();

  };

}); //6

definitions.push(function(p)
{
  let line;
  let sineGen_1;
  let sineGen_2;
  let inc_1;
  let inc_2;

  p.setup = function()
  {
    p.createCanvas(512, 256).style('border','1px solid');
    let vertices = [];

    for(let i = 0; i < 100; i++)
    {
      vertices.push(p.createVector(-p.width/2 + i * p.width/100,0));
    }
    line = new SimpleLine(vertices);

    sineGen_1 = new SineGen(0.5,200,0);
    sineGen_2 = new SineGen(3,10,0);

    inc_1 = 0.02;
    inc_2 = 1;
  };

  p.draw = function()
  {

    sineGen_1.update(inc_1);
    sineGen_2.update(inc_2);

    p.background(255);

    p.fill(0);
    p.noStroke();
    p.text("inc_1: " + inc_1, 20, 20);
    p.text("sineGen_1.amp: " + sineGen_1.amp, 20, 40);
    p.text("sineGen_1.freq: " + sineGen_1.freq, 20, 60);
    p.text("inc_2: " + inc_2, 200, 20);
    p.text("sineGen_2.amp: " + sineGen_2.amp, 200, 40);
    p.text("sineGen_2.freq: " + sineGen_2.freq, 200, 60);

    //draw the shape
    p.stroke(0);
    p.noFill();
    p.translate(p.width/2, p.height/2);

    p.beginShape();
    for(let i = 0; i < 512; i++)
    {
      let v = line.calcVertex(i/512);
      let y = (sineGen_1.value(i/512) * 0.5 + sineGen_2.value(i/512) * 0.5);
      p.vertex(v.x,v.y + y);
    }
    p.endShape();

  };

}); //7

definitions.push(function(p)
{
  let line;
  let sineGen_1;
  let sineGen_2;
  let sineGen_3;
  let inc_1;
  let inc_2;

  p.setup = function()
  {
    p.createCanvas(512, 256).style('border','1px solid');
    let vertices = [];

    for(let i = 0; i < 100; i++)
    {
      vertices.push(p.createVector(-p.width/2 + i * p.width/100,0));
    }
    line = new SimpleLine(vertices);

    sineGen_1 = new SineGen(0.5,200,0);
    sineGen_2 = new SineGen(3,10,0);
    sineGen_3 = new SineGen(0.5,0.75,0);

    inc_1 = 0.04;
    inc_2 = -0.75;
  };

  p.draw = function()
  {

    sineGen_1.update(inc_1);

    sineGen_3.update(0.01);
    inc_2 = sineGen_3.value(0);
    sineGen_2.update(inc_2);

    p.background(255);

    p.fill(0);
    p.noStroke();
    p.text("inc_1: " + inc_1, 20, 20);
    p.text("sineGen_1.amp: " + sineGen_1.amp, 20, 40);
    p.text("sineGen_1.freq: " + sineGen_1.freq, 20, 60);
    p.text("inc_2: " + inc_2, 200, 20);
    p.text("sineGen_2.amp: " + sineGen_2.amp, 200, 40);
    p.text("sineGen_2.freq: " + sineGen_2.freq, 200, 60);

    //draw the shape
    p.stroke(0);
    p.noFill();
    p.translate(p.width/2, p.height/2);

    p.beginShape();
    for(let i = 0; i < 512; i++)
    {
      let v = line.calcVertex(i/512);
      let y = (sineGen_1.value(i/512) * 0.5 + sineGen_2.value(i/512) * 0.5);
      p.vertex(v.x,v.y + y);
    }
    p.endShape();

  };

}); //8

definitions.push(function(p)
{
  let line;
  let sineGen_1;
  let sineGen_2;
  let inc_1;
  let inc_2;

  p.setup = function()
  {
    p.createCanvas(512, 256).style('border','1px solid');
    let vertices = [];

    for(let i = 0; i < 100; i++)
    {
      vertices.push(p.createVector(-p.width/2 + i * p.width/100,0));
    }
    line = new SimpleLine(vertices);

    sineGen_1 = new SineGen(0.5,75,0);
    sineGen_2 = new SineGen(0.5,75,0);

    inc_1 = 0.2;
    inc_2 = -0.25;
  };

  p.draw = function()
  {

    sineGen_1.update(inc_1);
    sineGen_2.update(inc_2);

    p.background(255);

    p.fill(0);
    p.noStroke();
    p.text("inc_1: " + inc_1, 20, 20);
    p.text("sineGen_1.amp: " + sineGen_1.amp, 20, 40);
    p.text("sineGen_1.freq: " + sineGen_1.freq, 20, 60);
    p.text("inc_2: " + inc_2, 200, 20);
    p.text("sineGen_2.amp: " + sineGen_2.amp, 200, 40);
    p.text("sineGen_2.freq: " + sineGen_2.freq, 200, 60);

    //draw the shape
    p.stroke(0);
    p.noFill();
    p.translate(p.width/2, p.height/2);

    p.beginShape();
    for(let i = 0; i < 512; i++)
    {
      let v = line.calcVertex(i/512);
      let y = (sineGen_1.value(i/512) * 0.5 + sineGen_2.value(i/512) * 0.5);
      p.vertex(v.x,v.y + y);
    }
    p.endShape();

  };

}); //9

for(let i = 0; i < definitions.length; i++)
{
  instances.push(new p5(definitions[i]));
}
