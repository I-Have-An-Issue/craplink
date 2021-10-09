const polygon = require("../modules/polygon")
const database = require("../modules/database")
const constants = require("../modules/constants")
const embed = require("../modules/embed")

exports.description = "Link your Discord account to a Polygon account."
exports.mature = false
exports.disabled = false
exports.owner_only = false 

exports.run = async (client, message, args) => {
    let discordid = message.mentions[0] ? message.mentions[0].id : args[0]
    let user = await database.read("users", { _id: discordid })
    if (!user) return message.channel.createMessage(constants.embed_WhoisUserDoesntExist(message))
    let profile = await polygon.getProfile(user.userid)

    message.channel.createMessage(embed({
        authorName: "PolyLink • Whois",
        title: profile.username,
        url: `https://polygon.pizzaboxer.xyz/user?ID=${user.userid}`,
        description: profile.blurb,
        thumbnailUrl: profile.thumbnail,
        fields: [
            {
                name: "Verification Date",
                value: `<t:${Math.round(new Date(user.date).getTime()/1000)}:F>`,
                inline: true
            }
        ]
    }, message))
}