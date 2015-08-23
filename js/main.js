var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
var bg, bg2, go;
var bg2Group;
var newD, newT;
var persLayer;
var desk;
var team;
var bmd,rep;
var prog_fg;
var maxScale = 3.65;
var time = 10000;
var maxTime = 10000;

var stressText, incomeText, moneyText;

var workersText;

var money = 100000;

var loaded = false;
var running = false;

function preload() 
{
  Person.init();
  game.load.image("bg","res/graphics/bg.png");
  game.load.image("bg2","res/graphics/bg2.png");
  game.load.image("desk","res/graphics/desk.png");
  game.load.image("game_over","res/graphics/go.png");
  game.load.image("fire_butt","res/graphics/fire_butt.png");
  game.load.image("blue_butt","res/graphics/blue_butt.png");
  game.load.image("progress_bg","res/graphics/progress_bg.png");
  game.load.image("progress_fg","res/graphics/progress_fg.png");

  //if (!game.device.desktop)
  //{
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      //game.scale.setMinMax(800, 600, 800, 600);
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;
      game.scale.forceOrientation(true, false);
  //}
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
  var praise = makeButton(200,550,'blue_butt',"Next",team.praise,team,style);
  var threaten = makeButton(600,550,'blue_butt',"Threaten",team.threaten,team,style);

  var style2 = { font: "20px Minecraft", fill: "#00000", wordWrap: false,  align: "center" };

  var endText = game.add.text(610, 25, "End of day in:", style2);
  endText.anchor.set(0, 0.5);

  var prog_bg = game.add.sprite(700,50,"progress_bg");
  prog_bg.anchor.set(0.5);
  prog_bg.scale.set(0.7);
  prog_bg.smoothed = false;

  prog_fg = game.add.sprite(612,50,"progress_fg");
  prog_fg.anchor.set(0,0.5);
  prog_fg.scale.set(0.65);
  prog_fg.scale.x = 3.65;
  prog_fg.smoothed = false;

  workersText = game.add.text(610, 80, "Workers: "+team.guys.length,style2);

  go = game.add.group();
  go.position.y = 600;

  got = game.make.tileSprite(0,0,800,600,"game_over");
  got.smoothed = false;

  go.add(got);

  b2Group = game.add.group();
  b2Group.position.y = 600;

  bg2 = game.make.tileSprite(0,0,800,600,"bg2");
  bg2.smoothed = false;

  b2Group.add(bg2);

  stressText = game.make.text(400,200, "",style);
  stressText.anchor.set(0.5,0.5);
  incomeText = game.make.text(400,300, "",style);
  incomeText.anchor.set(0.5,0.5);
  moneyText = game.make.text(400,400, "",style);
  moneyText.anchor.set(0.5,0.5);

  b2Group.add(stressText);
  b2Group.add(incomeText);
  b2Group.add(moneyText);

  newD = game.add.sprite(400,500,'blue_butt');
  newD.anchor.set(0.5,0.5);
  newD.scale.set(0.75,1);
  newD.smoothed = false;
  newD.inputEnabled = true;
  newD.input.priorityID = 1;
  newD.input.useHandCursor = true;
  newD.events.onInputDown.add(team.nextDay, team);

  style['wordWrapWidth'] = newD.width;
  style['font'] = '35px Minecraft';

  newT = game.add.text(405, 505, "NEXT DAY", style);
  newT.anchor.set(0.5, 0.5);

  b2Group.add(newD);
  b2Group.add(newT);

  loaded = running = true;
}

function update() 
{
    //team.drawRep();
    if(loaded && running)
    {
      var el = game.time.elapsedMS;
      if(el != 0 || el)
      {
        time -= el;
        prog_fg.scale.x = maxScale * time/maxTime;
      }
    

    if(time <= 0)
    {
      running = false;
      team.endOfDay();
    }
  }
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