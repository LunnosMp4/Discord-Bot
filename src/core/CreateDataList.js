// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/Discord-Bot
// License: MIT

const fs = require("fs");

function CreateDataList(config, data)
{
    try {
        data = JSON.parse(fs.readFileSync(config.data, 'utf8'));
    } catch(e) {
        data = {
            log: []
        }
        fs.writeFileSync(config.data, JSON.stringify(data));
    }
    return data;
}

module.exports = { CreateDataList };