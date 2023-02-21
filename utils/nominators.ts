import { Address, beginCell } from 'ton-core';

export function createChangeAddressCommand(queryId: bigint, index: number, address: Address) {
    return beginCell()
        .storeUint(2431318753, 32)
        .storeUint(queryId, 64)
        .storeCoins(50000)
        .storeUint(index, 8)
        .storeAddress(address)
        .endCell();
}