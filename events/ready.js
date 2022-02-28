const log = require("../modules/log")
let ready = false

module.exports = (client) => {
    if (!ready) {
        ready = true
        log.success(`[Discord] Ready, logged into ${client.user.username}#${client.user.discriminator}`)
    }

    client.shards.forEach(a => a.editStatus({ 
        name: `${client.config.debug ? "[debug mode]" : `for ${client.config.prefix}verify`} | ${client.config.prefix}help`, 
        type: 3 
    }))
}