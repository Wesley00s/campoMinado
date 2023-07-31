const gameBody = document.querySelector(".gameBody");
const pointuation = document.querySelector(".points");
const moves = document.querySelector(".moves");
const revealGame = document.querySelector(".revealGame");
const contadorBombs = document.querySelector(".bombas");
const player = document.querySelector(".player");
const changeName = document.querySelector(".changeName");
const main = document.querySelector(".main");

const settings = document.querySelector(".settings");
const hiddenMenu = document.querySelector(".hiddenMenu");
const backArrow = document.querySelector(".backArrow");
const hiddenContent = document.querySelector(".hiddenContent");

const radioFacil = document.querySelector('#facil');
const radioMedio = document.querySelector('#medio');
const radioDificil = document.querySelector('#dificil');
const radioImpossivel = document.querySelector('#impossivel');
const radioLivre = document.querySelector('#livre');
const btnConfirm = document.querySelector('#confirm');

const totalBombs = document.querySelector(".totalBombs");
const totalScore = document.querySelector(".totalScore");
const totalMove = document.querySelector(".totalMove");
const totalWins = document.querySelector(".totalWins");
const totalUses = document.querySelector(".totalUses");
const highestScore = document.querySelector(".highestScore");

let playerName = localStorage.getItem("player");
player.innerHTML = playerName;

changeName.addEventListener('click', () => {
    window.location.href = '../index.html'
});

const myFunctions = {
    show: () => {
            settings.classList.add('rotateMenuL');
            hiddenMenu.classList.add('hidden');
        },
    hidden: () => {
            hiddenMenu.classList.remove('hidden');
            settings.classList.remove('rotateMenuL');
        },
    addInfo: (info, key) => {
            if (!isNaN(info)) {
                localStorage.setItem(key, Number(info));
            }
    },
    removeMsg: () => {
        document.querySelector("#msg").innerHTML = '';
    },
    showMessage: (msg) => {
            document.querySelector("#msg").innerHTML = `<h1>${msg}</h1>`;
    },
    generateRandom: (total, count) => {
        const indices = Array.from({ length: total }, (_, i) => i);
        const randomIndices = [];
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * indices.length);
            randomIndices.push(indices.splice(randomIndex, 1)[0]);
        }
        return randomIndices;
    }
}

myFunctions.show();

settings.addEventListener('click', () => {
    myFunctions.show();
    backArrow.addEventListener('click', () => {
        myFunctions.hidden();
    });
});

let highest = parseInt(localStorage.getItem("highestScore")) || 0;
let total = parseInt(localStorage.getItem("totalScore")) || 0;
let bombsOpened = parseInt(localStorage.getItem("totalBombs")) || 0;
let contAllMoves = parseInt(localStorage.getItem("totalMove")) || 0;
let contWins = parseInt(localStorage.getItem("totalWins")) || 0
let succesRate = parseInt(localStorage.getItem("use")) || 0;

let maxScore = parseInt(localStorage.getItem("maxScore")) || 0;


const rateSuccesCalc = () => {
    let BOMBS = parseInt(localStorage.getItem("totalBombs")) || 0;
    let MOVES = parseInt(localStorage.getItem("totalMove")) || 0;

    if (BOMBS === 0) {
        succesRate = 100;
    } else {
        succesRate = ((MOVES - BOMBS) / MOVES) * 100;
    }

    totalUses.innerHTML = `${succesRate.toFixed(2)}%`;
    myFunctions.addInfo(succesRate, 'use');
}

rateSuccesCalc();

totalScore.innerHTML = total;
totalBombs.innerHTML = bombsOpened;
totalMove.innerHTML = contAllMoves;
highestScore.innerHTML = highest;
totalWins.innerHTML = contWins;
totalUses.innerHTML = `${succesRate.toFixed(2)}%`;


const input = document.querySelectorAll('.inputLevel').forEach(inpt => {
    inpt.addEventListener('click', () => {
        if (radioFacil.checked) {
            document.querySelector('.l1').classList.remove('opacity');
        } else {
            document.querySelector('.l1').classList.add('opacity');
        }
            
        if (radioMedio.checked) {
            document.querySelector('.l2').classList.remove('opacity');
        } else {
            document.querySelector('.l2').classList.add('opacity');
        }
            
        if (radioDificil.checked) {
            document.querySelector('.l3').classList.remove('opacity');
        } else {
            document.querySelector('.l3').classList.add('opacity');
        }
            
        if (radioImpossivel.checked) {
            document.querySelector('.l4').classList.remove('opacity');
        } else {
            document.querySelector('.l4').classList.add('opacity');
        }
            
        if (radioLivre.checked) {
            document.querySelector('.l5').classList.remove('opacity');
        } else {
            document.querySelector('.l5').classList.add('opacity');
        }
    });
});

btnConfirm.addEventListener('click', () => {
        
        gameBody.innerHTML = '';
        pointuation.innerHTML = 100;
        moves.innerHTML = 0;
        contadorBombs.innerHTML = 0;
    
        myFunctions.removeMsg();

    let n;
    let verify = false;
    switch (true) {
        case radioFacil.checked:
            n = 25;
            document.querySelector('.mode').innerHTML = 'Fácil';
            console.log(`Facil selected: ${n}`);
            break;
        case radioMedio.checked:
            n = 35;
            document.querySelector('.mode').innerHTML = 'Médio';
            console.log(`Medio selected: ${n}`);
            break;
        case radioDificil.checked:
            n = 45;
            document.querySelector('.mode').innerHTML = 'Difícil';
            console.log(`Dificil selected: ${n}`);
            break;
        case radioImpossivel.checked:
            n = 60;
            document.querySelector('.mode').innerHTML = 'Impossível';
            console.log(`Impossivel selected: ${n}`);
            break;
        case radioLivre.checked:
            console.log(`Livre selected: ${n}`);
            document.querySelector('.mode').innerHTML = 'Livre';
            verify = true;
            n = 20;
            break;
        default:
            alert("Por favor selecione uma opção");
            break;
    }
    const bombCount = n;
    
    hiddenMenu.classList.remove('hidden');
    settings.classList.remove('rotateMenuL');           
                            
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

        for (let i = 0; i < 100; i++) {
            
            let img = document.createElement("img");
            img.src = "img/square.png";
            img.id = `sq${i + 1}`;
            img.classList.add("square");
            img.classList.add("squareClosed");
            img.classList.add("empty");
            gameBody.appendChild(img);
        }
        
        const bombIndices = myFunctions.generateRandom(totalSquares, bombCount);
        
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
                    element.src = "img/emptySquare.png";
                    element.classList.add("emptyOpen");
                    element.classList.remove("squareClosed");
                } else if (element.classList.contains('squareClosed') && element.classList.contains('bomb')) {
                    element.src = "img/bombSquare.png";
                    element.classList.add("bomb");
                    element.classList.remove("squareClosed");
                }
            });
        }
        
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
                    element.src = "img/emptySquare.png";
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
                    myFunctions.addInfo(Number(totalScore.innerHTML), 'totalScore')
    
                } else if (element.classList.contains('squareClosed') && element.classList.contains('bomb') && control) {
                    main.classList.add('shake');
                    element.src = "img/bombSquare.png";
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
                        main.classList.remove('shake');
                    }, 500);
                    bombsOpened++;
                    totalBombs.innerHTML = bombsOpened;
                    myFunctions.addInfo(bombsOpened, 'totalBombs');
                    contAllMoves++;
                }
                
                totalMove.innerHTML = contAllMoves;
                myFunctions.addInfo(contAllMoves, 'totalMove');
    
                control = false;
                pointuation.innerHTML = pts.p;
                
                if (controlMoves) {
                    contMoves++;
                    moves.innerHTML = contMoves;
                    controlMoves = false;
                }
    
                if (contMoves <= 10 && pts.p >= 200 && !verify) {
                    revealAllSquares();
                    setTimeout(() => {
                        soundWin();
                    }, 700);
                    myFunctions.showMessage(`Uau! Isso é impressioante ${playerName}, você ganhou sem estourar nenhuma bomba, você tem meus parabéns!`);
                    gameEnd = true;
                }else if (pts.p <= 0) {
                    revealAllSquares();
                    setTimeout(() => {
                        soundOver();
                    }, 700);
                    myFunctions.showMessage(`Não foi dessa vez ${playerName}, você perdeu!`);
                    gameEnd = true;
                } else if (contMoves === 100 && pts.p < 200 && !verify) {
                    revealAllSquares();
                    setTimeout(() => {
                        soundOver();
                    }, 700);
                    myFunctions.showMessage(`Você não conseguiu completar o desafio, ${playerName}!`);
                    gameEnd = true;
                } else if (pts.p >= 200 && !verify) {
                    revealAllSquares();
                    setTimeout(() => {
                        soundWin();
                    }, 700);
                    myFunctions.showMessage(`Parabéns ${playerName}, você ganhou!`);
                    gameEnd = true;
                } else if (verify && contMoves >= 100) {
                    if (maxScore < pts.p) {
                        maxScore = pts.p;
                        myFunctions.addInfo(maxScore, 'maxScore');
                        myFunctions.showMessage(`Parabéns ${playerName}, seu novo recorde: ${maxScore}!`);
                    } else {
                        myFunctions.showMessage(`Você não conseguiu bater seu recorde ${playerName}, seu recorde atual é: ${maxScore}!`);
                    }
                    revealAllSquares();
                    setTimeout(() => {
                        soundWin();
                    }, 700);
                    gameEnd = true;
                } else if (pts.p <= 0 && verify) {
                    revealAllSquares();
                    setTimeout(() => {
                        soundWin();
                    }, 700);
                    myFunctions.showMessage(`Não foi dessa vez ${playerName}, você perdeu!`);
                    gameEnd = true;
                } 
    
                if (pts.p > highest) {
                    highest = pts.p;
                    highestScore.innerHTML = highest;
                }
    
                myFunctions.addInfo(highest, 'highestScore');
                
                if (pointuation.innerHTML >= 200 && !radioLivre.checked) {
                    contWins++;
                    totalWins.innerHTML = contWins;
                    console.log("Over 200");
                }
                myFunctions.addInfo(Number(contWins), 'totalWins');
                rateSuccesCalc();
            });
        });
        
    };
    
    initializeGame();
    
    const imgRestart = document.querySelector('.imgRestart');
    
    restart.addEventListener('click', () => {
        imgRestart.classList.add("rotate");
        gameBody.innerHTML = '';
        pointuation.innerHTML = 100;
        moves.innerHTML = 0;
        contadorBombs.innerHTML = 0;
    
        myFunctions.removeMsg();
        initializeGame();
    
        setTimeout(() => {
            imgRestart.classList.remove("rotate");
        }, 500);
    });
    
});

document.querySelector('.namePlayerMenu').innerHTML = player.innerHTML + ',';

document.querySelector(".divImgArrow").addEventListener('click', () => {
    const imgArrow = document.querySelector(".imgArrow");
    imgArrow.classList.toggle('rotateMenuL');
    imgArrow.classList.toggle('rotateMenuR');
    document.querySelector(".sideMenu").classList.toggle('showMenu');
});

document.querySelector('.reset').addEventListener('click', () => {
    localStorage.clear();
    location.href = "../../index.html"
});
