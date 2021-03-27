var backImage,backgr,banana,stone;
var player, player_running;
var ground,ground_img;
var Obstacles,Food;
var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0

  function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  stoneimg = loadImage("obstacle.png")
  bananaImage = loadImage("banana.png")
  }

  function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  ObstaclesGroup = new Group()
  FoodGroup = new Group()
  }

  function draw() { 
  background(0);

  if(gameState===PLAY){
  drawSprites();
  spawnFood()
  spawnObstacles()
  if(backgr.x<100){
  backgr.x=backgr.width/2;
  }

  if (FoodGroup.isTouching(player) ){
  FoodGroup.destroyEach();
  score = score + 2;
  player.scale += + 0.1
  }
  
  if(keyDown("space") ) {
  player.velocityY = -12;
  }
  player.velocityY = player.velocityY + 0.8;
  
  player.collide(ground);
  if (ObstaclesGroup.isTouching(player) ){
  gameState = END;
  }
  }else if(gameState === END){

  backgr.velocityX = 0;
  player.visible = false;
      
  FoodGroup.destroyEach() ;
  ObstaclesGroup.destroyEach();
      


  textSize(30);
  fill(255);
  text("Game Over!", 300,220);

  }

  
  }
  function spawnFood() {
  if (frameCount % 127 === 0){
  banana = createSprite(600,250,40,10)
  banana.y = random(120,200)
  banana.addImage(bananaImage) ;
  banana.scale = 0.1;
  banana.velocityX= -4;
  banana.lifetime = 300
  player.depth = banana.depth + 1
  FoodGroup.add(banana); 
  }
  
  }

  function spawnObstacles() {
  if (frameCount % 80 === 0){
  stone = createSprite(600,250,40,10)
  stone.y = random(120,200)
  stone.addImage(stoneimg) ;
  stone.scale = 0.4;
  stone.velocityX = -4;
  stone.lifetime = 300
  player.depth = stone.depth + 1
  ObstaclesGroup.add(stone);
  }
   
  }  
 