// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/Discord-Bot
// License: MIT

const { MessageEmbed } = require("discord.js");
const moment = require("moment");

function GetStatus(status)
{
    if (status === "online")
        return "Online";
    if (status === "idle")
        return "Idle";
    if (status === "dnd")
        return "Do Not Disturb";
    if (status === "offline")
        return "Offline";
}

function Profil(message, args, commands, core, data)
{
    let mem = message.mentions.members.first() || message.member;
    let user = mem.user;
    if (user.bot)
        return message.channel.send("You can't use this command on a bot.");

    let color = "#" + Math.floor(Math.random() * 16777215).toString(16);

    let getSteam = data.log.find(x => x.user == user.id);
    if (getSteam)
        getSteam = "Linked !";
    else
        getSteam = "Not Linked :(";

    let status = GetStatus(message.member.presence.status);

    const UpFirstChar = string =>
        `${string.slice(0, 1).toUpperCase()}${string.slice(1)}`;
    const LowerOtherChar = string =>
        string.replaceAll(/\S*/g, word =>
            `${word.slice(0, 1)}${word.slice(1).toLowerCase()}`
        );

    let embed = new MessageEmbed()
        embed.setAuthor({
            name: `${user.tag}`,
            iconURL: `${user.displayAvatarURL({ dynamic : true })}`
        })
        embed.setDescription(`Here The Profil from ${user.username} !`)
        embed.setColor(color)
        embed.setThumbnail(user.displayAvatarURL({ dynamic : true }))
        embed.addFields(
            { name: `${user.username}'s info`, value: `ID: ${user.id}\nTag: ${user.tag}` },
            { name: 'Create Account', value: `${moment.utc(user.createdAt).format('DD/MM/YY')}`, inline: true },
            { name: '\u200B', value: '\u200B', inline: true },
            { name: 'Joined Server', value: `${moment.utc(mem.joinedAt).format('DD/MM/YY')}`, inline: true },
        )
        if (message.member.presence.activities[0]) {
            embed.addFields(
                { name: 'Activities', value: `${UpFirstChar(LowerOtherChar(message.member.presence.activities[0].type))}\
                ${UpFirstChar(LowerOtherChar(message.member.presence.activities[0].name))}`, inline: true },
                { name: '\u200B', value: '\u200B', inline: true },
            )
        }
        embed.addFields(
            { name: 'Status', value: `${status}`, inline: true }
        )
        embed.addFields(
            { name: 'Linked account', value: `Steam : ${getSteam}\nSpotify : Not Linked` }
        )
        embed.setTimestamp()
        embed.setFooter({ text : "Pato" });
    message.channel.send({embeds: [embed]});
}

module.exports = { Profil };