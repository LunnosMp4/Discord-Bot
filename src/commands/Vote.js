// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/Discord-Bot
// License: MIT

const { MessageEmbed } = require("discord.js");
var fs = require('fs');
require("dotenv").config();

function sendResult(message, mapCounter, maps, collector, voteMessage)
{
    if (mapCounter == 1) {
        const embed1 = new MessageEmbed()
            .setTitle("Vote Result !")
            .setDescription(`The map **${maps[0]}** has been selected !`)
            .setColor("#03fcd3")
            .setTimestamp()
            .setFooter({ text: "RedLeague" });
        message.channel.send({ embeds: [embed1] });
        collector.stop();
        message.delete();
        voteMessage.delete();

        message.channel.messages.fetch({ limit: 10 }).then(messages => {
            const mapMessage = messages.find(m => m.content == maps[0]);
            mapMessage.delete();
        });
    }
}

async function RedMatchVote(message, args, commands, core, data)
{
    try {
        const mapA = "A: XEO";
        const mapB = "B: Outskirts";
        const mapC = "C: Corridors";
        const mapD = "D: Streets";
        const mapE = "E: Village";

        // Envoyer les messages pour chaque Map
        message.channel.send(mapA);
        message.channel.send(mapB);
        message.channel.send(mapC);
        message.channel.send(mapD);
        message.channel.send(mapE);

        // Envoyer le message avec les réactions pour voter
        const voteMessage = await message.channel.send("Choisissez les maps à bannir !");
        await voteMessage.react("🇦");
        await voteMessage.react("🇧");
        await voteMessage.react("🇨");
        await voteMessage.react("🇩");
        await voteMessage.react("🇪");

        // lire les réactions
        const filter = (reaction, user) => {
            return ['🇦', '🇧', '🇨', '🇩', '🇪'].includes(reaction.emoji.name);
        };

        const collector = voteMessage.createReactionCollector({ filter, time: 15000 });
        let mapCounter = 5; // Le nombre de cartes restantes
        const maps = [mapA, mapB, mapC, mapD, mapE];
        const userVotes = new Map();

        collector.on('collect', (reaction, user) => {

            if (userVotes.has(user.id) && userVotes.get(user.id) >= 2) {
                reaction.users.remove(user.id);
                return;
            }

            // if user reacted with A delete the message with the map A
            if (reaction.emoji.name === '🇦' && mapCounter > 1 && !user.bot) {
                message.channel.messages.fetch().then(messages => {
                    const mapAMessage = messages.find(msg => msg.content === mapA);
                    if (mapAMessage) {
                        mapAMessage.delete();
                        reaction.remove();
                        mapCounter--;
                        maps.splice(maps.indexOf(mapA), 1);
                        sendResult(message, mapCounter, maps, collector, voteMessage);
                        if (userVotes.has(user.id)) {
                            userVotes.set(user.id, userVotes.get(user.id) + 1);
                        } else {
                            userVotes.set(user.id, 1);
                        }
                    }
                });
            }
            // if user reacted with B delete the message with the map B
            if (reaction.emoji.name === '🇧' && mapCounter > 1 && !user.bot) {
                message.channel.messages.fetch().then(messages => {
                    const mapAMessage = messages.find(msg => msg.content === mapB);
                    if (mapAMessage) {
                        mapAMessage.delete();
                        reaction.remove();
                        mapCounter--;
                        maps.splice(maps.indexOf(mapB), 1);
                        sendResult(message, mapCounter, maps, collector, voteMessage);
                        if (userVotes.has(user.id)) {
                            userVotes.set(user.id, userVotes.get(user.id) + 1);
                        } else {
                            userVotes.set(user.id, 1);
                        }
                    }
                });
            }
            // if user reacted with C delete the message with the map C
            if (reaction.emoji.name === '🇨' && mapCounter > 1 && !user.bot) {
                message.channel.messages.fetch().then(messages => {
                    const mapAMessage = messages.find(msg => msg.content === mapC);
                    if (mapAMessage) {
                        mapAMessage.delete();
                        reaction.remove();
                        mapCounter--;
                        maps.splice(maps.indexOf(mapC), 1);
                        sendResult(message, mapCounter, maps, collector, voteMessage);
                        if (userVotes.has(user.id)) {
                            userVotes.set(user.id, userVotes.get(user.id) + 1);
                        } else {
                            userVotes.set(user.id, 1);
                        }
                    }
                });
            }
            // if user reacted with D delete the message with the map D
            if (reaction.emoji.name === '🇩' && mapCounter > 1 && !user.bot) {
                message.channel.messages.fetch().then(messages => {
                    const mapAMessage = messages.find(msg => msg.content === mapD);
                    if (mapAMessage) {
                        mapAMessage.delete();
                        reaction.remove();
                        mapCounter--;
                        maps.splice(maps.indexOf(mapD), 1);
                        sendResult(message, mapCounter, maps, collector, voteMessage);
                        if (userVotes.has(user.id)) {
                            userVotes.set(user.id, userVotes.get(user.id) + 1);
                        } else {
                            userVotes.set(user.id, 1);
                        }
                    }
                });
            }
            // if user reacted with E delete the message with the map E
            if (reaction.emoji.name === '🇪' && mapCounter > 1 && !user.bot) {
                message.channel.messages.fetch().then(messages => {
                    const mapAMessage = messages.find(msg => msg.content === mapE);
                    if (mapAMessage) {
                        mapAMessage.delete();
                        reaction.remove();
                        mapCounter--;
                        maps.splice(maps.indexOf(mapE), 1);
                        sendResult(message, mapCounter, maps, collector, voteMessage);
                        if (userVotes.has(user.id)) {
                            userVotes.set(user.id, userVotes.get(user.id) + 1);
                        } else {
                            userVotes.set(user.id, 1);
                        }
                    }
                });
            }
        });
    }
    catch (error) {
        console.log(error);
    }
}

function Vote(message, args, commands, core, data)
{
    RedMatchVote(message, args, commands, core, data);
}

module.exports = { Vote };