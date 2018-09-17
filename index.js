const nacl = require('tweetnacl')
const {blake2bInit, blake2bUpdate, blake2bFinal} = require('blakejs/blake2b')

// Authenticated sealing only prepends the nonce to the ciphertext. Anonymous
// sealing also prepends a random public key.
const overheadLength = nacl.box.overheadLength + nacl.box.publicKeyLength

// Generates a 24 byte nonce that is a blake2b digest of the ephemeral
// public key and the reipient's public key.
//
// Returns a 24-byte Uint8Array
//
// Parameters:
// - epk - ephemeral public key Uint8Array
// - publicKey - recipient's public key Uint8Array
function sealNonce(epk, publicKey) {
    let hash = blake2bInit(nacl.box.nonceLength, false)

    blake2bUpdate(hash, epk)
    blake2bUpdate(hash, publicKey)
    return blake2bFinal(hash)
}

// Encrypt a message for a recipient.
//
// Returns a Uint8Array whose length is 48 bytes greater than the message's.
//
// Parameters:
// - message - message Uint8Array to encrypt.
// - publicKey - recipient's public key Uint8Array.
function seal(message, publicKey) {
    const ekp = nacl.box.keyPair()

    let out = new Uint8Array(message.length + overheadLength)
    out.set(ekp.publicKey, 0)

    const nonce = sealNonce(ekp.publicKey, publicKey)

    const ct = nacl.box(message, nonce, publicKey, ekp.secretKey)
    out.set(ct, nacl.box.publicKeyLength)

    return out
}

// Decrypt the ciphertext message using the secret key.
//
// Returns a Uint8Array whose length is 48 bytes less than the ciphertext's.
//
// Parameters:
// - ciphertext - encrypted message Uint8Array.
// - secretKey - secret key Uint8Array.
function sealOpen(ciphertext, publicKey, secretKey) {
    const epk = ciphertext.slice(0, nacl.box.publicKeyLength)
    const nonce = sealNonce(epk, publicKey)
    ciphertext = ciphertext.slice(nacl.box.publicKeyLength)

    return nacl.box.open(ciphertext, nonce, epk, secretKey)
}

module.exports = {
    overheadLength: overheadLength,
    seal: seal,
    sealOpen: sealOpen
}
