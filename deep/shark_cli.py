import time
import random
from datetime import datetime
import requests
import sys

# Official Bot Credentials & Target ID
BOT_TOKEN = "8963637266:AAG17glqT4caOw_BmmWPWQxC40aWfL-zR7U"
CHAT_ID = "6388422222"
INTERVAL_SECONDS = 180  # 3 minutes gap

def print_banner():
    print("=" * 65)
    print("🦈 SHARK VIP - PURE CLI AUTONOMOUS TRADING BOT [VPN SECURED]")
    print(f"🎯 Target Chat ID : {CHAT_ID}")
    print(f"⏱️ Automation Interval : 180 seconds (3 Minutes)")
    print("🛑 Press Ctrl+C anytime to stop the CLI process.")
    print("=" * 65)

def main():
    print_banner()
    
    assets = ["EUR/USD", "GBP/USD", "BTC/USD", "XAU/USD"]
    directions = ["CALL (BUY)", "PUT (SELL)"]
    market_types = ["binary", "forex"]

    cycle = 1
    while True:
        try:
            print(f"\n[🔄] Executing Automated Cycle #{cycle} | {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
            
            market_type = random.choice(market_types)
            asset = random.choice(assets)
            direction = random.choice(directions)

            now = datetime.now()
            time_str = now.strftime("%H:%M")
            spec = "Duration: 5 Minutes" if market_type == 'binary' else "Lot Size: 0.10 Standard Lot"
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

‼️ 𝗠𝗟 𝗔𝗟𝗚𝗢𝗥𝗜𝗧𝗛𝗠 𝗩𝗘𝗥𝗜𝗙𝗜𝗘𝗗.  
‼️ 𝗠𝗔𝗡𝗔𝗚𝗘 𝗬𝗢𝗨𝗥 𝗥𝗜𝗦𝗞 𝗣𝗥𝗢𝗣𝗘𝗥𝗟𝗬.  
"""

            print(f"[📊] Signal Generated -> Asset: {asset} | Type: {market_type.upper()} | Action: {direction}")
            
            telegram_url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
            payload = {
                "chat_id": CHAT_ID,
                "text": full_format
            }

            print("[📤] Dispatching payload via VPN Tunnel...")
            response = requests.post(telegram_url, json=payload, timeout=15)
            res_json = response.json()

            if res_json.get("ok"):
                print(f"[✅ SUCCESS] Signal successfully delivered to Telegram ID: {CHAT_ID} 🎉")
            else:
                print(f"[❌ ERROR] Telegram rejected payload: {res_json.get('description', 'Unknown error')}")

            cycle += 1
            print(f"[⏳] Next automated cycle in 3 minutes...\n" + "-"*55)
            time.sleep(INTERVAL_SECONDS)

        except KeyboardInterrupt:
            print("\n[🛑] CLI Bot manually stopped by user. Exiting safely...")
            sys.exit(0)
        except Exception as e:
            print(f"[⚠️ WARNING] Network/Execution error: {e}")
            print("[⏳] Retrying in 30 seconds...")
            time.sleep(30)

if __name__ == "__main__":
    main()