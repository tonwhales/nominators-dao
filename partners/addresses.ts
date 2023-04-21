import { Address } from 'ton-core';
import { createVanity } from '../utils/vanity';

export const pools = {
    morgen1: Address.parse('EQDkCrGT_lwaKXZf6y3YuJI213PrH60JqoQQO-GT2VMorgen'),
    morgen2: Address.parse('EQBWc3jORk0evkkZYV4OanMhcfJEyz_mN7rQWYM7wiMorgen'),
    epn1: Address.parse('EQBYtJtQzU3M-AI23gFM91tW6kYlblVtjej59gS8P3uJ_ePN'),
    epn2: Address.parse('EQCpCjQigwF27KQ588VhQv9jm_DUuL_ZLY3HCf_9yZW5_ePN'),
    keeper1: Address.parse('EQAA_5_dizuA1w6OpzTSYvXhvUwYTDNTW_MZDdZ0CGKeeper'),
    keeper2: Address.parse('EQDvvBmP3wUcjoXPY1jHfT4-fgb294imVYH5EHdLnAKeeper'),
    lockup1: Address.parse('EQDhGXtbR6ejNQucRcoyzwiaF2Ke-5T8reptsiuZ_mLockup'),
    lockup2: Address.parse('EQDg5ThqQ1t9eriIv2HkH6XUiUs_Wd4YmXZeGpnPzwLockup'),
    atomic1: Address.parse('EQBttaH_KwCkQdb9bzWkkayqkfbzjTFZ_-9PIJSQ12Atomic'),
}


const dan = Address.parse('EQA-daKmzkx5nLMKT465D_-uyhwgBTEucMeyvfGLfzHoWspv');
export const vanities = {
    v0: {
        daoMorgen1: createVanity(dan, 0, 'a60188f3fe0cb3a73548285ad275a551ffe3eae968bf395486d322c34cf8b271'),
        daoMorgen2: createVanity(dan, 0, '5a5564201cbd2d7494cb9395fdb0fa9e0889ef29c346712be8da17b49d7064e4'),
        daoEpn1: createVanity(dan, 0, '3ed63b36a433cc1ec9b4fbced39914459884fd9c91ca6d6788dfae955486d50e'),
        daoEpn2: createVanity(dan, 0, '99bdd8d4cf989044fb7b14e30818bedcbf008afce1681ca7a67052f5a2403ee2'),
    },
    v1: {
        daoMorgen1: createVanity(dan, 0, '82bd573d7a72a1404f40b15faf151c911f3e2151db25a6f476ed52592849d499', 'v1r2'),
        daoMorgen2: createVanity(dan, 0, '23a457da2c37e4b5b937856ecf0ae42bce1366ba7902cac92fc8d23ae382128f', 'v1r2'),

        daoEpn1: createVanity(dan, 0, '1f478c0c482183903c8fc0e21dc771f85dba87975d5edcd2c08b720e1f2e03bd', 'v1r2'),
        daoEpn2: createVanity(dan, 0, '88cdc155d50683121eabc56fb81c46602aabf6c2ec78edb4cabf52b56821ab58', 'v1r2'),

        daoKeeper1: createVanity(dan, 0, '859cb7a6332804402214c46bfd93ea8997480d5f48be9a8840354790a9859919', 'v1r2'),
        daoKeeper2: createVanity(dan, 0, '9d7e08cdf682f24e2a60b2aeda059f118bbf9fc0285bae4def5f21a9b4d23d5b', 'v1r2'),

        daoKeeper1v2: createVanity(dan, 0, '15d99b10ce8fa22d022c013f7f744564695264265ffaa902c24a610f6a4168ec', 'v1r2'),
        daoKeeper2v2: createVanity(dan, 0, '9601d381b3abc529400e8f15753a54e41c6c2cd6f557e3b684e08e4184d31057', 'v1r2'),

        daoLockup1: createVanity(dan, 0, '05474c86b71bb0f0eb9105b40fd85da7aa7b5b05d34519e47cd8cd1e87d8fa84', 'v1r2'),
        daoLockup2: createVanity(dan, 0, 'a55ff80aa983f7a05e8df2d672cd75bf6caa0a3deb19f2f067021197f23a0bd1', 'v1r2'),

        daoAtomic1: createVanity(dan, 0, 'cacfeda4b7ac2df3afc1166bb9f8176a309af4259650d8bed45d818eddbb1174', 'v1r2'),
    }
}

export const morgenMembers = [{ 
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

export const epnMembers = [{ 
    address: Address.parse('EQAWrkA_GfFFkCMsrA1xiRZ7kHZEty8ZCfcl3O8RA_zlx_Ep'),
    power: 24n,
    name: 'Whales'
}, {
    address: Address.parse('EQBxdJOW5QQi3q_ZDxAofT-XP4jr3GFxGuSd_8UtrChecLGS'),
    power: 6n,
    name: 'ePN (Maintenance)'
}];

export const keeperMembers = [{
    address: Address.parse('EQAreUglPfFcA6CMOTSXHnwoOP8ZEN00Lfb8O574keTkxwoO'),
    power: 20n,
    name: 'Tonkeeper'
}, {
    address: Address.parse('EQAWrkA_GfFFkCMsrA1xiRZ7kHZEty8ZCfcl3O8RA_zlx_Ep'),
    power: 20n,
    name: 'Whales'
}];

export const keeperV2Members = [{
    address: Address.parse('EQAreUglPfFcA6CMOTSXHnwoOP8ZEN00Lfb8O574keTkxwoO'),
    power: 175n,
    name: 'Tonkeeper'
}, {
    address: Address.parse('EQAWrkA_GfFFkCMsrA1xiRZ7kHZEty8ZCfcl3O8RA_zlx_Ep'),
    power: 175n,
    name: 'Whales'
}, {
    address: Address.parse('EQBxdJOW5QQi3q_ZDxAofT-XP4jr3GFxGuSd_8UtrChecLGS'),
    power: 50n,
    name: 'ePN'
}];

export const lockupMembers = [{ 
    address: Address.parse('EQAWrkA_GfFFkCMsrA1xiRZ7kHZEty8ZCfcl3O8RA_zlx_Ep'),
    power: 75n,
    name: 'Whales'
}, {
    address: Address.parse('EQBxdJOW5QQi3q_ZDxAofT-XP4jr3GFxGuSd_8UtrChecLGS'),
    power: 25n,
    name: 'ePN (Maintenance)'
}];

export const atomicMembers = [{ 
    address: Address.parse('EQAWrkA_GfFFkCMsrA1xiRZ7kHZEty8ZCfcl3O8RA_zlx_Ep'),
    power: 60n,
    name: 'Whales'
}, {
    address: Address.parse('EQBxt8Ksy1TWgkJrltUcPQQrsDrEatCz9-bdzlWuErkvZXIf'),
    power: 40n,
    name: 'Atomic'
}];
