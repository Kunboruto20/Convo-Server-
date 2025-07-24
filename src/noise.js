const nacl = require('tweetnacl');
const { hkdfSha256 } = require('./utils');

class NoiseHandshake {
    constructor(localKeyPair) {
        this.localKeyPair = localKeyPair;
        this.remotePubKey = null;
        // TODO: Stări handshake, chei temporare, etc.
    }

    // Inițializează handshake-ul (Noise_XX)
    init() {
        // Generează chei ephemeral pentru Noise handshake
        this.ephemeral = nacl.box.keyPair();
        // În Noise_XX, primul mesaj conține doar publicKey ephemeral
    }

    // Construiește mesajul handshake inițial
    buildInitialMessage() {
        // Mesajul handshake inițial: publicKey ephemeral (32 bytes)
        return Buffer.from(this.ephemeral.publicKey);
    }

    // Procesează răspunsul serverului
    processServerMessage(msg) {
        // TODO: Parsează și procesează răspunsul handshake
    }
}

module.exports = NoiseHandshake;