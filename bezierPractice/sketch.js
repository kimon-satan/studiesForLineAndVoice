let controlPoints;
let ratios;
let sliders;

function setup()
{

  createCanvas(512,512);

  controlPoints = [
    createVector(-100,100),
    createVector(-100,-100),
    createVector(100,-100),
    createVector(100,100)
  ];


  ratios = [0.1,1,1,0.1];
  normaliseSum(ratios);

  sliders = [];

  for(let i = 0; i < ratios.length; i++)
  {
    sliders.push(createSlider(0, 2, ratios[i], 0.01));
    sliders[i].position(10, 10 + 20 * i);
    sliders[i].style('width', '80px');
  }


}

function draw()
{

  for(let i = 0; i < ratios.length; i++)
  {
    ratios[i] = sliders[i].value();
  }
  normaliseSum(ratios);

  background(51);
  push();
  translate(width/2, height/2);
  stroke(255);
  noFill();

  beginShape();
  for(let i = 0; i < 100; i++)
  {
    let v = calcBezierVertex(i/(100-1), controlPoints, ratios);
    vertex(v.x,v.y);
  }

  endShape();
  pop();

}
