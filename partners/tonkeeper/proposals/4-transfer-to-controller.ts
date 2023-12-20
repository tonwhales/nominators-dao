import { pools, vanities } from '../../addresses';
import { randomQueryId } from '../../../utils/queryId';
import { createUpdateExtrasCommand, createWithdrawUnownedCoinsCommand } from '../../../utils/nominators';
import { createProposalPayload, proposedMessage } from '../../../utils/proposal';
import { Address, beginCell, toNano } from 'ton-core';
function main() {
    let queryId = randomQueryId();
    let address = Address.parse("EQA1wF3PWDTSGgZLnw-AcfCNjnyrx-Qy5loJx6gPudne4TeA");
    console.log('Transfer back');
    console.log();
    let proposalTransferBack = createProposalPayload(queryId, [
        proposedMessage(beginCell().endCell(), BigInt(688.5889 * 1000000000), address),
    ]);

    console.log('Proposal: ', proposalTransferBack.toBoc().toString('base64'));
    console.log('Address:', address.toString());
    console.log();
}

main();
