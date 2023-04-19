import { keeperMembers, keeperV2Members, lockupMembers, atomicMembers, pools, vanities } from '../addresses';
import { printDeployParams } from '../../utils/print';

async function main() {
    await printDeployParams(
        'Atomic #1',
        vanities.v1.daoAtomic1,
        pools.atomic2,
        atomicMembers,
    );
}

main();