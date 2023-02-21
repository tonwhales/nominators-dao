import { Address, beginCell, toNano } from 'ton-core';
import { pools, vanities } from '../../addresses';
import { randomQueryId } from '../../../utils/queryId';
import { createChangeAddressCommand } from '../../../utils/nominators';
import { createProposalPayload, proposedMessage } from '../../../utils/proposal';

function main() {
    let queryId = randomQueryId();

    let newController = Address.parse('EQB_KpWS_v93KrShhvssTeFZ6jV4T3xAdVvJidC05G2zBK4q');
    let changeController = createChangeAddressCommand(queryId, 1, newController);

    let config = [{
        dao: vanities.v0.daoEpn1.address,
        pool: pools.epn1,
    }, {
        dao: vanities.v0.daoEpn2.address,
        pool: pools.epn2,
    }];

    console.log('Change controller to', newController);
    console.log();

    for (let cfg of config) {
        let proposal = createProposalPayload(queryId, [
            proposedMessage(changeController, BigInt(500_000_000), cfg.pool),
        ]);

        console.log('DAO: ', cfg.dao.toString());
        console.log('Proposal: ', proposal.toBoc().toString('base64'));
        console.log();
        console.log();
    }
}

main();