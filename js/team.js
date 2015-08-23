function Team()
{
  for(var i=0;i<50;i++)
  {
    this.guys[i]= new Person();
  }

  this.report = game.add.sprite(400,800,"report");
  this.report.anchor.set(0.5,0.5);

  bmd = game.add.bitmapData(256,128);
  rep = game.add.sprite(0, 0, bmd);
  rep.anchor.set(0.5);

  rep.position.set(400,800);

  var repTween = game.add.tween(this.report.position).from({y:800},1).to({y: 450}, 500, Phaser.Easing.Quadratic.In,true);
  var rep2Tween = game.add.tween(rep.position).from({y:800},1).to({y: 450}, 500, Phaser.Easing.Quadratic.In,true);
  var tween = game.add.tween(this.guys[this.actual].guy.position).from({x:1200},1).to({x: 400}, 500, Phaser.Easing.Quadratic.In,true);
  this.guys[this.actual].visible(true);

  this.drawRep();
}

Team.prototype.guys = [];
Team.prototype.actual = 0;
Team.prototype.report = null;
Team.prototype.stress = 0;
Team.prototype.tempStress = 0;

Team.prototype.next = function()
{
  var nex;
  nex = this.actual+1;

  if(this.actual+1 >= this.guys.length)
  {
    this.endOfDay();
    this.actual = 0;
  }

  var tween = game.add.tween(this.guys[this.actual].guy.position).to({x: -400}, 500, Phaser.Easing.Quadratic.Out,true);
  this.guys[nex].visible(true);
  var tween2 = game.add.tween(this.guys[nex].guy.position).from({x:1200},1).to({x: 400}, 500, Phaser.Easing.Quadratic.In,true);

  this.actual++;

  this.nextRep();
  console.log(this.actual);
}

Team.prototype.fire = function()
{
  if(running)
  {
    this.tempStress += 5;
  
    if(this.guys.length ==0 || this.actual+1 >= this.guys.length)
    {
      this.endOfDay();
      this.actual = 0;
    }
  
    var tween = game.add.tween(this.guys[this.actual].guy.position).to({y: -800}, 500, Phaser.Easing.Quadratic.Out,true);
    this.guys[this.actual+1].visible(true);
    var tween2 = game.add.tween(this.guys[this.actual+1].guy.position).from({x:1200},1).to({x: 400}, 500, Phaser.Easing.Quadratic.In,true);
    this.guys.splice(this.actual,1);
  
    this.nextRep();

    workersText.text = "Workers: " + this.guys.length;
    console.log(this.actual);
  }
}

Team.prototype.nextRep = function()
{
  var tween = game.add.tween(this.report.position).to({y: 800}, 250, Phaser.Easing.Quadratic.Out,true);
  var tween2 = game.add.tween(rep.position).to({y: 800}, 250, Phaser.Easing.Quadratic.Out,true);
  tween.onComplete.add(this.nextRepCom,this);
}

Team.prototype.nextRepCom = function()
{
  game.add.tween(this.report.position).to({y: 450}, 250, Phaser.Easing.Quadratic.In,true);
  game.add.tween(rep.position).to({y: 450}, 250, Phaser.Easing.Quadratic.In,true);

  this.drawRep();
}

Team.prototype.drawRep = function()
{
  var wo = this.guys[this.actual].work;
  var min = (wo.length-5) < 0 ? 0 : (wo.length-5);

  bmd.clear();
  bmd.ctx.beginPath();
  bmd.ctx.moveTo(25,64);

  for(var i =min+1;i<wo.length;i++)
  {
    //bmd.ctx.beginPath();
    if(wo[i] > 0) bmd.ctx.strokeStyle = "green";
    else bmd.ctx.strokeStyle = "red";
    bmd.ctx.lineTo(25+i*32, 64 - wo[i]*36);
    bmd.ctx.lineWidth = 2;
    bmd.ctx.stroke();
    //bmd.ctx.closePath();
    
  }
  bmd.ctx.closePath();
  bmd.render();
}

Team.prototype.praise = function()
{
  if(running)
  {
    this.guys[this.actual].mood = -0.1;
    this.guys[this.actual].stress *= 1.1;
    this.next();
  }
}

Team.prototype.threaten = function()
{
  if(running)
  {
    this.guys[this.actual].mood = 1.5;
    this.guys[this.actual].stress *= 1.8;
    this.next();
  }
}

Team.prototype.endOfDay = function()
{
  this.stress = this.tempStress;

  for(var i=0;i<this.guys.length;i++)
  {
    this.guys[i].stress *= 1.2;
    this.stress += this.guys[i].stress;
  }

  this.stress /= (this.guys.length+1);

  game.add.tween(this.guys[this.actual].guy.position).to({x: -400}, 500, Phaser.Easing.Quadratic.Out,true);
  game.add.tween(this.report.position).to({y: 800}, 250, Phaser.Easing.Quadratic.Out,true);
  game.add.tween(rep.position).to({y: 800}, 250, Phaser.Easing.Quadratic.Out,true);

  var tween = game.add.tween(b2Group.position).to({y: 0}, 250, Phaser.Easing.Quadratic.In,true);
  tween.onComplete.add(this.definitiveEnd,this);
}

Team.prototype.definitiveEnd = function()
{
  var income = this.guys.length * -200;
  for(var i = 0;i<this.guys.length;i++)
  {
    var g = this.guys[i];
    this.guys[i].stress += this.stress;
    this.guys[i].stress /= 2;

    income += g.work[g.work.length-1] * 250;

    g.work[g.work.length] = g.work[g.work.length-1] + (Math.random() * g.mood) - g.stress/100;
    if(g.work[g.work.length]> 1) g.work[g.work.length] = 1;
    if(g.work[g.work.length] < -1) g.work[g.work.length] = -1;

    g.mood -= 0.2;
    if(g.mood < 0.01) g.mood = 0.01;
  }

  money += income;
  this.tempStress = 0;

  moneyText.text = "Money: " + parseInt(money);
  stressText.text = "Stress: " + parseInt(this.stress) + "%";
  incomeText.text = "Income: " + parseInt(income);
  
  if(Math.random() * 100 < this.stress)
  {
    if(this.stress >= 20 )
    {
      this.guys.splice(parseInt(Math.random() * this.guys.length),1);
    }
    if(this.stress >= 45)
    {
      this.guys.splice(parseInt(Math.random() * this.guys.length),1);
      this.guys.splice(parseInt(Math.random() * this.guys.length),1);
    }
    if(this.stress >= 60)
    {
      this.guys.splice(parseInt(Math.random() * this.guys.length),1);
      this.guys.splice(parseInt(Math.random() * this.guys.length),1);
      this.guys.splice(parseInt(Math.random() * this.guys.length),1);
      this.guys.splice(parseInt(Math.random() * this.guys.length),1);
    }
  }
  else if(Math.random() * 100 > 80)
  {
    this.guys.push(new Person());
  }

  if(money <= 0 || this.guys.length<=0 || this.stress >= 100)
  {
    this.stress = 100;
    game.add.tween(go.position).to({y:0},250,Phaser.Easing.Quadratic.Out,true);
    game.add.tween(newD.position).to({y:10000},1,Phaser.Easing.Quadratic.Out,true);
    newT.position.y = 100;
    newT.text = "GAME OVER";
  }

  workersText.text = "Workers: " + this.guys.length;
}

Team.prototype.nextDay = function()
{
  var bg = game.add.tween(b2Group.position).to({y:600},250,Phaser.Easing.Quadratic.Out,true);
  var repTween = game.add.tween(this.report.position).from({y:800},1).to({y: 450}, 500, Phaser.Easing.Quadratic.In,true);
  var rep2Tween = game.add.tween(rep.position).from({y:800},1).to({y: 450}, 500, Phaser.Easing.Quadratic.In,true);
  var tween = game.add.tween(this.guys[this.actual].guy.position).from({x:1200},1).to({x: 400}, 500, Phaser.Easing.Quadratic.In,true);
  this.guys[this.actual].visible(true);

  this.drawRep();

  time = maxTime;
  running = true;
}