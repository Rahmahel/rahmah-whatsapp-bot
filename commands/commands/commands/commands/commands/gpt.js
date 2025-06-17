const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // stored in .env
});
const openai = new OpenAIApi(configuration);

module.exports = {
    name: 'gpt',
    description: 'Chat with OpenAI ChatGPT',
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;

        if (!args.length) {
            await sock.sendMessage(from, { text: '❌ Please provide a prompt.\n\nExample: 🔥gpt What is AI?' });
            return;
        }

        const prompt = args.join(' ');

        try {
            const completion = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
            });

            const response = completion.data.choices[0].message.content.trim();
            await sock.sendMessage(from, { text: `💬 *ChatGPT says:*\n\n${response}` });
        } catch (error) {
            console.error('❌ OpenAI API error:', error);
            await sock.sendMessage(from, { text: '❌ Error fetching response from OpenAI.' });
        }
    }
};
