// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/Discord-Bot
// License: MIT

function GetWeaponName(id)
{
    switch (id)
    {
        case 1:
            return "Deagle";
        case 2:
            return "Dual Berettas";
        case 3:
            return "Five-Seven";
        case 4:
            return "Glock-18";
        case 7:
            return "AK-47";
        case 8:
            return "AUG";
        case 9:
            return "AWP";
        case 10:
            return "FAMAS";
        case 11:
            return "G3SG1";
        case 13:
            return "Galil AR";
        case 14:
            return "M249";
        case 16:
            return "M4A1-S";
        case 17:
            return "M4A4";
        case 19:
            return "Mac-10";
        case 24:
            return "UMP-45";
        case 25:
            return "XM1014";
        case 26:
            return "PP-Bizon";
        case 27:
            return "Mag-7";
        case 28:
            return "Negev";
        case 29:
            return "Sawed-Off";
        case 30:
            return "Tec-9";
        case 32:
            return "P2000";
        case 33:
            return "MP7";
        case 34:
            return "MP9";
        case 35:
            return "Nova";
        case 36:
            return "P250";
        case 38:
            return "SCAR-20";
        case 39:
            return "SG 553";
        case 40:
            return "SSG 08";
        case 61:
            return "USP-S";
        case 63:
            return "CZ75-Auto";
        case 64:
            return "R8 Revolver";
        default:
            return "Unknown";
    }
}

module.exports = { GetWeaponName };