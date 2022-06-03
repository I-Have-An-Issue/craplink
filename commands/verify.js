const crypto = require("crypto")
const database = require("../modules/database")
const timing = require("../modules/timing")
const constants = require("../modules/constants")
const polygon = require("../modules/polygon")

exports.description = "Link your Discord account to a Polygon account."
exports.mature = false
exports.disabled = false
exports.owner_only = false

exports.run = async (client, message, args) => {
	let userid = args[0]
	let authorid = message.author.id

	let existingUser = await database.read("users", { _id: authorid })
	if (existingUser) {
		let server = await database.read("settings", { _id: message.guildID })
		if (server && server.hasOwnProperty("verifiedRole") && !!server.verifiedRole) {
			message.member
				.addRole(server.verifiedRole, "User verified successfully and the server has a verified role set.")
				.then(() => message.channel.addMessageReaction(message.id, "✅"))
				.catch(() => {})
		}
	} else
		database.read("jobs", { _id: authorid }).then(async (job) => {
			if (job) {
				database.delete("jobs", { _id: authorid }).catch((e) => {})
				timing.stopTimeout(authorid)

				if (await polygon.containsKey(job.userid, job.key)) {
					database.insert("users", {
						_id: authorid,
						userid: job.userid,
						date: new Date().toISOString(),
					})
					let server = await database.read("settings", { _id: message.guildID })
					if (server && server.hasOwnProperty("verifiedRole") && !!server.verifiedRole) message.member.addRole(server.verifiedRole, "User verified successfully and the server has a verified role set.").catch(() => {})
					return message.channel.addMessageReaction(message.id, "✅")
				} else return message.channel.createMessage(constants.embed_VerifyNoKey(message))
			} else {
				if (!userid || isNaN(Number(userid))) return message.channel.createMessage(constants.embed_VerifyInvalidId(message))
				if (!(await polygon.userExists(userid))) return message.channel.createMessage(constants.embed_VerifyInvalidId(message))
				if (await database.read("users", { userid })) return message.channel.createMessage(constants.embed_VerifyAlreadyVerified(message))

				let key = `polylink-${crypto.randomUUID()}`
				let DMChannel = await client.getDMChannel(authorid)

				DMChannel.createMessage(constants.verify_MessageTemplate(key))
					.then(() => {
						message.channel.addMessageReaction(message.id, "✅")

						database.insert("jobs", {
							_id: authorid,
							server: message.guildID,
							userid,
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
