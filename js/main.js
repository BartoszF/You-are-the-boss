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
  game.load.image("blue_butt","res/graphics/blue_butt.png");
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

  var fireButton = game.add.sprite(game.world.centerX, 550, 'fire_butt');
  fireButton.anchor.set(0.5,0.5);
  fireButton.scale.set(0.75,1);
  fireButton.smoothed = false;
  fireButton.inputEnabled = true;
  fireButton.input.priorityID = 1;
  fireButton.input.useHandCursor = true;
  fireButton.events.onInputDown.add(team.fire, team);

  var style = { font: "38px Minecraft", stroke : '#7D0214', strokeThickness : 2, fill: "#00000", wordWrap: true, wordWrapWidth: fireButton.width, align: "center" };

  text = game.add.text(game.world.centerX, 550, "FIRE", style);
  text.anchor.set(0.5, 0.5);

  var praiseButton = game.add.sprite(200, 550, 'blue_butt');
  praiseButton.anchor.set(0.5,0.5);
  praiseButton.scale.set(0.75,1);
  praiseButton.smoothed = false;
  praiseButton.inputEnabled = true;
  praiseButton.input.priorityID = 1;
  praiseButton.input.useHandCursor = true;
  praiseButton.events.onInputDown.add(team.praise, team);

  var style = { font: "38px Minecraft", fill: "#00000", wordWrap: true, wordWrapWidth: praiseButton.width, align: "center" };

  text = game.add.text(200, 550, "Praise", style);
  text.anchor.set(0.5, 0.5);

  var threatenButton = game.add.sprite(600, 550, 'blue_butt');
  threatenButton.anchor.set(0.5,0.5);
  threatenButton.scale.set(0.75,1);
  threatenButton.smoothed = false;
  threatenButton.inputEnabled = true;
  threatenButton.input.priorityID = 1;
  threatenButton.input.useHandCursor = true;
  threatenButton.events.onInputDown.add(team.threaten, team);

  var style = { font: "38px Minecraft", fill: "#00000", wordWrap: true, wordWrapWidth: threatenButton.width, align: "center" };

  text = game.add.text(600, 550, "Threaten", style);
  text.anchor.set(0.5, 0.5);
}

function update() 
{
}