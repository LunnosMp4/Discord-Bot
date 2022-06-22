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
        "Command help.,• stat steam <user>\n*Show your steam profile with all data.\nIf you're account is not linked you must enter you're steam id here.*,\
        Permission, No Specific permission.\n",
        "Pato",
        null,
        message
    );
}

module.exports = { Stat };