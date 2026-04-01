function openModal() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("modal").style.display = "block";
}
function closeModal() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("modal").style.display = "none";
}
const eyeImg = document.getElementById('eye-sprite');
const darkenLayer = document.getElementById('screen-darken');
const body = document.body;

document.addEventListener('DOMContentLoaded', function() {
    const eye = document.getElementById('eye-sprite');
    const darken = document.getElementById('screen-darken');
    const modal = document.getElementById('modal');

    if (eye && modal) {
        eye.addEventListener('mouseenter', () => {
            eye.src = 'texture/eye_open.png';
            darken.style.opacity = '0.8';
            setTimeout(() => {
                if (darken.style.opacity === '0.8') {
                    modal.classList.add('shake-active');
                }
            }, 1200);
        });
        eye.addEventListener('mouseleave', () => {
            eye.src = 'texture/eye_close.png';
            darken.style.opacity = '0';
            modal.classList.remove('shake-active');
        });
    }
});

function toggleChatbox() {
    const chatbox = document.getElementById('mellt-chatbox');
    chatbox.style.display = chatbox.style.display === 'none' || chatbox.style.display === '' ? 'flex' : 'none';
    if (chatbox.style.display === 'flex') {
        document.getElementById('user-input').focus();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const melltAssistant = document.getElementById('mellt-assistant');
    if (melltAssistant) {
        melltAssistant.onclick = toggleChatbox;
    }

    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');
    const popularCommands = document.getElementById('popular-commands');
    const melltKnowledge = {
        "привет": "Привет! Рад тебя видеть на моем сайте.",
        "как дела": "У меня все отлично, особенно когда ты тут. Чем могу помочь?",
        "как дела?": "У меня все отлично, особенно когда ты тут. Чем могу помочь?",
        "что делаешь": "Я пишу код, чтобы тебе было интиреснее тут находится!",
        "что делаешь?": "Я пишу код, чтобы тебе было интиреснее тут находится!",
        "кто ты такой?": "Я - Меллт, создатель этого мира, хранитель лора и твой помощник. Моя история находится на странице (Wiki) - отдел: 'Меллт и его сюжет'.",
        "игры": "У меня есть 2 игры - 'Adventure of Spark' и 'Океания' ты можешь их найти на странице Games!",
        "расскажи о сайте": "Этот сайт - мой портал в мир, который я строю. Здесь ты найдешь мои игры, сюжеты и планы на будущее, читать подробнее ты можешь на странице Wiki в отделе 'Про сайт'!",
        "пока": "До встречи! Заходи ещё!",
        "пока!": "До встречи! Заходи ещё!",
        "спасибо": "Не за что! Обращайся!",
        "спасибо!": "Не за что! Обращайся!",
        "1127": "Оу.. Это моя любимая цифра как ты ее угадал?",
        "зеленый": "О! Это же мой любимый цвет!",
        "зеленыи глаз": "Зачем ты написал это...",
        "зеленый глаз": "Зачем ты написал это...",
        "зелёный глаз": "Зачем ты написал это...",
    };

    function sendMessage() {
        const userText = userInput.value.trim();
        if (userText === '') return;

        const userMsg = document.createElement('p');
        userMsg.className = 'user-message';
        userMsg.innerText = userText;
        chatMessages.appendChild(userMsg);

        userInput.value = ''; 
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
            let melltResponse = melltKnowledge[userText.toLowerCase()];
            if (!melltResponse) {
                melltResponse = "Извини, но пока что я не могу ответить на это. Спроси меня о чем-то другом!";
            }
            const melltMsg = document.createElement('p');
            melltMsg.className = 'mellt-message';
            melltMsg.innerText = melltResponse;
            chatMessages.appendChild(melltMsg);
            chatMessages.scrollTop = chatMessages.scrollHeight; 
        }, 800); 
    }

    if (sendButton) {
        sendButton.onclick = sendMessage;
    }

    if (userInput) {
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    if (popularCommands) {
        popularCommands.addEventListener('click', function(e) {
            if (e.target.classList.contains('command-bubble')) {
                userInput.value = e.target.dataset.command;
                sendMessage();
            }
        });
    }

    if (userInput && sendButton) {
        userInput.disabled = false;
        sendButton.disabled = false;
    }
});