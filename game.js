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
    pos: { x: 3, y: 3 },
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

function draw() { 
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawPiece(player.tetromino, player.pos);
}

let prevTime = 0;
function update(time = 0) {
    const elapsedTime = time - prevTime;
    prevTime = time;
    draw();
    requestAnimationFrame(update);
}

update();