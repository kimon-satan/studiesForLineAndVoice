////////////////////////////Envelopes and Triggers////////////////////////

class EnvelopeData
{
  //container for normalised curves for time-based applications
  //TODO: implement other types of interpolation
  data;

  constructor(_data)
  {
    //data should be an array of values
    this.data = _data;
  }

  lin_value(progress)
  {
    //progress should be values between 0 and 1
    progress = constrain(progress,0,1);
    var v = progress * (this.data.length -1);
    var a = constrain(floor(v), 0, this.data.length -1);
    var remainder  = v - a;
    var b = constrain(a + 1, 0, this.data.length -1);

    //linear interpolation only for now
    var l = lerp(this.data[a],this.data[b],remainder);
    return l;
  }


}

class Toggle
{
  upper_threshold;
  lower_threshold;
  z;
  a;
  b;
  isActive;
  toggle;

  constructor()
  {
    this.upper_threshold = 0.008 ;
    this.lower_threshold = 0.005;
    this.a = 0.95;
    this.b = 1 - this.a;
    this.z = 0;
    this.isActive = false;
    this.toggle = false;
  }

  process(input)
  {
    this.z = input * this.a + this.z * this.b; //debouncing with a onepole

    if(this.z > this.upper_threshold && !this.isActive)
    {
        this.toggle = !this.toggle;
        this.isActive = true;
    }
    else if(this.z < this.lower_threshold && this.isActive)
    {
      this.isActive = false;
    }

  }

}

class OnePole
{

  z;
  a;
  b;
  sampleRate;
  time;
  targetVal;

  constructor(time,sampleRate=60)
  {
    this.sampleRate = sampleRate;
    this.setTime(time);
    this.z = 0;
    this.targetVal = 0;
  }

  process()
  {
    if(this.targetVal == this.z)
    {
      return
    }
    else
    {
      this.z = this.targetVal * this.a + this.z * this.b;
    }
  }

  setTime(time)
  {
    this.time = time;
    this.b = Math.exp(-1.0/(this.time * this.sampleRate));
    this.a = 1.0 - this.b;

  }

  reset()
  {
    this.setTime(this.time);
    this.z = 0.0;
  }

}

class OnePole2
{

  z;
  a_att;
  b_att;
  a_dec;
  b_dec;
  sampleRate;
  attTime;
  decTime;
  targetVal;

  constructor(att,dec, sampleRate=60)
  {
    this.sampleRate = sampleRate;
    this.setAttDec(att,dec);
    this.z = 0;
    this.targetVal = 0;
  }

  process()
  {
    if(this.targetVal == this.z)
    {
      return
    }
    else if(this.targetVal < this.z)
    {
      this.z = this.targetVal * this.a_dec + this.z * this.b_dec;
    }
    else
    {
      this.z = this.targetVal * this.a_att + this.z * this.b_att;
    }
  }

  setAttDec(attTime, decTime)
  {
    this.attTime = attTime;
    this.decTime = decTime;
    this.b_att = Math.exp(-1.0/(attTime * this.sampleRate));
    this.a_att = 1.0 - this.b_att;
    this.b_dec = Math.exp(-1.0/(decTime * this.sampleRate));
    this.a_dec = 1.0 - this.b_dec;
  }

  reset()
  {
    this.setAttDel(this.attTime, this.decTime);
    this.z = 0.0;
  }

}
