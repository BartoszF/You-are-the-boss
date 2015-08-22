function Team()
{
  for(var i=0;i<50;i++)
  {
    this.guys.push(new Person());
  }

  var tween = game.add.tween(this.guys[this.actual].guy.position).to({x: 400}, 500, Phaser.Easing.Quadratic.In,true);
  this.guys[this.actual].visible(true);
}

Team.prototype.guys = [];
Team.prototype.actual = 0;

Team.prototype.next = function()
{
  var tween = game.add.tween(this.guys[this.actual].guy.position).to({x: -400}, 500, Phaser.Easing.Quadratic.Out,true);
  this.guys[this.actual+1].visible(true);
  var tween2 = game.add.tween(this.guys[this.actual+1].guy.position).to({x: 400}, 500, Phaser.Easing.Quadratic.In,true);
  this.actual++;
}

Team.prototype.fire = function()
{
  var tween = game.add.tween(this.guys[this.actual].guy.position).to({y: -800}, 500, Phaser.Easing.Quadratic.Out,true);
  this.guys[this.actual+1].visible(true);
  var tween2 = game.add.tween(this.guys[this.actual+1].guy.position).to({x: 400}, 500, Phaser.Easing.Quadratic.In,true);
  this.guys.splice(this.actual,1);
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