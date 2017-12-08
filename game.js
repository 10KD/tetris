const canvas = document.getElementById("tetrix");
const context = canvas.getContext("2d");


context.scale(20, 20);


function createPiece(params) {
    if (params === "Z") {
        const roll = 1;
        // const roll = Math.floor(Math.random() * 2);
        if (roll === 1) {
            return [
                [0, 0, 0],
                [0, 1, 1],
                [1, 1, 0]
            ];    
        // } else {       
        //     return [
        //         [0, 0, 0],
        //         [2, 2, 0],
        //         [0, 2, 2]
        //     ];
        }
    } else if (params === "S") {
        return [
            [0, 0, 0],
            [2, 2, 0],
            [0, 2, 2]
        ];
    } else if (params === "T") {
        return [
            [0, 0, 0],
            [3, 3, 3],
            [0, 3, 0]
        ];
    } else if (params === "O") {
        return [
            [4, 4],
            [4, 4]
        ];
    } else if (params === "L") {
        return [
            [0, 5, 0],
            [0, 5, 0],
            [0, 5, 5]
        ];
    } else if (params === "I") {
        return [
            [0, 6, 0, 0],
            [0, 6, 0, 0],
            [0, 6, 0, 0],
            [0, 6, 0, 0]
        ];
    }
}

const colors = [
    "not a color",
    "#ff0000",
    "#ffff33",
    "#0040ff",
    "#33cc33",
    "#ff33cc",
    "#ff8c1a"
];

const pieceStr = "LISZTO";
function reset() {
    intervalInMs = 320;
    let currTime = Date.now();
    let timeDiff = currTime - startTime;
    if (timeDiff > 135000) {
        intervalInMs = 80;
    } else if (timeDiff > 45000) {
        intervalInMs = 160;
    }
    player.tetromino = createPiece(pieceStr[Math.floor(pieceStr.length * Math.random())]);
    player.pos.y = 0;
    player.pos.x = 4;
    if (collision(matrix, player)) {
        matrix.forEach(row => row.fill(0));
        player.score = 0;
        setScore();
    }
}


const player = {
    tetromino: createPiece(pieceStr[Math.floor(pieceStr.length * Math.random())]),
    pos: { x: 4, y: 0 },
    score: 0
};

function setScore() {
    document.getElementById("score-board").innerText = `score: ${player.score}`;
}

function drawPiece(tetromino, offset) {
    tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
                if (value !== 0) {
                    context.fillStyle = colors[value];
                    context.strokeStyle='black';
                    context.lineWidth=0.1;
                    context.fillRect(
                        x + offset.x, 
                        (y - 3) + offset.y, 
                        1, 1
                    );
                    context.strokeRect(
                        x + offset.x,
                        (y - 3) + offset.y,
                        1, 1
                    );
                    
                }
            }
        );
    });
}

function createMatrix(width, height) {
    const matrix = [];
    while (height) {
        matrix.push(new Array(width).fill(0));
        height--;
    }
    return matrix;
}

function draw() { 
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawPiece(matrix, { x: 0, y: 0 });
    drawPiece(player.tetromino, player.pos);
}

let dropCounter = 0;
let intervalInMs = 320;
let prevTime = 0;
function update(time = 0) {
    setScore();
    const elapsedTime = time - prevTime;
    prevTime = time;
    
    dropCounter += elapsedTime;
    if (dropCounter > intervalInMs) {
        drop();
    }
    draw();
    requestAnimationFrame(update);
}

const matrix = createMatrix(10, 23);

function drop() {
    player.pos.y += 1;
    if (collision(matrix, player)) {
        player.pos.y -= 1;
        merge(matrix, player);
        reset();
        clearRow();
        setScore();
    }
    dropCounter = 0;
}
function merge(arena, user) {
    user.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + user.pos.y][x + user.pos.x] = value;
             }
        });
    });
}

function collision(arena, user) {
    const [tetromino, pos] = [user.tetromino, user.pos];
    for (let y = 0; y < tetromino.length; y++) {
        const row = tetromino[y];
        for (let x = 0; x < row.length; x++) {
            const element = row[x];
            if (element !== 0 && 
                (arena[y + pos.y] && 
                    arena[y + pos.y][x + pos.x]) !== 0) {
                    return true;
                }
            } 
        }
        return false;
}

function move(direction) {
    player.pos.x += direction;
    if (collision(matrix, player)) {
        player.pos.x -= direction;
    }
}

 
function clearRow() {
    let numRows = 1;
    outer: for (let y = matrix.length - 1; y > 0; y--) {
        const row = matrix[y];
        for (let x = 0; x < row.length; x++) {
            const element = row[x];
            if (element === 0) {
                continue outer;
            }
            
        }
        const newRow = matrix.splice(y, 1)[0].fill(0);
        matrix.unshift(newRow);
        y++; 

        player.score += numRows * 10;
        numRows *= 2;
        setScore();
        
    }
}
function rotate(piece, direction) {
    for (let y = 0; y < piece.length; y++) {
       for (let x = 0; x < y; x++) {
           [piece[x][y], piece[y][x]] = [piece[y][x], piece[x][y]];
       }   
    }

    if (direction > 0) {
        piece.forEach(row => row.reverse());
    } else {
        piece.reverse;
    }
}

function rotatePiece(direction) {
    let xPos = player.pos.x;
    rotate(player.tetromino, direction);
    let offset = 1;
    while (collision(matrix, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.tetromino.length) {
            player.pos.x = xPos;
            rotate(player.tetromino, -direction);
            return;

        }
    }
}

document.addEventListener('keydown', e => {
    if (e.keyCode === 37) {
        move(-1);
    } else if (e.keyCode === 39) {
        move(1);
    } else if (e.keyCode === 40) {
        drop();
    } else if (e.keyCode === 38 || e.keyCode === 69) {
        rotatePiece(1);
    } else if (e.keyCode === 32) {
       intervalInMs = 32;
    }
});
const startTime = Date.now();
update();