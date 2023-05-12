import { Address, beginCell } from 'ton-core';

type Extras = {
    enabled: boolean,
    enabledUpgrades: boolean,
    minStake: bigint,
    depositFee: bigint,
    withdrawFee: bigint,
    poolFee: bigint,
    receiptPrice: bigint
};

function buildExtrasCell(extras: Extras) {
    const ex = beginCell()
        .storeBit(extras.enabled)
        .storeBit(extras.enabledUpgrades)
        .storeCoins(extras.minStake)
        .storeCoins(extras.depositFee)
        .storeCoins(extras.withdrawFee)
        .storeCoins(extras.poolFee)
        .storeCoins(extras.receiptPrice)
        .endCell();
    return ex;
}

export function createChangeAddressCommand(queryId: bigint, index: number, address: Address) {
    return beginCell()
        .storeUint(2431318753, 32)
        .storeUint(queryId, 64)
        .storeCoins(50000)
        .storeUint(index, 8)
        .storeAddress(address)
        .endCell();
}

export function createUpdateExtrasCommand(queryId: bigint, extras: Extras) {
    let ex = buildExtrasCell(extras);

    const command = beginCell()
        .storeUint(37541164, 32)
        .storeUint(queryId, 64) // Query ID
        .storeCoins(100000)
        .storeRef(ex)
        .endCell(); // Gas

    return command;
}

export function createWithdrawUnownedCoinsCommand(queryId: bigint) {
    const command = beginCell()
        .storeUint(622684824, 32)
        .storeUint(queryId, 64) // Query ID
        .storeCoins(100000) // Gas
        .endCell();

    return command;
}