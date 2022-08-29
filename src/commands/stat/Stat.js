// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/Discord-Bot
// License: MIT

const stats = require('./include.js');

function AppList(appList)
{
    appList = [
        ["steam", stats.Steam],
        ["csgo", stats.Csgo],
        ["ratio", stats.Ratio],
        //TODO Rocket League Stats
        
    ];
    return appList;
}

function Stat(message, args, commands, core, data)
{
    if (args.length === 0) {
        message.channel.send("Please provide an application\nSee `'help stat` for more information.");
        return;
    }
    let appList;
    appList = AppList(appList);
    for (let i = 0; i < appList.length; i++) {
        if (args[0] === appList[i][0]) {
            appList[i][1](message, args, core, data);
            return;
        }
    }
    message.channel.send("Application not found\nSee `'help stat` for more information.");
}

module.exports = { Stat };