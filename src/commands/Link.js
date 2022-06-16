// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/Discord-Bot
// License: MIT

var config = require('../../config.json');
var SteamAPI = require('steamapi');
var steam = new SteamAPI(config.steamAPI);
var fs = require('fs');

function SteamLink(message, args, core, data)
{
    steam.resolve(args[1]).then(id => {
        var user = core.GetUserInList(data, message.author.id);
        if (user == -1)
        {
            data.log.push({
                user: message.author.id,
                steamID: id
            });
        } else
            data.log[user].id = id;

        fs.writeFileSync(config.data, JSON.stringify(data));
        core.SendEmbedMessage(
            "Steam",
            "Your account has been linked !",
            "#03fc77",
            "https://logos-marques.com/wp-content/uploads/2021/03/Steam-Logo.png",
            "Success !, Your steam account has been linked to your discord account.",
            "Pato",
            null,
            message
        );
    }).catch(err => {
        console.error(err);
        core.SendEmbedMessage(
            "Steam",
            "Your account has not been linked :(",
            "#ff0000",
            "https://logos-marques.com/wp-content/uploads/2021/03/Steam-Logo.png",
            "Error !, Your steam account has not been linked to your discord account.\nYour steam id is not valid it should like this : https://steamcommunity.com/id/username/",
            "Pato",
            null,
            message
        );
    });
}

function AppList(appList)
{
    appList = [
        ["steam", SteamLink]
    ];
    return appList;
    
}

function Link(message, args, commands, core, data)
{
    if (args.length == 0)
    {
        message.channel.send("Please provide an application with the token.\nSee `'help link` for more information.");
        return;
    }
    if (args.length == 1)
    {
        message.channel.send("Please provide a token.\nSee `'help link` for more information.");
        return;
    }
    var appList = AppList(appList);
    for (let i = 0; i < appList.length; i++)
    {
        if (args[0] === appList[i][0])
        {
            appList[i][1](message, args, core, data);
            return;
        }
    }
    message.channel.send("Your application is not valid.\nSee `'help link` for more information.");
}

module.exports = { Link };