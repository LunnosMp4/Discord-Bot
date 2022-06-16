// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/Discord-Bot
// License: MIT

const { MessageEmbed } = require("discord.js");
const moment = require("moment");

function Profil(message, args, commands, core)
{
    let mem = message.mentions.members.first() || message.member;
    let user = mem.user;
    if (user.bot)
        return message.channel.send("You can't use this command on a bot.");

    let color = "#" + Math.floor(Math.random() * 16777215).toString(16);

    let status = message.member.presence.status;
    if (status === "online")
        status = "Online";
    else if (status === "idle")
        status = "Idle";
    else if (status === "dnd")
        status = "Do Not Disturb";
    else if (status === "offline")
        status = "Offline";

    let embed = new MessageEmbed()
        .setAuthor(`${user.tag}`, user.displayAvatarURL({ dynamic : true }))
        .setDescription(`Here The Profil from ${user.username} !`)
        .setColor(color)
        .setThumbnail(user.displayAvatarURL({ dynamic : true }))
        .addFields(
            { name: `${user.username}'s info`, value: `ID: ${user.id}\nTag: ${user.tag}` },
            { name: 'Create Account', value: `${moment.utc(user.createdAt).format('DD/MM/YY')}`, inline: true },
            { name: '\u200B', value: '\u200B', inline: true },
            { name: 'Joined Server', value: `${moment.utc(mem.joinedAt).format('DD/MM/YY')}`, inline: true },
        )
        .addFields(
            { name: 'Activities', value: `${message.member.presence.activities[0]}`, inline: true },
            { name: '\u200B', value: '\u200B', inline: true },
            { name: 'Status', value: `${status}`, inline: true },
        )
        .addFields(
            { name: 'Linked account', value: `Steam : Not linked\nSpotify : Not Linked` }
        )
        .setTimestamp()
        .setFooter({ text : "Pato" });
    message.channel.send({embeds: [embed]});
}

module.exports = { Profil };