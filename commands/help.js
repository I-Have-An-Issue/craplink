const embed = require("../modules/embed")

exports.description = "Get useful information or learn how to use the bot."
exports.mature = false
exports.disabled = false
exports.owner_only = false

exports.run = (client, message, args) => {
	message.channel.createMessage(
		embed(
			{
				authorName: "PolyLink • Help",
				title: "Click to add me to your server!",
				url: "https://discord.com/oauth2/authorize?client_id=829439465583804446&permissions=470142016&scope=bot",
				fields: [
					{
						name: "What is this bot?",
						value: 'PolyLink lets you "link" your Discord and Polygon account to verify that you are the Polygon user you say you are!',
						inline: false,
					},
					{
						name: "How do I link my account?",
						value: `Simple! Go to your server's verification channel and type \`${client.config.prefix}verify [UserId]\`\nYou will get a direct message from the bot containing a unique key.\nPut this key in your Blurb, (https://polygon.pizzaboxer.xyz/my/account) then do \`${client.config.prefix}verify\` in the server you started the process in.`,
						inline: false,
					},
					{
						name: "How can I lookup a user?",
						value: `You can use the \`${client.config.prefix}whois [MentionedUser or Discord User Id]\` command to lookup a Discord user.`,
						inline: false,
					},
					{
						name: "Can I lookup a user by Polygon UserId?",
						value: "This will come in the future in the Web API to whitelisted users. This feature will never be added to the bot for security reasons.",
						inline: false,
					},
				],
			},
			message
		)
	)
}
