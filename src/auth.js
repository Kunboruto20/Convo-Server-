const qrcode = require('qrcode-terminal');

class Auth {
    constructor() {
        this.session = null;
    }

    async startPairing() {
        // TODO: Generează un QR code real pentru pairing WhatsApp Web
        const fakeQR = 'FAKE-QR-CODE-PLACEHOLDER';
        qrcode.generate(fakeQR, { small: true });
        // În implementarea reală, aici se face handshake-ul cu serverul WhatsApp Web
    }
}

module.exports = Auth;