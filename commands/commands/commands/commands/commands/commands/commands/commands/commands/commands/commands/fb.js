const axios = require('axios');

module.exports = {
    name: 'fb',
    description: 'Download Facebook video',
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;

        if (!args[0]) {
            await sock.sendMessage(from, { text: '❌ Please provide a Facebook video URL.\n\nExample: 🔥fb https://www.facebook.com/xxxxx' });
            return;
        }

        const url = args[0];

        try {
            const apiUrl = `https://api.akuari.my.id/downloader/fbdl?link=${url}`;
            const response = await axios.get(apiUrl);

            if (!response.data || !response.data.respon || !response.data.respon.length) {
                await sock.sendMessage(from, { text: '❌ Failed to fetch Facebook video.' });
                return;
            }

            const videoUrl = response.data.respon[0];
            await sock.sendMessage(from, { video: { url: videoUrl }, caption: '✅ Facebook video downloaded.' });

        } catch (error) {
            console.error('❌ Facebook download error:', error);
            await sock.sendMessage(from, { text: '❌ Error fetching Facebook video.' });
        }
    }
};
