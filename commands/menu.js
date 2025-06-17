module.exports = {
    name: 'menu',
    description: 'Show the list of commands',
    async execute(sock, msg) {
        const from = msg.key.remoteJid;
        const menu = `
╭───『 RAHMAH BOT MENU 』
│ BOT NAME: RAHMAH
│ OWNER: Rahmahel
│ PREFIX: 🔥
│ HOST: Render
│ MODE: Private
│ VERSION: 1.0.0
│ SPEED: 500.8104 Ms
│ RAM: Auto
│ PLUGINS: 15
├───────────────────────
│ 🔹 /menu
│ 🔹 /ping
│ 🔹 /sticker
│ 🔹 /toimg
│ 🔹 /tomp3
│ 🔹 /gpt (OpenAI Chat)
│ 🔹 /aiimg (AI Image Gen)
│ 🔹 /ytmp4
│ 🔹 /ytmp3
│ 🔹 /tiktok
│ 🔹 /instagram
│ 🔹 /github
│ 🔹 /owner
│ 🔹 /source
│ 🔹 /help
╰───────────────────────
        `;
        await sock.sendMessage(from, { text: menu });
    }
};
