let tartes = [];
let midTarte;
let score = 0;
let targetScore = 5;
let piecesSuivantes = [];
let pizza = [];

function preload() {
  for (let i = 0; i < 6; i++) {
    let img = loadImage('images/pizza/' + i + '.png');
    pizza.push(img);
  }
}

function setup() {
  angleMode(RADIANS);
  let c = createCanvas(790, 790);
  c.parent('canvas-container');
  midTarte = new Tarte(width / 2, height / 2);
  for (let i = 0; i < 6; i++) {
    let x = 300 * cos(i * PI / 3) + width / 2;
    let y = 300 * sin(i * PI / 3) + height / 2;
    let tarte = new Tarte(x, y);
    tartes.push(tarte);
  }

  init();
  document.getElementsByClassName('score')[0].innerHTML = `${score}/${targetScore}`;
}

function draw() {
  background('#E0E0E0');


  midTarte.show();
  for (let tarte of tartes) {
    tarte.show();

    if (sq(mouseX - tarte.x) + sq(mouseY - tarte.y) <= sq(tarte.r)) {
      let piece = new Piece(midTarte.pointes);
      if (tarte.peutAjouterPieceActive) {
        fill(50, 80);
        ellipse(tarte.x, tarte.y, tarte.r * 2);
        piece.show(tarte.x, tarte.y, tarte.r * 2, '#bbb');
      }
    }
  }

  noStroke();
  fill('#E24E42');
  textSize(15);
  textAlign(CENTER, CENTER);
  text('Prochaine pièce :', width / 2, height - 100);

  fill('#E0E0E0');
  stroke('#E24E42');
  ellipse(width / 2, height - 50, 75);
  piecesSuivantes[0].show(width / 2, height - 50, 75, '#E24E42');

}

function genererPiece() {
  let r = random(1);
  let n = 1;
  if (r < 0.92 && r > 0.80) {
    n = 2;
  } else if (r >= 0.92) {
    n = 3;
  }

  let startPos = floor(random(6));
  let pointes = [];
  for (let i = 0; i < n; i++) {
    let pointe = new Pointe((startPos + i) % 6);
    pointes.push(pointe);
  }
  let piece = new Piece(pointes);
  piecesSuivantes.push(piece);
}

function verifierTartes(piece) {
  let nTartes = 0;
  for (let tarte of tartes) {
    tarte.peutAjouterPiece(piece);
    if (!tarte.peutAjouterPieceActive) {
      nTartes++;
    }
  }
  if (nTartes === 6) {
    document.getElementById('game-over-tag').innerHTML = 'Perdu';
    setTimeout(() => document.getElementsByClassName('game-over')[0].style.display = 'flex', 1000);
  }
}

function init() {
    for (let i = 0; i < 2; i++) {
        genererPiece();
    }
    changerPieceMilieu();
}

function rejouer() {
  for (let tarte of tartes) {
    tarte.vider();
  }
  midTarte.vider();
  score = 0;
  init();
  document.getElementsByClassName('score')[0].innerHTML = `${score}/${targetScore}`;
  document.getElementsByClassName('game-over')[0].style.display = 'none';
}

function mousePressed() {
  for (let tarte of tartes) {
    if (sq(mouseX - tarte.x) + sq(mouseY - tarte.y) <= sq(tarte.r)) {
      if (midTarte.pointes.length > 0) {
        let piece = new Piece(midTarte.pointes);
        if (tarte.peutAjouterPieceActive) {
          tarte.ajouterPiece(piece);



          midTarte.vider();
          genererPiece();
          setTimeout(changerPieceMilieu, 200);
        }
      }
    }
  }
}

function changerPieceMilieu() {
  let piece = piecesSuivantes.splice(0, 1)[0];
  midTarte.ajouterPiece(piece);
  verifierTartes(piece);
}
