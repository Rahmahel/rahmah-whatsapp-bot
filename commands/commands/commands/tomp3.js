const ytdl = require('ytdl-core');

module.exports = {
    name: 'tomp3',
    description: 'Download YouTube video as MP3',
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;

        if (!args[0]) {
            await sock.sendMessage(from, { text: '❌ Please provide a YouTube link!' });
            return;
        }

        const url = args[0];
        if (!ytdl.validateURL(url)) {
            await sock.sendMessage(from, { text: '❌ Invalid YouTube URL!' });
            return;
        }

        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title;
        const stream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });

        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        await sock.sendMessage(from, { document: buffer, mimetype: 'audio/mp3', fileName: `${title}.mp3` });
    }
};
