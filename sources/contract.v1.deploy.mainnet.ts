import qs from 'qs';
import { Address, Cell } from "ton";
import { buildInitV1 } from './utils/buildInit';
import { createVanity, createVanityInit, createVanityPayload } from './utils/vanity';


const morgenMembers = [{ 
    address: Address.parse('EQAWrkA_GfFFkCMsrA1xiRZ7kHZEty8ZCfcl3O8RA_zlx_Ep'),
    power: 12n,
    name: 'Whales'
}, {
    address: Address.parse('EQBxdJOW5QQi3q_ZDxAofT-XP4jr3GFxGuSd_8UtrChecLGS'),
    power: 6n,
    name: 'ePN'
}, {
    address: Address.parse('EQCi7s7EYcPzzCrmPlQHck5FerXojlPt32f5vRsbjIPtOLkM'),
    power: 12n,
    name: 'Morgen'
}];

const epnMembers = [{ 
    address: Address.parse('EQAWrkA_GfFFkCMsrA1xiRZ7kHZEty8ZCfcl3O8RA_zlx_Ep'),
    power: 24n,
    name: 'Whales'
}, {
    address: Address.parse('EQBxdJOW5QQi3q_ZDxAofT-XP4jr3GFxGuSd_8UtrChecLGS'),
    power: 6n,
    name: 'ePN (Maintenance)'
}];

const dan = Address.parse('EQA-daKmzkx5nLMKT465D_-uyhwgBTEucMeyvfGLfzHoWspv');

const daoMorgen1 = createVanity(dan, 0, 'a60188f3fe0cb3a73548285ad275a551ffe3eae968bf395486d322c34cf8b271');
const daoMorgen2 = createVanity(dan, 0, '5a5564201cbd2d7494cb9395fdb0fa9e0889ef29c346712be8da17b49d7064e4');
const daoEpn1 = createVanity(dan, 0, '3ed63b36a433cc1ec9b4fbced39914459884fd9c91ca6d6788dfae955486d50e');
const daoEpn2 = createVanity(dan, 0, '99bdd8d4cf989044fb7b14e30818bedcbf008afce1681ca7a67052f5a2403ee2');


function sep() {
    console.log(new Array<string>(80).fill('=').join(''));
}

type Vanity = { address: Address, init: { code: Cell, data: Cell } };
function printDeploy(vanity: Vanity, contract: { code: Cell, data: Cell }, amount: bigint, testnet: boolean = false) {
    let link = `https://${testnet ? 'test.' : ''}tonhub.com/transfer/` + vanity.address.toString({ testOnly: testnet }) + "?" + qs.stringify({
        text: "Deploy contract",
        amount: amount.toString(10),
        init: createVanityInit(vanity.init),
        bin: createVanityPayload(contract),
    });
    console.log("Deploy: " + link);
}

async function printDeployParams(name: string, vanity: Vanity, pool: Address, members: { address: Address, power: bigint, name: string }[]) {
    let init = await buildInitV1(pool, members);

    console.log(); 
    console.log();
    sep();
    console.log('Name:', name);
    console.log('Vanity:', vanity.address.toString());
    console.log('Pool:', pool.toString());
    console.log('Members:');
    console.table(members.map(m => ({ name: m.name, address: m.address.toString(), power: m.power })));
    sep();
    printDeploy(vanity, init, 1000000000n, false);
    sep();
}

(async () => {
    await printDeployParams(
        'Morgen #1',
        daoMorgen1,
        Address.parse('EQDkCrGT_lwaKXZf6y3YuJI213PrH60JqoQQO-GT2VMorgen'),
        morgenMembers,
    );

    await printDeployParams(
        'Morgen #2',
        daoMorgen2,
        Address.parse('EQBWc3jORk0evkkZYV4OanMhcfJEyz_mN7rQWYM7wiMorgen'),
        morgenMembers,
    );

    await printDeployParams(
        'ePN #1',
        daoEpn1,
        Address.parse('EQBYtJtQzU3M-AI23gFM91tW6kYlblVtjej59gS8P3uJ_ePN'),
        epnMembers,
    );

    await printDeployParams(
        'ePN #2',
        daoEpn2,
        Address.parse('EQCpCjQigwF27KQ588VhQv9jm_DUuL_ZLY3HCf_9yZW5_ePN'),
        epnMembers,
    );
})();