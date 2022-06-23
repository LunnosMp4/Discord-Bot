// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/Discord-Bot
// License: MIT

require("dotenv").config();
const { MessageEmbed } = require("discord.js");
const QuickChart = require('quickchart-js');

function Ratio(message, args, core, data)
{
    let user = core.GetUserInList(data, message.author.id);
    if (user == -1) {
        message.reply("You never Ratio anyone !").then(msg => {
            setTimeout(() => msg.delete(), 5000)
        });
        return;
    }
    if (!data.log[user].ratio || !data.log[user].ratioNb) {
        message.reply("You never Ratio anyone !").then(msg => {
            setTimeout(() => msg.delete(), 5000)
        });
        return;
    }

    let Loses = data.log[user].ratioNb - data.log[user].ratio;
    let WinRate = Math.round(((data.log[user].ratio / Loses) * 100) * 100) / 100;

    const chartDonut = new QuickChart();
    chartDonut.setWidth(350)
    chartDonut.setHeight(350)
    .setBackgroundColor('transparent');

    chartDonut.setConfig({
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
    
    const chartBar = new QuickChart();

    chartBar.setWidth(400)
    chartBar.setHeight(150)
    .setBackgroundColor('transparent');

    chartBar.setConfig({
        type: 'progressBar',
        data: {
            datasets: [{
                backgroundColor: "#F55438",
                data: [WinRate],
                datalabels: {
                    font: {
                        style: 'Arial',
                        size: 50,
                        color: '#ffffff'
                    }
                }
            }]
        },
    });

    let embed = new MessageEmbed()
        embed.setTitle("Ratio Stat !")
        embed.setDescription(`Here the stat for ${message.author.username} !`)
        embed.setColor("#03fcd3")
        embed.setThumbnail(chartBar.getUrl())
        embed.addFields(
            { name: "Wins", value: `${data.log[user].ratio}`, inline: true },
            { name: "Loses", value: `${Loses}`, inline: true },
            { name: "Total", value: `${data.log[user].ratioNb}`, inline: true }
        )
        embed.setImage(chartDonut.getUrl())
        embed.setTimestamp()
        embed.setFooter({ text : "Pato" });
    message.channel.send({ embeds: [embed] });
}

module.exports = { Ratio };