const embed = require("../modules/embed")
const constants = require("../modules/constants")

exports.description = "Get a list of commands, or information about a command."
exports.usage = "[command]"
exports.disabled = false
exports.owner_only = false

exports.run = (client, message, args) => {
	if (!args[0]) {
		const list = []
		for (const [key, value] of client.commands) {
			if (value.disabled) continue
			list.push(`\`${client.config.prefix}${key}\` - ${value.owner_only ? "🔒" : ""}${value.description}`)
		}

		message.channel.createMessage(
			embed(
				{
					authorName: "CRAPLINK • Help",
					title: "Click to join the support server!",
					url: "https://discord.gg/RpXHBnKWNT",
					description: list.join("\n"),
				},
				message
			)
		)
	} else {
		const cmd = client.commands.get(args[0])
		if (!cmd) return message.channel.createMessage(constants.embed_HelpUnknownCommand(message))

		message.channel.createMessage(
			embed(
				{
					authorName: "CRAPLINK • Help",
					title: `${args[0]} ${cmd.usage}`,
					description: (cmd.owner_only ? "🔒 " : "") + cmd.description,
				},
				message
			)
		)
	}
}
