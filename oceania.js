const player = {
    exp: 0,
    nextLvl: 100,
    lvl: 1,
    energy: 10,
    maxEnergy: 10
};

const island = document.getElementById('island');

function updateUI() {
    document.getElementById('lvl').innerText = player.lvl;
    document.getElementById('en-val').innerText = player.energy;
    document.getElementById('exp-val').innerText = player.exp;
    document.getElementById('next-lvl-val').innerText = player.nextLvl;
    
    document.getElementById('exp-fill').style.width = (player.exp / player.nextLvl * 100) + "%";
    document.getElementById('en-fill').style.width = (player.energy / player.maxEnergy * 100) + "%";
}

// Функция для летящего текста опыта
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
    
    // Расположение
    obj.style.left = Math.random() * 80 + 5 + "%";
    obj.style.top = Math.random() * 70 + 5 + "%";

    obj.onclick = (e) => {
        if (player.energy >= 1) {
            player.energy -= 1;
            currentHP -= 1;

            // Эффект удара
            obj.style.transform = "scale(0.8)";
            setTimeout(() => { obj.style.transform = "scale(1)"; }, 100);

            if (currentHP <= 0) {
                player.exp += settings.exp;
                
                // Показываем опыт в месте клика
                showFloatingText(e.clientX, e.clientY, settings.exp);
                
                obj.remove();
                setTimeout(() => spawnObject(Math.random() > 0.3 ? 'grass' : 'tree'), 3000);
            }

            checkLevelUp();
            updateUI();
        } else {
            alert("Нужно подождать! Энергия восстанавливается...");
        }
    };

    island.appendChild(obj);
}

function checkLevelUp() {
    if (player.exp >= player.nextLvl) {
        player.exp -= player.nextLvl;
        player.lvl++;
        player.nextLvl = Math.round(player.nextLvl * 1.6);
        alert("🎉 Новый уровень: " + player.lvl);
    }
}

// Регенерация энергии (каждые 7 секунд)
setInterval(() => {
    if (player.energy < player.maxEnergy) {
        player.energy++;
        updateUI();
    }
}, 7000);

// Создаем объекты при старте
for(let i = 0; i < 5; i++) spawnObject('grass');
for(let i = 0; i < 3; i++) spawnObject('tree');

updateUI();