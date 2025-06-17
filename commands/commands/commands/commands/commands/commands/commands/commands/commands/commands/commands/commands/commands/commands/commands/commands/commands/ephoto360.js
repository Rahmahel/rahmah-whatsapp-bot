const axios = require('axios');

module.exports = {
    name: 'ephoto360',
    description: 'Generate stylish text effect using Ephoto360 API',
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        const text = args.join(' ');

        if (!text) {
            await sock.sendMessage(from, { text: '❌ Please provide text for Ephoto360 effect.\n\nExample: /ephoto360 Hello World' });
            return;
        }

        try {
            const apiUrl = `https://api.ephoto360.com/text?text=${encodeURIComponent(text)}`;
            const response = await axios.get(apiUrl);

            if (response.data && response.data.image) {
                await sock.sendMessage(from, { image: { url: response.data.image }, caption: '✨ Ephoto360 Text Effect Generated!' });
            } else {
                await sock.sendMessage(from, { text: '❌ Failed to generate Ephoto360 image.' });
            }
        } catch (error) {
            console.error('❌ Ephoto360 API error:', error.message);
            await sock.sendMessage(from, { text: '❌ Error generating Ephoto360 text effect.' });
        }
    }
};
