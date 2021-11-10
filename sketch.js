var drake,drakeImg, drake_running;
var snake,snakeImg, snake_running;
var zombie, zombieImg, zombie_running;
var backgroundImg, bg;
var ground, groundImg, invisGround;
var score;
var heartLeft_1, heartLeft_2, heartLeft_3, heartLeft_0;
var heartLeft_1Img, heartLeft_2Img, heartLeft_3Img, heartLeft_0Img;
var start, startImg, startText;
var restart, restartImg;
var START = 1
var PLAY = 2
var END = 3;
var gameState = START
var live = 3

function preload(){

groundImg = loadImage("BG.jpg")
drakeImg = loadImage("drake1.png")
snakeImg = loadImage("snake.png")
zombieImg = loadImage("zombie1.png")
drake_running = loadAnimation("drake1.png","drake2.png","drake3.png","drake4.png","drake5.png")
snake_running = loadAnimation("snake1.png","snake2.png","snake3.png","snake4.png")
zombie_running = loadAnimation("zombie1.png","zombie2.png","zombie3.png","zombie4.png")
heartLeft_1Img = loadImage("heart1.png")
heartLeft_2Img = loadImage("heart2.png")
heartLeft_3Img = loadImage("heart3.png")
heartLeft_0Img = loadImage("heart0.png")
startImg = loadImage("Start.png")
restartImg = loadImage("restrt.png")
}

function setup(){

createCanvas(windowWidth, windowHeight);

score = 0; 

  ground = createSprite(50, windowHeight - 50);
  ground.addImage(groundImg)
  ground.scale = 7
  ground.velocityX = -3

  drake = createSprite(60, windowHeight - 120, 20, 50)
  drake.addAnimation("running", drake_running);
  drake.addImage(drakeImg)
  drake.scale = 0.5

  heartLeft_1 = createSprite(130, 70, 10, 10)
  heartLeft_1.addImage(heartLeft_1Img)
  heartLeft_1.scale = 0.16
 
  heartLeft_2 = createSprite(130, 70, 10, 10)
  heartLeft_2.addImage(heartLeft_2Img)
  heartLeft_2.scale = 0.16

  heartLeft_3 = createSprite(130, 70, 10, 10)
  heartLeft_3.addImage(heartLeft_3Img)
  heartLeft_3.scale = 0.16
  
  invisGround = createSprite(400, windowHeight - 60, 800, 5)
  invisGround.visible= false;

  zombies = new Group()
  snakes = new Group()
  hearts = new Group()

  drake.setCollider("rectangle", 0, 0, 100, 200)
  drake.debug = true;

  

  
}

function draw(){
  
  background("#7FD6FF");
  

  if(ground.x <=5){
     ground.x = 50;
}

if(gameState === START){



  start = createSprite(400,200, 10, 10)
  start.addImage(startImg)
  start.scale = 0.4

  if(mousePressedOver(start)){
    gameState = PLAY
  }
  fill("purple")
  textSize(30)
  text("START!", 350, 200)

  start.destroy()
}

if(gameState === PLAY){
  
if(keyDown("space")&&drake.y>=307.75 || touches.length === 1 && drake.y>=307.75){
   drake.velocityY = -14
   touches = []
}

  fill("black")
  textSize(20)
  text("Score: "+score, 700, 50)

if(frameCount%16===0){
  score = score+1
}
  drake.velocityY = drake.velocityY+0.7 

  if(drake.isTouching(zombies) || drake.isTouching(snakes)){
    heartLeft_3.addImage(heartLeft_2Img)
    live -= 1
    console.log(live)
  }

  if(live === 2 || live === 1 || live === 0 && (drake.isTouching(zombies) || drake.isTouching(snakes))){
    heartLeft_3.addImage(heartLeft_1Img)
  }

  if(live === -1 || live === -2 || live === -3 && (drake.isTouching(zombies) || drake.isTouching(snakes))){
    heartLeft_3.addImage(heartLeft_0Img)
  }

  funcSnake();
  funcZombie();
  hearts.add(heartLeft_1, heartLeft_2, heartLeft_3);
  
}

if(gameState===END){

  restart = createSprite(400, 200, 10, 10);
  restart.addImage(restartImg)
  restart.scale = 0.15

  fill("indigo")
  textSize(25)
  text("Aw! Better Luck Next Time", 265, 150)

  if(mousePressedOver(restart)){
    reset();
  }
}

drake.collide(invisGround)
  drawSprites();
  
}

function funcSnake(){

  if(frameCount%500===0){
    snake = createSprite(windowWidth + 50,  windowHeight - 120, 0, 0)
    snake.addAnimation("running", snake_running)
    snake.addImage(snakeImg)
    snake.velocityX = -6
    snake.scale = 0.2
    snakes.add(snake)
  }
}

function funcZombie() {

  if(frameCount%200===0){
    zombie = createSprite(windowWidth + 50,  windowHeight - 120, 0, 0)
    zombie.addAnimation("runnin",zombie_running)
    zombie.addImage(zombieImg)
    zombie.velocityX = -6
    zombie.scale = 0.4
    zombies.add(zombie)
  }
}

function reset(){
  gameState = START;
  restart.visible = false;
  
  score = 0;
}
