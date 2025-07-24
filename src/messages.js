const waProto = require('./wa-proto');
const { aesGcmEncrypt } = require('./utils');
const crypto = require('crypto');
const axios = require('axios');

class Messages {
    constructor(ws, sessionKey) {
        this.ws = ws;
        this.sessionKey = sessionKey; // Buffer
    }

    sendTextMessage(jid, text) {
        const Message = waProto.lookupType('Message');
        const payload = Message.create({ conversation: text });
        const buffer = Message.encode(payload).finish();
        // Criptează buffer cu cheile de sesiune (AES-GCM)
        const nonce = crypto.randomBytes(12); // 12 bytes pentru GCM
        const { encrypted, tag } = aesGcmEncrypt(this.sessionKey, buffer, nonce);
        const finalPayload = Buffer.concat([nonce, tag, encrypted]);
        if (this.ws) this.ws.send(finalPayload);
        console.log(`Trimite mesaj text către ${jid}:`, text);
    }

    sendImageMessage(jid, url, mimetype, caption) {
        const Message = waProto.lookupType('Message');
        const payload = Message.create({ imageMessage: { url, mimetype, caption } });
        const buffer = Message.encode(payload).finish();
        const nonce = crypto.randomBytes(12);
        const { encrypted, tag } = aesGcmEncrypt(this.sessionKey, buffer, nonce);
        const finalPayload = Buffer.concat([nonce, tag, encrypted]);
        if (this.ws) this.ws.send(finalPayload);
        console.log(`Trimite imagine către ${jid}:`, url);
    }

    sendVideoMessage(jid, url, mimetype, caption) {
        const Message = waProto.lookupType('Message');
        const payload = Message.create({ videoMessage: { url, mimetype, caption } });
        const buffer = Message.encode(payload).finish();
        const nonce = crypto.randomBytes(12);
        const { encrypted, tag } = aesGcmEncrypt(this.sessionKey, buffer, nonce);
        const finalPayload = Buffer.concat([nonce, tag, encrypted]);
        if (this.ws) this.ws.send(finalPayload);
        console.log(`Trimite video către ${jid}:`, url);
    }

    sendDocumentMessage(jid, url, mimetype, fileName) {
        const Message = waProto.lookupType('Message');
        const payload = Message.create({ documentMessage: { url, mimetype, fileName } });
        const buffer = Message.encode(payload).finish();
        const nonce = crypto.randomBytes(12);
        const { encrypted, tag } = aesGcmEncrypt(this.sessionKey, buffer, nonce);
        const finalPayload = Buffer.concat([nonce, tag, encrypted]);
        if (this.ws) this.ws.send(finalPayload);
        console.log(`Trimite document către ${jid}:`, url);
    }

    sendReaction(jid, text, key) {
        const Message = waProto.lookupType('Message');
        const payload = Message.create({ reactionMessage: { text, key } });
        const buffer = Message.encode(payload).finish();
        const nonce = crypto.randomBytes(12);
        const { encrypted, tag } = aesGcmEncrypt(this.sessionKey, buffer, nonce);
        const finalPayload = Buffer.concat([nonce, tag, encrypted]);
        if (this.ws) this.ws.send(finalPayload);
        console.log(`Trimite reacție către ${jid}:`, text);
    }

    async uploadMedia(fileBuffer, mimetype) {
        // Exemplu endpoint media WhatsApp (descoperit de Baileys)
        const uploadUrl = 'https://mmg.whatsapp.net/d/f/';
        // În realitate, endpoint-ul și parametrii trebuie obținuți din handshake/session
        // Aici simulăm uploadul pentru exemplu
        const res = await axios.post(uploadUrl, fileBuffer, {
            headers: {
                'Content-Type': mimetype
            }
        });
        // În răspuns, WhatsApp returnează URL-ul media
        return res.data && res.data.url ? res.data.url : null;
    }

    onMessage(callback) {
        if (!this.ws) return;
        this.ws.on('message', (data) => {
            // Extrage nonce, tag, encrypted
            const nonce = data.slice(0, 12);
            const tag = data.slice(12, 28);
            const encrypted = data.slice(28);
            try {
                const decrypted = require('./utils').aesGcmDecrypt(this.sessionKey, encrypted, nonce, tag);
                const Message = waProto.lookupType('Message');
                const msg = Message.decode(decrypted);
                callback(msg);
            } catch (e) {
                console.error('Eroare la decriptare/parsare mesaj:', e);
            }
        });
    }
}

module.exports = Messages;