// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/Discord-Bot
// License: MIT

function Link(core, message)
{
    core.SendEmbedMessage(
        "Link",
        "The command **link** is used to link account to your profile.",
        "#03fcd3",
        null,
        "Command help., • link steam <steam_id>\n*Link Steam ID to your profile.\nUse the command **stat** to see your steam profile or game stat on discord*,\n\
        Permission, • Must be in DM\n",
        "Pato",
        null,
        message
    );
}

module.exports = { Link }