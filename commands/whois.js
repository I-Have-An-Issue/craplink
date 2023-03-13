const database = require("../modules/database")
const constants = require("../modules/constants")
const embed = require("../modules/embed")
const crapblox = require("../modules/crapblox")

exports.description = "Lookup a Discord user."
exports.usage = "[mentioned_user|discord_userid*]"
exports.disabled = false
exports.owner_only = false

exports.run = async (client, message, args) => {
	let discordid = message.mentions[0] ? message.mentions[0].id : args[0]
	let user = await database.read("users", { _id: discordid })
	if (!user) return message.channel.createMessage(constants.embed_WhoisUserDoesntExist(message))
	let profile = await crapblox.getProfileByUsername(user.username)

	message.channel.createMessage(
		embed(
			{
				authorName: "CRAPLINK • Whois",
				title: profile.roblox_username,
				url: `https://crapblox.cf/User/${user.id}`,
				description: profile.roblox_description,
				thumbnailUrl: `https://crapblox.cf/Thumbs/Avatars/${profile.id}.png`,
				fields: [
					{
						name: "Verification Date",
						value: `<t:${Math.round(new Date(user.date).getTime() / 1000)}:F>`,
						inline: true,
					},
				],
			},
			message
		)
	)
}
