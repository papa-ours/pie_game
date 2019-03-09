class Tarte {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 75;
        this.pointes = [];
        this.nPointes = 0;
        this.peutAjouterPieceActive = true;

        for (let i = 0; i < 6; i++) {
            this.pointes.push(undefined);
        }
    }

    show() {
        fill('#008F95');
        stroke(0);
        strokeWeight(3);
        ellipse(this.x, this.y, this.r * 2);
        strokeWeight(1);
        noFill();
        for (let i = 0; i < 6; i++) {
            arc(this.x, this.y, this.r * 2, this.r * 2, i * PI / 3, i * PI / 3 + PI / 3, PIE);
        }

        for (let pointe of this.pointes) {
            if (pointe != undefined)
                pointe.show(this.x, this.y, this.r * 2, '#E9B000');
        }
    }

    peutAjouterPiece(piece) {
        for (let pointe of piece.pointes) {
            if (pointe !== undefined)
                if (this.pointes[pointe.position] !== undefined) {
                    this.peutAjouterPieceActive = false;
                    return;
                }
        }
        this.peutAjouterPieceActive = true;
    }

    ajouterPiece(piece) {
        if (this.peutAjouterPieceActive) {
            for (let pointe of piece.pointes) {
                if (pointe != undefined) {
                    this.pointes[pointe.position] = pointe;
                    this.nPointes++;
                }
            }

            if (this.nPointes === 6) {
                this.vider();
                document.getElementsByClassName('score')[0].innerHTML = `${++score}/${targetScore}`;

                if (score === targetScore) {
                    document.getElementById('game-over-tag').innerHTML = 'Gagné';
                    setTimeout(() => document.getElementsByClassName('game-over')[0].style.display = 'flex', 1000);
                }
            }
        }
    }

    vider() {
        this.pointes = [];

        for (let i = 0; i < 6; i++) {
            this.pointes.push(undefined);
        }

        this.nPointes = 0;
    }
}

class Pointe {
    constructor(pos) {
        this.position = pos;
        // this.image = pizza[this.position];
    }

    show(x, y, r, color) {
        // imageMode(CENTER);
        // rectMode(CENTER);
        fill(color);
        arc(x, y, r, r, this.position * PI / 3, this.position * PI / 3 + PI / 3, PIE);
        // let h = this.image.height * r / (2 * this.image.width);
        // let imgX = x + cos(this.position * PI / 3 + PI / 6) * r / 4;
        // let imgY = y + sin(this.position * PI / 3 + PI / 6) * r / 4;
        // image(this.image, imgX, imgY, r / 2, h);
        // stroke(0);
        // noFill();
        // rect(imgX, imgY, r / 2, h);
    }
}

class Piece {
    constructor(pieces) {
        this.pointes = pieces;
    }

    show(x, y, r, c) {
        for (let pointe of this.pointes) {
            if (pointe !== undefined)
                pointe.show(x, y, r, c);
        }
    }
}