// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/Discord-Bot
// License: MIT

const display = require('./include.js');

function Help(message, args, commands, core)
{
    if (args.length == 1) {
        for (let i = 0; i < commands.length; i++) {
            if (args[0] === commands[i][0]) {
                commands[i][2](core, message);
                return;
            }
        }
    }

    core.SendEmbedMessage(
        "Help !",
        "Below is the list of all the commands.\n Use `'help <command>` to see help associated with this command.",
        "#03fcd3",
        null,
        "**Command list.**,• help\n• clear\n• profil",
        "Pato",
        null,
        message
    );
}

module.exports = { Help };