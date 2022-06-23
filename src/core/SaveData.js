// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/Discord-Bot
// License: MIT

function SaveData(data)
{
    let fs = require('fs');
    let path = require('path');
    let file = path.join(__dirname, '../../data.json');
    fs.writeFileSync(file, JSON.stringify(data));
    console.log("Data saved.");
}

module.exports = { SaveData };