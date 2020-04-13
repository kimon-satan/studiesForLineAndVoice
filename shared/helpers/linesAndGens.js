///////////////Lines//////////////

class SimpleLine
{

  //a container for vertices - to be extended into other classes

  vertices;

  constructor(_vertices)
  {
    //data should be an array of values
    this.vertices = _vertices;

  }

  calcVertex(progress)
  {
    //progress should be values between 0 and 1
    progress = constrain(progress,0,1);
    var v = progress * this.vertices.length;
    var a = constrain(floor(v), 0, this.vertices.length -1);
    var remainder  = v - a;
    var b = constrain(a + 1, 0, this.vertices.length);

    return p5.Vector.lerp(this.vertices[a], this.vertices[b], remainder);
  }


}

class ShiftLine extends SimpleLine
{

  shiftVertex(vertex, offset)
  {
    for(let i = 0; i < this.vertices.length; i++)
    {
      this.vertices[i].add(offset);
    }

    this.vertices.shift();
    this.vertices.push(vertex);


  }


}

/////////////////////Generators /////////

class NoiseGen
{

  sampleVector;
  sampleCenter;
  sampleOffset;
  sampleInc; //move the noise by this vector
  sampleHeading;

  noiseAmp;

  constructor()
  {

    this.sampleCenter = createVector(random(0,99999), random(0,99999)); //start in a random position
    this.sampleVector = createVector(10,0);
    this.sampleOffset = p5.Vector.div(this.sampleVector, -2); // to draw the sample from the center
    this.sampleHeading = createVector(1,1);
    this.sampleInc = 0.05;
    this.noiseAmp = 50;

  }

  update()
  {
     this.sampleCenter.add(p5.Vector.mult(this.sampleHeading, this.sampleInc));
  }

  value(progress)
  {
    let np  = p5.Vector.mult(this.sampleVector, progress);
    np.add(this.sampleOffset); //set from the center

    let noiseVal = noise(
      this.sampleCenter.x + np.x,
      this.sampleCenter.y + np.y
    );

    let v = map(noiseVal,0.0,1.0,-this.noiseAmp, this.noiseAmp);

    return v;
  }

  setSampleTheta(theta)
  {
    let mag = this.sampleVector.mag();
    this.sampleVector.x = sin(theta);
    this.sampleVector.y = cos(theta);
    this.setSampleMagnitude(mag);
  }

  setSampleMagnitude(mag)
  {
    //println(mag);
    if(mag > 0)
    {
     this.sampleVector.setMag(mag);
     this.sampleOffset = p5.Vector.div(this.sampleVector, -2); // to draw the sample from the center
    }
  }

  setSampleHeading(theta)
  {
    //println(theta);
    this.sampleHeading.x = sin(theta);
    this.sampleHeading.y = cos(theta);
  }

  setSampleInc(inc)
  {
    this.sampleInc = inc;
  }



}

class SineGen
{
  //TODO add skewing functions ?

  freq;
  amp;
  phase;

  constructor(freq, amp, phase)
  {
    this.freq = freq;
    this.amp = amp;
    this.phase = phase;
  }

  update(phaseInc)
  {
    this.phase += phaseInc;
  }

  value(progress)
  {
    return sin(this.freq * progress * TWO_PI + this.phase) * this.amp;
  }

}
