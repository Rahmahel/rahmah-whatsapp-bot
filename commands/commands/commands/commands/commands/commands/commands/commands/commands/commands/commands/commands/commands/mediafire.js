const axios = require('axios');

module.exports = {
    name: 'mediafire',
    description: 'Download file from Mediafire link',
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;

        if (!args[0]) {
            await sock.sendMessage(from, { text: '❌ Please provide a Mediafire URL.\n\nExample: 🔥mediafire https://www.mediafire.com/file/xxxxx' });
            return;
        }

        const url = args[0];

        try {
            const apiUrl = `https://api.akuari.my.id/downloader/mediafire?link=${url}`;
            const response = await axios.get(apiUrl);

            if (!response.data || !response.data.respon) {
                await sock.sendMessage(from, { text: '❌ Failed to fetch Mediafire file info.' });
                return;
            }

            const file = response.data.respon;
            const fileName = file.filename;
            const fileUrl = file.link;

            await sock.sendMessage(from, {
                document: { url: fileUrl },
                mimetype: 'application/octet-stream',
                fileName: fileName
            });

        } catch (error) {
            console.error('❌ Mediafire download error:', error);
            await sock.sendMessage(from, { text: '❌ Error downloading Mediafire file.' });
        }
    }
};
