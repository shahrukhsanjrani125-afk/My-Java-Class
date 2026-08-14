let windowGeneratedSignals = [];

function updateClock() {
    const now = new Date();
    const utcDate = now.toISOString().split('T')[0];
    const utcTime = now.toUTCString().split(' ')[4] + ' UTC';
    
    const dateEl = document.getElementById('current-date');
    const timeEl = document.getElementById('current-time');
    
    if (dateEl) dateEl.innerText = utcDate;
    if (timeEl) timeEl.innerText = utcTime;
}
setInterval(updateClock, 1000);
updateClock();

document.getElementById('generate-signals').addEventListener('click', () => {
    const asset = document.getElementById('asset-select').value;
    const marketType = document.getElementById('market-type-select').value;
    const count = parseInt(document.getElementById('signal-count').value) || 3;
    
    const loadingBox = document.getElementById('loading-box');
    const signalList = document.getElementById('signal-list');
    const copyBtn = document.getElementById('copy-signals');

    signalList.innerHTML = '';
    loadingBox.style.display = 'block';
    copyBtn.style.display = 'none';

    setTimeout(() => {
        loadingBox.style.display = 'none';
        windowGeneratedSignals = [];
        
        const directions = ['CALL (BUY)', 'PUT (SELL)'];
        const now = new Date();

        for (let i = 1; i <= count; i++) {
            const signalTime = new Date(now.getTime() + (i * 5 * 60000));
            const timeString = signalTime.toTimeString().split(' ')[0].substring(0, 5);
            const randomDir = directions[Math.floor(Math.random() * directions.length)];
            
            let metadata = {};
            if (marketType === 'binary') {
                metadata.duration = '5 Minutes';
            } else {
                metadata.lotSize = '0.10 Standard Lot';
            }

            windowGeneratedSignals.push({
                asset: asset,
                time: timeString,
                direction: randomDir,
                metadata: metadata
            });
        }

        windowGeneratedSignals.forEach(sig => {
            const li = document.createElement('li');
            const specDisplay = marketType === 'binary' 
                ? `Duration: ${sig.metadata.duration}` 
                : `Lot Size: ${sig.metadata.lotSize}`;
            
            li.innerHTML = `<strong>${sig.asset}</strong> | ⏰ ${sig.time} | 📈 <strong>${sig.direction}</strong><br><small>(${specDisplay})</small>`;
            signalList.appendChild(li);
        });

        copyBtn.style.display = 'inline-block';
        toastr.success("ML Signals Generated Successfully!");
    }, 1200);
});

document.getElementById('reset-signals').addEventListener('click', () => {
    document.getElementById('signal-list').innerHTML = '';
    document.getElementById('copy-signals').style.display = 'none';
    windowGeneratedSignals = [];
    toastr.info("Terminal Reset.");
});

document.getElementById('copy-signals').addEventListener('click', async () => {
    const marketType = document.getElementById('market-type-select').value;

    if (!windowGeneratedSignals || windowGeneratedSignals.length === 0) {
        toastr.error("No signals to broadcast!");
        return;
    }

    try {
        const response = await fetch('/api/send-telegram', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                signals: windowGeneratedSignals,
                marketType: marketType
            })
        });

        const result = await response.json();
        if (result.success) {
            toastr.success("Signals broadcasted securely via Tor SOCKS5 Tunnel!");
        } else {
            toastr.error("Bridge Error: " + result.error);
        }
    } catch (err) {
        toastr.error("Failed to connect to local Node server.");
        console.error(err);
    }
});