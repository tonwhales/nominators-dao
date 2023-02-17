import { Address, beginCell, comment, toNano } from 'ton-core';
import { pools, vanities } from '../addresses';
import { randomQueryId } from '../utils/queryId';
import { createChangeAddressCommand } from '../utils/nominators';
import { createProposalPayload, proposedMessage } from '../utils/proposal';

function main() {
    let config = [{
        dao: vanities.v0.daoEpn1.address,
        pool: pools.epn1,
        newDao: vanities.v1.daoEpn1.address,
        splitBalance: true,
    }, {
        dao: vanities.v0.daoEpn2.address,
        pool: pools.epn2,
        newDao: vanities.v1.daoEpn2.address,
        splitBalance: true,
    }, {
        dao: vanities.v0.daoMorgen1.address,
        pool: pools.morgen1,
        newDao: vanities.v1.daoMorgen1.address,
        splitBalance: true,
    }, {
        dao: vanities.v0.daoMorgen2.address,
        pool: pools.morgen2,
        newDao: vanities.v1.daoMorgen2.address, 
        splitBalance: true,
    }];

    console.log('UPDATE OWNERS TO V1 CONTRACT');
    console.log();

    for (let cfg of config) {
        let queryId = randomQueryId();

        console.log('Pool:', cfg.pool.toString());
        console.log('Change owner from:', cfg.dao);
        console.log("               to:", cfg.newDao);

        const changeOwner = createChangeAddressCommand(queryId, 0, cfg.newDao);

        let splitBalanceMessage = proposedMessage(comment('Gift'), BigInt(0), cfg.dao, 128n);
        if (cfg.splitBalance) {
            console.log('...and split balance for members');
        }

        let proposal = createProposalPayload(queryId, [
            proposedMessage(changeOwner, BigInt(500_000_000), cfg.pool),
            ...(cfg.splitBalance ? [splitBalanceMessage] : []),
        ]);
        console.log();

        console.log('DAO: ', cfg.dao.toString());
        console.log('Proposal: ', proposal.toBoc().toString('base64'));
        console.log();
        console.log();
    }
}

main();