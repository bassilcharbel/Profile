const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let birdY = 256;
let birdVelocity = 0;
const gravity = 0.5;
const jumpStrength = -8;
let score = 0;
let gameOver = false;
let gameStarted = false;

// Pipe variables
let pipeX = 288;
const pipeWidth = 52;
const pipeGap = 100;
let pipeNorthHeight = Math.floor(Math.random() * (canvas.height - pipeGap));
let pipeSouthHeight = canvas.height - pipeNorthHeight - pipeGap;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bird
    ctx.fillStyle = 'yellow';
    ctx.fillRect(10, birdY, 34, 24);

    if (!gameStarted) {
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText("Press Space to Start", 50, 256);
    }

    if (gameOver) {
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over", 80, 256);
        ctx.fillText("Score: " + score, 80, 296);
        return;
    }

    if(gameStarted) {
        // Draw pipes
        ctx.fillStyle = 'green';
        ctx.fillRect(pipeX, 0, pipeWidth, pipeNorthHeight);
        ctx.fillRect(pipeX, canvas.height - pipeSouthHeight, pipeWidth, pipeSouthHeight);

        // Draw score
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, 10, 20);
    }
}

function update() {
    if (!gameStarted) return;
    if (gameOver) return;

    // Bird physics
    birdVelocity += gravity;
    birdY += birdVelocity;

    // Pipe movement
    pipeX -= 2;
    if (pipeX < -pipeWidth) {
        pipeX = canvas.width;
        pipeNorthHeight = Math.floor(Math.random() * (canvas.height - pipeGap));
        pipeSouthHeight = canvas.height - pipeNorthHeight - pipeGap;
        score++;
    }

    // Collision detection
    if (birdY > canvas.height - 24 || birdY < 0) {
        gameOver = true;
    }
    if (pipeX < 10 + 34 && pipeX + pipeWidth > 10) {
        if (birdY < pipeNorthHeight || birdY + 24 > canvas.height - pipeSouthHeight) {
            gameOver = true;
        }
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        if (!gameStarted) {
            gameStarted = true;
        }
        if (!gameOver) {
            birdVelocity = jumpStrength;
        }
    }
});

gameLoop();
