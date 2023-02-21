import { Address, Dictionary } from 'ton';
import { DAOWithSplitter as DAOWithSplitterV0 } from '../contract/v0/output/dao-v0_DAOWithSplitter';
import { DAOWithSplitter as DAOWithSplitterV1 } from '../contract/v1/output/dao-v1_DAOWithSplitter';


export async function buildInitV0(pool: Address, members: { address: Address, power: bigint, name: string }[]) {
    let totalPower = 0n;
    let membersDict = Dictionary.empty(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
    for (let member of members) {
        membersDict.set(BigInt('0x' + member.address.hash.toString('hex')), BigInt(member.power));
        totalPower += member.power;
    }

    let init = await DAOWithSplitterV0.init(pool, membersDict, totalPower, 200000000n);

    return init;
}

export async function buildInitV1(pool: Address, members: { address: Address, power: bigint, name: string }[]) {
    let totalPower = 0n;
    let membersDict = Dictionary.empty(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
    for (let member of members) {
        membersDict.set(BigInt('0x' + member.address.hash.toString('hex')), BigInt(member.power));
        totalPower += member.power;
    }

    let init = await DAOWithSplitterV1.init(pool, membersDict, totalPower, 200000000n);

    return init;
}