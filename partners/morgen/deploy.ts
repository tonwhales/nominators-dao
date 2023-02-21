import { morgenMembers, pools, vanities } from '../addresses';
import { printDeployParams } from '../../utils/print';

async function main() {
    await printDeployParams(
        'Morgen #1',
        vanities.v1.daoMorgen1,
        pools.morgen1,
        morgenMembers,
    );

    await printDeployParams(
        'Morgen #2',
        vanities.v1.daoMorgen2,
        pools.morgen2,
        morgenMembers,
    );
}

main();