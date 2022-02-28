const constants = {}

constants.icon = "https://cdn.calones.xyz/eM7kjexIX9Y"

constants.verify_MessageTemplate = (key) => {
    return `Your verfication key is ||\`${key}\`||. Put this key in your Blurb, and use the verify command again to link the accounts.\n(Don't share this key!)`
}

constants.embed_DebugMode = (message) => {
    const embed = require("./embed")
    return embed({
        authorName: "PolyLink • Debug Mode",
        authorIconUrl: constants.icon,
        description: "⚠️ PolyLink is currently in debug mode. All commands have been restricted to owner-only. PolyLink should become available soon."
    }, message)
}

constants.embed_Mature = (message) => {
    const embed = require("./embed")
    return embed({
        authorName: "PolyLink • Mature",
        authorIconUrl: constants.icon,
        description: "🔞 The command you just tried to run is restricted to 18+ channels only."
    }, message)
}

constants.embed_NoPermission = (message) => {
    const embed = require("./embed")
    return embed({
        authorName: "PolyLink • Access Denied",
        authorIconUrl: constants.icon,
        description: "⛔ You do not have the required permissions to run this command."
    }, message)
}

constants.embed_VerifyInvalidId = (message) => {
    const embed = require("./embed")
    return embed({
        authorName: "PolyLink • Verify",
        authorIconUrl: constants.icon,
        description: "⚠️ The UserId provided is not valid."
    }, message)
}

constants.embed_VerifyDMFailure = (message) => {
    const embed = require("./embed")
    return embed({
        authorName: "PolyLink • Verify",
        authorIconUrl: constants.icon,
        description: "⚠️ I just tried to send you your verification key, but your Direct Messages are disabled. Please enable them and start again."
    }, message)
}

constants.embed_VerifyTimeout = (message) => {
    const embed = require("./embed")
    return embed({
        authorName: "PolyLink • Verify",
        authorIconUrl: constants.icon,
        description: `⏰ <@${message.author.id}>, your verification has timed out. Please start again.`
    }, message)
}

constants.embed_VerifyNoKey = (message) => {
    const embed = require("./embed")
    return embed({
        authorName: "PolyLink • Verify",
        authorIconUrl: constants.icon,
        description: `⚠️ Your Blurb doesn't contain your verification key. Please try again.`
    }, message)
}

constants.embed_VerifySuccess = (message) => {
    const embed = require("./embed")
    return embed({
        authorName: "PolyLink • Verify",
        authorIconUrl: constants.icon,
        description: `✅ Success!`
    }, message)
}

constants.embed_VerifyAlreadyVerified = (message) => {
    const embed = require("./embed")
    return embed({
        authorName: "PolyLink • Verify",
        authorIconUrl: constants.icon,
        description: `⛔ The account specified is already linked to a Discord account!`
    }, message)
}

constants.embed_WhoisUserDoesntExist = (message) => {
    const embed = require("./embed")
    return embed({
        authorName: "PolyLink • Whois",
        authorIconUrl: constants.icon,
        description: `❓ The specified user is not verified.`
    }, message)
}

constants.embed_SettingsUnknownSetting = (message) => {
    const embed = require("./embed")
    return embed({
        authorName: "PolyLink • Settings",
        authorIconUrl: constants.icon,
        description: "❓ The setting doesn't exist."
    }, message)
}

constants.embed_SettingsUnknownSubcommand = (message) => {
    const embed = require("./embed")
    return embed({
        authorName: "PolyLink • Settings",
        authorIconUrl: constants.icon,
        description: "❓ The subcommand provided isn't valid.\nYou can pick from `list`, `set`, `show` and `reset`."
    }, message)
}

module.exports = constants