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

    buildSecondMessage() {
        // În Noise_XX, al doilea mesaj conține publicKey static + MAC, criptat cu shared secret
        // Pentru simplitate, aici doar returnăm publicKey static (de test)
        // În implementarea reală, trebuie criptat conform Noise_XX
        return Buffer.from(this.localKeyPair.publicKey);
    }

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
        // 4. Trimite al doilea mesaj Noise (criptat)
        if (this.ws) {
            const secondMsg = this.buildSecondMessage();
            this.ws.send(secondMsg);
        }
        // TODO: După răspuns, finalizează handshake și derivă cheile de sesiune reale
    }

    finalizeHandshake() {
        // În implementarea reală, aici derivăm cheile de criptare pentru sesiune (rx, tx)
        // și salvăm tot ce trebuie pentru reconectare fără QR
        // Exemplu:
        return {
            sessionKey: this.sessionKey.toString('base64'),
            remotePubKey: this.remotePubKey.toString('base64'),
            localPubKey: this.localKeyPair.publicKey.toString('base64')
        };
    }
}

module.exports = NoiseHandshake;