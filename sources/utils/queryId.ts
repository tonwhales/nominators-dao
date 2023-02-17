import { randomBytes } from 'crypto';

export const randomQueryId = () => BigInt('0x' + randomBytes(8).toString('hex'));