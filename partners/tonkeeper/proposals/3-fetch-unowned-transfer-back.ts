import { pools, vanities } from '../../addresses';
import { randomQueryId } from '../../../utils/queryId';
import { createUpdateExtrasCommand, createWithdrawUnownedCoinsCommand } from '../../../utils/nominators';
import { createProposalPayload, proposedMessage } from '../../../utils/proposal';
import { Address, beginCell, toNano } from 'ton-core';
function main() {
    let queryId = randomQueryId();

    let cfg = {
        dao: vanities.v1.daoKeeper2v2.address,
        pool: pools.keeper2,
    };


    console.log('Fetch unowned');
    console.log();

    let withdrawUnownedCoins = createWithdrawUnownedCoinsCommand(queryId);
    let proposalFetchUnowned = createProposalPayload(queryId, [
        proposedMessage(withdrawUnownedCoins, toNano(1), cfg.pool),
    ]);

    console.log('DAO: ', cfg.dao.toString());
    console.log('Proposal: ', proposalFetchUnowned.toBoc().toString('base64'));
    console.log();
    console.log();

    console.log('Transfer back');
    console.log();
    let proposalTransferBack = createProposalPayload(queryId, [
        proposedMessage(beginCell().endCell(), BigInt(49.99 * 1000000000), Address.parse("EQAlO0eysq2WrhgzLtTjz0t9q_VyzK7YADSpBwu32v6M-3kT")),
    ]);
    console.log('DAO: ', cfg.dao.toString());
    console.log('Proposal: ', proposalTransferBack.toBoc().toString('base64'));
    console.log();
    console.log();
}

main();