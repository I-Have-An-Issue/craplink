const embed = require("../modules/embed")

exports.description = "Learn what is, and how to use CRAPLINK."
exports.usage = ""
exports.disabled = false
exports.owner_only = false

exports.run = (client, message, args) => {
	message.channel.createMessage(
		embed(
			{
				authorName: "CRAPLINK • Info",
				title: "Click to join the CRAPBLOX server!",
				url: "https://discord.gg/YVxHkKXJ7q",
				fields: [
					{
						name: "What is this bot?",
						value: 'CRAPLINK lets you "link" your Discord and CRAPBLOX account to verify that you are the CRAPBLOX user you say you are!',
						inline: false,
					},
					{
						name: "How do I link my account?",
						value: `- Go to a server and run \`${client.config.prefix}verify [CRAPBLOX Username]\`.\n- Put the key sent to you in Direct Messages in your [Blurb](https://crapblox.cf/Settings/).\n- Run \`${client.config.prefix}verify\` again.`,
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
