const waProto = require('./wa-proto');

class Messages {
    constructor(ws) {
        this.ws = ws;
    }

    sendTextMessage(jid, text) {
        const Message = waProto.lookupType('Message');
        const payload = Message.create({ conversation: text });
        const buffer = Message.encode(payload).finish();
        // TODO: Criptează buffer cu cheile de sesiune și trimite pe ws
        console.log(`Trimite mesaj text către ${jid}:`, text);
        // this.ws.send(buffer); // de trimis real după handshake
    }

    sendImageMessage(jid, url, mimetype, caption) {
        const Message = waProto.lookupType('Message');
        const payload = Message.create({ imageMessage: { url, mimetype, caption } });
        const buffer = Message.encode(payload).finish();
        // TODO: Criptează buffer și trimite pe ws
        console.log(`Trimite imagine către ${jid}:`, url);
    }

    sendVideoMessage(jid, url, mimetype, caption) {
        const Message = waProto.lookupType('Message');
        const payload = Message.create({ videoMessage: { url, mimetype, caption } });
        const buffer = Message.encode(payload).finish();
        // TODO: Criptează buffer și trimite pe ws
        console.log(`Trimite video către ${jid}:`, url);
    }

    sendDocumentMessage(jid, url, mimetype, fileName) {
        const Message = waProto.lookupType('Message');
        const payload = Message.create({ documentMessage: { url, mimetype, fileName } });
        const buffer = Message.encode(payload).finish();
        // TODO: Criptează buffer și trimite pe ws
        console.log(`Trimite document către ${jid}:`, url);
    }

    sendReaction(jid, text, key) {
        const Message = waProto.lookupType('Message');
        const payload = Message.create({ reactionMessage: { text, key } });
        const buffer = Message.encode(payload).finish();
        // TODO: Criptează buffer și trimite pe ws
        console.log(`Trimite reacție către ${jid}:`, text);
    }

    onMessage(callback) {
        // TODO: Primește mesaje reale de la WebSocket, decriptează și decodează cu protobuf
        // ws.on('message', ...)
    }
}

module.exports = Messages;