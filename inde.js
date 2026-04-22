const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const readline = require("readline");

async function start() {
  const { state } = await useMultiFileAuthState("auth");

  const sock = makeWASocket({
    auth: state
  });

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Digite seu número (ex: 5511999999999): ", async (numero) => {
    const code = await sock.requestPairingCode(numero);
    console.log("Código:", code);
    rl.close();
  });
}

start();
