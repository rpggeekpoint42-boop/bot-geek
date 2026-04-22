import makeWASocket, { useMultiFileAuthState } from '@whiskeysockets/baileys'
import P from 'pino'

async function startBot() {
  try {
    const { state, saveCreds } = await useMultiFileAuthState('./auth')

    const sock = makeWASocket({
      auth: state,
      logger: P({ level: 'silent' }),
      printQRInTerminal: true
    })

    sock.ev.on('creds.update', saveCreds)

    let comandosUsados = 0

    sock.ev.on('messages.upsert', async ({ messages }) => {
      const msg = messages?.[0]
      if (!msg || !msg.message) return

      const text =
        msg.message.conversation ||
        msg.message.extendedTextMessage?.text

      if (!text) return

      const from = msg.key.remoteJid

      // ================= PING =================
      if (text.toLowerCase() === '$ping') {
        comandosUsados++

        const start = Date.now()

        const groups = await sock.groupFetchAllParticipating()
        const groupCount = Object.keys(groups).length

        const ping = Date.now() - start

        await sock.sendMessage(from, {
          text:
`🏓 PONG!

⚡ Ping: ${ping}ms
👥 Grupos ativos: ${groupCount}
📊 Comandos usados: ${comandosUsados}`
        })
      }
    })

    console.log('Bot iniciado com sucesso!')

  } catch (err) {
    console.log('ERRO NO BOT:', err)
  }
}

startBot()
