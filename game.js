const canvas = document.getElementById("tetrix");
const context = canvas.getContext("2d");


context.scale(30, 30);
context.fillStyle = "#000";
context.fillRect(0, 0, canvas.width, canvas.height);

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
    drawPiece(player.tetromino, player.pos);
}

function update() {
    draw();
    requestAnimationFrame(update);
}

update();