const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'ytmp4',
    description: 'Download YouTube video as MP4',
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;

        if (!args[0]) {
            await sock.sendMessage(from, { text: '❌ Please provide a YouTube video URL.\n\nExample: 🔥ytmp4 https://youtube.com/watch?v=abcd1234' });
            return;
        }

        const url = args[0];

        if (!ytdl.validateURL(url)) {
            await sock.sendMessage(from, { text: '❌ Invalid YouTube URL.' });
            return;
        }

        try {
            const info = await ytdl.getInfo(url);
            const title = info.videoDetails.title.replace(/[^\w\s]/gi, '');
            const filePath = path.resolve(__dirname, `../temp/${title}.mp4`);
            const video = ytdl(url, { quality: 'highestvideo' });

            video.pipe(fs.createWriteStream(filePath))
                .on('finish', async () => {
                    await sock.sendMessage(from, { video: { url: filePath }, caption: title });
                    fs.unlinkSync(filePath); // Clean up
                });
        } catch (error) {
            console.error('❌ YouTube MP4 error:', error);
            await sock.sendMessage(from, { text: '❌ Failed to download video.' });
        }
    }
};
