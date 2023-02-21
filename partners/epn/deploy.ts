import { epnMembers, pools, vanities } from '../addresses';
import { printDeployParams } from '../../utils/print';

async function main() {
    await printDeployParams(
        'ePN #1',
        vanities.v1.daoEpn1,
        pools.epn1,
        epnMembers,
    );

    await printDeployParams(
        'ePN #2',
        vanities.v1.daoEpn2,
        pools.epn2,
        epnMembers,
    );
}

main();