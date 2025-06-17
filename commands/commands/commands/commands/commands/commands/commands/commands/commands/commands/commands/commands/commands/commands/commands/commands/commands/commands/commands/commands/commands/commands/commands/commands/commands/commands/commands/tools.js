const moment = require('moment-timezone');
const os = require('os');

module.exports = {
    name: 'tools',
    description: 'Display useful tools and system information.',
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;

        const ram = (os.totalmem() - os.freemem()) / 1024 / 1024;
        const totalRam = os.totalmem() / 1024 / 1024;
        const uptime = process.uptime();

        const toolsText = `
🛠️ *RAHMAH BOT TOOLS* 🛠️

🕒 *Current Time:* ${moment().tz("Africa/Nairobi").format("YYYY-MM-DD HH:mm:ss")}
🖥️ *Platform:* ${os.platform()}
💾 *RAM Usage:* ${ram.toFixed(2)} MB / ${totalRam.toFixed(2)} MB
⏳ *Uptime:* ${Math.floor(uptime / 60)} mins

Available Mini Tools:
• /calc <expression>  - Simple calculator
• /shorten <url>      - Shorten a URL (coming soon)
`;

        await sock.sendMessage(from, { text: toolsText });
    }
};
