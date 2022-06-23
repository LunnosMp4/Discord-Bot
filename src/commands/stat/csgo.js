// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/Discord-Bot
// License: MIT

config = require('../../../config.json');
var SteamAPI = require('steamapi');
var steam = new SteamAPI(config.steamAPI);
const { MessageEmbed } = require("discord.js");
var axios = require('axios');

let firstEmoji = "📙";
let secondEmoji = "📕";
let thirdEmoji = "📘";
let fourthEmoji = "🗺️";


function GetStat(data, name)
{
    var stat = data.playerstats.stats.filter(function(item) { return item.name === name; });
    return stat[0].value;
}

function ConvertBigNumber (labelValue) {

    return Math.abs(Number(labelValue)) >= 1.0e+9
    ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
    : Math.abs(Number(labelValue)) >= 1.0e+6
    ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
    : Math.abs(Number(labelValue)) >= 1.0e+3
    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"
    : Math.abs(Number(labelValue));

}

function DisplayMain(data)
{
    let KD = Math.round(GetStat(data, "total_kills") / GetStat(data, "total_deaths") * 100) / 100;
    let Losses = ConvertBigNumber(GetStat(data, "total_matches_played") - GetStat(data, "total_matches_won"));

    let embed = new MessageEmbed()
        embed.setTitle("CSGO")
        embed.setDescription("Here your stat from CSGO")
        embed.setColor("#03fc77")
        embed.addFields(
            { name: "Total Kills", value: `${ConvertBigNumber(GetStat(data, "total_kills"))}`, inline: true },
            { name: "Total Deaths", value: `${ConvertBigNumber(GetStat(data, "total_deaths"))}`, inline: true },
            { name: "K/D", value: `${KD}`, inline: true },
        )
        embed.addFields(
            { name: "Bombs Planted", value: `${ConvertBigNumber(GetStat(data, "total_planted_bombs"))}`, inline: true },
            { name: "Bombs Defused", value: `${ConvertBigNumber(GetStat(data, "total_defused_bombs"))}`, inline: true },
            { name: "Total MVPS", value: `${ConvertBigNumber(GetStat(data, "total_mvps"))}`, inline: false },
        )
        embed.addFields(
            { name: "Match Wins", value: `${ConvertBigNumber(GetStat(data, "total_matches_won"))}`, inline: true },
            { name: "Match Losses", value: `${Losses}`, inline: true },
        )
        embed.addFields(
            { name: "Total Damage Given", value: `${ConvertBigNumber(GetStat(data, "total_damage_done"))}`, inline: false },
            { name: "Total Money Earned", value: `${ConvertBigNumber(GetStat(data, "total_money_earned"))}`, inline: false }
            )
        embed.setTimestamp()
        embed.setFooter({ text : "Pato" });
    return embed;
}

function AdvancedStat(data)
{
    let AA = Math.round((GetStat(data, "total_shots_hit") / GetStat(data, "total_shots_fired") * 100 ) * 100) / 100;
    let Losses = ConvertBigNumber(GetStat(data, "total_rounds_played") - GetStat(data, "total_wins"));
    let HS = Math.round((GetStat(data, "total_kills_headshot") / GetStat(data, "total_kills") * 100) * 100) / 100;
    let WR = Math.round((GetStat(data, "total_wins") / GetStat(data, "total_rounds_played") * 100) * 100) / 100;

    let embed = new MessageEmbed()
        embed.setTitle("CSGO")
        embed.setDescription("Advanced stat")
        embed.setColor("#03fc77")
        embed.addFields(
            { name: "Shots Fired", value: `${ConvertBigNumber(GetStat(data, "total_shots_fired"))}`, inline: true },
            { name: "Shots Hits", value: `${ConvertBigNumber(GetStat(data, "total_shots_hit"))}`, inline: true },
            { name: "Aim Accuracy", value: `${AA} %`, inline: true },
        )
        embed.addFields(
            { name: "Headshot %", value: `${HS} %`, inline: true },
            { name: "Win Rate %", value: `${WR} %`, inline: true },
            { name: "Pistols Round Wins", value: `${ConvertBigNumber(GetStat(data, "total_wins_pistolround"))}`, inline: false },
        )
        embed.addFields(
            { name: "Round Wins", value: `${ConvertBigNumber(GetStat(data, "total_wins"))}`, inline: true },
            { name: "Round Losses", value: `${Losses}`, inline: true },
        )
        embed.addFields(
            { name: "Total Weapon Donated", value: `${ConvertBigNumber(GetStat(data, "total_weapons_donated"))}`, inline: false },
            { name: "Total Ennemy Flashed", value: `${ConvertBigNumber(GetStat(data, "total_kills_enemy_blinded"))}`, inline: false }
            )
        embed.setTimestamp()
        embed.setFooter({ text : "Pato" });
    return embed;
}

function DisplayLast(data, core)
{
    let Match;
    if (GetStat(data, "last_match_max_players") == 4)
        Match = "Wingman";
    else if (GetStat(data, "last_match_max_players") == 10)
        Match = "Competitive";
    else if (GetStat(data, "last_match_max_players") > 10)
        Match = "Casual / Other";
    let KD = Math.round(GetStat(data, "last_match_kills") / GetStat(data, "last_match_deaths") * 100) / 100;

    let embed = new MessageEmbed()
        embed.setTitle("CSGO")
        embed.setDescription("Stat from your Last Match!")
        embed.setColor("#03fc77")
        embed.addFields(
            { name: "Kills", value: `${ConvertBigNumber(GetStat(data, "last_match_kills"))}`, inline: true },
            { name: "Death", value: `${ConvertBigNumber(GetStat(data, "last_match_deaths"))}`, inline: true },
            { name: "K/D", value: `${KD} %`, inline: true },
        )
        embed.addFields(
            { name: "Rounds", value: `${ConvertBigNumber(GetStat(data, "last_match_rounds"))}`, inline: true },
            { name: "CT. Wins", value: `${ConvertBigNumber(GetStat(data, "last_match_ct_wins"))}`, inline: true },
            { name: "T. Wins", value: `${ConvertBigNumber(GetStat(data, "last_match_t_wins"))}`, inline: true },
        )
        embed.addFields(
            { name: "Damage Given", value: `${ConvertBigNumber(GetStat(data, "last_match_damage"))}`, inline: true },
            { name: "Money Spend", value: `${ConvertBigNumber(GetStat(data, "last_match_money_spent"))}`, inline: true },
        )
        embed.addFields(
            { name: "Gamemode", value: `${Match}`, inline: false },
            { name: "Favorite Weapon", value: `${core.GetWeaponName(GetStat(data, "last_match_favweapon_id"))}`, inline: false },
            { name: "Fav Weapon Kill", value: `${ConvertBigNumber(GetStat(data, "last_match_favweapon_kills"))}`, inline: true },
            { name: "Fav Weapon Hits", value: `${ConvertBigNumber(GetStat(data, "last_match_favweapon_hits"))}`, inline: true }
            )
        embed.setTimestamp()
        embed.setFooter({ text : "Pato" });
    return embed;
}

function BestMap(data)
{

}

function Csgo(message, args, core, data)
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
    message.reply("Please wait while I fetch your stats...").then(msg => {
        setTimeout(() => msg.delete(), 5000)
    });
    axios.get('http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=' + config.steamAPI + '&steamid=' + steamID)
    .then(function (response) {
        let data = response.data;
        embed = DisplayMain(data);
        message.channel.send({embeds: [embed]}).then(msg => {
            msg.react(thirdEmoji);
            msg.react(secondEmoji);
            msg.react(firstEmoji);
            const filter = (reaction, user) => {
                return (reaction.emoji.name === firstEmoji || reaction.emoji.name === secondEmoji ||
                    reaction.emoji.name === thirdEmoji) && user.id !== core.bot.user.id;
            }
            const collector = msg.createReactionCollector(filter, { time: 60000 });
            collector.on('collect', (reaction, user) => {
                if (reaction.emoji.name === firstEmoji)
                {
                    embed = DisplayMain(data);
                    msg.edit({embeds: [embed]});
                    reaction.users.remove(message.author.id);
                }
                else if (reaction.emoji.name === secondEmoji)
                {
                    embed = AdvancedStat(data);
                    msg.edit({embeds: [embed]});
                    reaction.users.remove(message.author.id);
                }
                else if (reaction.emoji.name === thirdEmoji)
                {
                    embed = DisplayLast(data, core);
                    msg.edit({embeds: [embed]});
                    reaction.users.remove(message.author.id);
                }
            });
        });
    });
}

module.exports = { Csgo };
