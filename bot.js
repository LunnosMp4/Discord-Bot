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

// Load the config file to the bot.
const config = require("./config.json");
const prefix = config.prefix;
const token = config.token;
const name = config.name;
const pp = config.pp;

// Load function from includes files
const core = require("./includes/core.js");

// Create Database
let data;
data = core.CreateDataList(config, data);

let commands;
commands = core.CreateCommandList(commands)

// Start Bot !
bot.on("ready", () => {
    console.log(`${name} is ready!`);
});

bot.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    for (let i = 0; i < args.length; i++)
        args[i] = args[i].toLowerCase();
    const command = args.shift().toLowerCase();

    // Execute commands
    for (let i = 0; i < commands.length; i++)
        if (command === commands[i][0])
            commands[i][1](message, args, commands, core, data);
});

bot.login(token)