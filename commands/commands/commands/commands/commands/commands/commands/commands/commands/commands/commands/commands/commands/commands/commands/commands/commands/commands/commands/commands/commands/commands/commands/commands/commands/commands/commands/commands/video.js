const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

module.exports = {
    name: 'video',
    description: 'Video manipulation commands.',
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;

        if (!msg.message.videoMessage) {
            return await sock.sendMessage(from, { text: '❌ Please reply to a *video* to convert.' });
        }

        const command = args[0];
        const videoPath = './temp/video.mp4';
        const outputPath = './temp/output.gif';

        // Download video
        const videoBuffer = await sock.downloadMediaMessage(msg.message.videoMessage);
        fs.writeFileSync(videoPath, videoBuffer);

        switch (command) {
            case 'gif':
                exec(`ffmpeg -i ${videoPath} -vf "fps=10,scale=320:-1:flags=lanczos" -y ${outputPath}`, async (error) => {
                    if (error) {
                        await sock.sendMessage(from, { text: '❌ Failed to convert to GIF.' });
                        return;
                    }
                    const gifBuffer = fs.readFileSync(outputPath);
                    await sock.sendMessage(from, { video: gifBuffer, caption: '🎞️ Here is your GIF!', gifPlayback: true });
                    fs.unlinkSync(videoPath);
                    fs.unlinkSync(outputPath);
                });
                break;

            default:
                await sock.sendMessage(from, { text: '⚠️ Invalid option. Use: /video gif' });
        }
    }
};
