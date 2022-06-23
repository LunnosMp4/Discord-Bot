// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/Discord-Bot
// License: MIT

const { Client, Intents, MessageEmbed } = require("discord.js");
const bot = new Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
});
const fs = require("fs");
require("dotenv").config();

const prefix = process.env.PREFIX;
const token = process.env.TOKEN;
const name = process.env.NAME;
const pp = process.env.PP;

// Load function from includes files
const core = require("./includes/core.js");

// Create Database
let data;
data = core.CreateDataList(data);

let commands;
commands = core.CreateCommandList(commands)

// Start Bot !
bot.on("ready", () => {
    console.log(`${name} is ready!`);
});

bot.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const user = core.GetUserInList(data, message.author.id);
    if (user == -1) {
        data.log.push({
            user: message.author.id
        });
        message.author.send(`Hi **${message.author.username}**, Thank for using me !\nYou can use `+ "`" + "'help" + "`" +
        ` to see all my commands !\n Have a nice day :p`);
        console.log(`${message.author.username} has been added to the database.`);
    }

    fs.writeFileSync(process.env.DATA, JSON.stringify(data));

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    for (let i = 0; i < args.length; i++)
        args[i] = args[i].toLowerCase();
    const command = args.shift().toLowerCase();

    // Execute commands
    for (let i = 0; i < commands.length; i++)
        if (command === commands[i][0]) {
            try {
                commands[i][1](message, args, commands, core, data);
            } catch (err) {
                console.error(err);
            }
        }
});

bot.login(token)