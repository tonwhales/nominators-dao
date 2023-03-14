import { keeperMembers, keeperV2Members, lockupMembers, pools, vanities } from '../addresses';
import { printDeployParams } from '../../utils/print';

async function main() {
    await printDeployParams(
        'Lockup #1',
        vanities.v1.daoLockup1,
        pools.keeper1,
        lockupMembers,
    );

    await printDeployParams(
        'Lockup #2',
        vanities.v1.daoLockup2,
        pools.keeper2,
        lockupMembers,
    );
}

main();