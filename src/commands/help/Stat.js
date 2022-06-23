// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/Discord-Bot
// License: MIT

function Stat(core, message)
{
    core.SendEmbedMessage(
        "Stat",
        "The command **stat** is used to show your profile in game / app.",
        "#03fcd3",
        null,
        "Command help.,• **stat steam**\n*Show your steam profile. (must be logged in with steam)*\n• **stat csgo**\n*Show your game profile. (must be logged in with steam)*\n• **stat ratio**\n*Show your ratio statistics. (must have played at least once)\n-> 'help ratio*,\n\
        Permission, No Specific permission.\n",
        "Pato",
        null,
        message
    );
}

module.exports = { Stat };