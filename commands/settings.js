const constants = require("../modules/constants")
const table = require("../modules/table")
const database = require("../modules/database")
const settings = require("../assets/settings.json")

exports.description = "Modify the server's settings. (Grand role on verify, etc.)"
exports.mature = false
exports.disabled = false
exports.owner_only = false

exports.run = async (client, message, args) => {
	if (!message.member.permissions.has("manageGuild")) return message.channel.createMessage(constants.embed_NoPermission(message))
	if (!(await database.read("settings", { _id: message.guildID }))) database.insert("settings", { _id: message.guildID })
	let server
	switch (args[0]) {
		case "list":
			let fields = []
			for (let i = 0; i < settings.length; i++) {
				fields.push({ name: settings[i].name, value: settings[i].description })
			}
			message.channel.createMessage(`\`\`\`\n${table(fields)}\`\`\``)
			break
		case "set":
			server = await database.read("settings", { _id: message.guildID })
			if (!settings.find((setting) => setting.name == args[1])) return message.channel.createMessage(constants.embed_SettingsUnknownSetting(message))
			await database
				.write("settings", { _id: message.guildID }, { [args[1]]: args[2] })
				.then(() => message.channel.addMessageReaction(message.id, "✅"))
				.catch((e) => {
					message.channel.addMessageReaction(message.id, "❌")
					console.log(e)
				})
			break
		case "show":
			server = await database.read("settings", { _id: message.guildID })
			if (!settings.find((setting) => setting.name == args[1])) return message.channel.createMessage(constants.embed_SettingsUnknownSetting(message))
			if (!server.hasOwnProperty(args[1]) || !server[args[1]]) return message.channel.createMessage(`\`${settings.find((setting) => setting.name == args[1]).default}\``)
			message.channel.createMessage(`\`${server[args[1]]}\``)
			break
		case "reset":
			server = await database.read("settings", { _id: message.guildID })
			if (!settings.find((setting) => setting.name == args[1])) return message.channel.createMessage(constants.embed_SettingsUnknownSetting(message))
			database
				.write("settings", { _id: message.guildID }, { [args[1]]: settings.find((setting) => setting.name == args[1]).default })
				.then(() => message.channel.addMessageReaction(message.id, "✅"))
				.catch((e) => {
					message.channel.addMessageReaction(message.id, "❌")
					console.log(e)
				})
			break
		default:
			message.channel.createMessage(constants.embed_SettingsUnknownSubcommand(message))
			break
	}
}
