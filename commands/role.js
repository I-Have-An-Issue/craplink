const constants = require("../modules/constants")
const database = require("../modules/database")
const settings = [{ name: "verifiedRole", default: undefined }]

exports.description = "Set what role to give to verified users."
exports.usage = "[subcommand*] [value]"
exports.disabled = false
exports.owner_only = false

exports.run = async (client, message, args) => {
	if (!message.member.permissions.has("manageGuild")) return message.channel.createMessage(constants.embed_NoPermission(message))
	if (!(await database.read("settings", { _id: message.guildID }))) database.insert("settings", { _id: message.guildID })
	let server
	switch (args[0]) {
		case "set":
			server = await database.read("settings", { _id: message.guildID })
			if (!settings.find((setting) => setting.name == "verifiedRole")) return message.channel.createMessage(constants.embed_SettingsUnknownSetting(message))

			await database
				.write("settings", { _id: message.guildID }, { ["verifiedRole"]: args[1] })
				.then(() => message.channel.addMessageReaction(message.id, "✅"))
				.catch((e) => {})
				.catch((e) => {
					message.channel.addMessageReaction(message.id, "❌").catch((e) => {})
					console.log(e)
				})
			break
		case "show":
			server = await database.read("settings", { _id: message.guildID })
			if (!settings.find((setting) => setting.name == "verifiedRole")) return message.channel.createMessage(constants.embed_SettingsUnknownSetting(message))
			if (!server.hasOwnProperty("verifiedRole") || !server["verifiedRole"]) return message.channel.createMessage(`\`${settings.find((setting) => setting.name == "verifiedRole").default}\``)

			message.channel.createMessage(`\`${server["verifiedRole"]}\``)
			break
		default:
			message.channel.createMessage(constants.embed_SettingsUnknownSubcommand(message))
			break
	}
}
