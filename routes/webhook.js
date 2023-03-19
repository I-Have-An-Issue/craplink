const express = require("express")
const app = express.Router()

app.use(express.json())

app.post("/", async (request, response) => {
	const client = request.bot
	const channel = client.getChannel("1085325103081992214")
	const message = await channel.createMessage(request.body).catch((e) => e)
	response.end(message.id)
})

module.exports = app
