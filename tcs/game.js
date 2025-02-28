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
    alert('游戏结束！');
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
    
    // 启动游戏循环
    gameInterval = setInterval(gameLoop, 100);
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