import { pools, tangemMembers, vanities } from '../addresses';
import { printDeployParams } from '../../utils/print';

async function main() {
    await printDeployParams(
        'Tangem #1',
        vanities.v1.daoTangem1,
        pools.tangem1,
        tangemMembers,
    );
}

main();