var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
var bg;
var persLayer;
var desk;
var team;

function preload() 
{
  Person.init();
  game.load.image("bg","res/graphics/bg.png");
  game.load.image("desk","res/graphics/desk.png");
  game.load.image("fire_butt","res/graphics/fire_butt.png");
}

function create() 
{
  bg = game.add.sprite(0,0,"bg");
  bg.scale.set(6.25,4.68);
  bg.smoothed = false;

  persLayer = game.add.group();
  Person.layer = persLayer;

  //var p = new Person();
  //p.visible(true);

  desk = game.add.sprite(0,600,"desk");
  desk.anchor.set(0,1);
  desk.scale.set(3.12,0.8);
  desk.smoothed = false;

  team = new Team();

  var closeButton = game.add.sprite(game.world.centerX, 400, 'fire_butt');
  closeButton.anchor.set(0.5,0.5);
  closeButton.scale.set(2,2);
  closeButton.inputEnabled = true;
  closeButton.input.priorityID = 1;
  closeButton.input.useHandCursor = true;
  closeButton.events.onInputDown.add(team.fire, this);
}

function update() 
{
}