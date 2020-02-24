declare namespace tweetSodium {
    const overheadLength: number;
    function seal(message: Uint8Array, publicKey: Uint8Array): Uint8Array;
    function sealOpen(message: Uint8Array, publicKey: Uint8Array, secretKey: Uint8Array): Uint8Array;
}

export = tweetSodium
