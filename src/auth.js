const qrcode = require('qrcode-terminal');
const { generateKeyPair } = require('./utils');

class Auth {
    constructor() {
        this.session = null;
        this.keyPair = generateKeyPair();
    }

    async startPairing() {
        // 1. Generează chei Curve25519 pentru Noise handshake
        console.log('Public Key (base64):', this.keyPair.publicKey.toString('base64'));
        // 2. TODO: Inițializează Noise handshake și generează QR code real
        const fakeQR = 'WHATSAPP-QR-PLACEHOLDER';
        qrcode.generate(fakeQR, { small: true });
    }
}

module.exports = Auth;