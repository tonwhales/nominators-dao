import { Address, Dictionary } from 'ton';
import { DAOWithSplitter } from '../output/dao_DAOWithSplitter';

export async function buildInit(pool: Address, members: { address: Address, power: bigint, name: string }[]) {
    let totalPower = 0n;
    let membersDict = Dictionary.empty(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
    for (let member of members) {
        membersDict.set(BigInt('0x' + member.address.hash.toString('hex')), BigInt(member.power));
        totalPower += member.power;
    }

    let init = await DAOWithSplitter.init(pool, membersDict, totalPower, 200000000n);

    return init;
}