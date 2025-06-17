module.exports = {
    name: 'religion',
    description: 'Get religious quotes or verses (Quran, Bible, etc.)',
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        const type = args[0];

        switch (type) {
            case 'quran':
                await sock.sendMessage(from, { text: '📖 "Indeed, with hardship comes ease." - Quran 94:6' });
                break;

            case 'bible':
                await sock.sendMessage(from, { text: '✝️ "I can do all things through Christ who strengthens me." - Philippians 4:13' });
                break;

            case 'hindu':
                await sock.sendMessage(from, { text: '🕉️ "You have the right to work, but never to the fruit of work." - Bhagavad Gita 2:47' });
                break;

            default:
                await sock.sendMessage(from, { text: '❌ Specify religion type: quran, bible, hindu\nExample: /religion quran' });
        }
    }
};
