////////////////////MODULE SYSTEM///////////////
const { create, Client} = require('venom-bot');
const fs = require('fs-extra');
const figlet = require('figlet')
///////////////////FOLDER SYSTEM//////////
const options = require('./utils/options');
const piyo = require('./piyo');
const { color, messageLog } = require('./utils')
const { ind, eng } = require('./message/text/lang/')

const start = (client = new Client()) => {
    console.log(color(figlet.textSync('----------------', { horizontalLayout: 'default' })))
    console.log(color(figlet.textSync('Piyo Bot', { font: 'Ghost', horizontalLayout: 'default' })))
    console.log(color(figlet.textSync('----------------', { horizontalLayout: 'default' })))
    console.log(color('[DEV]'), color('Piyo', 'yellow'))
    console.log(color('[~>>]'), color('BOT Started!', 'green'))
  
    // Keeps the session running
    // Mempertahankan sesi agar tetap nyala
    client.onStateChange((state) => {
        console.log(color('[~>>]', 'red'), state)
        if (state === 'CONFLICT' || state === 'UNLAUNCHED') client.forceRefocus()
    })
    // ketika bot diinvite ke dalam group
    // when bots are invited into the group
    client.onAddedToGroup(async (chat) => {
	      client.leaveGroup(chat.id)
	      client.deleteChat(chat.id)
	  }) 
    client.onIncomingCall(async (callData) => {
        // ketika seseorang menelpon nomor bot akan mengirim pesan
        // when someone calls the number the bot will send a message
        await client.sendText(callData.peerJid, 'Maaf sedang tidak bisa menerima panggilan.\n nelfon=block \n\n-bot')
        .then(async () => {
            // bot akan memblock nomor itu
            // the bot will block that number
          
            await client.contactBlock(callData.peerJid)
        })
    })
    client.onMessage(async (message) => {
        piyo(client, message)    
    })
}
  create(options(true, start))
    .then((client) => start(client))
    .catch((err) => new Error(err))