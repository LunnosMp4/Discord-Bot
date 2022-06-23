// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/Discord-Bot
// License: MIT

function Author(message, args, commands, core, data)
{
    core.SendEmbedMessage(
        "Author",
        "Here is the author of this Bot.",
        "#03fcd3",
        null,
        "I'm Lunnos, if you have any question of problems with this bot you can contact me at :\n**Lunnos#0001** via Discord\nor\n**lunnos.pro@gmail.com** via email.\n",
        "Pato",
        null,
        message
    );
}

module.exports = { Author };