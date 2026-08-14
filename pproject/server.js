const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

// Forwards payload to the local Python Tor tunnel script running on port 5000
const PYTHON_TOR_BRIDGE_URL = 'http://127.0.0.1:5000/send-tor-telegram';

app.post('/api/send-telegram', async (req, res) => {
    try {
        const { signals, marketType } = req.body;

        if (!signals || signals.length === 0) {
            return res.status(400).json({ success: false, error: "No signals provided" });
        }

        const response = await fetch(PYTHON_TOR_BRIDGE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ signals, marketType })
        });

        const result = await response.json();

        if (result.success) {
            res.json({ success: true, message: "Signals transmitted successfully through Tor Tunnel!" });
        } else {
            res.status(500).json({ success: false, error: result.error || "Tor routing failed" });
        }

    } catch (error) {
        console.error("Node-to-Python Bridge Error:", error.message);
        res.status(500).json({ 
            success: false, 
            error: "Could not connect to Python Tor Bridge (Ensure tor_tunnel.py is running on port 5000)" 
        });
    }
});

app.listen(PORT, () => {
    console.log(`SHARK Terminal Server running on http://localhost:${PORT}`);
});