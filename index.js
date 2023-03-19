const Eris = require("eris")
const fs = require("fs")
const express = require("express")
const app = express()
const log = require("./modules/log")
const database = require("./modules/database")

let client = new Eris(process.env.DISCORD_TOKEN)
client.commands = new Map()
client.config = { prefix: process.env.PREFIX, debug: process.env.DEBUG == "true" }

app.use((request, response, next) => {
	request.bot = client
	next()
})
app.use("/webhook", require("./routes/webhook.js"))

fs.readdir("./events/", (err, files) => {
	if (err) return console.error(err)
	files.forEach((file) => {
		const event = require("./events/" + file)
		let eventname = file.split(".")[0]
		client.on(eventname, event.bind(null, client))
		log.info(`[Discord] Mapped event: ${eventname}`)
	})
	log.success("[Discord] Events mapped")
})

fs.readdir("./commands/", (err, files) => {
	if (err) return console.error(err)
	files.forEach((file) => {
		if (!file.endsWith(".js")) return
		let props = require("./commands/" + file)
		let commandname = file.split(".")[0]
		client.commands.set(commandname, props)
		log.info(`[Discord] Mapped command: ${commandname}`)
	})
	log.success("[Discord] Mapped commands")
})

database
	.init()
	.then(() => {
		log.success("[Database] Ready")
		app.listen(process.env.PORT || 5173, () => {
			log.success("[Express] Ready")
			client.connect()
		})
	})
	.catch((e) => {
		console.log(e)
	})
