const constants = {}

constants.icon = "https://cdn.calones.xyz/f353b19a05ae7c42.png"

constants.verify_MessageTemplate = (key) => {
	return `Your verfication key is ||\`${key}\`||. Put this key in your Blurb, and use the verify command again to link the accounts.\n(Don't share this key!)`
}

constants.embed_DebugMode = (message) => {
	const embed = require("./embed")
	return embed(
		{
			authorName: "CRAPLINK • Debug Mode",
			authorIconUrl: constants.icon,
			description: "⚠️ CRAPLINK is currently in debug mode. All commands have been restricted to owner-only. CRAPLINK should become available soon.",
		},
		message
	)
}

constants.embed_NoPermission = (message) => {
	const embed = require("./embed")
	return embed(
		{
			authorName: "CRAPLINK • Access Denied",
			authorIconUrl: constants.icon,
			description: "⛔ You do not have the required permissions to run this command.",
		},
		message
	)
}

constants.embed_VerifyInvalidId = (message) => {
	const embed = require("./embed")
	return embed(
		{
			authorName: "CRAPLINK • Verify",
			authorIconUrl: constants.icon,
			description: "⚠️ The username provided is not valid. Did you forget to include your username in your command?",
		},
		message
	)
}

constants.embed_VerifyDMFailure = (message) => {
	const embed = require("./embed")
	return embed(
		{
			authorName: "CRAPLINK • Verify",
			authorIconUrl: constants.icon,
			description: "⚠️ I just tried to send you your verification key, but your Direct Messages are disabled. Please enable them and start again.",
		},
		message
	)
}

constants.embed_VerifyTimeout = (message) => {
	const embed = require("./embed")
	return embed(
		{
			authorName: "CRAPLINK • Verify",
			authorIconUrl: constants.icon,
			description: `⏰ <@${message.author.id}>, your verification has timed out. Please start again.`,
		},
		message
	)
}

constants.embed_VerifyNoKey = (message) => {
	const embed = require("./embed")
	return embed(
		{
			authorName: "CRAPLINK • Verify",
			authorIconUrl: constants.icon,
			description: `⚠️ Your Blurb doesn't contain your verification key. Please try again.`,
		},
		message
	)
}

constants.embed_VerifySuccess = (message) => {
	const embed = require("./embed")
	return embed(
		{
			authorName: "CRAPLINK • Verify",
			authorIconUrl: constants.icon,
			description: `✅ Success!`,
		},
		message
	)
}

constants.embed_VerifyAlreadyVerified = (message) => {
	const embed = require("./embed")
	return embed(
		{
			authorName: "CRAPLINK • Verify",
			authorIconUrl: constants.icon,
			description: `⛔ The account specified is already linked to a Discord account!`,
		},
		message
	)
}

constants.embed_WhoisUserDoesntExist = (message) => {
	const embed = require("./embed")
	return embed(
		{
			authorName: "CRAPLINK • Whois",
			authorIconUrl: constants.icon,
			description: `❓ The specified user is not verified.`,
		},
		message
	)
}

constants.embed_SettingsUnknownSetting = (message) => {
	const embed = require("./embed")
	return embed(
		{
			authorName: "CRAPLINK • Settings",
			authorIconUrl: constants.icon,
			description: "❓ The setting doesn't exist.",
		},
		message
	)
}

constants.embed_SettingsUnknownSubcommand = (message) => {
	const embed = require("./embed")
	return embed(
		{
			authorName: "CRAPLINK • Role",
			authorIconUrl: constants.icon,
			description: "❓ The subcommand provided isn't valid. You can pick from `set` and `show`.",
		},
		message
	)
}

constants.embed_HelpUnknownCommand = (message) => {
	const embed = require("./embed")
	return embed(
		{
			authorName: "CRAPLINK • Help",
			authorIconUrl: constants.icon,
			description: "❓ That command doesn't exist.",
		},
		message
	)
}

module.exports = constants
