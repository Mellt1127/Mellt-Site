// 1. Инициализация данных (пытаемся загрузить из памяти или ставим дефолт)
const savedData = JSON.parse(localStorage.getItem('oceania_player'));

const player = savedData || {
    exp: 0,
    nextLvl: 100,
    lvl: 1,
    energy: 10,
    maxEnergy: 10
};

const island = document.getElementById('island');

// ФУНКЦИЯ СОХРАНЕНИЯ (вызывай её после изменений)
function saveGame() {
    localStorage.setItem('oceania_player', JSON.stringify(player));
}

function updateUI() {
    document.getElementById('lvl').innerText = player.lvl;
    document.getElementById('en-val').innerText = player.energy;
    document.getElementById('exp-val').innerText = player.exp;
    document.getElementById('next-lvl-val').innerText = player.nextLvl;
    
    document.getElementById('exp-fill').style.width = (player.exp / player.nextLvl * 100) + "%";
    document.getElementById('en-fill').style.width = (player.energy / player.maxEnergy * 100) + "%";
}

function showFloatingText(x, y, text) {
    const el = document.createElement('div');
    el.className = 'exp-float';
    el.innerText = `+${text} EXP`;
    el.style.left = x + "px";
    el.style.top = y + "px";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 800);
}

function spawnObject(type) {
    const obj = document.createElement('div');
    obj.className = 'obj';
    
    const config = {
        tree: { img: 'texture/palma.png', hp: 3, exp: 75, size: 90 },
        grass: { img: 'texture/kust.png', hp: 1, exp: 25, size: 50 }
    };

    const settings = config[type];
    let currentHP = settings.hp;

    obj.innerHTML = `<img src="${settings.img}" width="${settings.size}">`;
    
    obj.style.left = Math.random() * 80 + 5 + "%";
    obj.style.top = Math.random() * 70 + 5 + "%";

    obj.onclick = (e) => {
        if (player.energy >= 1) {
            player.energy -= 1;
            currentHP -= 1;

            obj.style.transform = "scale(0.8)";
            setTimeout(() => { obj.style.transform = "scale(1)"; }, 100);

            if (currentHP <= 0) {
                player.exp += settings.exp;
                showFloatingText(e.clientX, e.clientY, settings.exp);
                obj.remove();
                setTimeout(() => spawnObject(Math.random() > 0.3 ? 'grass' : 'tree'), 3000);
            }

            checkLevelUp();
            updateUI();
            saveGame(); // СОХРАНЯЕМ после каждого клика
        } else {
        }
    };

    island.appendChild(obj);
}

function showLevelUpMessage(newLevel) {
    const msg = document.createElement('div');
    msg.className = 'level-up-anim';
    msg.innerHTML = `LEVEL UP!<br><span style="font-size: 40px">Уровень ${newLevel}</span>`;
    document.body.appendChild(msg);
    
    // Удаляем элемент после анимации
    setTimeout(() => msg.remove(), 2000);
}

function checkLevelUp() {
    if (player.exp >= player.nextLvl) {
        player.exp -= player.nextLvl;
        player.lvl++;
        player.nextLvl = Math.round(player.nextLvl * 1.6);
        
        saveGame();
        showLevelUpMessage(player.lvl); // Вызываем красивое сообщение вместо alert
    }
}

setInterval(() => {
    if (player.energy < player.maxEnergy) {
        player.energy++;
        updateUI();
        saveGame(); // СОХРАНЯЕМ при регене энергии
    }
}, 1000);

// Спавним объекты
for(let i = 0; i < 5; i++) spawnObject('grass');
for(let i = 0; i < 3; i++) spawnObject('tree');

updateUI();

