import makeWASocket, { useMultiFileAuthState } from '@whiskeysockets/baileys'
import P from 'pino'

async function startBot() {
const { state, saveCreds } = await useMultiFileAuthState('./auth')

const sock = makeWASocket({
auth: state,
logger: P({ level: 'silent' }),
printQRInTerminal: true
})

sock.ev.on('creds.update', saveCreds)

let comandosUsados = 0

// ================= QUESTS =================
const quests = [

`➖✦➖✦➖ ᯓ ᎒•' 👾'•᎒ ᯓ ➖✦➖✦➖
📜 QUEST GEEKPOINT

❓ Pergunta

Qual é seu anime favorito?

➖✦➖✦➖ ᯓ ᎒•'🎯'•᎒ ᯓ ➖✦➖✦➖`,

`➖✦➖✦➖ ᯓ ᎒•' 👾'•᎒ ᯓ ➖✦➖✦➖
📜 QUEST GEEKPOINT

❓ Pergunta

Qual sua/seu protagonista favorito?

➖✦➖✦➖ ᯓ ᎒•'🎯'•᎒ ᯓ ➖✦➖✦➖`,

`➖✦➖✦➖ ᯓ ᎒•' 👾'•᎒ ᯓ ➖✦➖✦➖
📜 QUEST GEEKPOINT

❓ Pergunta

Qual a diferença entre falha e ilusão?

➖✦➖✦➖ ᯓ ᎒•'🎯'•᎒ ᯓ ➖✦➖✦➖`,

`➖✦➖✦➖ ᯓ ᎒•' 👾'•᎒ ᯓ ➖✦➖✦➖
📜 QUEST GEEKPOINT

❓ Pergunta

Qual a diferença entre golpes avançado e especial?

➖✦➖✦➖ ᯓ ᎒•'🎯'•᎒ ᯓ ➖✦➖✦➖`,

`➖✦➖✦➖ ᯓ ᎒•' 👾'•᎒ ᯓ ➖✦➖✦➖
📜 QUEST GEEKPOINT

⚔️ Desafio

Dê bom dia/tarde/noite no grupo da sua raça ou classe

➖✦➖✦➖ ᯓ ᎒•'🎯'•᎒ ᯓ ➖✦➖✦➖`,

`➖✦➖✦➖ ᯓ ᎒•' 👾'•᎒ ᯓ ➖✦➖✦➖
📜 QUEST GEEKPOINT

⚔️ Desafio

Vá no chat global e deseje bom dia/tarde/noite

➖✦➖✦➖ ᯓ ᎒•'🎯'•᎒ ᯓ ➖✦➖✦➖`,

`➖✦➖✦➖ ᯓ ᎒•' 👾'•᎒ ᯓ ➖✦➖✦➖
📜 QUEST GEEKPOINT

⚔️ Desafio

Em uma batalha, habilidade ganha de golpes?

➖✦➖✦➖ ᯓ ᎒•'🎯'•᎒ ᯓ ➖✦➖✦➖`,

`➖✦➖✦➖ ᯓ ᎒•' 👾'•᎒ ᯓ ➖✦➖✦➖
📜 QUEST GEEKPOINT

⚔️ Desafio

Desafie seu chefe de raça/mestre para um duelo

➖✦➖✦➖ ᯓ ᎒•'🎯'•᎒ ᯓ ➖✦➖✦➖`,

`➖✦➖✦➖ ᯓ ᎒•' 👾'•᎒ ᯓ ➖✦➖✦➖
📜 QUEST GEEKPOINT

❓ Pergunta

Qual habilidade pode matar o adversário de uma só vez?

➖✦➖✦➖ ᯓ ᎒•'🎯'•᎒ ᯓ ➖✦➖✦➖`,

`➖✦➖✦➖ ᯓ ᎒•' 👾'•᎒ ᯓ ➖✦➖✦➖
📜 QUEST GEEKPOINT

❓ Pergunta

Qual a diferença entre ataques e golpes?

➖✦➖✦➖ ᯓ ᎒•'🎯'•᎒ ᯓ ➖✦➖✦➖`,

`➖✦➖✦➖ ᯓ ᎒•' 👾'•᎒ ᯓ ➖✦➖✦➖
📜 QUEST GEEKPOINT

❓ Pergunta

Entre paralisia com dano e sem dano, qual vence?

➖✦➖✦➖ ᯓ ᎒•'🎯'•᎒ ᯓ ➖✦➖✦➖`,

`➖✦➖✦➖ ᯓ ᎒•' 👾'•᎒ ᯓ ➖✦➖✦➖
📜 QUEST GEEKPOINT

⚔️ Desafio

Vá no chat global e deseje bom dia/tarde/noite

➖✦➖✦➖ ᯓ ᎒•'🎯'•᎒ ᯓ ➖✦➖✦➖`,

`➖✦➖✦➖ ᯓ ᎒•' 👾'•᎒ ᯓ ➖✦➖✦➖
📜 QUEST GEEKPOINT

⚔️ Desafio

Em uma batalha, habilidade ganha de golpes?

➖✦➖✦➖ ᯓ ᎒•'🎯'•᎒ ᯓ ➖✦➖✦➖`,

`➖✦➖✦➖ ᯓ ᎒•' 👾'•᎒ ᯓ ➖✦➖✦➖
📜 QUEST GEEKPOINT

⚔️ Desafio

Desafie seu chefe de raça/mestre para um duelo

➖✦➖✦➖ ᯓ ᎒•'🎯'•᎒ ᯓ ➖✦➖✦➖`,

`➖✦➖✦➖ ᯓ ᎒•' 👾'•᎒ ᯓ ➖✦➖✦➖
📜 QUEST GEEKPOINT

❓ Pergunta

O que você está achando do sistema de quest?

➖✦➖✦➖ ᯓ ᎒•'🎯'•᎒ ᯓ ➖✦➖✦➖`
]

// ================= MENSAGENS =================
sock.ev.on('messages.upsert', async ({ messages }) => {
const msg = messages?.[0]
if (!msg || !msg.message) return

const text =  
  msg.message.conversation ||  
  msg.message.extendedTextMessage?.text  

if (!text) return  

const from = msg.key.remoteJid  

// ================= QUEST =================  
if (text.toLowerCase() === '$quest') {  
  comandosUsados++  

  const random = quests[Math.floor(Math.random() * quests.length)]  

  await sock.sendMessage(from, { text: random })  
}  

// ================= PING =================  
if (text.toLowerCase() === '$ping') {  
  comandosUsados++  

  const start = Date.now()  

  const groups = await sock.groupFetchAllParticipating()  
  const groupCount = Object.keys(groups).length  

  const ping = Date.now() - start  

  await sock.sendMessage(from, {  
    text: `🏓 PONG!

⚡ Ping: ${ping}ms
👥 Grupos ativos: ${groupCount}
📊 Comandos usados: ${comandosUsados}`
})
}
})
}

startBot()
