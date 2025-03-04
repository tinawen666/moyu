const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [
    { x: 10, y: 10 }
];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let gameInterval;
let isGameRunning = false;

// 游戏主循环
function gameLoop() {
    if (!isGameRunning) return;
    updateSnake();
    checkCollision();
    drawGame();
}

// 更新蛇的位置
function updateSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    
    if (head.x === food.x && head.y === food.y) {
        generateFood();
        updateScore();
    } else {
        snake.pop();
    }
}

// 检查碰撞
function checkCollision() {
    const head = snake[0];
    
    // 检查墙壁碰撞
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver();
    }
    
    // 检查自身碰撞
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }
}

// 绘制游戏画面
function drawGame() {
    // 清空画布
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制蛇
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });
    
    // 绘制食物
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

// 生成新的食物
function generateFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
}

// 游戏结束
function gameOver() {
    isGameRunning = false;
    clearInterval(gameInterval);
    showGameOver();
}

// 开始游戏
function startGame() {
    if (isGameRunning) return;
    
    // 重置游戏状态
    snake = [{ x: 10, y: 10 }];
    dx = 1;
    dy = 0;
    generateFood();
    isGameRunning = true;
    
    // 启动游戏循环，使用初始慢速度
    if (gameInterval) {
        clearInterval(gameInterval);
    }
    gameInterval = setInterval(gameLoop, 300);
}

// 停止游戏
function stopGame() {
    isGameRunning = false;
    clearInterval(gameInterval);
}

// 键盘控制
document.addEventListener('keydown', (event) => {
    if (!isGameRunning) return;
    
    switch (event.key) {
        case 'ArrowUp':
            if (dy !== 1) { dx = 0; dy = -1; }
            break;
        case 'ArrowDown':
            if (dy !== -1) { dx = 0; dy = 1; }
            break;
        case 'ArrowLeft':
            if (dx !== 1) { dx = -1; dy = 0; }
            break;
        case 'ArrowRight':
            if (dx !== -1) { dx = 1; dy = 0; }
            break;
    }
});

// 按钮事件监听
startBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', stopGame);

// 为了更好地管理速度，添加速度常量
const INITIAL_SPEED = 300;  // 初始速度（较慢）
const FAST_SPEED = 100;     // 达到10分后的速度（较快）

// 修改 updateScore 函数
function updateScore() {
    const currentScoreElement = document.getElementById('currentScore');
    const score = snake.length - 1;
    currentScoreElement.textContent = score;
    
    // 当分数达到10时加快速度
    if (score === 10) {
        clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop, FAST_SPEED);
    }
}

// 在游戏结束时显示弹框
function showGameOver() {
    const finalScoreElement = document.getElementById('finalScore');
    const currentScore = document.getElementById('currentScore').textContent;
    finalScoreElement.textContent = currentScore;
    document.getElementById('gameOverModal').style.display = 'block';
}

// 在游戏重启时重置状态
document.addEventListener('restartGame', function() {
    // 重置蛇的位置和长度
    snake = [{ x: 10, y: 10 }];
    // 重置食物位置
    generateFood();
    // 重置方向
    dx = 1;
    dy = 0;
    // 重置分数显示
    document.getElementById('currentScore').textContent = '0';
    // 启动游戏循环，使用初始慢速度
    isGameRunning = true;
    if (gameInterval) {
        clearInterval(gameInterval);
    }
    gameInterval = setInterval(gameLoop, 300); // 改回初始慢速度
}); 