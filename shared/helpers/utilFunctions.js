////////////////////////////////// HELPER FUNCTIONS ////////////////////////

// Sine curves
function calcSineEnv(numPoints,start,end,mul=1,power=1,skew=1)
{
  //calculates a portion of a sine function as an envelope

  let d = [];
  let r = end - start;

  for(let i = 0; i < numPoints; i++)
  {
    let t = i/numPoints;
    t = pow(t,skew);
    let v = sin(start + t * r) * mul;
    d.push(v*abs(pow(v,power)));
  }

  return d;
}

function calcLinEnv(numPoints, values, durations, interpolation)
{
    //values is an array
    //durations is an array of one less length than values

    let d = [];
    normaliseSum(durations);
    normalise(values); // make sure we're dealing with 0 - 1 values

    for(let i = 0; i < durations.length; i++)
    {
      durations[i] *= numPoints;
      for(let j = 0; j < durations[i]; j++)
      {
        let t = j/durations[i];
        let va = values[i];
        let vb = values[i+1];


        let i_type = (Array.isArray(interpolation)) ? interpolation[i] : interpolation;

        if(typeof(i_type) == "number")
        {
          t = pow(t,i_type);
        }
        else if(i_type == "sine")
        {

        }

        let v = lerp(va,vb,t);

        d.push(v);
      }

    }

    return d;

}

function calcSplineEnv(numPoints,values,durations)
{
  normaliseSum(durations); // NB. do we want to do this ?

  let xs = [0];
  let total = 0;
  for(let i = 0; i < durations.length; i++)
  {
    total += durations[i];
    xs.push(total);
  }

  let ks = [];

  CSPL.getNaturalKs(xs, values, ks)	// in x values, in y values, out k value

  let d = [];
  let miny = 100;
  let maxy = -100;

  for(let i = 0; i < numPoints; i++)
  {
    let x = i/(numPoints - 1);
    let y = CSPL.evalSpline(x, xs, values, ks);
    d.push(y);


  }

  normalise(d);

  return d;

}


// Bezier curves
function calcBezierVertices(numPoints,controlPoints)
{
  //an arbitrary number of control points
  var d = [];
  for(let i = 0; i < numPoints; i++)
  {
    let t = i/(numPoints-1);

    let derivedVector  = deCasteljau(controlPoints,t);
    d.push(derivedVector);
  }
  return d;
}

function deCasteljau(vectors, t)
{
  //recursive algorithm to crunch bezier control points into a single vector
  let derivedVectors = [];

  for(let i = 0; i < vectors.length -1; i++)
  {
    derivedVectors.push(p5.Vector.lerp(vectors[i],vectors[i+1],t));
  }

  if(derivedVectors.length > 1)
  {
    return deCasteljau(derivedVectors,t);
  }
  else
  {
    return derivedVectors[0];
  }

}

//interpolation

function cubicInterpolate( a0, a1, a2, a3, p)
{

   var t0, t1, t2, t3, psq;

   psq = pow(p,2);
   t0 = a3 - a2 - a0 + a1;
   t1 = a0 - a1 - t0;
   t2 = a2 - a0;
   t3 = a1;

   return ( t0*p*psq + t1*psq + t2*p + t3 );
}



function normaliseSum(data)
{
  let t = 0;
  for(let i = 0; i < data.length; i++)
  {
    t += data[i];
  }

  for(let i = 0; i < data.length; i++)
  {
    data[i]/=t;
  }

  return data;

}

function normalise(data)
{

  let miny = Number.MAX_VALUE;
  let maxy = Number.MIN_VALUE;

  for(let i = 0; i < data.length; i++)
  {
    if(data[i] < miny)
    {
      miny = data[i];
    }

    if(data[i] > maxy)
    {
      maxy = data[i];
    }
  }

  let range = maxy - miny;

  for(let i = 0; i < data.length; i++)
  {
    data[i] /= range;
    data[i] -= miny; //shift back to zero
  }

}
