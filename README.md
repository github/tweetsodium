 # tweetsodium [![Build and test](https://github.com/github/tweetsodium/workflows/Build%20and%20test/badge.svg)](https://github.com/github/tweetsodium/actions?query=workflow%3A%22Build+and+test%22)

 This library implements [libsodium's sealed boxes](https://download.libsodium.org/doc/public-key_cryptography/sealed_boxes) using the [tweetnacl-js](https://github.com/dchest/tweetnacl-js) and [blakejs](https://github.com/dcposch/blakejs) libraries.

 ## Usage

```javascript
const nacl = require('tweetnacl')
const sodium = require('tweetsodium')

// generate public key to use for encryption and coresponding secret key to use
// for decryption
const keyPair = nacl.box.keyPair()

// encrypts message string using public key
function encrypt(message) {
    const encoder = new TextEncoder()
    const messageBytes = encoder.encode(message)

    return sodium.seal(messageBytes, keyPair.publicKey)
}

// decrypts message using secret key
function decrypt(ciphertext) {
    const encoder = new TextEncoder()
    const ciphertextBytes = encoder.encode(ciphertext)

    return sodium.sealOpen(ciphertextBytes, keyPair.publicKey, keyPair.secretKey)
}
```





