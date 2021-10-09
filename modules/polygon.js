const polygon = {}

const Polygon = require("@i-have-an-issue/polygon.js")
let User = new Polygon.User()

let ready = false

User.on("error", (type, err) => console.log(type, err))
User.on("logout", () => ready = false)

polygon.init = () => {
    return new Promise((resolve, reject) => {
        User.login(process.env.POLYGON_USERNAME, process.env.POLYGON_PASSWORD).catch(e => reject(e))
        User.on("ready", () => {
            ready = true
            resolve()
        })
    })
}

polygon.logout = () => {
    return new Promise(async (resolve, reject) => {
        await User.logout().catch(e => reject(e))
        resolve()
    })
}

polygon.userExists = (userid) => {
    return new Promise(async (resolve, reject) => {
        resolve(!!await User.people.getInfo(userid).catch(e => reject(e)))
    })
}

polygon.containsKey = (userid, key) => {
    return new Promise(async (resolve, reject) => {
        let profile = await User.people.getProfile(userid).catch(e => reject(e))
        resolve(profile.blurb.includes(key))
    })
}

polygon.getProfile = (userid) => {
    return new Promise(async (resolve, reject) => {
        resolve(await User.people.getProfile(userid).catch(e => reject(e)))
    })
}

module.exports = polygon