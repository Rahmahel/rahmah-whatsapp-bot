const axios = require('axios');

module.exports = {
    name: 'ig',
    description: 'Download Instagram photo/video/post',
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;

        if (!args[0]) {
            await sock.sendMessage(from, { text: '❌ Please provide an Instagram post URL.\n\nExample: 🔥ig https://www.instagram.com/p/xxxxxx/' });
            return;
        }

        const url = args[0];

        try {
            const apiUrl = `https://api.akuari.my.id/downloader/igdl?link=${url}`;
            const response = await axios.get(apiUrl);

            if (!response.data || !response.data.respon || response.data.respon.length === 0) {
                await sock.sendMessage(from, { text: '❌ Failed to fetch Instagram media.' });
                return;
            }

            for (const media of response.data.respon) {
                await sock.sendMessage(from, { video: { url: media } });
            }

        } catch (error) {
            console.error('❌ Instagram download error:', error);
            await sock.sendMessage(from, { text: '❌ Error fetching Instagram media.' });
        }
    }
};
