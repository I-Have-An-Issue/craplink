const path = require("path")
const embed = require("../modules/embed")

exports.description = "Reload a command that has already been bound."
exports.mature = false
exports.disabled = false
exports.owner_only = true

exports.run = (client, message, args) => {
    const commandName = args[0]
    const command = client.commands.get(commandName)

    if (!command) return message.channel.createMessage(embed({
        authorName: "PolyLink • Reload",
        description: `❓ ${commandName} is not a valid bound command.`
    }, message))

    delete require.cache[require.resolve(`./${commandName}.js`)]

    try {
        const newCommand = require(`./${commandName}.js`)
        client.commands.set(commandName, newCommand)
    } catch (e) {
        return message.channel.createMessage(embed({
            authorName: "PolyLink • Reload",
            description: `‼️ ${commandName} failed to reload! See stack trace below.\n\`\`\`\n${e.stack.split(path.resolve("./")).join("...")}\`\`\``
        }, message))
    }

    message.channel.createMessage(embed({
        authorName: "PolyLink • Reload",
        description: `✅ ${commandName} was successfully reloaded.`
    }, message))
}