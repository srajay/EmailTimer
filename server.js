const express = require('express');
const { createCanvas } = require('canvas');
const moment = require('moment-timezone');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (frontend)
app.use(express.static('public'));

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Main countdown image generator endpoint
app.get('/countdown', (req, res) => {
    try {
        // Get parameters from query string
        const target = parseInt(req.query.target); // Target timestamp in milliseconds
        const timezone = req.query.tz || 'UTC';
        const bgColor = req.query.bg || '#667eea';
        const textColor = req.query.text || '#ffffff';
        const fontSize = parseInt(req.query.size) || 24;
        const eventName = req.query.name || '';
        const width = parseInt(req.query.width) || 600;
        const height = parseInt(req.query.height) || 200;

        // Validate required parameter
        if (!target || isNaN(target)) {
            return res.status(400).send('Missing or invalid target timestamp');
        }

        // Calculate time remaining
        const now = moment().tz(timezone);
        const targetMoment = moment(target).tz(timezone);
        const diff = targetMoment.diff(now);

        let days = Math.floor(diff / (1000 * 60 * 60 * 24));
        let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((diff % (1000 * 60)) / 1000);

        // If countdown is finished, show zeros
        if (diff < 0) {
            days = hours = minutes = seconds = 0;
        }

        // Create canvas
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        // Draw background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, width, height);

        // Draw event name if provided
        if (eventName) {
            ctx.fillStyle = textColor;
            ctx.font = `bold ${Math.floor(fontSize * 0.7)}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(eventName, width / 2, 40);
        }

        // Draw countdown boxes
        const startY = eventName ? 90 : 60;
        const boxWidth = 120;
        const boxHeight = 80;
        const gap = 20;
        const totalWidth = (boxWidth * 4) + (gap * 3);
        const startX = (width - totalWidth) / 2;

        const timeUnits = [
            { value: days, label: 'DAYS' },
            { value: hours, label: 'HOURS' },
            { value: minutes, label: 'MINS' },
            { value: seconds, label: 'SECS' }
        ];

        timeUnits.forEach((unit, index) => {
            const x = startX + (index * (boxWidth + gap));

            // Draw box background with transparency
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.fillRect(x, startY, boxWidth, boxHeight);

            // Draw value
            ctx.fillStyle = textColor;
            ctx.font = `bold ${fontSize}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(String(unit.value).padStart(2, '0'), x + boxWidth / 2, startY + 35);

            // Draw label
            ctx.font = `${Math.floor(fontSize * 0.4)}px Arial`;
            ctx.fillText(unit.label, x + boxWidth / 2, startY + 65);
        });

        // Set cache headers to prevent caching (important for email clients)
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        // Send the image
        canvas.createPNGStream().pipe(res);

    } catch (error) {
        console.error('Error generating countdown:', error);
        res.status(500).send('Error generating countdown image');
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Countdown Timer Server running on port ${PORT}`);
    console.log(`📍 Local: http://localhost:${PORT}`);
    console.log(`🖼️  Image endpoint: http://localhost:${PORT}/countdown?target=TIMESTAMP`);
});

module.exports = app;