import { Address, comment, contractAddress, toNano } from "ton";
import { buildInitV0 } from './utils/buildInit';
import { deploy } from "./utils/deploy";
import { printAddress, printHeader } from "./utils/print";

const pool = Address.parse('kQCV7ZMiCrVSnAQrXjcjvWE2yrPzwlvze5g0vjrFLwqtQPWm');

(async () => {
    const members = [{ 
        address: Address.parse('kQAdFfAjw8vE3nnhDAlJXc0HtBwMVgjWDTHPCL6vIy8FvQfs'),
        power: 12n,
        name: 'Sergei (Whales)'
    }, {
        address: Address.parse('EQCd3ASamrfErTV4K6iG5r0o3O_hl7K_9SghU0oELKF-sxDn'),
        power: 6n,
        name: 'Anton (ePN)'
    }, {
        address: Address.parse('kQB74ererQXuWClKBzI-LUHYxBtFbxHlwRb_k67I7TEdmThB'),
        power: 12n,
        name: 'Dan (Morgen)'
    }];

    let init = await buildInitV0(pool, members);
    let address = contractAddress(0, init);
    let deployAmount = toNano(1);
    let testnet = true;

    // Print basics
    printHeader('DAOWithSplitter');
    printAddress(address);

    // Do deploy
    await deploy(init, deployAmount, comment("Topup DAO"), testnet)
})();