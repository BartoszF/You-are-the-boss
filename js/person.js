function Person()
{
  this.guy = game.add.group();

  var torso = this.guy.create(0,300,"guy");
  torso.anchor.set(0.5,0);
  torso.scale.set(3,3);
  torso.smoothed = false;

  var face = this.guy.create(0,300,"faces");
  face.frame = 0;
  face.scale.set(3,3);
  face.anchor.set(0.5,0.95);
  face.smoothed = false;

  var mouth = this.guy.create(0,250,"mouths");
  mouth.frame = parseInt(Math.random()* Person.maxMouths);
  mouth.scale.set(2,2);
  mouth.anchor.set(0.5,0.5);
  mouth.smoothed = false;

  var eye = this.guy.create(0,200,"eyes");
  eye.frame = parseInt(Math.random()* Person.maxEyes);
  eye.scale.set(2,2);
  eye.anchor.set(0.5,0.5);
  eye.smoothed = false;

  this.visible(false);

  this.guy.position.x = 1200;

  Math.seedrandom(Date.now() + Math.random() + (Person.r++));
  this.work[0] = (Math.random()*2) - 1;
  for(var i = 1;i<5;i++)
  {
    this.work[i] = this.work[i-1] + (Math.random()*0.4)-0.2;
  }

  Person.layer.add(this.guy);
}

Person.r = 1;
Person.prototype.guy = null;
Person.prototype.report = null;
Person.prototype.stress = 0;
Person.prototype.work = [];
Person.prototype.skill = (Math.random()* 10)+1;
Person.prototype.mood = 0;
Person.layer = null;

Person.init = function()
{
  Person.maxEyes = 3;
  Person.maxMouths = 4;


  game.load.image("guy","res/graphics/guy_torso.png");
  game.load.image("report","res/graphics/report.png");
  game.load.spritesheet("faces","res/graphics/faces.png",64,64,Person.maxFaces);
  game.load.spritesheet("mouths","res/graphics/mouths.png",64,32,Person.maxMouths);
  game.load.spritesheet("eyes","res/graphics/eyes.png",64,32,Person.maxEyes);
  
}

Person.prototype.visible = function(vis)
{
  this.guy.visible = vis;
}
