import { pools, vanities } from '../../addresses';
import { randomQueryId } from '../../../utils/queryId';
import { createUpdateExtrasCommand, createWithdrawUnownedCoinsCommand } from '../../../utils/nominators';
import { createProposalPayload, proposedMessage } from '../../../utils/proposal';
import { Address, beginCell, toNano } from 'ton-core';
function main() {
    let queryId = randomQueryId();
    let address = Address.parse("EQAlO0eysq2WrhgzLtTjz0t9q_VyzK7YADSpBwu32v6M-3kT");
    console.log('Transfer back');
    console.log();
    let proposalTransferBack = createProposalPayload(queryId, [
        proposedMessage(beginCell().endCell(), BigInt(49.99 * 1000000000), address),
    ]);

    console.log('Proposal: ', proposalTransferBack.toBoc().toString('base64'));
    console.log('Address:', address.toString());
    console.log();
}

main();