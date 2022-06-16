// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/Discord-Bot
// License: MIT

const cmd = require("../../includes/commands.js");
const help = require("../commands/help/include.js");

function CreateCommandList(commands)
{
    commands = [
        ["help", cmd.Help, help.Main],
        ["clear", cmd.Clear, help.Clear],
        ["profil", cmd.Profil, help.Profil]
    ];
    return commands;
}

module.exports = { CreateCommandList };