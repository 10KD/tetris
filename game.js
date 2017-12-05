const canvas = document.getElementById("tetrix");
const context = canvas.getContext("2d");


context.scale(30, 30);
context.fillStyle = "#000";
context.fillRect(0, 0, canvas.width, canvas.height);

const pieceMatrix = [
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0]
];

pieceMatrix.forEach((row, i) => {
    row.forEach((value, j) => {
            if (value !== 0) {
                context.fillStyle = "#33cc33";
                context.fillRect(j, i, 1, 1);
            }
        }
    )
});