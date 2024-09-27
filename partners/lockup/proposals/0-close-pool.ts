import { Address, toNano } from 'ton-core';
import { pools, vanities } from '../../addresses';
import { randomQueryId } from '../../../utils/queryId';
import { createChangeAddressCommand, createUpdateExtrasCommand } from '../../../utils/nominators';
import { createProposalPayload, proposedMessage } from '../../../utils/proposal';

const lockupParams1 = {
    enabled: false,
    enabledUpgrades: true,
    depositFee: toNano("0.1"),
    withdrawFee: toNano("0.1"),
    poolFee: 15n * 100n,
    receiptPrice: toNano("0.1"),
    minStake: toNano('49.8'),
};
const lockupParams2 = {
    enabled: false,
    enabledUpgrades: false,
    depositFee: toNano("0.1"),
    withdrawFee: toNano("0.1"),
    poolFee: 15n * 100n,
    receiptPrice: toNano("0.1"),
    minStake: toNano('49.8'),
};

function main() {
    let queryId = randomQueryId();

    let config = [{
        dao: vanities.v1.daoLockup1.address,
        pool: pools.lockup1,
        extras: lockupParams1,
    }, {
        dao: vanities.v1.daoLockup2.address,
        pool: pools.lockup2,
        extras: lockupParams2,
    }];


    console.log('Close lockup pools');
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