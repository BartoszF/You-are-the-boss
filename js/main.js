var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
var bg;
var persLayer;
var desk;
var team;
var bmd,rep;

function preload() 
{
  Person.init();
  game.load.image("bg","res/graphics/bg.png");
  game.load.image("desk","res/graphics/desk.png");
  game.load.image("fire_butt","res/graphics/fire_butt.png");
  game.load.image("blue_butt","res/graphics/blue_butt.png");
  game.load.image("progress_bg","res/graphics/progress_bg.png");
  game.load.image("progress_fg","res/graphics/progress_fg.png");
}

function create() 
{
  bg = game.add.sprite(0,0,"bg");
  bg.scale.set(6.25,4.68);
  bg.smoothed = false;

  persLayer = game.add.group();
  Person.layer = persLayer;

  desk = game.add.sprite(0,600,"desk");
  desk.anchor.set(0,1);
  desk.scale.set(3.12,0.8);
  desk.smoothed = false;

  team = new Team();

  var style = { font: "38px Minecraft", fill: "#00000", wordWrap: true,  align: "center" };

  var fire = makeButton(game.world.centerX,550,'fire_butt',"FIRE",team.fire,team,{ font: "38px Minecraft", stroke : '#7D0214', strokeThickness : 2, fill: "#00000", wordWrap: true, align: "center" });
  var praise = makeButton(200,550,'blue_butt',"Praise",team.praise,team,style);
  var threaten = makeButton(600,550,'blue_butt',"Threaten",team.threaten,team,style);

  var style2 = { font: "20px Minecraft", fill: "#00000", wordWrap: false,  align: "center" };

  var endText = game.add.text(700, 25, "End of day in:", style);
  endText.anchor.set(0.5, 0.5);

  var prog_bg = game.add.sprite(700,50,"progress_bg");
  prog_bg.anchor.set(0.5);
  prog_bg.scale.set(0.7);
  prog_bg.smoothed = false;
}

function update() 
{
  //team.drawRep();
}

function makeButton(x,y,spri,text,func,list,style)
{
  var butt = game.add.sprite(x,y,spri);
  butt.anchor.set(0.5,0.5);
  butt.scale.set(0.75,1);
  butt.smoothed = false;
  butt.inputEnabled = true;
  butt.input.priorityID = 1;
  butt.input.useHandCursor = true;
  butt.events.onInputDown.add(func, list);

  style['wordWrapWidth'] = butt.width;

  var text = game.add.text(x+5, y+5, text, style);
  text.anchor.set(0.5, 0.5);

  return [butt,text];
}