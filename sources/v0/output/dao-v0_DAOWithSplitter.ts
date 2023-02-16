import { Cell, Slice, Address, Builder, beginCell, ComputeError, TupleItem, TupleReader, Dictionary, contractAddress, ContractProvider, Sender, Contract, ContractABI, TupleBuilder, DictionaryValue } from 'ton-core';
import { ContractSystem, ContractExecutor } from 'ton-emulator';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}
export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}
export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}
export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}
export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}
export type ChangeOwner = {
    $$type: 'ChangeOwner';
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(256331011, 32);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 256331011) { throw Error('Invalid prefix'); }
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}
export type DictLookupResult = {
    $$type: 'DictLookupResult';
    key: bigint | null;
    value: Cell | null;
    found: boolean;
}

export function storeDictLookupResult(src: DictLookupResult) {
    return (builder: Builder) => {
        let b_0 = builder;
        if (src.key !== null && src.key !== undefined) { b_0.storeBit(true).storeInt(src.key, 257); } else { b_0.storeBit(false); }
        if (src.value !== null && src.value !== undefined) { b_0.storeBit(true).storeRef(src.value); } else { b_0.storeBit(false); }
        b_0.storeBit(src.found);
    };
}

export function loadDictLookupResult(slice: Slice) {
    let sc_0 = slice;
    let _key = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    let _value = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _found = sc_0.loadBit();
    return { $$type: 'DictLookupResult' as const, key: _key, value: _value, found: _found };
}

function loadTupleDictLookupResult(source: TupleReader) {
    let _key = source.readBigNumberOpt();
    let _value = source.readCellOpt();
    let _found = source.readBoolean();
    return { $$type: 'DictLookupResult' as const, key: _key, value: _value, found: _found };
}

function storeTupleDictLookupResult(source: DictLookupResult) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.key);
    builder.writeSlice(source.value);
    builder.writeBoolean(source.found);
    return builder.build();
}

function dictValueParserDictLookupResult(): DictionaryValue<DictLookupResult> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDictLookupResult(src)).endCell());
        },
        parse: (src) => {
            return loadDictLookupResult(src.loadRef().beginParse());
        }
    }
}
export type ParsedAddress = {
    $$type: 'ParsedAddress';
    wc: bigint;
    hash: bigint;
}

export function storeParsedAddress(src: ParsedAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.wc, 257);
        b_0.storeInt(src.hash, 257);
    };
}

export function loadParsedAddress(slice: Slice) {
    let sc_0 = slice;
    let _wc = sc_0.loadIntBig(257);
    let _hash = sc_0.loadIntBig(257);
    return { $$type: 'ParsedAddress' as const, wc: _wc, hash: _hash };
}

function loadTupleParsedAddress(source: TupleReader) {
    let _wc = source.readBigNumber();
    let _hash = source.readBigNumber();
    return { $$type: 'ParsedAddress' as const, wc: _wc, hash: _hash };
}

function storeTupleParsedAddress(source: ParsedAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.wc);
    builder.writeNumber(source.hash);
    return builder.build();
}

function dictValueParserParsedAddress(): DictionaryValue<ParsedAddress> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeParsedAddress(src)).endCell());
        },
        parse: (src) => {
            return loadParsedAddress(src.loadRef().beginParse());
        }
    }
}
export type ProposedMessage = {
    $$type: 'ProposedMessage';
    to: Address;
    value: bigint;
    mode: bigint;
    bounce: boolean;
    body: Cell;
}

export function storeProposedMessage(src: ProposedMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        b_0.storeBit(src.bounce);
        b_0.storeRef(src.body);
    };
}

export function loadProposedMessage(slice: Slice) {
    let sc_0 = slice;
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _bounce = sc_0.loadBit();
    let _body = sc_0.loadRef();
    return { $$type: 'ProposedMessage' as const, to: _to, value: _value, mode: _mode, bounce: _bounce, body: _body };
}

function loadTupleProposedMessage(source: TupleReader) {
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _bounce = source.readBoolean();
    let _body = source.readCell();
    return { $$type: 'ProposedMessage' as const, to: _to, value: _value, mode: _mode, bounce: _bounce, body: _body };
}

function storeTupleProposedMessage(source: ProposedMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeBoolean(source.bounce);
    builder.writeCell(source.body);
    return builder.build();
}

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
export type ExecuteProposal = {
    $$type: 'ExecuteProposal';
    messages: Dictionary<bigint, ProposedMessage>;
}

export function storeExecuteProposal(src: ExecuteProposal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(401062099, 32);
        b_0.storeDict(src.messages, Dictionary.Keys.BigInt(257), dictValueParserProposedMessage());
    };
}

export function loadExecuteProposal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 401062099) { throw Error('Invalid prefix'); }
    let _messages = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserProposedMessage(), sc_0);
    return { $$type: 'ExecuteProposal' as const, messages: _messages };
}

function loadTupleExecuteProposal(source: TupleReader) {
    let _messages = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserProposedMessage(), source.readCellOpt());
    return { $$type: 'ExecuteProposal' as const, messages: _messages };
}

function storeTupleExecuteProposal(source: ExecuteProposal) {
    let builder = new TupleBuilder();
    builder.writeCell(source.messages.size > 0 ? beginCell().storeDictDirect(source.messages, Dictionary.Keys.BigInt(257), dictValueParserProposedMessage()).endCell() : null);
    return builder.build();
}

function dictValueParserExecuteProposal(): DictionaryValue<ExecuteProposal> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeExecuteProposal(src)).endCell());
        },
        parse: (src) => {
            return loadExecuteProposal(src.loadRef().beginParse());
        }
    }
}
export type CreateProposal = {
    $$type: 'CreateProposal';
    queryId: bigint;
    messages: Dictionary<bigint, ProposedMessage>;
}

export function storeCreateProposal(src: CreateProposal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(335480027, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeDict(src.messages, Dictionary.Keys.BigInt(257), dictValueParserProposedMessage());
    };
}

export function loadCreateProposal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 335480027) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _messages = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserProposedMessage(), sc_0);
    return { $$type: 'CreateProposal' as const, queryId: _queryId, messages: _messages };
}

function loadTupleCreateProposal(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _messages = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserProposedMessage(), source.readCellOpt());
    return { $$type: 'CreateProposal' as const, queryId: _queryId, messages: _messages };
}

function storeTupleCreateProposal(source: CreateProposal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeCell(source.messages.size > 0 ? beginCell().storeDictDirect(source.messages, Dictionary.Keys.BigInt(257), dictValueParserProposedMessage()).endCell() : null);
    return builder.build();
}

function dictValueParserCreateProposal(): DictionaryValue<CreateProposal> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCreateProposal(src)).endCell());
        },
        parse: (src) => {
            return loadCreateProposal(src.loadRef().beginParse());
        }
    }
}
export type WithdrawStake = {
    $$type: 'WithdrawStake';
    queryId: bigint;
    gasLimit: bigint;
    stake: bigint;
}

export function storeWithdrawStake(src: WithdrawStake) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3665837821, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.gasLimit);
        b_0.storeCoins(src.stake);
    };
}

export function loadWithdrawStake(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3665837821) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _gasLimit = sc_0.loadCoins();
    let _stake = sc_0.loadCoins();
    return { $$type: 'WithdrawStake' as const, queryId: _queryId, gasLimit: _gasLimit, stake: _stake };
}

function loadTupleWithdrawStake(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _gasLimit = source.readBigNumber();
    let _stake = source.readBigNumber();
    return { $$type: 'WithdrawStake' as const, queryId: _queryId, gasLimit: _gasLimit, stake: _stake };
}

function storeTupleWithdrawStake(source: WithdrawStake) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.gasLimit);
    builder.writeNumber(source.stake);
    return builder.build();
}

function dictValueParserWithdrawStake(): DictionaryValue<WithdrawStake> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeWithdrawStake(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawStake(src.loadRef().beginParse());
        }
    }
}
export type WithdrawStakeResponse = {
    $$type: 'WithdrawStakeResponse';
    queryId: bigint;
}

export function storeWithdrawStakeResponse(src: WithdrawStakeResponse) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(601104865, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadWithdrawStakeResponse(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 601104865) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'WithdrawStakeResponse' as const, queryId: _queryId };
}

function loadTupleWithdrawStakeResponse(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'WithdrawStakeResponse' as const, queryId: _queryId };
}

function storeTupleWithdrawStakeResponse(source: WithdrawStakeResponse) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserWithdrawStakeResponse(): DictionaryValue<WithdrawStakeResponse> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeWithdrawStakeResponse(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawStakeResponse(src.loadRef().beginParse());
        }
    }
}
export type WithdrawStakeDelayed = {
    $$type: 'WithdrawStakeDelayed';
    queryId: bigint;
}

export function storeWithdrawStakeDelayed(src: WithdrawStakeDelayed) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1958425639, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadWithdrawStakeDelayed(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1958425639) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'WithdrawStakeDelayed' as const, queryId: _queryId };
}

function loadTupleWithdrawStakeDelayed(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'WithdrawStakeDelayed' as const, queryId: _queryId };
}

function storeTupleWithdrawStakeDelayed(source: WithdrawStakeDelayed) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserWithdrawStakeDelayed(): DictionaryValue<WithdrawStakeDelayed> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeWithdrawStakeDelayed(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawStakeDelayed(src.loadRef().beginParse());
        }
    }
}
async function DAOWithSplitter_init(managable: Address, members: Dictionary<bigint, bigint>, denominator: bigint, withdrawFee: bigint) {
    const __init = 'te6ccgEBBwEAPwABFP8A9KQT9LzyyAsBAgFiAgMCAs0EBQAJoUrd4AkAAdQBD9AmRmAm2eZMBgAiUEPPFvQAEoEBAc8AgQEBzwA=';
    const __code = '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';
    const __system = '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';
    let systemCell = Cell.fromBase64(__system);
    let builder = new TupleBuilder();
    builder.writeCell(systemCell);
    builder.writeAddress(managable);
    builder.writeCell(members.size > 0 ? beginCell().storeDictDirect(members, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeNumber(denominator);
    builder.writeNumber(withdrawFee);
    let __stack = builder.build();
    let codeCell = Cell.fromBoc(Buffer.from(__code, 'base64'))[0];
    let initCell = Cell.fromBoc(Buffer.from(__init, 'base64'))[0];
    let system = await ContractSystem.create();
    let executor = await ContractExecutor.create({ code: initCell, data: new Cell() }, system);
    let res = await executor.get('init', __stack);
    if (!res.success) { throw Error(res.error); }
    if (res.exitCode !== 0 && res.exitCode !== 1) {
        if (DAOWithSplitter_errors[res.exitCode]) {
            throw new ComputeError(DAOWithSplitter_errors[res.exitCode].message, res.exitCode, { logs: res.vmLogs });
        } else {
            throw new ComputeError('Exit code: ' + res.exitCode, res.exitCode, { logs: res.vmLogs });
        }
    }
    
    let data = res.stack.readCell();
    return { code: codeCell, data };
}

const DAOWithSplitter_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    11100: { message: `You have no vote power` },
    14720: { message: `Not enough balance to withdraw` },
    17253: { message: `You are not a member` },
    33345: { message: `Only proposals can be executed` },
    34833: { message: `You cannot vote` },
    44310: { message: `Only basechain is supported` },
    49769: { message: `Not enough gas for proposal` },
}

export class DAOWithSplitter implements Contract {
    
    static async init(managable: Address, members: Dictionary<bigint, bigint>, denominator: bigint, withdrawFee: bigint) {
        return await DAOWithSplitter_init(managable,members,denominator,withdrawFee);
    }
    
    static async fromInit(managable: Address, members: Dictionary<bigint, bigint>, denominator: bigint, withdrawFee: bigint) {
        const init = await DAOWithSplitter_init(managable,members,denominator,withdrawFee);
        const address = contractAddress(0, init);
        return new DAOWithSplitter(address, init);
    }
    
    static fromAddress(address: Address) {
        return new DAOWithSplitter(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: DAOWithSplitter_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: ExecuteProposal | CreateProposal | 'Topup DAO' | 'Terminated' | 'Withdraw' | 'Gift' | WithdrawStakeResponse | WithdrawStakeDelayed) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ExecuteProposal') {
            body = beginCell().store(storeExecuteProposal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateProposal') {
            body = beginCell().store(storeCreateProposal(message)).endCell();
        }
        if (message === 'Topup DAO') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'Terminated') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'Withdraw') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'Gift') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawStakeResponse') {
            body = beginCell().store(storeWithdrawStakeResponse(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawStakeDelayed') {
            body = beginCell().store(storeWithdrawStakeDelayed(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getMemberShare(provider: ContractProvider, addr: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(addr);
        let source = (await provider.get('memberShare', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getMembersCount(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('membersCount', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getMinimumVotes(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('minimumVotes', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}