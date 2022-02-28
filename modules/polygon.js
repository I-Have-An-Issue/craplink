const polygon = {}

const Polygon = require("@i-have-an-issue/polygon.js")
const client = new Polygon.Client(process.env.POLYGON_USERNAME, process.env.POLYGON_PASSWORD)

polygon.init = async () => {
    setInterval(async () => { await client.ping() }, 1*60*1000)
    return await client.login()
}

polygon.logout = async () => {
    return await client.logout()
}

polygon.userExists = async (id) => {
    return !!(await client.getUser(id))
}

polygon.containsKey = async (id, key) => {
    const user = await client.getUser(id)
    if (!user) return false
    return ((await user.getBlurb()).includes(key))
}

polygon.getProfile = async (id) => {
    return await client.getUser(id)
}

module.exports = polygon