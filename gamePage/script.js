const gameBody = document.querySelector(".gameBody");
const pointuation = document.querySelector(".points");
const moves = document.querySelector(".moves");
const revealGame = document.querySelector(".revealGame");
const contadorBombs = document.querySelector(".bombas");
const player = document.querySelector(".player");
const changeName = document.querySelector(".changeName");

let playerName = localStorage.getItem("player");
player.innerHTML = playerName;

changeName.addEventListener('click', () => {
    window.location.href = '../index.html'

})


let highest = parseInt(localStorage.getItem("highestScore")) || 0;
let total = parseInt(localStorage.getItem("totalScore")) || 0;
let bombsOpened = parseInt(localStorage.getItem("totalBombs")) || 0;
let contAllMoves = parseInt(localStorage.getItem("totalMove")) || 0;

const totalBombs = document.querySelector(".totalBombs");
const totalScore = document.querySelector(".totalScore");
const totalMove = document.querySelector(".totalMove");
const highestScore = document.querySelector(".highestScore");

totalScore.innerHTML = total;
totalBombs.innerHTML = bombsOpened;
totalMove.innerHTML = contAllMoves;
highestScore.innerHTML = highest;

const addInformation = (info, key) => {
    if (!isNaN(info)) {
        localStorage.setItem(key, Number(info));
    }
}

const initializeGame = () => {
    class Points {
        constructor(p) {
            this.p = p;
        }
        lossP = function () {
    
            if (this.p >= 180) {
                this.p -= 20;
            } else {
                this.p -= 10;
            }
        }
        winP = function () {
            if (this.p <= 40) {
                this.p += 20;
            } else {
                this.p += 10;
            }
        }
    }
    
    const pts = new Points(100);
    const totalSquares = 100;
    const bombCount = 50;
    
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
        squareArray.forEach(element => {
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
        document.querySelector("#msg").innerHTML = `<h1>${msg}</h1>`;
    };
    
    let contMoves = 0;
    let contBombs = 0;
    let gameEnd = false;
    
    squareArray.forEach(element => {
        let control = true;
        let controlMoves = true;
        element.addEventListener("click", () => {
            if (gameEnd) return;
            
            let controlBombs = true;
            if (element.classList.contains('squareClosed') && !element.classList.contains('bomb') && control) {
                element.src = "emptySquare.png";
                element.classList.add("emptyOpen");
                element.classList.remove("squareClosed");
                openSound();
                pts.winP();
                if (pts.p > 40) {
                    total += 10;
                    totalScore.innerHTML = total;
                } else if (pts.p <= 40) {
                    total += 20;
                    totalScore.innerHTML = total;
                }
                contAllMoves++;
                addInformation(Number(totalScore.innerHTML), 'totalScore')

            } else if (element.classList.contains('squareClosed') && element.classList.contains('bomb') && control) {
                gameBody.classList.add('shake');
                element.src = "bombSquare.png";
                element.classList.add("bomb");
                element.classList.remove("squareClosed");
                element.classList.add('shakeBomb');
                explosionSound();
                pts.lossP();
                if (controlBombs) {
                    contBombs++;
                    contadorBombs.innerHTML = contBombs;
                    controlBombs = false;
                }
                setTimeout(() => {
                    gameBody.classList.remove('shake');
                }, 500);
                bombsOpened++;
                totalBombs.innerHTML = bombsOpened;
                addInformation(bombsOpened, 'totalBombs');
                contAllMoves++;
            }
            
            totalMove.innerHTML = contAllMoves;
            addInformation(contAllMoves, 'totalMove');

            control = false;
            pointuation.innerHTML = pts.p;
            
            if (controlMoves) {
                contMoves++;
                moves.innerHTML = contMoves;
                controlMoves = false;
            }

            if (contMoves <= 10 && pts.p >= 200) {
                revealAllSquares();
                setTimeout(() => {
                    soundWin();
                }, 700);
                showMessage(`Uau! Isso é impressioante ${playerName}, você ganhou sem estourar nenhuma bomba, você tem meus parabéns!`);
                gameEnd = true;
            }else if (pts.p <= 0) {
                revealAllSquares();
                setTimeout(() => {
                    soundOver();
                }, 700);
                showMessage(`Não foi dessa vez ${playerName}, você perdeu!`);
                gameEnd = true;
            } else if (contMoves === 100 && pts.p < 200) {
                revealAllSquares();
                setTimeout(() => {
                    soundOver();
                }, 700);
                showMessage(`Você não conseguiu completar o desafio, ${playerName}!`);
                gameEnd = true;
            } else if (pts.p >= 200) {
                revealAllSquares();
                setTimeout(() => {
                    soundWin();
                }, 700);
                showMessage(`Parabéns ${playerName}, você ganhou!`);
                gameEnd = true;
            }

            if (pts.p > highest) {
                highest = pts.p;
                highestScore.innerHTML = highest;
            }

            addInformation(highest, 'highestScore');
            
        });
    });
    
};


const removeMsg = () => {
    document.querySelector("#msg").innerHTML = '';

}

initializeGame();


const imgRestart = document.querySelector('.imgRestart');

restart.addEventListener('click', () => {
    imgRestart.classList.add("rotate");
    gameBody.innerHTML = '';
    pointuation.innerHTML = 100;
    moves.innerHTML = 0;
    contadorBombs.innerHTML = 0;

    removeMsg();
    initializeGame();

    setTimeout(() => {
        imgRestart.classList.remove("rotate");
    }, 500);
});


document.querySelector(".divImgArrow").addEventListener('click', () => {
    const imgArrow = document.querySelector(".imgArrow");
    imgArrow.classList.toggle('rotateMenuL');
    imgArrow.classList.toggle('rotateMenuR');
    document.querySelector(".sideMenu").classList.toggle('showMenu');
})

