import { Address, Cell, } from "ton";
import qs from 'qs';
import { createVanityInit, createVanityPayload, Vanity } from './vanity';
import { buildInitV1 } from './buildInit';

export function printSeparator() {
    console.log("========================================================================================");
}

export function printHeader(name: string) {
    printSeparator();
    console.log('Contract: ' + name);
    printSeparator();
}

export function printAddress(address: Address, testnet: boolean = true) {
    console.log("Address: " + address.toString({ testOnly: testnet }));
    console.log("Explorer: " + "https://" + (testnet ? 'testnet.' : '') + "tonapi.io/account/" + address.toString({ testOnly: testnet }));
    printSeparator();
}

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

export async function printDeployParams(name: string, vanity: Vanity, pool: Address, members: { address: Address, power: bigint, name: string }[]) {
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