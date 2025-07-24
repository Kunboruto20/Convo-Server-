class Broadcast {
    constructor(ws) {
        this.ws = ws;
    }
    sendBroadcast(jids, text) {
        // TODO: Trimite mesaj broadcast
        console.log('Send broadcast:', jids, text);
    }
    onBroadcastEvent(callback) {
        // TODO: Primește evenimente broadcast
        // this.ws.on('message', ...)
    }
}
module.exports = Broadcast;