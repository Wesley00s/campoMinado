const gameBody = document.querySelector(".gameBody");
const pointuation = document.querySelector(".points");


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
    img.width = "60";
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
    const explosion = document.getElementById('explosion');
    explosion.play();
    explosion.currentTime = 0;

    setTimeout(() => {
        explosion.pause();
    }, 600);
}

squareArray.forEach(element => {
    
    let control = true;
    element.addEventListener("click", () => {
        if (element.classList.contains('squareClosed') && !element.classList.contains('bomb') && control) {
            element.src = "emptySquare.png";
            element.classList.add("emptyOpen");
            element.classList.remove("squareClosed");
            
            pts.winP();
        } else if (element.classList.contains('squareClosed') && element.classList.contains('bomb') && control) {
            gameBody.classList.add('shake');
            element.src = "bombSquare.png";
            element.classList.add("bomb");
            element.classList.remove("squareClosed");
            explosionSound();            
            setTimeout(() => {
                gameBody.classList.remove('shake');
            }, 500);
        }
        control = false;
        pointuation.innerHTML = pts.p;
        
        if (pts.p <= 0) {
            gameBody.innerHTML = "<h1>Você perdeu<h1>";
        } else if (pts.p >= 200) {
            gameBody.innerHTML = "<h1>Você ganhou<h1>";
            
        }
    });
});
