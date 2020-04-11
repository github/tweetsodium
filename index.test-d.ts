import {expectType} from 'tsd';
import tweetSodium = require('./index');

expectType<Uint8Array>(tweetSodium.seal(new Uint8Array(), new Uint8Array()));
expectType<Uint8Array>(tweetSodium.sealOpen(new Uint8Array(), new Uint8Array(), new Uint8Array()));
expectType<number>(tweetSodium.overheadLength);
