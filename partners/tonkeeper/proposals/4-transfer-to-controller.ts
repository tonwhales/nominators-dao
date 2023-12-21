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
        proposedMessage(beginCell().endCell(), toNano("688.5889"), address),
    ]);

    console.log('DAO: ', vanities.v1.daoKeeper1v2.address.toString());
    console.log('Proposal: ', proposalTransferBack.toBoc().toString('base64'));
    console.log('Transfer recepient ddress:', address.toString());
    console.log();
}

main();
