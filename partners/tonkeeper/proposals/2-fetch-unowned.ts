import { pools, vanities } from '../../addresses';
import { randomQueryId } from '../../../utils/queryId';
import { createUpdateExtrasCommand, createWithdrawUnownedCoinsCommand } from '../../../utils/nominators';
import { createProposalPayload, proposedMessage } from '../../../utils/proposal';
import { toNano } from 'ton-core';
function main() {
    let queryId = randomQueryId();

    let config = [{
        dao: vanities.v1.daoKeeper1v2.address,
        pool: pools.keeper1,
        name: "keeper1"
    }, {
        dao: vanities.v1.daoKeeper2v2.address,
        pool: pools.keeper2,
        name: "keeper2"
    }];


    console.log('Fetch unowned');
    console.log();

    for (let cfg of config) {
        let withdrawUnownedCoins = createWithdrawUnownedCoinsCommand(queryId);
        let proposal = createProposalPayload(queryId, [
            proposedMessage(withdrawUnownedCoins, toNano(1), cfg.pool),
        ]);

        console.log('DAO: ', cfg.dao.toString());
        console.log('Proposal: ', proposal.toBoc().toString('base64'));
        console.log('Name:', cfg.name);
        console.log();
    }
}

main();