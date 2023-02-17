import qs from 'qs';
import { Address, Cell } from "ton";
import { epnMembers, morgenMembers, pools, vanities } from './addresses';
import { buildInitV1 } from './utils/buildInit';
import { createVanityInit, createVanityPayload, Vanity } from './utils/vanity';


function sep() {
    console.log(new Array<string>(80).fill('=').join(''));
}

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
    printDeploy(vanity, init, 250000000n, false);
    sep();
}

(async () => {
    await printDeployParams(
        'Morgen #1',
        vanities.v1.daoMorgen1,
        pools.morgen1,
        morgenMembers,
    );

    await printDeployParams(
        'Morgen #2',
        vanities.v1.daoMorgen2,
        pools.morgen2,
        morgenMembers,
    );

    await printDeployParams(
        'ePN #1',
        vanities.v1.daoEpn1,
        pools.epn1,
        epnMembers,
    );

    await printDeployParams(
        'ePN #2',
        vanities.v1.daoEpn2,
        pools.epn2,
        epnMembers,
    );
})();