const axios = require('axios');

module.exports = {
    name: 'tiktok',
    description: 'Download TikTok videos (No Watermark)',
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;

        if (!args[0]) {
            await sock.sendMessage(from, { text: '❌ Please provide a TikTok video URL.\n\nExample: 🔥tiktok https://www.tiktok.com/@username/video/1234567890' });
            return;
        }

        const url = args[0];

        try {
            const apiUrl = `https://api.tiklydown.me/api/download?url=${url}`;
            const response = await axios.get(apiUrl);

            if (response.data.status !== 'success') {
                await sock.sendMessage(from, { text: '❌ Failed to fetch TikTok video.' });
                return;
            }

            const videoUrl = response.data.video.no_watermark;
            await sock.sendMessage(from, { video: { url: videoUrl }, caption: '🎬 TikTok Video (No Watermark)' });

        } catch (error) {
            console.error('❌ TikTok download error:', error);
            await sock.sendMessage(from, { text: '❌ Error fetching TikTok video.' });
        }
    }
};
