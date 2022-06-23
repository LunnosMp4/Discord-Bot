// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/Discord-Bot
// License: MIT

function Author(core, message) {
    core.SendEmbedMessage(
        "Author",
        "The command **author** is used to contact the author of the bot.",
        "#03fcd3",
        null,
        "Command help.,• author\
        Permission, • No Specific Permission\n",
        "Pato",
        null,
        message
    );
}

module.exports = { Author };