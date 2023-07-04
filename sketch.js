/* Alertas iniciais */
alert("Player 1 = w,s / Player 2 = up,down");
alert("Pressione espaço para colocar a bolinha em jogo!");

/* Dados */
var largura = 800;
var altura = 500;
var xBola = largura / 2;
var yBola = altura / 2;
var rBola = 20;
var velocidadeBolaY = 0;
var velocidadeBolaX = 0;
var alturaJogador = 100;
var larguraJogador = 20;
var velocidadeJogador = 0;
var yJogadorUm = altura / 2 - alturaJogador / 2;
var yJogadorDois = altura / 2 - alturaJogador / 2;
var bateu = true;
var pontosJogadorUm = 0;
var pontosJogadorDois = 0;

/* Cores (feat. ideia do Bermudes no server) */
var r1 = 255;
var g1 = 5;
var b1 = 5;
var r2 = 5;
var g2 = 17;
var b2 = 255;
var r = 255;
var g = 255;
var b = 255;

/* Arquivos personalizados */
let fonte;
let batida;
let ponto;
function preload() {
  fonte = loadFont('Minecraft.ttf');
  soundFormats('wav');
  /* Fiz esses sons bem básicos só pra usar msm */
  batida = loadSound('batida');
  batida.setVolume(0.3)
  ponto = loadSound('ponto');
  ponto.setVolume(0.3)
}

/* Iníciar o jogo */
function keyTyped() {
  if (key === ' ' && xBola == largura / 2 && yBola == altura / 2) {
    velocidadeBolaY = 6;
    velocidadeBolaX = 7;
    velocidadeJogador = 3.5;
  }
}

/* Tela */
function setup() {
  createCanvas(largura, altura);
}

function draw() {
  /* Desenhos do jogo */
  background(8, 8, 8, 200);
  
  fill(r, g, b);
  noStroke();
  rect(397.5, 10, 5, 88);
  rect(397.5, 108, 5, 88);
  rect(397.5, 206, 5, 88);
  rect(397.5, 304, 5, 88);
  rect(397.5, 402, 5, 88);
  circle(xBola, yBola, rBola);
  
  fill(r1, g1, b1);
  noStroke();
  rect(30, yJogadorUm, larguraJogador, alturaJogador);
  fill(r2, g2, b2);
  noStroke();
  rect(largura - 30 - larguraJogador, yJogadorDois, larguraJogador, alturaJogador);
  
  /* Bola - movimento e colisão com a parede */
  xBola += velocidadeBolaX;
  yBola += velocidadeBolaY;
  
  if(yBola + rBola / 2 >= altura){
    velocidadeBolaY = -velocidadeBolaY;
  }
  if(yBola - rBola / 2 <= 0){
    velocidadeBolaY = velocidadeBolaY * (-1);
  }
  if(xBola + rBola / 2 >= largura){
    xBola = largura / 2;
    yBola = altura / 2;
    velocidadeBolaX = 0;
    velocidadeBolaY = 0;
    velocidadeJogador = 0;
    yJogadorUm = altura / 2 - alturaJogador / 2;
    yJogadorDois = altura / 2 - alturaJogador / 2;
    bateu = true;
    r = 255;
    g = 255;
    b = 255;
    pontosJogadorUm++;
    ponto.play();
  }
  if(xBola - rBola / 2 <= 0){
    xBola = largura / 2;
    yBola = altura / 2;
    velocidadeBolaX = 0;
    velocidadeBolaY = 0;
    velocidadeJogador = 0;
    yJogadorUm = altura / 2 - alturaJogador / 2;
    yJogadorDois = altura / 2 - alturaJogador / 2;
    bateu = true;
    r = 255;
    g = 255;
    b = 255;
    pontosJogadorDois++;
    ponto.play();
  }
  
  /* Movimento dos jogadores */
  if(keyIsDown(87)){
    yJogadorUm -= velocidadeJogador;
  }
  if(keyIsDown(83)){
    yJogadorUm += velocidadeJogador;
  }
  
  if(keyIsDown(UP_ARROW)){
    yJogadorDois -= velocidadeJogador;
  }
  if(keyIsDown(DOWN_ARROW)){
    yJogadorDois += velocidadeJogador;
  }
  
  /* Colisão - bola e jogadores */
  if(xBola - rBola / 2 <= larguraJogador + 30 && yBola - rBola / 2 >= yJogadorUm && yBola + rBola / 2 <= yJogadorUm + alturaJogador / 2 && !bateu){
    velocidadeBolaX = velocidadeBolaX * (-1);
    velocidadeBolaY = -velocidadeBolaY;
    bateu = true;
    r = r1;
    g = g1;
    b = b1;
    batida.play();
  }
    if(xBola - rBola / 2 <= larguraJogador + 30 && yBola - rBola / 2 >= yJogadorUm + alturaJogador / 2 && yBola + rBola / 2 <= yJogadorUm + alturaJogador && !bateu){
    velocidadeBolaX = velocidadeBolaX * (-1);
    velocidadeBolaY = +velocidadeBolaY;
    bateu = true;
    r = r1;
    g = g1;
    b = b1;
    batida.play();
  }
  if(xBola + rBola / 2 >= largura - larguraJogador - 30 && yBola - rBola / 2 >= yJogadorDois && yBola + rBola / 2 <= yJogadorDois + alturaJogador / 2 && bateu){
    velocidadeBolaX = velocidadeBolaX * (-1);
    velocidadeBolaY = -velocidadeBolaY;
    bateu = false;
    r = r2;
    g = g2;
    b = b2;
    batida.play();
  }
  if(xBola + rBola / 2 >= largura - larguraJogador - 30 && yBola - rBola / 2 >= yJogadorDois + alturaJogador / 2 && yBola + rBola / 2 <= yJogadorDois + alturaJogador && bateu){
    velocidadeBolaX = velocidadeBolaX * (-1);
    velocidadeBolaY = +velocidadeBolaY;
    bateu = false;
    r = r2;
    g = g2;
    b = b2;
    batida.play();
  }
  
  /* Colisão - jogadores e lateral */
  if(yJogadorUm < 0){
    yJogadorUm += velocidadeJogador;
  }
  if(yJogadorUm + alturaJogador > altura){
    yJogadorUm -= velocidadeJogador;
  }
  if(yJogadorDois < 0){
    yJogadorDois += velocidadeJogador;
  }
  if(yJogadorDois + alturaJogador > altura){
    yJogadorDois -= velocidadeJogador;
  }
  
  /* Pontuação */
  textSize(70);
  textFont(fonte);
  fill(r1, g1, b1);
  text(pontosJogadorUm, 300, 80);
  fill(r2, g2, b2);
  text(pontosJogadorDois, 465, 80);
  if(pontosJogadorUm >= 10 || pontosJogadorDois == 10){
      fill(57, 255, 20);
      text("Press 'r' to restart", 90, 270);
    if (key === 'r'){
      pontosJogadorUm = 0;
      pontosJogadorDois = 0;
    }
  }
}
