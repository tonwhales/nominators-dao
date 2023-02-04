import base64url from 'base64url';
import qs from 'qs';
import { Address, beginCell, toNano } from "ton";
import { storeWithdrawStakeResponse } from "./output/dao_DAOWithSplitter";
import { deploy } from "./utils/deploy";
import { printAddress, printDeploy, printHeader } from "./utils/print";

const daoAddress = Address.parse('kQDv9YslGc0fCwWD-1h5A6Bjb3CColAmYgdZqgQYydvn--1B');
const testnet = true;

(async () => {
    const amount = toNano(5);

    // Print basics
    console.log(`https://${testnet ? 'test.' : ''}tonhub.com/transfer/` + daoAddress.toString({ testOnly: testnet }) + "?" + qs.stringify({
        text: "Fake withdraw",
        amount: amount.toString(10),
        bin: base64url(Buffer.from('te6cckEBAQEADgAAGCPUIeEAH8rd8AqIDIibyJg=', 'base64')),
    }));
})();