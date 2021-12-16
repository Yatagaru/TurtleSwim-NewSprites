// Variaveis de grupo, sprites, fases, e som.
var turtle, turtle_swim, turtle_dive;
var ocean, ocean_image;
var canudo1, canudo2, C1Img, C2Img, GOImg, CanudoCImg, CanudoAImg;
var game_over;
var gC1, gC2, gI, CanudoC, CanudoA;
var invisivel;
var pontos = 0;
var Fase = Jogar;
var Jogar = 0;
var Terminar = 1;
var Somjump;
var Fonte;

function preload(){
  // Carregar Imagens
  turtle_swim = loadImage("Sprites/turtle.png");
  turtle_dive = loadImage("Sprites/turtle_dive.png");

  ocean_image= loadImage("Sprites/Ocean.jpg");
  C1Img = loadImage("Sprites/canudo1.png");
  C2Img = loadImage("Sprites/canudo2.png");
  GOImg = loadImage("Sprites/Game_Over.png");
  Somjump = loadSound("Barbatana.mp3");

  CanudoCImg = loadImage("Sprites/canudo1.png")
  CanudoAImg = loadImage("Sprites/canudo2.png")
 
}

function setup() {
createCanvas(500, windowHeight/1.2);
  // Sprites principais
  turtle = createSprite(40,300,10,10);
  ocean = createSprite(250,300,250,600);
  CanudoC = createSprite(camera.position.x,20)
  CanudoA = createSprite(camera.position.x,760)
  // Caracteristicas, sprites e Grupos.
  game_over = createSprite(camera.position.x+40,camera.position.y,30,30);
  game_over.addImage(GOImg);
  game_over.scale = 0.70;
  game_over.visible = false;
  ocean.scale = 1.4;
  CanudoC.addImage(CanudoCImg);
  CanudoA.addImage(CanudoAImg);
  CanudoA.rotation = 90
  CanudoC.rotation = 90
  CanudoA.scale = 1.72
  CanudoC.scale = 1.22
  ocean.addImage(ocean_image);
  turtle.addImage("Natacao",turtle_swim);
  turtle.addImage("Mergulho",turtle_dive);
  turtle.scale = 0.40;
  turtle.debug = false;
  turtle.setCollider("Circle",2,0,40);
  gC1 = new Group();
  gC2 = new Group();
  gI = new Group();
  Fase = Jogar;
  
}


function draw() {
  //adição do if
  if(Fase === Jogar){
    jogar();
  }
  if(Fase === Terminar){
  terminar();
  }
  drawSprites();
  //Pontuação
  push()
  fill("black");
  textSize(40);
  text("Pontos: "+Math.round(pontos),camera.position.x-70,camera.position.y-340);
  pop()
  if(Fase === Terminar){
  // Texto para reiniciar
  fill("black");
  textSize(25);
  text("Aperte R para Reiniciar ",camera.position.x-120,camera.position.y);

 
  }
  camera.position.x = turtle.position.x
  camera.position.y = turtle.position.y;
  
}
  
function Outros(){
// Profundidade e Fundo
  background(0); 
    turtle.depth = ocean.depth+1;
    turtle.velocityY = turtle.velocityY + 1; 
    pontos.depth = ocean.depth+1;
}



function Nado(){
// Fazer com que a tartaruga pule.
  if(keyDown("space")&& Fase===Jogar) {
     turtle.velocityY= -10;
     // Animação e som de pular.
    turtle.changeImage("Mergulho",turtle_dive);
     //Somjump.play();
      }
}
function Elementos(){
  // Variáveis para posições aleatórias
  var Num = Math.round(random(-100,40));
  var Num2 = Math.round(random(windowHeight-300,windowHeight+100));
  var H = Math.round(random(height/2,height/4));
  var H1 =Math.round(random(height/1.5,height/3));
  // Fazer com que tudo que estiver abaixo aconteça de 70 em 70 frames.
  if(frameCount%70===0){
  
  invisivel = createSprite(300,300,1,600);
  invisivel.velocityX = -6;
  invisivel.visible = false;
  invisivel.lifetime = 120;
  
  canudo1 = createSprite(300,Num,10,H);
    canudo2 = createSprite(300,Num2,10,H1);
   
  canudo1.setVelocity(-6,0);
    canudo2.setVelocity(canudo1.velocityX,0);
  
  canudo1.addImage(C1Img);
    canudo2.addImage(C2Img);   
  invisivel.debug = true;
  canudo1.scale = 1.3;
    canudo2.scale = 2;
  canudo1.depth = ocean.depth+1;
    canudo2.depth = ocean.depth+1;
    canudo2.depth = CanudoA.depth+1
  text.depth = canudo1.depth+1;
    
   canudo1.lifetime = 120;
    canudo2.lifetime= 120;
  gC1.add(canudo1);
    gC2.add(canudo2);
   gI.add(invisivel);
  }
  // Caso a tartaruga passe pela barra invisivel, ela ganha um ponto
  if(turtle.isTouching(gI)){
      pontos = pontos + 1/5;
    }
  
}

function terminar(){
  // Tudo abaixo ira acontecer caso esteja na fase "Terminar" 
    gC1.destroyEach();
    gC2.destroyEach();
    turtle.destroy();
    game_over.visible = true;
    // Reinicie o jogo caso aperte a Tecla "R" no Terminar.
   if(keyDown("R")&& Fase===Terminar){
      turtle = createSprite(40,300,10,10);
      //adicionei ambas as imagens ao novo sprite de tartaruga, pra poder usar o changeImage depois
      turtle.addImage("Natacao",turtle_swim);
      turtle.addImage("Mergulho",turtle_dive);
      turtle.scale = 0.40;
      turtle.setCollider("Circle",2,0,40);
      pontos = 0;
      game_over.visible = false;
      Fase = Jogar;
      
    }
}
function jogar(){
  // Tudo que irá acontecer caso esteja na Fase "Jogar"
  if(Fase===Jogar){
  Outros();
  Elementos();
   turtle.changeImage("Natacao",turtle_swim);
   
   //mudança do chamamento de Nado()
   Nado();
    }
     // Caso o jogador faça algum dos eventos abaixo acontecer, ele muda para fase "Terminar" 
    if(turtle.isTouching(gC1)){
      game_over.position.y = turtle.position.y-80
      Fase = Terminar;
    } else if(turtle.isTouching(gC2)){
      game_over.position.y = turtle.position.y-80
      Fase = Terminar;
    }
    if(turtle.isTouching(CanudoA)&& Fase===Jogar){
      game_over.position.y = turtle.position.y-80 
      Fase = Terminar;
    } else if(turtle.isTouching(CanudoC)&& Fase===Jogar){
      game_over.position.y = turtle.position.y-100
      Fase = Terminar;
    }
  }
