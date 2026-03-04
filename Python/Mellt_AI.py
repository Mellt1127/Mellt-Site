import ollama
import pyttsx3
import json
import os
import speech_recognition as sr

# --- ИНИЦИАЛИЗАЦИЯ ---
engine = pyttsx3.init()
r = sr.Recognizer()
m = sr.Microphone()

def speak(text):
    engine.say(text)
    engine.runAndWait()

MEMORY_FILE = "mellt_memory.json"
WAKE_WORD = "меллт" # Твое кодовое слово

def load_memory():
    if os.path.exists(MEMORY_FILE):
        with open(MEMORY_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return [{'role': 'system', 'content': "Твое описание личности здесь..."}]

def save_memory(history):
    # Чтобы JSON не стал весом в 1Гб, храним последние 20 сообщений
    if len(history) > 21: # 1 (system prompt) + 20 сообщений
        history = [history[0]] + history[-20:]
    with open(MEMORY_FILE, 'w', encoding='utf-8') as f:
        json.dump(history, f, ensure_ascii=False, indent=4)
    return history

def listen():
    """Слушает микрофон и превращает в текст"""
    with m as source:
        r.adjust_for_ambient_noise(source, duration=1) # Подстройка под шум
        print("Слушаю...")
        audio = r.listen(source)
    try:
        return r.recognize_google(audio, language="ru-RU").lower()
    except:
        return ""

def chat_with_mellt():
    print(f"--- МЕЛЛТ v3.0 АКТИВИРОВАН (Режим прослушки) ---")
    history = load_memory()

    while True:
        voice_data = listen()
        
        if WAKE_WORD in voice_data:
            # Отрезаем имя "Меллт" из запроса
            user_query = voice_data.replace(WAKE_WORD, "").strip()
            
            if not user_query:
                speak("Да, Создатель?")
                user_query = listen() # Слушаем сам вопрос, если была пауза

            if user_query:
                print(f"Кевин: {user_query}")
                history.append({'role': 'user', 'content': user_query})

                try:
                    response = ollama.chat(model='llama3', messages=history)
                    reply = response['message']['content']
                    
                    print(f"Меллт: {reply}")
                    speak(reply)

                    history.append({'role': 'assistant', 'content': reply})
                    history = save_memory(history)
                except Exception as e:
                    print(f"Ошибка: {e}")

if __name__ == "__main__":
    chat_with_mellt()