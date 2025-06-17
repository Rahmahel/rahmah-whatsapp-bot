const axios = require('axios');

module.exports = {
    name: 'image',
    description: 'Get a random AI generated image',
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;

        try {
            const apiUrl = 'https://api.akuari.my.id/ai/gptimg?chat=beautiful landscape';
            const response = await axios.get(apiUrl);

            if (!response.data || !response.data.url) {
                await sock.sendMessage(from, { text: '❌ Failed to fetch image.' });
                return;
            }

            const imgUrl = response.data.url;

            await sock.sendMessage(from, { image: { url: imgUrl }, caption: '✨ Random AI Generated Image' });

        } catch (error) {
            console.error('❌ Image command error:', error);
            await sock.sendMessage(from, { text: '❌ Error fetching image.' });
        }
    }
};
