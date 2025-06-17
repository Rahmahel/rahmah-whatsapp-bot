const fs = require('fs');

module.exports = {
    name: 'toimg',
    description: 'Convert sticker to image',
    async execute(sock, msg) {
        const from = msg.key.remoteJid;

        if (!msg.message || !msg.message.stickerMessage) {
            await sock.sendMessage(from, { text: '❌ Please reply to a sticker!' });
            return;
        }

        const stickerMessage = msg.message.stickerMessage;
        const stickerBuffer = await sock.downloadMediaMessage(msg);

        const filePath = './temp/sticker.png';
        fs.writeFileSync(filePath, stickerBuffer);

        const imageBuffer = fs.readFileSync(filePath);

        await sock.sendMessage(from, { image: imageBuffer, caption: '✅ Sticker converted to image!' });

        fs.unlinkSync(filePath);
    }
};
