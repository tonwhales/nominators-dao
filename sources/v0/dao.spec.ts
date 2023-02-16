import { Address, comment, Dictionary, toNano } from "ton";
import { ContractSystem, Treasure } from "ton-emulator";
import { Proposal, ProposedMessage } from "./output/dao_Proposal";
import { DAOWithSplitter } from "./output/dao_DAOWithSplitter";

describe("dao-v0", () => {
  it("should split revenue correctly", async () => {
    // Create ContractSystem and deploy contract
    let system = await ContractSystem.create();

    let managable = system.treasure("managable");
    let owner = system.treasure("owner");
    let nonOwner = system.treasure("non-owner");

    let members = Dictionary.empty(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
    members.set(BigInt('0x' + owner.address.hash.toString('hex')), 1n);
    members.set(BigInt('0x' + nonOwner.address.hash.toString('hex')), 1n);

    let contract = system.open(await DAOWithSplitter.fromInit(managable.address, members, 2n, 200000000n));
    let track = system.track(contract.address);
    await system.run();

    track.events();

    // Check splitter
    contract.send(managable, {
      value: toNano(2) + 100000000n,
    }, "Gift");


    await system.run();
    expect(track.events()).toMatchSnapshot();
  });


  it("should create proposal correctly", async () => {
    // Create ContractSystem and deploy contract
    let system = await ContractSystem.create();

    let managable = system.treasure("managable");
    let owner = system.treasure("owner");
    let nonOwner = system.treasure("non-owner");

    let members = Dictionary.empty(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
    members.set(BigInt('0x' + owner.address.hash.toString('hex')), 1n);
    members.set(BigInt('0x' + nonOwner.address.hash.toString('hex')), 1n);

    let contract = system.open(await DAOWithSplitter.fromInit(managable.address, members, 2n, 200000000n));
    let track = system.track(contract.address);
    await system.run();
    track.events();

    contract.send(owner, {
      value: toNano(2) + 100000000n,
    }, {
      $$type: 'CreateProposal',
      queryId: 1n,
      messages: Dictionary.empty<bigint, ProposedMessage>()
        .set(0n, {
          $$type: 'ProposedMessage',
          body: comment('test proposal'),
          bounce: false,
          value: toNano(0),
          mode: 1n,
          to: managable.address,
        })
        .set(1n, {
          $$type: 'ProposedMessage',
          body: comment('test proposal 2'),
          bounce: false,
          value: toNano(0),
          mode: 1n,
          to: managable.address,
        })
    });


    await system.run();
    expect(track.events()).toMatchSnapshot('proposal created');
  });

  it("should execute proposal correctly", async () => {
    let system = await ContractSystem.create();

    let managable = system.treasure("managable");
    let owner = system.treasure("owner");
    let nonOwner = system.treasure("non-owner");

    let members = Dictionary.empty(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
    members.set(BigInt('0x' + owner.address.hash.toString('hex')), 1n);
    members.set(BigInt('0x' + nonOwner.address.hash.toString('hex')), 1n);

    let contract = system.open(await DAOWithSplitter.fromInit(managable.address, members, 2n, 200000000n));
    let track = system.track(contract.address);
    contract.send(owner, {
      value: toNano(2),
    }, "Topup DAO");

    await system.run();
    track.events();

    const proposalMessages = Dictionary.empty<bigint, ProposedMessage>()
      .set(0n, {
        $$type: 'ProposedMessage',
        body: comment('test proposal'),
        bounce: false,
        value: toNano(1),
        mode: 1n,
        to: owner.address,
      })
      .set(1n, {
        $$type: 'ProposedMessage',
        body: comment('test proposal 2'),
        bounce: false,
        value: toNano(1),
        mode: 1n,
        to: nonOwner.address,
      });

    contract.send(owner, {
      value: toNano(1),
      bounce: false,
    }, {
      $$type: 'CreateProposal',
      messages: proposalMessages,
      queryId: 0n,
    });

    await system.run();
    let events = track.events();
    expect(events[2].type === 'sent').toBeTruthy();
    const proposalAddress = events[2].type === 'sent' && events[2].messages[0].to;
    expect(proposalAddress).toBeTruthy();

    let proposal = system.open(Proposal.fromAddress(Address.parse(proposalAddress as string)));

    let proposalTrack = system.track(proposal.address);

    proposal.send(owner, { value: toNano(1) }, 'Agree');
    proposal.send(nonOwner, { value: toNano(1) }, 'Agree');

    await system.run();
    expect(track.events()).toMatchSnapshot('proposal executed');
    expect(proposalTrack.events()).toMatchSnapshot('voting finished (agree)');
  });


  it("should terminate proposal correctly", async () => {
    let system = await ContractSystem.create();

    let managable = system.treasure("managable");
    let owner = system.treasure("owner");
    let nonOwner = system.treasure("non-owner");

    let memberTreasures: Treasure[] = [];

    let members = Dictionary.empty(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
    members.set(BigInt('0x' + owner.address.hash.toString('hex')), 1n);
    members.set(BigInt('0x' + nonOwner.address.hash.toString('hex')), 1n);

    let contract = system.open(await DAOWithSplitter.fromInit(managable.address, members, 2n, 200000000n));
    let track = system.track(contract.address);

    contract.send(owner, {
      value: toNano(2),
    }, "Topup DAO");

    await system.run();
    track.events();

    const proposalMessages = Dictionary.empty<bigint, ProposedMessage>()
      .set(0n, {
        $$type: 'ProposedMessage',
        body: comment('test proposal'),
        bounce: false,
        value: toNano(1),
        mode: 1n,
        to: owner.address,
      })
      .set(1n, {
        $$type: 'ProposedMessage',
        body: comment('test proposal 2'),
        bounce: false,
        value: toNano(1),
        mode: 1n,
        to: nonOwner.address,
      });

    contract.send(owner, {
      value: toNano(1),
      bounce: false,
    }, {
      $$type: 'CreateProposal',
      messages: proposalMessages,
      queryId: 1n,
    });

    await system.run();
    let events = track.events();
    expect(events[2].type === 'sent').toBeTruthy();
    const proposalAddress = events[2].type === 'sent' && events[2].messages[0].to;
    expect(proposalAddress).toBeTruthy();

    let proposal = system.open(Proposal.fromAddress(Address.parse(proposalAddress as string)));

    let proposalTrack = system.track(proposal.address);

    proposal.send(owner, { value: toNano(1) }, 'Disagree');
    proposal.send(nonOwner, { value: toNano(1) }, 'Disagree');

    await system.run();
    expect(track.events()).toMatchSnapshot('proposal terminated');
    expect(proposalTrack.events()).toMatchSnapshot('voting finished (disagree)');
  });


  it("should split if zero balance", async () => {
    let system = await ContractSystem.create();

    let managable = system.treasure("managable");
    let owner = system.treasure("owner");
    let nonOwner = system.treasure("non-owner");
    let nonOwner2 = system.treasure("non-owner 2");

    let members = Dictionary.empty(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
    members.set(BigInt('0x' + owner.address.hash.toString('hex')), 1n);
    members.set(BigInt('0x' + nonOwner.address.hash.toString('hex')), 1n);
    members.set(BigInt('0x' + nonOwner2.address.hash.toString('hex')), 1n);

    let contract = system.open(await DAOWithSplitter.fromInit(managable.address, members, 3n, 200000000n));
    let track = system.track(contract.address);

    await system.run();
    track.events();

    const amount = toNano(10);
    await contract.send(managable, {
      value: amount,
      bounce: false,
    }, {
      $$type: 'WithdrawStakeResponse',
      queryId: 228n,
    });

    await system.run();
    expect(track.events()).toMatchSnapshot();
  });

  it.each([[2, 2], [3, 2], [4, 3], [5, 4], [6, 4], [7, 5]])("should calculate correct votes needed", async (membersCount: number, votes: number) => {
    let system = await ContractSystem.create();

    let managable = system.treasure("managable");

    let members = Dictionary.empty(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
    let count = 0n;
    for (let i = 0; i < membersCount; i++) {
      members.set(BigInt('0x' + system.treasure(`member ${i}`).address.hash.toString('hex')), 1n);
      count++;
    }

    let contract = system.open(await DAOWithSplitter.fromInit(managable.address, members, count, 200000000n));
    contract.send(managable, { value: toNano(1) }, 'Topup DAO');
    await system.run();

    expect(contract.getMinimumVotes()).resolves.toEqual(BigInt(votes));
  });
});
