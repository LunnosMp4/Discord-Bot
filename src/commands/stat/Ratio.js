// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/Discord-Bot
// License: MIT

const config = require("../../../config.json");
const { MessageEmbed } = require("discord.js");
const QuickChart = require('quickchart-js');

function Ratio(message, args, core, data)
{
    let user = core.GetUserInList(data, message.author.id);
    if (user == -1)
    {
        message.reply("You never Ratio anyone !").then(msg => {
            setTimeout(() => msg.delete(), 5000)
        });
        return;
    }
    if (!data.log[user].ratio || !data.log[user].ratioNb)
    {
        message.reply("You never Ratio anyone !").then(msg => {
            setTimeout(() => msg.delete(), 5000)
        });
        return;
    }

    let Loses = data.log[user].ratioNb - data.log[user].ratio;
    let WinRate = Math.round(((data.log[user].ratio / Loses) * 100) * 100) / 100;

    const chart = new QuickChart();

    chart.setWidth(350)
    chart.setHeight(350)
    .setBackgroundColor('transparent');

    chart.setConfig({
            type: 'doughnut',
            data: {
                datasets: [
                    {
                    data: [data.log[user].ratio, Loses],
                    backgroundColor: [
                        'rgb(46, 167, 158)',
                        'rgb(245, 84, 56)',
                    ],
                    label: 'Dataset 1',
                    },
                ],
                labels: ['Wins', 'Loses'],
            },
            options: {
                title: {
                    display: true,
                    text: `Stats for ${message.author.username}`,
                    fontColor: '#ffffff',
                },
                plugins: {
                    datalabels: {
                        color: '#ffffff'
                    }
                }
            },
        });

    let embed = new MessageEmbed()
        embed.setTitle("Ratio Stat !")
        embed.setDescription(`Here the stat for ${message.author.username} !`)
        embed.setColor("#03fcd3")
        embed.addFields(
            { name: "Wins", value: `${data.log[user].ratio}`, inline: true },
            { name: "Loses", value: `${Loses}`, inline: true },
            { name: "Total", value: `${data.log[user].ratioNb}`, inline: true }
        )
        embed.setImage(chart.getUrl())
        embed.setTimestamp()
        embed.setFooter({ text : "Pato" });
    message.channel.send({ embeds: [embed] });
}

module.exports = { Ratio };