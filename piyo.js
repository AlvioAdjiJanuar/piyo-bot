require('dotenv').config()
////////////MODULE SYSTEM//////////
const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
const axios = require('axios')
const { spawn } = require('child_process')
const fetch = require('node-fetch')
const appRoot = require('app-root-path')
const os = require('os')
const mime = require('mime-types');
const fs = require('fs-extra')
////////////FOLDER SYSTEM/////////////
const { color, messageLog } = require('./utils')

module.exports = piyo = async (client, message) => {
  try{
    const { type, id, content, from, t, sender, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, author, quotedMsgObj, mentionedJidList } = message
    let { body } = message
    var { items, name, formattedTitle } = chat
    let { text } = message
    let { pushname, verifiedName, formattedName } = sender
    pushname = pushname || verifiedName || formattedName 
    const chats = (type === 'chat') ? body : (type === 'image' || type === 'video') ? caption : ''
    const { ind, ger } = require('./message/text/lang/')
    const bcmd = caption || body || ''
    const bb = bcmd.toLowerCase().split(' ')[0] || ''
    const prefix = /^[°•πz÷×¶∆£¢€¥®™✓_=|~!?@#$%^&.\/\\©^]/.test(bb) ? bb.match(/^[°•πz÷×¶∆£¢€¥®™✓_=|~!?@#$%^&.\/\\©^]/gi) : '-' 
    body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : ''
    const arg = body.substring(body.indexOf(' ') + 1)
    const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
    const validMessage = caption ? caption : body;
    const time = moment(t * 1000).format('DD/MM/YY HH:mm:ss')
    const arguments = validMessage.trim().split(' ').slice(1)
    const args = body.trim().split(/ +/).slice(1)
    const argv = body.slice(1).trim().split(/ +/).shift().toLowerCase()
    const isCmd = body.startsWith(prefix)
    const uaOverride = process.env.UserAgent
    const q = args.join(' ')
    //// Log
    if (isCmd && !isGroupMsg) console.log(color('[CMD]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
    if (isCmd && isGroupMsg) console.log(color('[CMD]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))
    switch (command) {
      case 'ping':
        client.reply(from, 'pong!!', id,);
        break
      case 'sticker':
        if (isMedia && type === 'image') {
        await client.reply(from, ind.wait() , id)
        const buffer = await client.decryptFile(message);
        const fileName = `some-file-name.${mime.extension(message.mimetype)}`;
        await fs.writeFile(fileName, buffer)
        await client.sendImageAsSticker(from, fileName)
        await fs.unlinkSync(fileName)
        }
        break
        default:
        
}
} catch (err) {
        console.log(color('[EROR]', 'red'), err)
    }
}
  