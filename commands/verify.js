const crypto = require("crypto")
const database = require("../modules/database")
const timing = require("../modules/timing")
const constants = require("../modules/constants")
const crapblox = require("../modules/crapblox")

exports.description = "Link your Discord account to a CRAPBLOX account."
exports.usage = "[crapblox_username*]"
exports.disabled = false
exports.owner_only = false

exports.run = async (client, message, args) => {
	const username = args[0]
	const authorid = message.author.id

	let existingUser = await database.read("users", { _id: authorid })
	if (existingUser) {
		let server = await database.read("settings", { _id: message.guildID })
		if (server && server.verifiedRole) {
			message.member
				.addRole(server.verifiedRole, "User verified successfully")
				.then(() => message.channel.addMessageReaction(message.id, "✅"))
				.catch((e) => {})
		}
	} else
		database.read("jobs", { _id: authorid }).then(async (job) => {
			if (job) {
				database.delete("jobs", { _id: authorid }).catch((e) => {})
				timing.stopTimeout(authorid)

				if (await crapblox.containsKey(job.username, job.key)) {
					database.insert("users", {
						_id: authorid,
						username: job.username,
						date: new Date().toISOString(),
					})
					let server = await database.read("settings", { _id: message.guildID })
					if (server && server.verifiedRole) message.member.addRole(server.verifiedRole, "User verified successfully").catch((e) => console.log(e))
					return message.channel.addMessageReaction(message.id, "✅").catch((e) => {})
				} else return message.channel.createMessage(constants.embed_VerifyNoKey(message))
			} else {
				if (!username) return message.channel.createMessage(constants.embed_VerifyInvalidId(message))
				if (!(await crapblox.getProfileByUsername(username))) return message.channel.createMessage(constants.embed_VerifyInvalidId(message))
				if (await database.read("users", { username })) return message.channel.createMessage(constants.embed_VerifyAlreadyVerified(message))

				let key = crypto.randomUUID()
				let DMChannel = await client.getDMChannel(authorid)

				DMChannel.createMessage(constants.verify_MessageTemplate(key))
					.then(() => {
						message.channel.addMessageReaction(message.id, "✅").catch((e) => {})

						database.insert("jobs", {
							_id: authorid,
							server: message.guildID,
							username,
							key,
						})

						timing.timeout(
							() => {
								database.delete("jobs", { _id: authorid }).catch((e) => {})
								message.channel.createMessage(constants.embed_VerifyTimeout(message))
							},
							300000,
							authorid
						)
					})
					.catch((e) => message.channel.createMessage(constants.embed_VerifyDMFailure(message)))
			}
		})
}
