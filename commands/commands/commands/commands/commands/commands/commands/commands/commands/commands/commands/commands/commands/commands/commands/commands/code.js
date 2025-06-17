const axios = require('axios');
require('dotenv').config();

module.exports = {
    name: 'code',
    description: 'Generate code using OpenAI GPT',
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        const prompt = args.join(' ');

        if (!prompt) {
            await sock.sendMessage(from, { text: '❌ Please provide a coding prompt.\n\nExample: /code generate a Python calculator' });
            return;
        }

        try {
            const apiKey = process.env.OPENAI_API_KEY;
            const apiUrl = 'https://api.openai.com/v1/completions';

            const response = await axios.post(apiUrl, {
                model: 'text-davinci-003',
                prompt: `Write a complete working code for: ${prompt}`,
                max_tokens: 500,
                temperature: 0.2
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                }
            });

            const aiReply = response.data.choices[0].text.trim();

            await sock.sendMessage(from, { text: `💻 *AI Generated Code:*\n\n${aiReply}` });

        } catch (error) {
            console.error('❌ Code generation error:', error.response ? error.response.data : error.message);
            await sock.sendMessage(from, { text: '❌ Failed to generate code. Please try again later.' });
        }
    }
};
