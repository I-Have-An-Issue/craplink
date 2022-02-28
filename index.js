require("dotenv").config()
const Eris = require("eris")
const fs = require("fs")
const log = require("./modules/log")
const polygon = require("./modules/polygon")
const database = require("./modules/database")

let client = new Eris(process.env.DISCORD_TOKEN)
client.commands = new Map()
client.config = { prefix: process.env.PREFIX, debug: process.env.DEBUG !== "true"}

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err)
    files.forEach(file => {
        const event = require("./events/" + file)
        let eventname = file.split(".")[0]
        client.on(eventname, event.bind(null, client))
        log.info(`[Discord] Mapped event: ${eventname}`)
    })
    log.success("[Discord] Events mapped")
})

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err)
    files.forEach(file => {
        if (!file.endsWith(".js")) return
        let props = require("./commands/" + file)
        let commandname = file.split(".")[0]
        client.commands.set(commandname, props)
        log.info(`[Discord] Mapped command: ${commandname}`)
    })
    log.success("[Discord] Mapped commands")
})


polygon.init().then(() => {
    log.success("[Polygon] Ready")
    database.init().then(() => {
        log.success("[Database] Ready")
        client.connect()
    })
}).catch(e => {
    console.log(e)
})

// prevent interrupt signals from leaving ownerless sessions
process.on("SIGINT", async () => {
    await polygon.logout()
    process.exit()
})