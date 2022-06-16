// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/Discord-Bot
// License: MIT

function Profil(core, message)
{
    core.SendEmbedMessage(
        "Profil",
        "The command **profil** is used to display user profile information.",
        "#03fcd3",
        null,
        "Command help.,• profil\n*Display author message profile*\n\n• profil <@user>\n*Display mentionned user profile*,\
        Permission, No Specific permission.\n",
        "Pato",
        null,
        message
    );
}

module.exports = { Profil }