const axios = require('axios');

module.exports = {
    name: 'twitter',
    description: 'Download Twitter/X video',
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;

        if (!args[0]) {
            await sock.sendMessage(from, { text: '❌ Please provide a Twitter/X video URL.\n\nExample: 🔥twitter https://twitter.com/xxxxx' });
            return;
        }

        const url = args[0];

        try {
            const apiUrl = `https://api.akuari.my.id/downloader/twitter?link=${url}`;
            const response = await axios.get(apiUrl);

            if (!response.data || !response.data.respon || !response.data.respon.length) {
                await sock.sendMessage(from, { text: '❌ Failed to fetch Twitter video.' });
                return;
            }

            const videoUrl = response.data.respon[0].link;
            await sock.sendMessage(from, { video: { url: videoUrl }, caption: '✅ Twitter video downloaded.' });

        } catch (error) {
            console.error('❌ Twitter download error:', error);
            await sock.sendMessage(from, { text: '❌ Error fetching Twitter video.' });
        }
    }
};
