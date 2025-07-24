class Messages {
    constructor(ws) {
        this.ws = ws;
    }

    sendMessage(jid, content) {
        // TODO: Trimite mesaj real prin WebSocket
        console.log(`Trimite mesaj către ${jid}: ${content}`);
    }

    onMessage(callback) {
        // TODO: Primește mesaje reale de la WebSocket
        // ws.on('message', ...)
    }
}

module.exports = Messages;