const nacl = require('tweetnacl');
const hkdf = require('futoin-hkdf');

function generateKeyPair() {
    // Generează o pereche de chei Curve25519
    const keyPair = nacl.box.keyPair();
    return {
        publicKey: Buffer.from(keyPair.publicKey),
        privateKey: Buffer.from(keyPair.secretKey)
    };
}

function hkdfSha256(key, salt, info, length) {
    // Derivează chei cu HKDF-SHA256
    return hkdf(key, length, { salt, info, hash: 'SHA-256' });
}

module.exports = {
    generateKeyPair,
    hkdfSha256
};