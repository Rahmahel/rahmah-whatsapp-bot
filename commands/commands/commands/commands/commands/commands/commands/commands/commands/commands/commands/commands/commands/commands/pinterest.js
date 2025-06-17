const axios = require('axios');

module.exports = {
    name: 'pinterest',
    description: 'Download random image from Pinterest based on query',
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;

        if (!args[0]) {
            await sock.sendMessage(from, { text: '❌ Please provide a search query.\n\nExample: 🔥pinterest aesthetic girl' });
            return;
        }

        const query = args.join(" ");

        try {
            const apiUrl = `https://api.akuari.my.id/search/pinterest?query=${encodeURIComponent(query)}`;
            const response = await axios.get(apiUrl);

            if (!response.data || !response.data.respon || response.data.respon.length === 0) {
                await sock.sendMessage(from, { text: '❌ No results found.' });
                return;
            }

            const result = response.data.respon;
            const randomImage = result[Math.floor(Math.random() * result.length)];

            await sock.sendMessage(from, { image: { url: randomImage }, caption: `🔍 Result for: ${query}` });

        } catch (error) {
            console.error('❌ Pinterest command error:', error);
            await sock.sendMessage(from, { text: '❌ Error fetching Pinterest image.' });
        }
    }
};
