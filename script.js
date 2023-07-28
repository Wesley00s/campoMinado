const gameBody = document.querySelector(".gameBody");
const pointuation = document.querySelector(".points");
const revealGame = document.querySelector(".revealGame");

class Points{
    constructor(p) {
        this.p = p;
    }
    lossP = function () {
        if (this.p > 0) {
            this.p -= 20;
        }
    }
    winP = function () {
        this.p += 5;
    }
}

const pts = new Points(100);
const totalSquares = 100;
const bombCount = 30;

for (let i = 0; i < 100; i++) {
    
    let img = document.createElement("img");
    img.src = "square.png";
    img.id = `sq${i + 1}`;
    img.classList.add("square");
    img.classList.add("squareClosed");
    img.classList.add("empty");
    gameBody.appendChild(img);
}

const generateRandom = (total, count) => {
    const indices = Array.from({ length: total }, (_, i) => i);
    const randomIndices = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * indices.length);
        randomIndices.push(indices.splice(randomIndex, 1)[0]);
    }
    return randomIndices;
}
const bombIndices = generateRandom(totalSquares, bombCount);

const square = document.querySelectorAll(".square");
const bombs = bombIndices.map(index => square[index]);

bombs.forEach(bomb => {
    bomb.classList.remove('empty');
    bomb.classList.add('bomb');
});

const squareArray = [...square];

const explosionSound = () => {
    const explosion = document.querySelector('#explosion');
    explosion.play();
    explosion.currentTime = 0;

    setTimeout(() => {
        explosion.pause();
    }, 600);
}

const openSound = () => {
    const open = document.querySelector('#open');
    open.play();
    open.currentTime = 0;

    setTimeout(() => {
        open.pause();
    }, 600);
};

const soundWin = () => {
    const gameWin = document.querySelector('#gameWin');
    gameWin.play();
    gameWin.currentTime = 0;
}

const soundOver = () => {
    const gameOver = document.querySelector('#gameOver');
    gameOver.play();
    gameOver.currentTime = 0;
}

const revealAllSquares = () => {
    squareArray.forEach( element => {
        if (element.classList.contains('squareClosed') && !element.classList.contains('bomb')) {
            element.src = "emptySquare.png";
            element.classList.add("emptyOpen");
            element.classList.remove("squareClosed");
        } else if (element.classList.contains('squareClosed') && element.classList.contains('bomb')) {
            element.src = "bombSquare.png";
            element.classList.add("bomb");
            element.classList.remove("squareClosed");
        }
    });
}

const showMessage = (msg) => {
    revealGame.innerHTML = `<h1>${msg}</h1>`;
};

squareArray.forEach(element => {
    
    let control = true;
    element.addEventListener("click", () => {
        if (element.classList.contains('squareClosed') && !element.classList.contains('bomb') && control) {
            element.src = "emptySquare.png";
            element.classList.add("emptyOpen");
            element.classList.remove("squareClosed");
            openSound();
            pts.winP();
        } else if (element.classList.contains('squareClosed') && element.classList.contains('bomb') && control) {
            gameBody.classList.add('shake');
            element.src = "bombSquare.png";
            element.classList.add("bomb");
            element.classList.remove("squareClosed");
            explosionSound();  
            pts.lossP();
            setTimeout(() => {
                gameBody.classList.remove('shake');
            }, 500);
        }
        control = false;
        pointuation.innerHTML = pts.p;
        
        if (pts.p <= 0) {
            revealAllSquares();
            setTimeout(() => {
                soundOver();
            }, 700);
            showMessage('Você perdeu!');
            
        } else if (pts.p >= 200) {
            revealAllSquares();
            setTimeout(() => {
                soundWin();
            }, 700);
            showMessage('Você ganhou!');
        }
    });
});
