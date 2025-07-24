const nacl = require('tweetnacl');
const hkdf = require('futoin-hkdf');
const crypto = require('crypto');

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

function aesGcmEncrypt(key, plaintext, nonce) {
    const cipher = crypto.createCipheriv('aes-256-gcm', key, nonce);
    const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
    const tag = cipher.getAuthTag();
    return { encrypted, tag };
}

function aesGcmDecrypt(key, ciphertext, nonce, tag) {
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, nonce);
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    return decrypted;
}

module.exports = {
    generateKeyPair,
    hkdfSha256,
    aesGcmEncrypt,
    aesGcmDecrypt
};