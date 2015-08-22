var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

function preload() 
{
  game.load.image("guy","res/graphics/guy_torso.png");
  game.load.image("bg","res/graphics/bg.png");
  game.load.image("desk","res/graphics/desk.png");
}

function create() 
{
  var bg = game.add.sprite(0,0,"bg");
  bg.scale.set(6.25,4.68);
  bg.smoothed = false;

  var guy = game.add.sprite(400,300,"guy");
  guy.anchor.set(0.5,0);
  guy.scale.set(3,3);
  guy.smoothed = false;

  var desk = game.add.sprite(0,600,"desk");
  desk.anchor.set(0,1);
  desk.scale.set(3.12,0.8);
  desk.smoothed = false;

  
}

function update() 
{
}