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
        // 1. Extrage publicKey-ul serverului (primele 32 bytes)
        const serverPubKey = msg.slice(0, 32);
        this.remotePubKey = serverPubKey;
        // 2. Calculează shared secret (ECDH) între ephemeral local și server
        const sharedSecret = nacl.scalarMult(
            this.ephemeral.secretKey,
            new Uint8Array(serverPubKey)
        );
        // 3. Derivă chei sesiune cu HKDF
        const sessionKey = hkdfSha256(Buffer.from(sharedSecret), Buffer.alloc(32), 'Noise_XX_25519_AESGCM_SHA256', 32);
        this.sessionKey = sessionKey;
        console.log('Session key (base64):', sessionKey.toString('base64'));
        // TODO: Continuă handshake-ul Noise (al doilea mesaj, criptat)
    }
}

module.exports = NoiseHandshake;