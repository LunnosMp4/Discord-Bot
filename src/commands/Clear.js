// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/Discord-Bot
// License: MIT

function Clear(message, args, commands, core, data)
{
    if (!message.member.permissions.has('MANAGE_MESSAGES'))
        return message.channel.send("You cant use this command since you're missing `manage_messages` perm");
    let number = 0;
    let showmsg = 1;
    if (args.length == 1 && !isNaN(args[0]))
        number = parseInt(args[0]);
    if (number > 100)
        number = 100;
    if (number <= 1)
        number = 2;
    if (number == 2)
        showmsg = 1;
    else
        showmsg = number;
    message.channel.bulkDelete(number).then(() => {
        message.channel.send(`Clearing ${showmsg} messages ...`).then(msg => {
            msg.delete(number);
        }).catch(err => {
            console.log(err);
        });
    });
}

module.exports = { Clear };