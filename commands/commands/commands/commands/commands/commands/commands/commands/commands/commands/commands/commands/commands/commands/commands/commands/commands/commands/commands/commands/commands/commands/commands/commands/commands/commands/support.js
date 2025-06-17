module.exports = {
    name: 'support',
    description: 'Display bot support and contact information.',
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;

        const supportText = `
🤖 *RAHMAH BOT SUPPORT INFO* 🤖

📞 *Owner Contact:* wa.me/1234567890
🌍 *GitHub:* https://github.com/Rahmahel/rahmah-whatsapp-bot
💬 *Need help?* DM the owner or open an issue on GitHub.

🙏 Thank you for using RAHMAH Bot!
`;

        await sock.sendMessage(from, { text: supportText });
    }
};
