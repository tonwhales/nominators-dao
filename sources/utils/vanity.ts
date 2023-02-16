import {
    Address,
    beginCell,
    Builder,
    Cell,
    contractAddress,
    StateInit,
    storeStateInit,
} from "ton";

export function createVanity(owner: Address, workchain: number, seed: string, version: 'v1' | 'v1r2' = 'v1') {
    const vanityCode = Cell.fromBoc(
        Buffer.from(version === 'v1' ? 'te6ccgEBAgEAJwABFP8A9KQT9LzyyAsBADDTMe1E0HXXIfpAMYMH1yHR1NTRAfsE7VQ=' : 'te6ccgEBAgEAMgABFP8A9KQT9LzyyAsBAEbT7UTQddch+kCDB9ch0QLQ0wMx+kAwWMcF8ojU1NEB+wTtVA==',  'base64')
    )[0];
    const vanityData = beginCell().storeUint(0, 5).storeAddress(owner).storeBuffer(Buffer.from(seed, "hex")).endCell();

    // Address
    const address = contractAddress(workchain, {
        code: vanityCode,
        data: vanityData,
    });

    return {
        address,
        init: {
            code: vanityCode,
            data: vanityData,
        },
    };
}

export function createVanityInit(args: { code: Cell; data: Cell }) {
    let msg: StateInit = {
        code: args.code,
        data: args.data,
    }
    let cell = beginCell().store(storeStateInit(msg)).endCell();
    return cell.toBoc({ idx: false }).toString("base64");
}

export function storeVanityPayload(args: { code: Cell; data: Cell }) {
    return (builder: Builder) => {
        builder.storeRef(args.code);
        builder.storeRef(args.data);
    }
}

export function createVanityPayload(args: { code: Cell, data: Cell }) {
    return beginCell().store(storeVanityPayload(args)).endCell().toBoc({ idx: false }).toString("base64");
}