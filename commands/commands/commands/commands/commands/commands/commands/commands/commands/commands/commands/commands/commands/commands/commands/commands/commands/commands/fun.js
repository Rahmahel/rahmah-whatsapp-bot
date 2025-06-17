const axios = require('axios');

module.exports = {
    name: 'fun',
    description: 'Send a random joke, quote, or fun fact',
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        const type = args[0] ? args[0].toLowerCase() : 'joke';

        try {
            let responseText = '';

            if (type === 'joke') {
                const res = await axios.get('https://official-joke-api.appspot.com/random_joke');
                responseText = `🤣 *${res.data.setup}*\n\n${res.data.punchline}`;
            } else if (type === 'quote') {
                const res = await axios.get('https://api.quotable.io/random');
                responseText = `💡 "${res.data.content}"\n\n— ${res.data.author}`;
            } else if (type === 'fact') {
                const res = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
                responseText = `🤓 ${res.data.text}`;
            } else {
                responseText = '❌ Unknown fun type. Use:\n/joke\n/quote\n/fact';
            }

            await sock.sendMessage(from, { text: responseText });
        } catch (error) {
            console.error('❌ Fun command error:', error.message);
            await sock.sendMessage(from, { text: '❌ Error fetching fun content.' });
        }
    }
};
