const nacl = require('tweetnacl');

function generateKeyPair() {
    // Generează o pereche de chei Curve25519
    const keyPair = nacl.box.keyPair();
    return {
        publicKey: Buffer.from(keyPair.publicKey),
        privateKey: Buffer.from(keyPair.secretKey)
    };
}

module.exports = {
    generateKeyPair
};