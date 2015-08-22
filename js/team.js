function Team()
{
  for(var i=0;i<50;i++)
  {
    var p = new Person();
    this.guys.push(p);
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
}

Team.prototype.guys = [];
Team.prototype.actual = 0;
Team.prototype.report = null;
Team.prototype.stress = 0;

Team.prototype.next = function()
{
  var tween = game.add.tween(this.guys[this.actual].guy.position).to({x: -400}, 500, Phaser.Easing.Quadratic.Out,true);
  this.guys[this.actual+1].visible(true);
  var tween2 = game.add.tween(this.guys[this.actual+1].guy.position).from({x:1200},1).to({x: 400}, 500, Phaser.Easing.Quadratic.In,true);

  if(this.actual+1 < this.guys.length)
  {
    this.actual++;
  }
  else
  {
    this.endOfDay();
  }

  this.nextRep();
}

Team.prototype.fire = function()
{
  var tween = game.add.tween(this.guys[this.actual].guy.position).to({y: -800}, 500, Phaser.Easing.Quadratic.Out,true);
  this.guys[this.actual+1].visible(true);
  var tween2 = game.add.tween(this.guys[this.actual+1].guy.position).from({x:1200},1).to({x: 400}, 500, Phaser.Easing.Quadratic.In,true);
  this.guys.splice(this.actual,1);

  this.nextRep();
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
  var min = (wo.length-10) < 0 ? 0 : (wo.length-10);

  bmd.clear();
  bmd.ctx.beginPath();
  bmd.ctx.moveTo(25,64);

  for(var i =min+1;i<wo.length;i++)
  {
    if(wo[i] > 0) bmd.ctx.strokeStyle = "green";
    else bmd.ctx.strokeStyle = "red";
    bmd.ctx.lineTo(25+i*32, 64 - wo[i]*36);
    bmd.ctx.lineWidth = 2;
    bmd.ctx.stroke();
    
  }
  bmd.ctx.closePath();
  bmd.render();
}

Team.prototype.praise = function()
{
  this.guys[this.actual].mood = 2;
  this.guys[this.actual].stress *= 0.5;
  this.next();
}

Team.prototype.threaten = function()
{
  this.guys[this.actual].mood = -2;
  this.guys[this.actual].stress *= 1.5;
  this.next();
}

Team.prototype.endOfDay = function()
{

  for(var i=0;i<this.guys.length;i++)
  {
    this.stress += this.guys[i].stress;
  }

  this.stress /= this.guys[i].length;
}