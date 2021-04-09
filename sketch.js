var PLAY = 1;
var END = 0;
var gameState = PLAY;
var mario,marioRunning,marioCollided;
var marioImage,marioCollidedImage,marioRunningImage;
var ground,invisibleGround,groundImage;
var coinGroup,coinImage;
var obstacleGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5;
var score = 0;
var gameOver,gameOverImage, restart,restartImage;
var mario2;
var pipeGroup;
var pipeincre=false;

function preload(){
  marioRunningImage=loadAnimation("Capture1.png","Capture3.png","Capture4.png");
  marioCollidedImage=loadAnimation("mariodead.png");
  groundImage=loadImage("backg.jpg");
  coinImage=loadImage("coin.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  gameOverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");

}

function setup(){
  createCanvas(600,600);
  mario = createSprite(50,580,20,50);
  mario2 = createSprite(50,550,20,50);
  mario.addAnimation("running", marioRunningImage);
  //mario.addAnimation("collided",marioCollidedImage);
  mario.scale = 0.5;
mario2.scale = 0.4;

ground = createSprite(0,590,1200,10);
ground.velocityX = -(6 + 3*score/100);
ground.x = ground.width/2;

gameOver = createSprite(350,100);
gameOver.addImage(gameOverImage);

restart = createSprite(300,140);
restart.addImage(restartImage);

gameOver.scale=0.5;
restart.scale=0.5;

coinGroup = new Group();
obstacleGroup = new Group();
pipeGroup = new Group();

score = 0;
}

function draw(){
  background("pink");
  text(20);
  fill(255);
  text("SCORE :"+ score ,500,40);
  
  drawSprites();

  if(gameState===PLAY){
  score = score + Math.round(getFrameRate()/60);

  if(keyDown("space")&& mario.y>= 139){
    mario. velocityY = -12;
    }
  
    mario.velocityY = mario.velocityY +0.8
  
    if(ground.x < 0){
     ground.x = ground.width/2;
    }
  
    mario.collide(ground);
  
    gameOver.visible=false;
    restart.visible=false;

    mario2.visible=false;
    
  
    spawnCoin();
    spwanObstacles();
    spawnbob();
    spawnpipe();

    if(pipeGroup.isTouching(mario)&& mario.scale<3){
    
     //mario.scale=mario.scale+0.02;
     //console.log("All the best"+mario.scale);
     //mario.velocityY=-2;
     //console.log(gameState);
     //pipeincre=true;
      }
     
  


    if(obstacleGroup.isTouching(mario)){
      if(!pipeincre){

      
       gameState = END;
  
    }
  }
  }

   if(gameState === END){

   gameOver.visible = true;
   restart.visible = true;

   ground .velocityX =0;
   mario.velocityY = 0;
   mario.velocityX = 0;

   obstacleGroup.setVelocityXEach(0);
   coinGroup.setLifetimeEach(-1);

   obstacleGroup.destroyEach();
   coinGroup.destroyEach();

   mario2.visible=true;
   mario.visible=false;

  mario2.addAnimation("collided", marioCollidedImage);
  mario2.scale=0.3;
   

   if(mousePressedOver(restart)){
      reset();
   }
   

  }
}


function spawnCoin(){

if(frameCount % 60 === 0){
var coin =  createSprite(600,520,40,10);
coin.y = Math.round(random(200,300));
coin.addImage(coinImage);
coin.scale = 0.1;
coin.velocityX = -3;

coin.lifetime = 200;

coin.depth = mario.depth;
mario.depth = mario.depth + 1;

coinGroup.add(coin);

}
}

function spwanObstacles(){
if(frameCount % 80 === 0){
var obstacle = createSprite (600,560,10,40);
var  rand = Math.round(random(1,3));
switch(rand){
  case 1: obstacle.addImage(obstacle2);
          break;
  case 2: obstacle.addImage(obstacle1);
          break;
  case 3: obstacle.addImage(obstacle3);
          break;         
  case 4: obstacle.addImage(obstacle4);
          break;
  case 5: obstacle.addImage(obstacle5);        
          break;
}
obstacle.velocityX = -(6 +3*score/100);

obstacle.scale = 0.2;
obstacle.lifetime = 300;
obstacleGroup.add(obstacle);

}
}

function spawnbob(){

  if(frameCount % 100 === 0){
  var bob =  createSprite(600,520,40,10);
  bob.y = Math.round(random(300,400));
  bob.addImage(obstacle4);
  bob.scale = 0.1;
  bob.velocityX = -3;
  
  bob.lifetime = 200;
  
  bob.depth = mario.depth;
  mario.depth = mario.depth + 1;
  
  obstacleGroup.add(bob);
  
  }
  }

  function spawnpipe(){

    if(frameCount % 80 === 0){
    var pipe =  createSprite(600,560,10,40);
    //pipe.y = Math.round(random(1,3));
    pipe.addImage(obstacle5);
    pipe.scale = 0.1;
    pipe.velocityX = -3;
    
    pipe.lifetime = 300;
    
    pipe.depth = mario.depth;
    mario.depth = mario.depth + 1;
    //mario.scale=mario.scale*0.01;
    
    coinGroup.add(pipe);
    pipeGroup.add(pipe);
    }
  }

   

function reset(){
  //console.log("All the best");
  gameState = PLAY;

  gameOver.visible =false;
  restart.visible =false;
  mario.visible =true;

  mario.changeAnimation("running",marioRunningImage);
  mario.scale =0.5;
 //console.log("Good luck");
  score = 0;
}

  
