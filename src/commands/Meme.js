// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/Discord-Bot
// License: MIT

const { MessageEmbed } = require("discord.js");
const axios = require('axios');

function Meme(message, args, commands, core, data) {
	//{"postLink":"https://redd.it/x0b4lg","subreddit":"memes","title":"thief goes brrr","url":"https://i.redd.it/dkj806n1wjk91.gif","nsfw":false,"spoiler":false,"author":"darklol98","ups":481,"preview":["https://preview.redd.it/dkj806n1wjk91.gif?width=108\u0026crop=smart\u0026format=png8\u0026s=1e2fd395f440f89f2c837c7a8df6a23d9ad6d5b0","https://preview.redd.it/dkj806n1wjk91.gif?width=216\u0026crop=smart\u0026format=png8\u0026s=16ef158422e9a7c4459d02dd8ffde2d1e6d0dc92","https://preview.redd.it/dkj806n1wjk91.gif?width=320\u0026crop=smart\u0026format=png8\u0026s=ca864de8ea18772a784b053c0791a59a5410f499"]}
	//fetch https://meme-api.herokuapp.com/gimme and get the reesponse and send it in a embed message

	let url = "https://meme-api.herokuapp.com/gimme";
	axios.get(url)
		.then(function (response) {
			const embed = new MessageEmbed()
				.setColor(Math.floor(Math.random() * 16777215).toString(16))
				.setTitle(response.data.title)
				.setImage(response.data.url)
				.setTimestamp()
				.setFooter({ text: "Pato" });
				message.channel.send({ embeds: [embed] });
		}).catch(function (error) {
			console.log(error);
		});
}

module.exports = { Meme };