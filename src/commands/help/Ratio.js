// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/Discord-Bot
// License: MIT

function Ratio(core, message)
{
    core.SendEmbedMessage(
        "Ratio",
        "The command **Ratio** is used to Ratio any user.",
        "#03fcd3",
        null,
        "Command help., • ratio\n*Reply to the message you want to ratio with this command.\n\
        After one hour a summary will be made*,\n\
        Permission, • No Specific Permission\n",
        "Pato",
        null,
        message
    );
}

module.exports = { Ratio }