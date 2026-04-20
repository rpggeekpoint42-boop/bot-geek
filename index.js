const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, DisconnectReason } = require("@whiskeysockets/baileys");

const prefix = "$";
let comandosUsados = 0;

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("auth");
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) startBot();
    } else if (connection === "open") {
      console.log("✅ Bot conectado!");
    }
  });

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const from = msg.key.remoteJid;

    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      "";

    // ❌ ignora mensagens sem prefixo
    if (!text.startsWith(prefix)) return;

    const comando = text.slice(prefix.length).trim().toLowerCase();

    // 👇 COMANDO PING
    if (comando === "ping") {
      comandosUsados++;

      const start = Date.now();

      const grupos = await sock.groupFetchAllParticipating();
      const totalGrupos = Object.keys(grupos).length;

      const ping = Date.now() - start;

      await sock.sendMessage(from, {
        text:
`🏓 Pong!

⚡ Ping: ${ping} ms
👥 Grupos: ${totalGrupos}
📊 Comandos usados: ${comandosUsados}`
      });
    }
  });
}

startBot();
