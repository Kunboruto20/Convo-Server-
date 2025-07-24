const qrcode = require('qrcode-terminal');
const { generateKeyPair } = require('./utils');
const crypto = require('crypto');
const WebSocket = require('ws');
const NoiseHandshake = require('./noise');

function randomId(len = 16) {
    return crypto.randomBytes(len).toString('base64');
}

class Auth {
    constructor() {
        this.session = null;
        this.keyPair = generateKeyPair();
        this.clientId = randomId(16);
        this.browserId = randomId(16);
    }

    async startPairing() {
        // 1. Încearcă să folosești sesiunea existentă
        const existingSession = this.session.load();
        if (existingSession && existingSession.sessionKey) {
            console.log('Sesiune existentă găsită. Încerc reconectarea fără QR...');
            this.keyPair.publicKey = Buffer.from(existingSession.localPubKey, 'base64');
            this.keyPair.privateKey = this.keyPair.privateKey; // deja generată
            this.noise = new NoiseHandshake(this.keyPair);
            this.noise.sessionKey = Buffer.from(existingSession.sessionKey, 'base64');
            this.initWebSocket();
            return;
        }
        // 1. Generează chei Curve25519 pentru Noise handshake
        const pubKeyB64 = this.keyPair.publicKey.toString('base64');
        // 2. Generează identificatori client
        const clientId = this.clientId;
        const browserId = this.browserId;
        // 3. Construiește payload QR code real (format WhatsApp)
        // Format: <publicKey>,<clientId>,<browserId>
        const qrPayload = `${pubKeyB64},${clientId},${browserId}`;
        console.log('QR Payload:', qrPayload);
        qrcode.generate(qrPayload, { small: true });
        // 4. După scanarea QR, inițializează WebSocket și handshake
        this.initWebSocket();
    }

    initWebSocket(retryCount = 0) {
        const ws = new WebSocket('wss://web.whatsapp.com/ws');
        ws.on('open', () => {
            console.log('WebSocket connected. Inițiez handshake Noise...');
            if (!this.noise) {
                this.noise = new NoiseHandshake(this.keyPair);
            }
            this.noise.ws = ws;
            this.noise.init();
            const handshakeMsg = this.noise.buildInitialMessage();
            ws.send(handshakeMsg);
        });
        ws.on('message', (data) => {
            this.noise.processServerMessage(data);
            const sessionData = this.noise.finalizeHandshake();
            this.session.save(sessionData);
            console.log('Sesiune salvată:', sessionData);
        });
        ws.on('close', () => {
            console.log('WebSocket closed. Încerc reconectarea automată...');
            if (retryCount < 5) {
                setTimeout(() => this.initWebSocket(retryCount + 1), 2000 * (retryCount + 1));
            } else {
                console.error('Reconectare eșuată după 5 încercări.');
            }
        });
        ws.on('error', (err) => {
            console.error('WebSocket error:', err);
        });
        this.ws = ws;
    }
}

module.exports = Auth;