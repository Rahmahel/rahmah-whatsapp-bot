const { writeFile } = require('fs/promises');
const { Sticker, StickerTypes } = require('wa-sticker-formatter');

module.exports = {
    name: 'sticker',
    description: 'Convert image or video to sticker',
    async execute(sock, msg, args, mime) {
        const from = msg.key.remoteJid;

        if (msg.message.imageMessage || msg.message.videoMessage) {
            const messageType = msg.message.imageMessage ? 'image' : 'video';
            const stream = await sock.downloadContentFromMessage(
                msg.message[`${messageType}Message`],
                messageType
            );

            let buffer = Buffer.from([]);
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }

            const sticker = new Sticker(buffer, {
                pack: 'RAHMAH-BOT',
                author: 'Rahmahel',
                type: StickerTypes.FULL,
                categories: ['🤖'],
                id: 'rahmah-sticker',
                quality: 75
            });

            const stickerBuffer = await sticker.toBuffer();
            await sock.sendMessage(from, { sticker: stickerBuffer });
              }
