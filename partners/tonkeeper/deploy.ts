import { keeperMembers, pools, vanities } from '../addresses';
import { printDeployParams } from '../../utils/print';

async function main() {
    await printDeployParams(
        'Keeper #1',
        vanities.v1.daoKeeper1,
        pools.keeper1,
        keeperMembers,
    );

    await printDeployParams(
        'Keeper #2',
        vanities.v1.daoKeeper2,
        pools.keeper2,
        keeperMembers,
    );

    await printDeployParams(
        'Keeper v2 #1',
        vanities.v1.daoKeeper1v2,
        pools.keeper1,
        keeperMembers,
    );

    await printDeployParams(
        'Keeper v2 #2',
        vanities.v1.daoKeeper2v2,
        pools.keeper2,
        keeperMembers,
    );
}

main();