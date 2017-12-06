const canvas = document.getElementById("tetrix");
const context = canvas.getContext("2d");


context.scale(30, 30);


const tetrominoS = [
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0]
];

const player = {
    tetromino: tetrominoS,
    pos: { x: 4, y: -3 },
};


function drawPiece(tetromino, offset) {
    tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
                if (value !== 0) {
                    context.fillStyle = "#33cc33";
                    context.fillRect(
                        x + offset.x, 
                        y + offset.y, 
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
    drawPiece(player.tetromino, player.pos);
}

let dropCounter = 0;
function drop() {
    player.pos.y += 1;
    dropCounter = 0;
}
let intervalInMs = 300;
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

const matrix = createMatrix(12, 20);

function merge(arena, user) {
    user.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
            arena[y + user.pos.y][x + user.pos.x] = value;
        });
    });
}

// function collision(arena, user) {
//     const [anotherMatrix, offset] = [user.tetromino, user.pos];

// }


document.addEventListener('keydown', e => {
    if (e.keyCode === 37) {
        player.pos.x -= 1;
    } else if (e.keyCode === 39) {
        player.pos.x += 1;
    } else if (e.keyCode === 40) {
        drop();
    } else if (e.keyCode === 38 || e.keyCode === 69) {
        console.log(e.keyCode);
    }
})

update();