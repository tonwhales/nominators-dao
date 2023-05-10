import { Address, toNano } from 'ton-core';
import { pools, vanities } from '../../addresses';
import { randomQueryId } from '../../../utils/queryId';
import { createChangeAddressCommand, createUpdateExtrasCommand } from '../../../utils/nominators';
import { createProposalPayload, proposedMessage } from '../../../utils/proposal';

const keeperParams1 = {
    enabled: true,
    enabledUpgrades: true,
    depositFee: toNano('0.1'),
    withdrawFee: toNano('0.1'),
    poolFee: 25n * 100n,
    receiptPrice: toNano('0.1'),
    minStake: toNano('49.8'),
};
const keeperParams2 = {
    enabled: true,
    enabledUpgrades: false,
    depositFee: toNano('0.1'),
    withdrawFee: toNano('0.1'),
    poolFee: 25n * 100n,
    receiptPrice: toNano('0.1'),
    minStake: toNano('49.8'),
};

function main() {
    let queryId = randomQueryId();

    let config = [{
        dao: vanities.v1.daoKeeper1v2.address,
        pool: pools.keeper1,
        extras: keeperParams1,
    }, {
        dao: vanities.v1.daoKeeper2v2.address,
        pool: pools.keeper2,
        extras: keeperParams2,
    }];


    console.log('Update fees to 25%');
    console.log();

    for (let cfg of config) {
        let updateExtras = createUpdateExtrasCommand(queryId, cfg.extras);
        let proposal = createProposalPayload(queryId, [
            proposedMessage(updateExtras, BigInt(5_000_000_000), cfg.pool),
        ]);

        console.log('DAO: ', cfg.dao.toString());
        console.log('Proposal: ', proposal.toBoc().toString('base64'));
        console.log();
        console.log();
    }
}

main();