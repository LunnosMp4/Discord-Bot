// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/Discord-Bot
// License: MIT

const display = require('./include.js');

function Help(message, args, commands, core, data)
{
    if (args.length == 1) {
        if (args[0] === 'help') {
            let help = 'You can use the following commands: \n';
            for (let i = 0; i < commands.length; i++) {
                if (commands[i][0] !== 'help') {
                    help += '• ' + commands[i][0] + '\n';
                }
            }
            message.channel.send(help);
            return;
        }
        for (let i = 0; i < commands.length; i++) {
            if (args[0] === commands[i][0]) {
                commands[i][2](core, message);
                return;
            }
        }
    }

    let command_list = "";
    for (let i = 0; i < commands.length; i++)
        command_list += '• ' + commands[i][0] + '\n';

    core.SendEmbedMessage(
        "Help !",
        "Below is the list of all the commands.\n Use `'help <command>` to see help associated with this command.",
        "#03fcd3",
        null,
        `Command list :,${command_list}`,
        "Pato",
        null,
        message
    );
}

module.exports = { Help };