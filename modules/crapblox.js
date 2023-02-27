const fetch = require("node-fetch")

exports.getProfileByUsername = async (username) => {
	const response = await fetch(`https://crapblox.cf/get/user-info/user/${username}`).catch(() => false)
	return response.json().catch(() => false)
}

exports.containsKey = async (username, key) => {
	const profile = await this.getProfileByUsername(username)
	if (!profile) return false
	return profile.roblox_description.includes(key)
}
