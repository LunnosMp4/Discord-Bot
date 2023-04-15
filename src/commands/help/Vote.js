
function Vote(core, message)
{
    core.SendEmbedMessage(
        "Vote",
        "The command **Vote** is used to vote for a RedMatch map",
        "#03fcd3",
        null,
        "Command help.,• **vote**\n",
        "Pato",
        null,
        message
    );
}

module.exports = { Vote };