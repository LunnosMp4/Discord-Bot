// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/Discord-Bot
// License: MIT

var config = require('../../../config.json');
var SteamAPI = require('steamapi');
var steam = new SteamAPI(config.steamAPI);
const { MessageEmbed } = require("discord.js");
let country = require("country-list");

const firstEmoji = "📙";
const secondEmoji = "🎮";
const thirdEmoji = "💙";

function DisplaySummary(user, level, badges)
{
    let embed = new MessageEmbed()
        embed.setTitle("Steam")
        embed.setDescription(`Here The Profil from ${user.nickname} !`)
        embed.setColor("#03fc77")
        embed.setThumbnail(user.avatar.large)
        embed.addField("Name", user.nickname, true)
        embed.addField("SteamID", user.steamID, true)
        embed.addField("Country", country.getName(user.countryCode))
        if (user.realName != undefined)
            embed.addField("Real Name", user.realName, true)
        embed.addFields(
            { name: "Level", value: `${level}`, inline: true },
            { name: "XP", value: `${badges.playerXP}`, inline: true },
        )
        embed.addFields(
            { name: "Next Level", value: `${badges.playerNextLevelXP}`, inline: true },
            { name: "Current Level", value: `${badges.playerCurrentLevelXP}`, inline: true }
        )
        embed.addField("Created", new Date(user.created * 1000).toLocaleDateString(), true)
        embed.addField("Last Log On", new Date(user.lastLogOff * 1000).toLocaleDateString(), true)
        embed.addField("Visibility", user.visibilityState == 3 ? "Public" : user.visibilityState == 2 ? "Friends Only" : "Private")
        embed.addField("Comment Permission", user.commentPermission == 1 ? "Public" : "Private", true)
        embed.addField("State", user.personaState == 0 ? "Offline" : user.personaState == 1 ? "Online" : "Busy")
        embed.setTimestamp()
        embed.setFooter({ text : "Pato" });
    return embed;
}

function DisplayGames(user, games)
{
    const recentGames = [];

    for (let i = 0; i < games.length; i++) {
        recentGames.push({
            name: games[i].name,
            playTime: Math.round(games[i].playTime / 60)
        });
    }
    recentGames.sort((a, b) => {
        return b.playTime - a.playTime;
    });

    let embed = new MessageEmbed()
        embed.setTitle("Most Played Games")
        embed.setDescription(`Here The Games from ${user.nickname} !`)
        embed.setColor("#03fc77")
        embed.setThumbnail(user.avatar.large)
        for (let i = 0; i < 10; i++) {
            embed.addField(`${i + 1}. ${recentGames[i].name}`, `${recentGames[i].playTime} h`)
        }
        embed.setTimestamp()
        embed.setFooter({ text : "Pato" });
    return embed;
}

function DisplayFriends(user, friends)
{
    let friendsArray = [];
    for (let i = 0; i < friends.length; i++) {
        friendsArray.push({
            steamID: friends[i].steamID,
            friendSince: friends[i].friendSince
        });
    }
    friendsArray.sort((a, b) => {
        return b.friendSince - a.friendSince;
    });

    let embed = new MessageEmbed()
        embed.setTitle("Recent Friends")
        embed.setDescription(`Here The Friends ID from ${user.nickname} !`)
        embed.setColor("#03fc77")
        embed.setThumbnail(user.avatar.large)
        for (let i = 0; i < 10; i++) {
            embed.addField(`${i + 1}. ${friendsArray[i].steamID}`, `${new Date(friendsArray[i].friendSince * 1000).toLocaleDateString()}`)
        }
        embed.setTimestamp()
        embed.setFooter({ text : "Pato" });
    return embed;
}

function Steam(message, args, core, data)
{
    var user = core.GetUserInList(data, message.author.id);
    if (user == -1)
    {
        message.channel.send("You don't have a steam account linked to your discord account.");
        return;
    }
    var steamID = data.log[user].steamID;
    if (steamID == null)
    {
        message.channel.send("You don't have a steam account linked to your discord account.");
        return;
    }

    steam.getUserSummary(steamID).then(user => {
        steam.getUserLevel(steamID).then(level => {
            steam.getUserOwnedGames(steamID).then(games => {
                steam.getUserBadges(steamID).then(badges => {
                    steam.getUserFriends(steamID).then(friends => {
                        embed = DisplaySummary(user, level, badges);
                        message.channel.send({embeds: [embed]}).then(msg => {
                            msg.react(thirdEmoji);
                            msg.react(secondEmoji);
                            msg.react(firstEmoji);
                            const filter = (reaction, user) => {
                                return (reaction.emoji.name === firstEmoji || reaction.emoji.name === secondEmoji ||
                                    reaction.emoji.name === thirdEmoji) && user.id !== core.bot.user.id;
                            }
                            const collector = msg.createReactionCollector(filter, { time: 60000 });
                            collector.on('collect', (reaction) => {
                                if (reaction.emoji.name === firstEmoji) {
                                    embed = DisplaySummary(user, level, badges);
                                    msg.edit({embeds: [embed]});
                                    reaction.users.remove(message.author.id);
                                }
                                else if (reaction.emoji.name === secondEmoji) {
                                    embed = DisplayGames(user, games);
                                    msg.edit({embeds: [embed]});
                                    reaction.users.remove(message.author.id);
                                }
                                else if (reaction.emoji.name === thirdEmoji) {
                                    embed = DisplayFriends(user, friends);
                                    msg.edit({embeds: [embed]});
                                    reaction.users.remove(message.author.id);
                                }
                            });
                        });
                    });
                });
            });
        });
    });
}

module.exports = { Steam };