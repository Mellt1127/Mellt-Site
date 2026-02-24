const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Состояние игры
let wood = 0;
let energy = 10;

// Объект дерева
let tree = {
    x: 250,
    y: 150,
    width: 60,
    height: 80,
    hp: 3 // Нужно 3 клика, чтобы срубить
};

// Функция отрисовки
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Рисуем дерево (пока просто коричневый прямоугольник, заменишь на картинку)
    ctx.fillStyle = '#5d4037';
    ctx.fillRect(tree.x, tree.y, tree.width, tree.height);
    
    // Подпись над деревом
    ctx.fillStyle = 'white';
    ctx.fillText(`HP: ${tree.hp}`, tree.x + 15, tree.y - 10);
}

// Обработка клика
canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Проверяем, попал ли клик по дереву
    if (mouseX >= tree.x && mouseX <= tree.x + tree.width &&
        mouseY >= tree.y && mouseY <= tree.y + tree.height) {
        
        harvestTree();
    }
});

function harvestTree() {
    if (energy > 0) {
        tree.hp--;
        energy--;
        updateUI();

        if (tree.hp <= 0) {
            wood += 5;
            tree.hp = 3; // Дерево "выросло" заново для теста
            alert("Дерево срублено! +5 дерева");
            updateUI();
        }
    } else {
        alert("Нет энергии! Подожди немного.");
    }
}

function updateUI() {
    document.getElementById('woodCount').innerText = wood;
    document.getElementById('energyCount').innerText = energy;
}

// Запуск цикла отрисовки
setInterval(draw, 1000 / 60);