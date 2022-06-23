// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/Discord-Bot
// License: MIT

const fs = require("fs");
require("dotenv").config();

function CreateDataList(data)
{
    try {
        data = JSON.parse(fs.readFileSync(process.env.DATA, 'utf8'));
    } catch(e) {
        data = {
            log: []
        }
        fs.writeFileSync(process.env.DATA, JSON.stringify(data));
    }
    return data;
}

module.exports = { CreateDataList };