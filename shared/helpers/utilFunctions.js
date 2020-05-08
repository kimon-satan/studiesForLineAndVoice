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
function calcBezierVertices(numPoints,controlPoints,ratios=null)
{
  //an arbitrary number of control points
  var d = [];

  for(let i = 0; i < numPoints; i++)
  {
    let t = i/(numPoints-1);

    if(ratios === null)
    {
      let derivedVector  = deCasteljau(t,controlPoints);
      d.push(derivedVector);
    }
    else
    {
      let derivedVector = calcBezierVertex(t,controlPoints,ratios);
      d.push(derivedVector);
    }
  }
  return d;
}

function calcBezierVertex(t,controlPoints,ratios=null)
{

    let n = controlPoints.length-1;
    let v = createVector(0,0);
    let xs = [];
    let ys = [];

    for(let i = 0; i < controlPoints.length; i++)
    {
      xs.push(controlPoints[i].x);
      ys.push(controlPoints[i].y);
    }

    if(ratios != null)
    {
      console.assert(controlPoints.length == ratios.length, "controlPoints.length != ratios.length");
      v.x = getRationalBezierValue(n,t,xs,ratios);
      v.y = getRationalBezierValue(n,t,ys,ratios);
    }
    else
    {
      v.x = getBezierValue(n,t,xs);
      v.y = getBezierValue(n,t,ys);
    }

    return v;
}



let pascalLookUp  = [
             [1],           // n=0
            [1,1],          // n=1
           [1,2,1],         // n=2
          [1,3,3,1],        // n=3
         [1,4,6,4,1],       // n=4
        [1,5,10,10,5,1],    // n=5
       [1,6,15,20,15,6,1]   // n=6
];

function binomial(n,k)
{
  //expand table if necessary
  while(n >= pascalLookUp.length)
  {
    let s = pascalLookUp.length;
    let nextRow = new Array(s+1);
    nextRow[0] = 1;
    for(let i=1, prev=s-1; i<s; i++)
    {
      nextRow[i] = pascalLookUp[prev][i-1] + pascalLookUp[prev][i];
    }
    nextRow[s] = 1;
    pascalLookUp.push(nextRow);
  }

  return pascalLookUp[n][k];
}

function getBezierValue(n,t,w)
{
  let sum = 0;
  for(let k=0; k<=n; k++)
  {
    sum += w[k] * binomial(n,k) * (1-t)**(n-k) * t**k;
  }
  return sum;
}

function getRationalBezierValue(n,t,w,r)
{
  let f = [];

  for(let k=0; k<=n; k++)
  {
    f.push(r[k] * binomial(n,k) * (1-t)**(n-k) * t**k);
  }

  let basis = 0;
  let sum = 0;

  for(let i = 0; i < f.length; i++)
  {
    basis += f[i];
    sum += f[i] * w[i];
  }
  return sum/basis;
}



function deCasteljau(t, vectors)
{
  //recursive algorithm to crunch bezier control points into a single vector
  let derivedVectors = [];

  for(let i = 0; i < vectors.length -1; i++)
  {
    derivedVectors.push(p5.Vector.lerp(vectors[i],vectors[i+1],t));
  }

  if(derivedVectors.length > 1)
  {
    return deCasteljau(t,derivedVectors);
  }
  else
  {
    return derivedVectors[0];
  }

}

function calcCatmullRomControlPoints(a,b,va,vb,t)
{

 //https://stackoverflow.com/questions/34894837/how-to-get-connect-two-part-of-curve-and-get-the-points-position-of-connecting-c
/*

    start point: a (p2)
    control point 1: a + (b-p1)/(6*t)
    control point 2: b - (p4-a)/(6*t)
    end point: b (p3)

    t = tightness could be one
*/
  let distance = p5.Vector.dist(a, b);


  //calc p1 & p4
  va.setMag(distance);
  va.mult(-1);
  vb.setMag(distance);
  vb.mult(-1);
  let p1 = p5.Vector.add(b,va);
  let p4 = p5.Vector.add(a,vb);

  let controlPoints = [];

  controlPoints.push(a);

  let cp_1 = p5.Vector.sub(b,p1);
  cp_1.div(6 * t);
  cp_1.add(a);
  controlPoints.push(cp_1);

  let cp_2 = p5.Vector.sub(p4,a);
  cp_2.div(6 * t);
  cp_2 = p5.Vector.sub(b,cp_2);
  controlPoints.push(cp_2);

  controlPoints.push(b);

  return controlPoints;

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

function myShuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function choose(array, numItems, unique=true)
{
  const c_array = [...array]; //make a copy - WARNING one level deep only !
  const n_array = [];

  for(let i = 0; i < numItems; i++)
  {
    let idx = floor(random(0,c_array.length));
    if(unique)
    {
      let e = c_array.splice(idx,1);
      n_array.push(e[0]);
    }
    else
    {
      n_array.push(c_array[idx]);
    }
  }

  if(numItems > 1)
  {
    return n_array;
  }
  else
  {
    return n_array[0];
  }

}
