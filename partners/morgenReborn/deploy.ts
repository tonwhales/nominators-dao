import { morgenMembers, pools, vanities } from '../addresses';
import { printDeployParams } from '../../utils/print';

async function main() {
    await printDeployParams(
        'Mafia #1',
        vanities.v1.daoMorgen2_1,
        pools.morgen2_1,
        morgenMembers,
    );

    await printDeployParams(
        'Mafia #2',
        vanities.v1.daoMorgen2_2,
        pools.morgen2_2,
        morgenMembers,
    );
}

main();