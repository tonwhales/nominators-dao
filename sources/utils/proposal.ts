import { randomBytes } from 'crypto';
import { Address, beginCell, Cell, comment, Dictionary, DictionaryValue } from 'ton';
import { loadProposedMessage, ProposedMessage, storeCreateProposal, storeProposedMessage } from "../v0/output/dao-v0_DAOWithSplitter";

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

export function createProposalPayload(queryId: bigint, messages: ProposedMessage[]) {
    let messagesDict = Dictionary.empty(Dictionary.Keys.BigInt(257), dictValueParserProposedMessage());
    for (let i = 0; i < messages.length; i++) {
        messagesDict.set(BigInt(i), messages[i]);
    }

    return beginCell().store(storeCreateProposal({
        $$type: 'CreateProposal',
        messages: messagesDict,
        queryId,
    })).endCell();
}

export function proposedMessage(body: Cell, value: bigint, to: Address, mode: bigint = 1n): ProposedMessage {
    return {
        $$type: 'ProposedMessage',
        body,
        bounce: false,
        mode: mode,
        to, 
        value,
    }
}