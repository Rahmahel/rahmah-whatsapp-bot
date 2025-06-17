module.exports = {
    name: 'ping',
    description: 'Check bot response speed',
    async execute(sock, msg) {
        const from = msg.key.remoteJid;
        const start = new Date().getTime();
        const end = new Date().getTime();
        const ping = end - start;

        await sock.sendMessage(from, { text: `🏓 Pong! Response Time: ${ping} ms` });
    }
};
