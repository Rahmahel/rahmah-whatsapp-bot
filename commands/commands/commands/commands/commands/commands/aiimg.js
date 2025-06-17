const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = {
    name: 'aiimg',
    description: 'Generate an AI Image using OpenAI DALL·E',
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;

        if (!args.length) {
            await sock.sendMessage(from, { text: '❌ Please provide a prompt.\n\nExample: 🔥aiimg A futuristic city at sunset.' });
            return;
        }

        const prompt = args.join(' ');

        try {
            const response = await openai.createImage({
                prompt: prompt,
                n: 1,
                size: '512x512',
            });

            const imageUrl = response.data.data[0].url;
            await sock.sendMessage(from, { image: { url: imageUrl }, caption: `🖼️ AI Image Generated:\n${prompt}` });

        } catch (error) {
            console.error('❌ OpenAI API error:', error);
            await sock.sendMessage(from, { text: '❌ Error generating image from OpenAI.' });
        }
    }
};
