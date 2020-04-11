export const overheadLength: number;
export function seal(message: Uint8Array, publicKey: Uint8Array): Uint8Array;
export function sealOpen(message: Uint8Array, publicKey: Uint8Array, secretKey: Uint8Array): Uint8Array;
