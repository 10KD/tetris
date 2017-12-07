const canvas = document.getElementById("tetrix");
const context = canvas.getContext("2d");


context.scale(30, 30);


const tetrominoS = [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1]
];

const player = {
    tetromino: tetrominoS,
    pos: { x: 4, y: 0 },
};


function drawPiece(tetromino, offset) {
    tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
                if (value !== 0) {
                    context.fillStyle = "#33cc33";
                    context.fillRect(
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
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawPiece(matrix, { x: 0, y: 0 });
    drawPiece(player.tetromino, player.pos);
}

let dropCounter = 0;
let intervalInMs = 32;
let prevTime = 0;
function update(time = 0) {
    const elapsedTime = time - prevTime;
    prevTime = time;
    
    dropCounter += elapsedTime;
    if (dropCounter > intervalInMs) {
        drop();
    }
    draw();
    requestAnimationFrame(update);
}

const matrix = createMatrix(12, 23);

function drop() {
    player.pos.y += 1;
    if (collision(matrix, player)) {
        player.pos.y -= 1;
        merge(matrix, player);
        player.pos.y = 0;
        player.pos.x = 4;
    }
    dropCounter = 0;
}
function merge(arena, user) {
    user.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
            if (arena[y + user.pos.y][x + user.pos.x] === 0) {
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
        console.log("nope");
    }
})

update();