module.exports = {
    name: 'group',
    description: 'Group admin commands (add, kick, promote, demote)',
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;
        const sender = msg.key.participant || msg.key.remoteJid;

        if (!msg.key.remoteJid.endsWith('@g.us')) {
            return sock.sendMessage(from, { text: '❌ This command can only be used in groups!' });
        }

        const metadata = await sock.groupMetadata(from);
        const participants = metadata.participants;
        const isAdmin = participants.find(p => p.id === sender)?.admin !== undefined;

        if (!isAdmin) {
            return sock.sendMessage(from, { text: '❌ You must be a group admin to use this command!' });
        }

        const command = args[0];
        const target = msg.message.extendedTextMessage?.contextInfo?.participant || args[1];

        if (!command || !target) {
            return sock.sendMessage(from, { text: '❌ Usage: /group [add|kick|promote|demote] @user' });
        }

        try {
            switch (command) {
                case 'add':
                    await sock.groupParticipantsUpdate(from, [target], 'add');
                    await sock.sendMessage(from, { text: `✅ Added ${target}` });
                    break;
                case 'kick':
                    await sock.groupParticipantsUpdate(from, [target], 'remove');
                    await sock.sendMessage(from, { text: `✅ Kicked ${target}` });
                    break;
                case 'promote':
                    await sock.groupParticipantsUpdate(from, [target], 'promote');
                    await sock.sendMessage(from, { text: `✅ Promoted ${target} to admin` });
                    break;
                case 'demote':
                    await sock.groupParticipantsUpdate(from, [target], 'demote');
                    await sock.sendMessage(from, { text: `✅ Demoted ${target} from admin` });
                    break;
                default:
                    await sock.sendMessage(from, { text: '❌ Unknown subcommand. Use: add, kick, promote, demote' });
            }
        } catch (error) {
            console.error('❌ Group command error:', error.message);
            await sock.sendMessage(from, { text: '❌ Error executing group command.' });
        }
    }
};
