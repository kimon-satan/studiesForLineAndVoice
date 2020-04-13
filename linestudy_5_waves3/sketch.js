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
  let sineGen;
  let squareGen;
  let inc_1;
  let inc_2;

  p.setup = function()
  {
    p.createCanvas(256, 256).style('border','1px solid');


    vertices = [];

    for(let i = 0; i < 512; i++)
    {
      vertices.push(createVector(-p.width/2 + p.width * i/512, 0));
    }

    line = new SimpleLine(vertices);

    sineGen = new SineGen(0.75,50,0);
    squareGen = new SquareGen(1,100,0.75);

    inc_1 = 0.05;
    inc_2 = 0;
  };

  p.draw = function()
  {
    sineGen.update(inc_1);
    squareGen.update(inc_2);

    p.background(255);


    //draw the shape
    p.stroke(0);
    p.noFill();
    p.translate(p.width/2, p.height/2);

    p.beginShape();


    for(let i = 0; i < 512; i++)
    {
      let v = line.calcVertex(i/512);

      let s = sineGen.value(i/512) * 0.5 + squareGen.value(i/512) * 0.5;

      v.y += s;

      p.vertex(v.x, v.y);



    }
    p.endShape();

  };

}); //1

definitions.push(function(p)
{
  let line;
  let sineGen;
  let squareGen;
  let inc_1;
  let inc_2;

  p.setup = function()
  {
    p.createCanvas(256, 256).style('border','1px solid');


    vertices = [];

    for(let i = 0; i < 512; i++)
    {
      vertices.push(createVector(-p.width/2 + p.width * i/512, 0));
    }

    line = new SimpleLine(vertices);

    sineGen = new SineGen(0.75,50,0);
    squareGen = new SquareGen(1,100,0.75);

    inc_1 = 0.05;
    inc_2 = 0.00;
  };

  p.draw = function()
  {
    sineGen.update(inc_1);
    squareGen.update(inc_2);

    p.background(255);


    //draw the shape
    p.stroke(0);
    p.noFill();
    p.translate(p.width/2, p.height/2);

    p.beginShape();


    for(let i = 0; i < 512; i++)
    {
      let v = line.calcVertex(i/512);

      let s = min(sineGen.value(i/512), squareGen.value(i/512));

      v.y += s;

      p.vertex(v.x, v.y);



    }
    p.endShape();

  };

}); //2

definitions.push(function(p)
{
  let line;
  let sineGen;
  let squareGen;
  let inc_1;
  let inc_2;

  p.setup = function()
  {
    p.createCanvas(256, 256).style('border','1px solid');


    vertices = [];

    for(let i = 0; i < 512; i++)
    {
      vertices.push(createVector(-p.width/2 + p.width * i/512, 0));
    }

    line = new SimpleLine(vertices);

    sineGen = new SineGen(1,20,0);
    squareGen = new SquareGen(5,20,0);

    inc_1 = -0.01;
    inc_2 = 0.01;
  };

  p.draw = function()
  {
    sineGen.update(inc_1);
    squareGen.update(inc_2);

    p.background(255);


    //draw the shape
    p.stroke(0);
    p.noFill();
    p.translate(p.width/2, p.height/2);

    p.beginShape();


    for(let i = 0; i < 512; i++)
    {
      let v = line.calcVertex(i/512);

      let s = max(sineGen.value(i/512), squareGen.value(i/512));

      v.y += s;

      p.vertex(v.x, v.y);



    }
    p.endShape();

  };

}); //3

definitions.push(function(p)
{
  let line;
  let squareGen;
  let squareGen2;
  let inc_1;
  let inc_2;

  p.setup = function()
  {
    p.createCanvas(256, 256).style('border','1px solid');


    vertices = [];

    for(let i = 0; i < 512; i++)
    {
      vertices.push(createVector(-p.width/2 + p.width * i/512, 0));
    }

    line = new SimpleLine(vertices);

    squareGen = new SquareGen(0.4,20,0);
    squareGen2 = new SquareGen(0.5,20,0);

    inc_1 = 0.002;
    inc_2 = 0.01;
  };

  p.draw = function()
  {
    squareGen.update(inc_1);
    squareGen2.update(inc_2);

    p.background(255);


    //draw the shape
    p.stroke(0);
    p.noFill();
    p.translate(p.width/2, p.height/2);

    p.beginShape();


    for(let i = 0; i < 512; i++)
    {
      let v = line.calcVertex(i/512);

      let s = squareGen.value(i/512) + squareGen2.value(i/512);

      v.y += s;

      p.vertex(v.x, v.y);



    }
    p.endShape();

  };

}); //4

definitions.push(function(p)
{
  let line;
  let squareGen;
  let squareGen2;
  let sineGen;
  let inc_1;
  let inc_2;
  let inc_3;

  p.setup = function()
  {
    p.createCanvas(256, 256).style('border','1px solid');


    vertices = [];

    for(let i = 0; i < 512; i++)
    {
      vertices.push(createVector(-p.width/2 + p.width * i/512, 0));
    }

    line = new SimpleLine(vertices);

    squareGen = new SquareGen(0.4,20,0);
    squareGen2 = new SquareGen(1,20,0);
    sineGen = new SineGen(0.5,30,0);

    inc_1 = 0.002;
    inc_2 = 0.01;
    inc_3 = 0.01;
  };

  p.draw = function()
  {
    squareGen.update(inc_1);
    squareGen2.update(inc_2);
    sineGen.update(inc_3);

    p.background(255);


    //draw the shape
    p.stroke(0);
    p.noFill();
    p.translate(p.width/2, p.height/2);

    p.beginShape();


    for(let i = 0; i < 512; i++)
    {
      let v = line.calcVertex(i/512);

      let s = squareGen.value(i/512) + squareGen2.value(i/512) + sineGen.value(i/512);

      v.y += s;

      p.vertex(v.x, v.y);



    }
    p.endShape();

  };

}); //5

definitions.push(function(p)
{
  let line;
  let squareGen;
  let sineGen;
  let sineGen2;
  let inc_1;
  let inc_2;
  let inc_3;

  p.setup = function()
  {
    p.createCanvas(256, 256).style('border','1px solid');


    vertices = [];

    for(let i = 0; i < 512; i++)
    {
      vertices.push(createVector(-p.width/2 + p.width * i/512, 0));
    }

    line = new SimpleLine(vertices);

    squareGen = new SquareGen(2,100,0.25);
    sineGen = new SineGen(0.5,20,0);
    sineGen2 = new SineGen(0.5,10,0);

    inc_1 = 0;
    inc_2 = 0.1;
    inc_3 = -0.05;
  };

  p.draw = function()
  {
    squareGen.update(inc_1);

    sineGen.update(inc_2);
    sineGen2.update(inc_3);

    p.background(255);


    //draw the shape
    p.stroke(0);
    p.noFill();
    p.translate(p.width/2, p.height/2);

    p.beginShape();


    for(let i = 0; i < 512; i++)
    {
      let v = line.calcVertex(i/512);


      let s = min(sineGen.value(i/512), squareGen.value(i/512) + sineGen2.value(i/512));

      v.y += s;

      p.vertex(v.x, v.y);



    }
    p.endShape();

  };

}); //6

definitions.push(function(p)
{
  let line;
  let squareGen;
  let sineGen;
  let sineGen2;
  let inc_1;
  let inc_2;
  let inc_3;

  p.setup = function()
  {
    p.createCanvas(256, 256).style('border','1px solid');


    vertices = [];

    for(let i = 0; i < 512; i++)
    {
      vertices.push(createVector(-p.width/2 + p.width * i/512, 0));
    }

    line = new SimpleLine(vertices);

    squareGen = new SquareGen(2,100,0.25);
    sineGen = new SineGen(0.5,20,0);
    sineGen2 = new SineGen(5,2,0);

    inc_1 = 0;
    inc_2 = 0.1;
    inc_3 = -0.2;
  };

  p.draw = function()
  {
    squareGen.update(inc_1);

    sineGen.update(inc_2);
    sineGen2.update(inc_3);

    p.background(255);


    //draw the shape
    p.stroke(0);
    p.noFill();
    p.translate(p.width/2, p.height/2);


    let pv;

    p.beginShape();


    for(let i = 1; i < 512; i++)
    {
      let v = line.calcVertex(i/512);


      let s = min(sineGen.value(i/512),squareGen.value(i/512));

      if(s != squareGen.value(i-1/512))
      {
        v.x += sineGen2.value(i/512);
      }
      else
      {
        s += sineGen2.value(i/512);
      }


      v.y += s;

      p.vertex(v.x, v.y);


      pv = v;

    }
    p.endShape();

  };

}); //7 - NB. the square wave has no points on the vertical so this approach doesn't really work



for(let i = 0; i < definitions.length; i++)
{
  instances.push(new p5(definitions[i]));
}
