// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/Discord-Bot
// License: MIT

function Meme(core, message)
{
    core.SendEmbedMessage(
        "Meme",
        "The command **Meme** is used to show a random meme.",
        "#03fcd3",
        null,
        "Command help., • meme\n,\n\
        Permission, • No Specific Permission\n",
        "Pato",
        null,
        message
    );
}

module.exports = { Meme }