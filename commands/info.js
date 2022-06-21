const embed = require("../modules/embed")

exports.description = "Learn what is, and how to use PolyLink."
exports.usage = ""
exports.disabled = false
exports.owner_only = false

exports.run = (client, message, args) => {
	message.channel.createMessage(
		embed(
			{
				authorName: "PolyLink • Info",
				title: "Click to join the support server!",
				url: "https://discord.gg/RpXHBnKWNT",
				fields: [
					{
						name: "What is this bot?",
						value: 'PolyLink lets you "link" your Discord and Polygon account to verify that you are the Polygon user you say you are!',
						inline: false,
					},
					{
						name: "How do I link my account?",
						value: `- Go to your server's verification channel and run \`${client.config.prefix}verify [Polygon ID]\`.\n- Put the key sent to you in Direct Messages in your [Blurb](https://polygon.pizzaboxer.xyz/my/account).\n- Run \`${client.config.prefix}verify\` again.`,
						inline: false,
					},
					{
						name: "How can I lookup a user?",
						value: `You can run \`${client.config.prefix}whois [@User or Discord ID]\` to lookup a Discord user.`,
						inline: false,
					},
					{
						name: "How can I see a list of commands?",
						value: `You can run \`${client.config.prefix}help\` to see a full list of commands, or you can specify a command to see it's usage.`,
						inline: false,
					},
				],
			},
			message
		)
	)
}
