// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/Discord-Bot
// License: MIT

const cmd = require("../../includes/commands.js");
const help = require("../commands/help/include.js");

function CreateCommandList(commands)
{
    commands = [
        ["help", cmd.Help, help.Help],
        ["clear", cmd.Clear, help.Clear],
        ["profil", cmd.Profil, help.Profil],
        ["link", cmd.Link, help.Link],
        ["stat", cmd.Stat, help.Stat],
        ["ratio", cmd.Ratio, help.Ratio],
        ["author", cmd.Author, help.Author],
        ["meme", cmd.Meme, help.Meme],
        
    ];
    return commands;
}

module.exports = { CreateCommandList };