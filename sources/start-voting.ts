import base64url from 'base64url';
import { randomBytes } from 'crypto';
import qs from 'qs';
import { Address, beginCell, comment, Dictionary, DictionaryValue, toNano } from "ton";
import { loadProposedMessage, ProposedMessage, storeCreateProposal, storeProposedMessage } from "./output/dao_DAOWithSplitter";

const daoAddress = Address.parse('kQDv9YslGc0fCwWD-1h5A6Bjb3CColAmYgdZqgQYydvn--1B');
const testnet = true;

function dictValueParserProposedMessage(): DictionaryValue<ProposedMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeProposedMessage(src)).endCell());
        },
        parse: (src) => {
            return loadProposedMessage(src.loadRef().beginParse());
        }
    }
}

(async () => {
    let messages = Dictionary.empty(Dictionary.Keys.BigInt(257), dictValueParserProposedMessage());
    messages.set(0n, {
        $$type: 'ProposedMessage',
        body: comment('Thanks'),
        bounce: false,
        to: Address.parse('kQB74ererQXuWClKBzI-LUHYxBtFbxHlwRb_k67I7TEdmThB'),
        mode: 128n,
        value: 0n,
    });

    let body = beginCell().store(storeCreateProposal({
        $$type: 'CreateProposal',
        messages,
        queryId: BigInt('0x' + randomBytes(8).toString('hex')),
    })).endCell();

    const amount = toNano(1);

    // Print basics
    console.log(`https://${testnet ? 'test.' : ''}tonhub.com/transfer/` + daoAddress.toString({ testOnly: testnet }) + "?" + qs.stringify({
        text: "Create voting",
        amount: amount.toString(10),
        bin: base64url(body.toBoc({ idx: false })),
    }));
})();