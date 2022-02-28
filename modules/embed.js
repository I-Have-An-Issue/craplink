const constants = require("./constants")

module.exports = (data = {}, message) => {
    return {
        embed: {
            "title": data.title,
            "description": data.description,
            "url": data.url,
            "timestamp": data.timestamp,
            "color": data.color || parseInt(0xeb4034),
            "footer": {
                "icon_url": data.footerUrl || message.author.avatarURL,
                "text": data.footerText || `${message.author.username}#${message.author.discriminator} • API Latency: ${message.channel.guild.shard.latency}ms`
            },
            "image": {
                "url": data.imageUrl
            },
            "thumbnail": {
                "url": data.thumbnailUrl
            },
            "provider": {
                "name": data.providerName,
                "url": data.providerUrl
            },
            "author": {
                "name": data.authorName || "PolyLink",
                "url": data.authorUrl,
                "icon_url": data.authorIconUrl || constants.icon
            },
            "fields": data.fields || []
        }
    }
}