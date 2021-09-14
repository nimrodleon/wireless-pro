export function initBot365(bot) {
  const BOT_NAME = 'Tobi'
  start(bot, BOT_NAME)
}

// Al iniciar bot.
function start(bot, botName) {
  bot.start(ctx => {
    ctx.reply('¡Hola! 💙')
    ctx.reply(`¡${ctx.from.first_name} Bienvenid@ a DIRECOM! Soy ${botName} 🤖 tu asesora virtual.`)


    console.log(ctx.from)
  })
}
