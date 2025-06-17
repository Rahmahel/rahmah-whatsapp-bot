const axios = require('axios');

module.exports = {
    name: 'search',
    description: 'Performs Google or YouTube search',
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        const type = args[0];
        const query = args.slice(1).join(" ");

        if (!type || !query) {
            return sock.sendMessage(from, { text: '❌ Usage: /search [google|youtube] [query]\nExample: /search google WhatsApp bot' });
        }

        try {
            if (type === 'google') {
                const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_CX}`;
                const res = await axios.get(url);
                const items = res.data.items;
                if (!items || items.length === 0) {
                    return sock.sendMessage(from, { text: '❌ No results found!' });
                }
                let result = '🔍 *Google Search Results:*\n\n';
                items.slice(0, 5).forEach((item, i) => {
                    result += `${i + 1}. ${item.title}\n${item.link}\n\n`;
                });
                await sock.sendMessage(from, { text: result });

            } else if (type === 'youtube') {
                const ytUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${process.env.YT_API_KEY}&maxResults=3`;
                const ytRes = await axios.get(ytUrl);
                const videos = ytRes.data.items;
                if (!videos || videos.length === 0) {
                    return sock.sendMessage(from, { text: '❌ No YouTube videos found!' });
                }
                let result = '▶️ *YouTube Search Results:*\n\n';
                videos.forEach((video, i) => {
                    result += `${i + 1}. ${video.snippet.title}\nhttps://www.youtube.com/watch?v=${video.id.videoId}\n\n`;
                });
                await sock.sendMessage(from, { text: result });

            } else {
                await sock.sendMessage(from, { text: '❌ Invalid search type! Use google or youtube.' });
            }
        } catch (err) {
            console.error(err);
            await sock.sendMessage(from, { text: '❌ An error occurred while searching.' });
        }
    }
};
