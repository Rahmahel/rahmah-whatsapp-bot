module.exports = {
    name: 'other',
    description: 'Other useful miscellaneous commands',
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        const command = args[0];

        switch (command) {
            case 'runtime':
                const uptime = process.uptime();
                const hours = Math.floor(uptime / 3600);
                const minutes = Math.floor((uptime % 3600) / 60);
                const seconds = Math.floor(uptime % 60);
                await sock.sendMessage(from, { text: `⏱️ Runtime: ${hours}h ${minutes}m ${seconds}s` });
                break;

            case 'info':
                await sock.sendMessage(from, { text: `🤖 Bot Name: RAHMAH\n👤 Owner: Rahmahel\n🔥 Prefix: /\n🚀 Host: Render\n⚙️ Mode: Private\n🛠️ Version: 1.0.0` });
                break;

            case 'rules':
                await sock.sendMessage(from, { text: '📜 *Bot Rules:*\n1. No spamming commands.\n2. No illegal content.\n3. Respect other users.\n4. Abuse will lead to ban.\n\nBy using this bot, you agree to these rules.' });
                break;

            default:
                await sock.sendMessage(from, { text: '❌ Unknown subcommand.\nUsage: /other [runtime|info|rules]' });
        }
    }
};
