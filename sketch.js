
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var mario,mario_running,mario_collided;
var ground;
var obstaclesGroup,obstacles;

var coin,coinImage,coinsGroup;

var background;

var jumpSound ,dieSound;

var gameOverImg,restartImg

var score;

function preload(){
 mario_running= loadAnimation("mario1.png","mario2.png","Mpic1.png","Mpic2.png");
  
  groundImage = loadImage("ground2.jpg");
  
  backgroundImage = loadImage("mariobackground1.jpg");
  
  obstaclesAnim = loadAnimation("brownie2.png");
   
  coinImage = loadImage("coin2.png");
  
  // jumpSound = loadSound("jump.mp3");
 // dieSound = loadSound("die.mp3");
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  mario_collided = loadAnimation("mario3.png");
}

function setup(){
  createCanvas(1500,300);

  backgroundsprite=createSprite(750,150,1500,300)
  backgroundsprite.addImage("bck",backgroundImage)
  backgroundsprite.scale=0.2

  ground = createSprite(750,260,7500,20);
  //ground.addImage(groundImage);
  ground.visible=false

  mario = createSprite(100,250,5,5);
  mario.addAnimation("running",mario_running);
  mario.addAnimation("collided" ,mario_collided);
  mario.scale=1.5;
  
 

  obstaclesGroup = createGroup();
  
  coinsGroup =createGroup();
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  score=0;
}

function draw(){
  background("green");
  textSize(25);
  fill("red");
  
  if(gameState === PLAY){
     gameOver.visible = false
     restart.visible = false
     mario.velocityX=6
    camera.position.x=mario.x+500;
    camera.position.y=150
    
    
 /* if (ground.x < 500){
      ground.x = ground.width/2;
    }*/
   if(keyDown("space")&& mario.y >= 100) {
        mario.velocityY = -12;
        // jumpSound.play();
    } 
    
    //add gravity
     mario.velocityY = mario.velocityY + 0.8;
    
     spawncoins();
     spawnObstacles();
    
     if(coinsGroup.isTouching(mario)){
      // coinssGroup.destroyEach();
       if(coinsGroup[0].isTouching(mario)){
      coinsGroup[0].destroy();
       }
       score = score + 1;
    }
    
    if(obstaclesGroup.isTouching(mario)){
        gameState = END;
        //dieSound.play();
    }
   
  }
  else if(gameState===END){
      gameOver.visible = true;
      restart.visible = true;
     
      ground.velocityX = 0;
      mario.velocityY = 0;
      
    
    mario.changeAnimation("collided", mario_collided);
    
    obstaclesGroup.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    coinsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)){
      reset();
    }
  }
 
  //console.log(obstaclesGroup.VelocityXEach);
  mario.collide(ground);
  drawSprites();
  text("Score: "+ score, mario.x+400,100);
  
}

function spawnObstacles(){
 if (frameCount % 100 === 0){
   var obstacles = createSprite(1300,200,10,40);
   obstacles.addAnimation("obstacle Animation",obstaclesAnim)
   obstacles.velocityX = -6;
   
    //assign scale and lifetime to the obstacle           
    obstacles.scale = 0.9;
    obstacles.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacles);
 }
}

function spawncoins(){
   if (frameCount % 100 === 0) {
  coin = createSprite(1400,140,40,100);
  coin.y = Math.round(random(120,140));
  coin.addImage(coinImage);
  coin.velocityX = -3;
  coin.scale = 0.8;
  coin.lifetime = 200;
  coinsGroup.add(coin);
   }
}

function reset(){
  gameState= PLAY;
  gameOver.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  coinsGroup.destroyEach();
  mario.changeAnimation("running", mario_running);
  score = 0;
}

