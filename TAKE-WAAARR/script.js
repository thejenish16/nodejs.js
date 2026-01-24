function cal() {

  var a = +amt.value;
  var r = +rate.value;
  var y = +year.value;

  rv.innerText = r + "%";
  yv.innerText = y + " Yr";

  var m = r / 12 / 100;
  var n = y * 12;

  var emiVal = (a * m * Math.pow(1+m  , n)) / (Math.pow(1+m, n) - 1);
  var total = emiVal * n;
  var interest = total - a;

  emi.innerText = Math.round(emiVal);
  p.innerText = a;
  i.innerText = Math.round(interest);
  t.innerText = Math.round(total);

  draw(a, interest);
}

function draw(p, i){

  var c = chart.getContext("2d");
  var total = p + i;
  var ang = (p / total) * 2 * Math.PI;

  c.clearRect(0,0,200,200);

  c.beginPath();
  c.arc(100,100,80,0,ang);
  c.lineTo(100,100);
  c.fillStyle="#FF8C00";
  c.fill();

  c.beginPath();
  c.arc(100,100,80,ang,2*Math.PI);
  c.lineTo(100,100);
  c.fillStyle="#7FFF00";
  c.fill();

  c.beginPath();
  c.arc(100,100,40,0,2*Math.PI);
  c.fillStyle="#fff";
  c.fill();
}

amt.oninput = cal;
rate.oninput = cal;
year.oninput = cal;

cal();
