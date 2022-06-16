// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/Discord-Bot
// License: MIT

function Clear(core, message)
{
    core.SendEmbedMessage(
        "Clear",
        "The command **clear** is used to clear the chat.",
        "#03fcd3",
        null,
        "Command help.,• clear <number>\n*Number represent the number of messages to delete.\nThe maximum is 100.*,\
        Permission, • MANAGE_MESSAGES\n",
        "Pato",
        null,
        message
    );
}

module.exports = { Clear };