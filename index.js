const Discord = require('discord.js')
const config = require('./config.json')
const command = require('./commandHandler.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log('The Client is Ready!')

    // also works with a array.
    // like ['ping', 'test']
    command(client, 'ping', message => { //ping command
        message.channel.send('Pong!')
    })
    command(client, ['server', 'guild'], message => { //guild show-up command
        client.guilds.cache.forEach((guild) => {
            message.channel.send(
                `**${guild.name}** tem um total de **${guild.memberCount}** membros!`
            )
        })
    })
    command(client, ['cc', 'clearchannel'], message => { //channel clean-up command
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results)
            })
            message.channel.send(
                `Todas as mensagens do canal **${message.channel.name}** foram apagadas por um **ADM**!`
            )
        }
        else {
            message.channel.send(
                `${message.author} não tem a permissão seu safadinho/a >:(`
            )
        }
    })
})

client.login(config.token)