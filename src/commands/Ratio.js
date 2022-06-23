// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/Discord-Bot
// License: MIT

const { MessageEmbed } = require("discord.js");
var config = require('../../config.json');
var fs = require('fs');

async function CheckWins(message, data, core, mention)
{
    setTimeout(() => {
        try {
            const reactions = mention.reactions.cache.get("🔁");
            const total = reactions.users.cache.size;
            const reactions2 = message.reactions.cache.get("🔁");
            const total2 = reactions2.users.cache.size;

            if (total == total2) {
                const embed1 = new MessageEmbed()
                    .setTitle("Ratio Result !")
                    .setDescription(`It's a Tie !`)
                    .setColor("#03fcd3")
                    .addField("Advanced Result", "Nobody won the ratio.")
                    .setTimestamp()
                    .setFooter({ text: "Pato" });
                message.channel.send({ embeds: [embed1] });
                return;
            }

            const winner = total > total2 ? mention : message;
            const loser = total > total2 ? message : mention;
            const winnerTotal = total > total2 ? total : total2;
            let RatioCount = 1;
            let RatioNumberW = 1;
            let RatioNumberL = 1;

            const user = core.GetUserInList(data, winner.author.id);
            if (user == -1) {
                data.log.push({
                    user: winner.author.id,
                    ratio: RatioCount,
                    ratioNb: RatioNumberW,
                });
            } else if (data.log[user].ratio && data.log[user].ratioNb) {
                data.log[user].ratio += 1;
                data.log[user].ratioNb += 1;
                RatioCount = data.log[user].ratio;
                RatioNumberW = data.log[user].ratioNb;
            } else {
                data.log[user].ratioNb = 1;
                data.log[user].ratio = 1;
            }

            const user2 = core.GetUserInList(data, loser.author.id);
            if (user2 == -1) {
                data.log.push({
                    user: loser.author.id,
                    ratio: 0,
                    ratioNb: RatioNumberL,
                });
            }
            else if (data.log[user2].ratio && data.log[user2].ratioNb) {
                data.log[user2].ratioNb += 1;
                RatioNumberL = data.log[user2].ratioNb;
            }
            else {
                data.log[user2].ratioNb = 1;
                data.log[user2].ratio = 0;
            }
            fs.writeFileSync(config.data, JSON.stringify(data));
        
            let Loose = RatioNumberW - RatioCount;
            let WinRate = Math.round(((RatioNumberW / RatioCount) * 100) * 100) / 100;

            const embed2 = new MessageEmbed()
                .setTitle("Ratio Result !")
                .setDescription(`**${winner.author.username}** won the ratio !`)
                .setColor("#03fcd3")
                .setThumbnail(winner.author.avatarURL())
                .addField("Advanced Result", `Points : ${winnerTotal}\nNumber of Wins : ${RatioCount}\nNumber of Looses : ${Loose}\nNumber of Games : ${RatioNumberW}\nWin Rate : ${WinRate} %`)
                .setTimestamp()
                .setFooter({ text: "Pato" });
            message.channel.send({ embeds: [embed2] });
            mention.reactions.removeAll();
            message.reactions.removeAll();
        } catch (err) {
            console.error(err);
            message.reply("An error occured (reaction has been deleted)").then(msg => {
                setTimeout(() => msg.delete(), 10000)
            });
            return;
        }
    }, 10000);
}

async function GetLastMessage(message, data, core)
{
    try {
        const messages = await message.channel.messages.fetch({ limit: 2 });
        const lastMessage = messages.last();
        if (lastMessage.author.id == message.author.id) {
            message.reply("You can't Ratio yourself !").then(msg => {
                setTimeout(() => msg.delete(), 5000)
            });
            return;
        }
        lastMessage.react("♥️");
        lastMessage.react("🔁");
        message.react("♥️");
        message.react("🔁");

        CheckWins(message, data, core, lastMessage);
    } catch (err) {
        console.error(err);
    }
}

async function GetOriginalMessage(message, data, core)
{
    try {
        const repliedTo = await message.channel.messages.fetch(message.reference.messageId);
        if (repliedTo.author.id == message.author.id) {
            message.reply("You can't Ratio yourself !").then(msg => {
                setTimeout(() => msg.delete(), 5000)
            });
            return;
        }
        repliedTo.react("♥️");
        repliedTo.react("🔁");
        message.react("♥️");
        message.react("🔁");

        CheckWins(message, data, core, repliedTo);
        return;
    } catch (err) {
        GetLastMessage(message, data, core)
    }
}

function Ratio(message, args, commands, core, data)
{
    GetOriginalMessage(message, data, core);
}

module.exports = { Ratio };