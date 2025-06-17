const { exec } = require('child_process');

module.exports = {
    name: 'owner',
    description: 'Owner-only commands for bot control',
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        const sender = msg.key.participant || msg.key.remoteJid;
        const ownerNumber = process.env.OWNER_NUMBER + '@s.whatsapp.net';

        if (sender !== ownerNumber) {
            await sock.sendMessage(from, { text: '❌ You are not authorized to use this command!' });
            return;
        }

        const command = args[0];
        switch (command) {
            case 'say':
                const sayMsg = args.slice(1).join(' ');
                await sock.sendMessage(from, { text: sayMsg || 'Nothing to say!' });
                break;

            case 'exec':
                const execCommand = args.slice(1).join(' ');
                if (!execCommand) {
                    await sock.sendMessage(from, { text: '⚠️ Provide a command to execute!' });
                    return;
                }
                exec(execCommand, (error, stdout, stderr) => {
                    if (error) {
                        sock.sendMessage(from, { text: `❌ Error: ${error.message}` });
                        return;
                    }
                    if (stderr) {
                        sock.sendMessage(from, { text: `⚠️ Stderr: ${stderr}` });
                        return;
                    }
                    sock.sendMessage(from, { text: `✅ Output:\n${stdout}` });
                });
                break;

            case 'restart':
                await sock.sendMessage(from, { text: '♻️ Restarting bot...' });
                process.exit(0);
                break;

            default:
                await sock.sendMessage(from, { text: '❌ Unknown subcommand.\nUsage: /owner [say|exec|restart]' });
        }
    }
};
