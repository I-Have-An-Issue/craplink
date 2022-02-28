const constants = require("../modules/constants")

module.exports = (client, message) => {
    if (!message.channel.guild) return
    if (message.author.bot) return 
    if (message.content.indexOf(client.config.prefix) !== 0) return 

    let args = message.content.slice(client.config.prefix.length).trim().split(" ")
    let commandName = args.shift().toLowerCase()
    let command = client.commands.get(commandName)

    if (!command) return 
    
    if (message.author.id != "223004006299992064" && client.config.debug) return message.channel.createMessage(constants.embed_DebugMode(message))
    if (command.mature && !message.channel.nsfw) return message.channel.createMessage(constants.embed_Mature(message))
    if (command.disabled) return
    if (message.author.id != "223004006299992064" && command.owner_only) return message.channel.createMessage(constants.embed_NoPermission(message))

    command.run(client, message, args)
}