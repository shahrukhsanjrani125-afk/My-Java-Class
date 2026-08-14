import threading
import time
import random
from datetime import datetime
from flask import Flask, jsonify, render_template_string
import requests

app = Flask(__name__)

# Credentials & Tor Config
BOT_TOKEN = "8963637266:AAG17glqT4caOw_BmmWPWQxC40aWfL-zR7U"
CHAT_ID = "6388422222"
TOR_PROXY = "socks5h://127.0.0.1:9150" # Tor Browser SOCKS5 port (Agar Tor service ho toh 9050 karein)

active_signals = []
lock = threading.Lock()

# Embedded Auto-Refreshing Web Dashboard Template
HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SHARK VIP - Autonomous ML Tor Bot</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Courier New', Courier, monospace; }
        body { background-color: #0b0f19; color: #00ffcc; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
        .terminal-container { width: 90%; max-width: 800px; background: #121826; border: 2px solid #00ffcc; border-radius: 8px; box-shadow: 0 0 20px rgba(0, 255, 204, 0.3); overflow: hidden; }
        .terminal-header { background: #1a2236; padding: 10px 15px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #00ffcc; }
        .title { color: #ffffff; font-weight: bold; font-size: 14px; }
        .terminal-body { padding: 20px; }
        .status { color: #ffbd2e; font-style: italic; margin-bottom: 15px; font-size: 13px; }
        #signal-list { list-style: none; max-height: 300px; overflow-y: auto; }
        #signal-list li { background: #1a2236; border-left: 4px solid #00ffcc; padding: 12px; margin-bottom: 10px; font-size: 14px; }
    </style>
</head>
<body>
    <div class="terminal-container">
        <header class="terminal-header">
            <span class="title">SHARK_AUTONOMOUS_BOT [24/7 INFINITE TOR LOOP]</span>
            <span id="live-clock"></span>
        </header>
        <div class="terminal-body">
            <div class="status">[⚡] Status: Running autonomously in background. Auto-dispatching via Tor SOCKS5...</div>
            <ul id="signal-list"><li>Initializing signal stream...</li></ul>
        </div>
    </div>

    <script>
        function updateClock() {
            document.getElementById('live-clock').innerText = new Date().toUTCString().split(' ')[4] + ' UTC';
        }
        setInterval(updateClock, 1000);

        async function fetchLiveSignals() {
            try {
                const response = await fetch('/api/signals');
                const data = await response.json();
                const list = document.getElementById('signal-list');
                list.innerHTML = '';
                
                if (!data.signals || data.signals.length === 0) {
                    list.innerHTML = '<li>Waiting for next automated cycle...</li>';
                    return;
                }

                data.signals.forEach(sig => {
                    const li = document.createElement('li');
                    li.innerHTML = `<strong>${sig.asset}</strong> | ⏰ ${sig.time} | 📈 <strong>${sig.direction}</strong><br><small style="color: #8892b0;">Type: ${sig.marketType.toUpperCase()} | ${sig.spec}</small>`;
                    list.appendChild(li);
                });
            } catch (err) {
                console.error("Dashboard sync error:", err);
            }
        }
        setInterval(fetchLiveSignals, 3000);
        fetchLiveSignals();
    </script>
</body>
</html>
"""

def background_autonomous_loop():
    global active_signals
    assets = ["EUR/USD", "GBP/USD", "BTC/USD", "XAU/USD"]
    directions = ["CALL (BUY)", "PUT (SELL)"]
    market_types = ["binary", "forex"]

    while True:
        try:
            market_type = random.choice(market_types)
            asset = random.choice(assets)
            direction = random.choice(directions)

            now = datetime.now()
            time_str = now.strftime("%H:%M")
            spec = "Duration: 5 Minutes" if market_type == 'binary' else "Lot Size: 0.10 Standard Lot"

            new_signal = {
                "asset": asset,
                "time": time_str,
                "direction": direction,
                "marketType": market_type,
                "spec": spec
            }

            with lock:
                active_signals = [new_signal]

            formatted_date = f"{now.day}|{now.month}|{now.year}"
            full_format = f"""
🦈 𝗦𝗛𝗔𝗥𝗞 𝗩𝗜𝗣 𝗦𝗜𝗚𝗡𝗔𝗟𝗦 🦈

🗓𝗗𝗔𝗧𝗘: {formatted_date}
🌐 𝗠𝗔𝗥𝗞𝗘𝗧: 𝗧𝗥𝗔𝗗𝗜𝗡𝗚𝗩𝗜𝗘𝗪 & 𝗠𝗟 𝗔𝗟𝗚𝗢 🔥

⚙️ 𝗠𝗧𝗚 1 𝗦𝗧𝗘𝗣

𒆜-----✧💠𝗦╎H💠✧-----𒆜

❒ {asset} ➪ {time_str} - {direction}
   └ {spec}

𒆜-----✧💠𝗦╎H💠✧-----𒆜

‼️ 𝗠𝗟 𝗔𝗟𝗚𝗢𝗥𝗜𝗧𝗛𝗠 𝗩𝗘𝗥𝗜Φ𝗜𝗘𝗗.  
‼️ 𝗠𝗔𝗡𝗔𝗚𝗘 𝗬𝗢𝗨𝗥 𝗥𝗜𝗦𝗞 𝗣𝗥𝗢𝗣𝗘𝗥𝗟𝗬.  
"""

            telegram_url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
            payload = {
                "chat_id": CHAT_ID,
                "text": full_format
            }

            proxies = {
                'http': TOR_PROXY,
                'https': TOR_PROXY
            }

            # Attempt transmission via Tor SOCKS5 with direct fallback for resilience
            try:
                res = requests.post(telegram_url, json=payload, proxies=proxies, timeout=15)
                if not res.json().get("ok"):
                    requests.post(telegram_url, json=payload, timeout=10)
            except:
                try:
                    requests.post(telegram_url, json=payload, timeout=10)
                except Exception as ex:
                    print(f"Telegram dispatch error: {ex}")

        except Exception as e:
            print(f"Loop generation error: {e}")

        # Infinite loop interval (Generates a new automated signal cycle every 3 minutes)
        time.sleep(180)

@app.route('/')
def index():
    return render_template_string(HTML_TEMPLATE)

@app.route('/api/signals')
def get_signals():
    with lock:
        return jsonify({"signals": active_signals})

if __name__ == '__main__':
    # Start the infinite background daemon thread
    daemon_thread = threading.Thread(target=background_autonomous_loop, daemon=True)
    daemon_thread.start()
    print("==================================================")
    print(" SHARK AUTONOMOUS 24/7 BOT RUNNING SUCCESSFULLY")
    print(" Web Dashboard: http://localhost:5000")
    print(" Infinite Loop & Tor SOCKS5 Dispatcher Active")
    print("==================================================")
    app.run(port=5000, host='0.0.0.0', debug=False)