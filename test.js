const tape = require('tape');
const util = require('tweetnacl-util');
const nacl = require('tweetnacl');
const libsodium = require('libsodium-wrappers');
const sodium = require('./dist/index.umd.js');

tape('basic round trip', function(t) {
    t.plan(1);

    const msg = 'hello, world!';
    const msgBytes = util.decodeUTF8(msg);
    const kp = nacl.box.keyPair();

    const ct = sodium.seal(msgBytes, kp.publicKey);
    const pt = sodium.sealOpen(ct, kp.publicKey, kp.secretKey);

    t.equal(util.encodeUTF8(pt), msg);
});

tape('can decrypt ciphertext from libsodium', function(t) {
    t.plan(1);

    libsodium.ready.then(function() {
        const msg = 'hello, world!';
        const msgBytes = util.decodeUTF8(msg);
        const kp = libsodium.crypto_box_keypair();

        const ct = libsodium.crypto_box_seal(msgBytes, kp.publicKey);
        const pt = sodium.sealOpen(ct, kp.publicKey, kp.privateKey);

        t.equal(util.encodeUTF8(pt), msg);
    }).catch(function(err) {
        t.error(err)
    });
});

tape('ciphertext can be decrypted by libsodium', function(t) {
    t.plan(1);

    libsodium.ready.then(function() {
        const msg = 'hello, world!';
        const msgBytes = util.decodeUTF8(msg);
        const kp = libsodium.crypto_box_keypair();

        const ct = sodium.seal(msgBytes, kp.publicKey);
        const pt = libsodium.crypto_box_seal_open(ct, kp.publicKey, kp.privateKey);

        t.equal(util.encodeUTF8(pt), msg);
    });
});
