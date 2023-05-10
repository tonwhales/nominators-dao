import { ContractExecutor, ContractSystem } from 'ton-emulator';
import { pools, vanities } from '../../addresses';
import { Cell, toNano } from 'ton';
import { readFileSync } from 'fs';

describe('1-update-apy', () => {
    it('should execute proposal', async () => {
        let system = await ContractSystem.create();

        const state = JSON.parse(readFileSync(__dirname + '/__testdata__/beforeUpdateApy.json', 'utf-8'));
        
        let pool = new ContractExecutor({
            addr: pools.keeper1,
            storageStats: {
                lastPaid: 0,
                used: {
                    bits: 0n,
                    cells: 0n,
                    publicCells: 0n,
                }
            },
            storage: {
                balance: {
                    coins: toNano(100),
                },
                lastTransLt: 0n,
                state: {
                    state: {
                        code: Cell.fromBase64(state.code),
                        data: Cell.fromBase64(state.data),
                    },
                    type: 'active',
                }
            }
        }, system);

        let status = await pool.get('get_params');
        expect(status.success).toBe(true);
        if (status.success) {
            let enabled = status.stack.readBoolean();
            let updatesEnabled = status.stack.readBoolean();
            let minStake = status.stack.readBigNumber();
            let depositFee = status.stack.readBigNumber();
            let withdrawFee = status.stack.readBigNumber();
            let poolFee = status.stack.readBigNumber();
            let receiptPrice = status.stack.readBigNumber();

            expect(enabled).toBe(true);
            expect(updatesEnabled).toBe(true);
            expect(minStake).toBe(49800000000n);
            expect(depositFee).toBe(100000000n);
            expect(withdrawFee).toBe(100000000n);
            expect(poolFee).toBe(4000n);
            expect(receiptPrice).toBe(100000000n);
        }

        let result = await pool.receive({
            body: Cell.fromBase64('te6cckEBAgEAKwABHwI81SwHS1NlgVDR+jAYaggBACvULmE+yAEBfXhAEBfXhACCcRAX14QC4RTUeQ=='),
            info: {
                src: vanities.v1.daoKeeper1v2.address,
                value: {
                    coins: toNano(5),
                },
                bounce: false,
                bounced: false,
                createdAt: Math.floor(Date.now() / 1000),
                createdLt: 0n,
                forwardFee: 0n,
                ihrDisabled: false,
                ihrFee: 0n,
                type: 'internal',
                dest: pools.keeper1,
            }
        });

        status = await pool.get('get_params');
        expect(status.success).toBe(true);
        if (status.success) {
            let enabled = status.stack.readBoolean();
            let updatesEnabled = status.stack.readBoolean();
            let minStake = status.stack.readBigNumber();
            let depositFee = status.stack.readBigNumber();
            let withdrawFee = status.stack.readBigNumber();
            let poolFee = status.stack.readBigNumber();
            let receiptPrice = status.stack.readBigNumber();

            expect(enabled).toBe(true);
            expect(updatesEnabled).toBe(true);
            expect(minStake).toBe(49800000000n);
            expect(depositFee).toBe(100000000n);
            expect(withdrawFee).toBe(100000000n);
            expect(poolFee).toBe(2500n);
            expect(receiptPrice).toBe(100000000n);
        }
    })
});