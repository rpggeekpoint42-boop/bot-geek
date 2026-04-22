const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, DisconnectReason } = require("@whiskeysockets/baileys")
const readline = require("readline")

let comandosUsados = 0

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("auth")
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    auth: state,
    connectTimeoutMs: 60000,
    defaultQueryTimeoutMs: 0
  })

  sock.ev.on("creds.update", saveCreds)

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update

    if (connection === "close") {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut
      console.log("Reconectando...", shouldReconnect)
      if (shouldReconnect) startBot()
    }

    if (connection === "open") {
      console.log("✅ Bot conectado!")
    }

    if (connection === "connecting" && !sock.authState.creds.registered) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })

      rl.question("Digite seu número (ex: 5511999999999): ", async (numero) => {
        const code = await sock.requestPairingCode(numero)
        console.log("🔑 Código:", code)
        rl.close()
      })
    }
  })

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message) return

    const from = msg.key.remoteJid
    const isGroup = from.endsWith("@g.us")

    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || ""

    if (!text) return

    // =========================
    // COMANDO PING
    // =========================
    if (text.toLowerCase() === "$ping") {
      comandosUsados++

      const start = Date.now()

      const grupos = Object.keys(sock.chats || {}).filter(jid => jid.endsWith("@g.us")).length

      const end = Date.now()
      const ping = end - start

      await sock.sendMessage(from, {
        text:
`🏓 PONG!

⚡ Velocidade: ${ping}ms
📊 Comandos usados: ${comandosUsados}
👥 Grupos: ${grupos}`
      })
    }

  })
}

startBot()
