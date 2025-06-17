const axios = require('axios');

module.exports = {
    name: 'sports',
    description: 'Get latest sports news (football scores example)',
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;

        try {
            const response = await axios.get('https://www.thesportsdb.com/api/v1/json/1/eventspastleague.php?id=4328');
            const events = response.data.events.slice(0, 5); // Last 5 EPL matches example

            let sportsText = '🏆 *Latest Football Scores:*\n\n';
            events.forEach(event => {
                sportsText += `🏟️ ${event.strEvent}\n🗓️ ${event.dateEvent}\n🔢 ${event.intHomeScore} - ${event.intAwayScore}\n\n`;
            });

            await sock.sendMessage(from, { text: sportsText });
        } catch (error) {
            console.error('Sports Error:', error);
            await sock.sendMessage(from, { text: '❌ Failed to fetch sports data.' });
        }
    }
};
