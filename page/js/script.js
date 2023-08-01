const gameBody = document.querySelector(".gameBody");
const pointuation = document.querySelector(".points");
const moves = document.querySelector(".moves");
const revealGame = document.querySelector(".revealGame");
const contadorBombs = document.querySelector(".bombas");
const player = document.querySelector(".player");
const changeName = document.querySelector(".changeName");
const main = document.querySelector(".main");
const rules = document.querySelector(".rules");
const bgMusic = document.querySelector('#bgMusic');
const play = document.querySelector('.play');


const createRules = () => {
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    p1.classList.add('obj');
    p2.classList.add('nBombs');

    rules.appendChild(p1);
    rules.appendChild(p2);
};

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

    soundEfects:
        mySounds = {
            explosionSound: () => {
                const explosion = document.querySelector('#explosion');
                explosion.play();
                explosion.currentTime = 0;
            
                setTimeout(() => {
                    explosion.pause();
                }, 600);
            },
            
            openSound: () => {
                const open = document.querySelector('#open');
                open.play();
                open.currentTime = 0;
            
                setTimeout(() => {
                    open.pause();
                }, 600);
            },

            soundMenu: () => {
                const soundMenu = document.querySelector('#soundMenu');
                soundMenu.play();
                soundMenu.currentTime = 0;
            },
            
            soundWin: () => {
                const gameWin = document.querySelector('#gameWin');
                gameWin.play();
                gameWin.currentTime = 0;
            },
            
            soundOver: () => {
                const gameOver = document.querySelector('#gameOver');
                gameOver.play();
                gameOver.currentTime = 0;

            },

            soundBg: () => {
                if (bgMusic.paused) {
                    play.setAttribute('src', 'img/pause.png');
                    bgMusic.play();
                    bgMusic.volume -= 0.15;
                    bgMusic.currentTime = 0;
                } else {
                    play.setAttribute('src', 'img/play.png');
                    bgMusic.pause();
                }
            },
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



myFunctions.soundEfects.soundBg();

play.addEventListener('click', () => {
    myFunctions.soundEfects.soundBg();
    bgMusic.addEventListener('ended', () => {
        myFunctions.soundEfects.soundBg();
    });
});

const hiddenBackArrow = () => {
    myFunctions.show();
    backArrow.style.opacity = 0;
}

hiddenBackArrow();

settings.addEventListener('click', () => {
    backArrow.style.opacity = 1;
    backArrow.addEventListener('mouseenter', () => {
        backArrow.style.opacity = 0.5
    });

    backArrow.addEventListener('mouseout', () => {
        backArrow.style.opacity = 1
    });

    myFunctions.show();
    gameBody.classList.add('visibility');
    backArrow.addEventListener('click', () => {
        gameBody.classList.remove('visibility');
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

if (performance.navigation.type === 1) {
    play.setAttribute('src', 'img/play.png');
}

btnConfirm.addEventListener('click', () => {
    createRules();
        gameBody.classList.remove('visibility');
        gameBody.innerHTML = '';
        pointuation.innerHTML = 100;
        moves.innerHTML = 0;
        contadorBombs.innerHTML = 0;
    
        myFunctions.removeMsg();

    const mode = document.querySelector('.mode');
    const obj = document.querySelector('.obj');
    const nBombs = document.querySelector('.nBombs');
    const takeLoss = document.querySelector('.takeLoss');
    
    let verify = false;
    const checkRadio = () => {
        let n;
        switch (true) {
            case radioFacil.checked:
                n = 30;
                
                mode.innerHTML = 'Fácil';
                obj.innerHTML = 'Objetivo: 200pts';
                nBombs.innerHTML = `${n} bombas em campo, isso será fácil para você, ${playerName}!`;
                break;
            case radioMedio.checked:
                n = 40;
                mode.innerHTML = 'Médio';
                obj.innerHTML = 'Objetivo: 200pts';
                nBombs.innerHTML = `${n} bombas em campo, é um poco mais desafiador, mas nada que você não dê conta, ${playerName}!`;
                break;
            case radioDificil.checked:
                n = 50;
                mode.innerHTML = 'Difícil';
                obj.innerHTML = 'Objetivo: 200pts';
                nBombs.innerHTML = `${n} bombas em campo, você terá que ter um pouco mais de cuidado, ${playerName}!`;
                break;
            case radioImpossivel.checked:
                n = 60;
                mode.innerHTML = 'Impossível';
                obj.innerHTML = 'Objetivo: 200pts';
                nBombs.innerHTML = `${n} bombas em campo, tente a sorte... você vai precisar, ${playerName}!`;
                break;
            case radioLivre.checked:
                n = 20;
                mode.innerHTML = 'Livre';
                obj.innerHTML = 'Bata seu recorde!';
                nBombs.innerHTML = `Aqui você não tem limites de pontos, você define seu própio limite, ${playerName}!`;
                verify = true;
                break;
            default:
                alert("Por favor selecione uma opção");
                break;
        }
        return n;
    }
    const bombCount = checkRadio();
    
    hiddenMenu.classList.remove('hidden');
    settings.classList.remove('rotateMenuL');           
                            
    const initializeGame = () => {

        createRules();
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
                    myFunctions.soundEfects.openSound();
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
                    myFunctions.soundEfects.explosionSound();
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
                    rules.innerHTML = '';
                    revealAllSquares();
                    setTimeout(() => {
                        myFunctions.soundEfects.soundWin();
                    }, 700);
                    myFunctions.showMessage(`Uau! Isso é impressioante ${playerName}, você ganhou sem estourar nenhuma bomba, você tem meus parabéns!`);
                    gameEnd = true;
                } else if (pts.p <= 0) {
                    rules.innerHTML = '';
                    revealAllSquares();
                    setTimeout(() => {
                        myFunctions.soundEfects.soundOver();
                    }, 700);
                    myFunctions.showMessage(`Não foi dessa vez ${playerName}, você perdeu!`);
                    gameEnd = true;
                } else if (contMoves === 100 && pts.p < 200 && !verify) {
                    rules.innerHTML = '';
                    revealAllSquares();
                    setTimeout(() => {
                        myFunctions.soundEfects.soundOver();
                    }, 700);
                    myFunctions.showMessage(`Você não conseguiu completar o desafio, ${playerName}!`);
                    gameEnd = true;
                } else if (pts.p >= 200 && !verify) {
                    rules.innerHTML = '';
                    revealAllSquares();
                    setTimeout(() => {
                        myFunctions.soundEfects.soundWin();
                    }, 700);
                    myFunctions.showMessage(`Parabéns ${playerName}, você ganhou!`);
                    gameEnd = true;
                } else if (verify && contMoves >= 80) {
                    rules.innerHTML = '';
                    if (maxScore < pts.p) {
                        maxScore = pts.p;
                        myFunctions.addInfo(maxScore, 'maxScore');
                        myFunctions.showMessage(`Parabéns ${playerName}, seu novo recorde: ${maxScore}!`);
                    } else {
                        myFunctions.showMessage(`Você não conseguiu bater seu recorde ${playerName}, seu recorde atual é: ${maxScore}!`);
                    }
                    revealAllSquares();
                    setTimeout(() => {
                        myFunctions.soundEfects.soundWin();
                    }, 700);
                    gameEnd = true;
                } else if (pts.p <= 0 && verify) {
                    rules.innerHTML = '';
                    revealAllSquares();
                    setTimeout(() => {
                        myFunctions.soundEfects.soundWin();
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
    
    createRules();
    const imgRestart = document.querySelector('.imgRestart');
    
    imgRestart.addEventListener('click', () => {
        
        imgRestart.classList.add("rotate");
        gameBody.innerHTML = '';
        pointuation.innerHTML = 100;
        moves.innerHTML = 0;
        contadorBombs.innerHTML = 0;
        
        myFunctions.removeMsg();
        initializeGame();
        btnConfirm.click();
    
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
    myFunctions.soundEfects.soundMenu();
    document.querySelector(".sideMenu").classList.toggle('showMenu');
    main.classList.remove('sideMenu');
});

main.addEventListener('click', (event) => {
    const sideMenu = document.querySelector(".sideMenu");
    const imgArrow = document.querySelector(".imgArrow");

    if (!sideMenu.contains(event.target) && !imgArrow.contains(event.target)) {
        sideMenu.classList.remove('showMenu');
        imgArrow.classList.remove('rotateMenuR');
        imgArrow.classList.add('rotateMenuL');
        main.classList.add('closeHidden');
    }
});

document.querySelector('.reset').addEventListener('click', () => {
    const confirmation = confirm('Você tem certeza que deseja resetar seu progresso?');
    if (confirmation) {
        localStorage.clear();
        location.href = "../../index.html"
    } else {
        alert('Seu progresso atual foi mantido');
    }
});
