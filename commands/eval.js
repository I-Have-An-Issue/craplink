const path = require("path")
const embed = require("../modules/embed")

exports.description = "Execute JavaScript in the host's environment."
exports.usage = "[code*]"
exports.disabled = false
exports.owner_only = true

exports.run = async (client, message, args) => {
	try {
		let result = await eval(`async function _() { ${args.join(" ")} } _()`)
		message.channel
			.createMessage(
				embed(
					{
						authorName: "PolyLink • Eval",
						description: "```\n" + (result || "[No output]") + "\n```",
					},
					message
				)
			)
			.catch((e) => {
				console.log(e)
			})
	} catch (e) {
		message.channel
			.createMessage(
				embed(
					{
						authorName: "PolyLink • Eval",
						description: "```\n" + e.stack.split(path.resolve("./")).join("...") + "\n```",
					},
					message
				)
			)
			.catch((e) => {
				console.log(e)
			})
	}
}
