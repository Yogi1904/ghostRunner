var PLAY = 1
var END = 0
var gameState = 1;

var ghost, door, climber, tower, invisibleGround;
var doorImg, climberImg, ghostImg, towerImg;
var doorsGroup, climbersGroup, invisibleGroundGroup;

function preload(){
  
  ghostImg = loadImage("ghost-standing.png");
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  
 createCanvas(600, 600);
 
  spookySound.loop();
  
  tower = createSprite(300, 300, 10, 10);
  tower.addImage("tower", towerImg);
  tower.velocityY = 3;
  
  ghost = createSprite(300, 300, 10, 10);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
  ghost .velocityY = 0.8;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleGroundGroup = new Group();
}

function draw(){
  
  background(0); 
  
  ghost.depth = ghost.depth+1;
  
  if (gameState === PLAY){
  
  if (tower.y > 400){
   tower.y = 300; 
  }
  
  if (keyDown("space")){
   ghost.velocityY = -10; 
  }
  
  ghost.velocityY = ghost.velocityY+0.8;
    
  if (keyDown("left")) {
      ghost.x = ghost.x-2;
  }
    
  if (keyDown("right")){
   ghost.x = ghost.x+3; 
  }
    
  spawnDoor();

  if (invisibleGroundGroup.isTouching(ghost) || ghost.y>600){
   
    ghost.destroy();
    gameState = END;
    
  }
  } else if (gameState === END){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GAME OVER", 200, 300);
  }
  
 
  
  drawSprites();
  
}

function spawnDoor(){
 
 if (frameCount%240 === 0){
 
  door = createSprite(200, -50, 10, 10)
  door.addImage(doorImg)
  door.x = Math.round(random(120, 400));
  door.velocityY = 3;
  door.lifetime = 800;
  doorsGroup.add(door);
   
  climber = createSprite(200, 10, 10, 10);
  climber.addImage(climberImg);
  climber.x = door.x;
  climber.velocityY = 3;
  climber.lifetime = 800;
  climbersGroup.add(climber);
   
  invisibleGround = createSprite(200, 10, 10, 10);
  invisibleGround.width = climber.width;
  invisibleGround.height = 10 ; 
  invisibleGround.velocityY = 3;
  invisibleGround.visible = false;
  invisibleGround.x = door.x;
  invisibleGround.debug = true;
  invisibleGroundGroup.add(invisibleGround);
   
 }
  
}