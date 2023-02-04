import "@stdlib/deploy";
import "@stdlib/ownable";
import "./lib";

const PROPOSAL_MINIMUM_BALANCE: Int = 50000000;
const DAO_MINIMUM_BALANCE: Int = 100000000;

struct ProposedMessage {
    to: Address;
    value: Int;
    mode: Int;
    bounce: Bool;
    body: Cell;
}

contract Proposal with Ownable {
    owner: Address;
    members: map[Int]Int;
    votesNeeded: Int;

    agreed: Int;
    disagreed: Int;

    proposal: map[Int]ProposedMessage;

    init(owner: Address, votesNeeded: Int, members: map[Int]Int, proposal: map[Int]ProposedMessage) {
        self.owner = owner;
        self.members = members;
        self.proposal = proposal;

        self.votesNeeded = votesNeeded;
        self.agreed = 0;
        self.disagreed = 0;
    }

    fun executeProposal() {
        send(SendParameters{
            to: self.owner,
            value: 0,
            mode: 128 + 32,
            bounce: false,
            body: ExecuteProposal{
                messages: self.proposal
            }.toCell()
        });
    }

    fun terminateProposal() {
        send(SendParameters{
            to: self.owner,
            value: 0,
            mode: 128 + 32,
            bounce: false,
            body: "Terminated".asComment()
        });
    }

    receive("Agree") {
        let ctx: Context = context();

        let addrInfo: ParsedAddress = parseAddress(ctx.sender);
        require(addrInfo.wc == 0, "Only basechain is supported");

        let a: Int? = self.members.get(addrInfo.hash);

        require(a != null, "You cannot vote");
        require(a != 0, "You have no vote power");

        self.agreed = self.agreed + 1;
        self.members.set(addrInfo.hash, 0);
        if (self.agreed >= self.votesNeeded) {
            self.executeProposal();
        }
    }

    receive("Disagree") {
        let ctx: Context = context();

        let addrInfo: ParsedAddress = parseAddress(ctx.sender);
        require(addrInfo.wc == 0, "Only basechain is supported");

        let a: Int? = self.members.get(addrInfo.hash);

        require(a != null, "You cannot vote");
        require(a != 0, "You have no vote power");

        self.disagreed = self.disagreed + 1;
        self.members.set(addrInfo.hash, 0);
        if (self.disagreed >= self.votesNeeded) {
            self.terminateProposal();
        }
    }

    receive(deploy: Deploy) {
        // accept
    }
}

message ExecuteProposal {
    messages: map[Int]ProposedMessage;
}

message CreateProposal {
    queryId: Int as uint64;
    messages: map[Int]ProposedMessage;
}

message (3665837821) WithdrawStake {
    queryId: Int as uint64;
    gasLimit: Int as coins;
    stake: Int as coins;
}

message (601104865) WithdrawStakeResponse {
    queryId: Int as uint64;
}

message (1958425639) WithdrawStakeDelayed {
    queryId: Int as uint64;
}

contract DAOWithSplitter {
    managable: Address;
    members: map[Int]Int;
    denominator: Int;
    withdrawFee: Int;

    init(managable: Address, members: map[Int]Int, denominator: Int, withdrawFee: Int) {
        self.managable = managable;
        self.members = members;
        self.denominator = denominator;
        self.withdrawFee = withdrawFee;
    }

    fun splitAndSend(value: Int) {
        let splittable: Int = value / self.denominator * self.denominator;

        if (splittable <= 0) { // if cannot split
            return;
        }

        let lookup: DictLookupResult = nativeDictGetMin(self.members, 257);
        while (lookup.found) {
            let memberSlice: Slice = lookup.value!!;
            let memberShare: Int = memberSlice.loadInt(257);

            let memberAddress: Address = serlializeAddress(0, lookup.key!!);
            
            let body: StringBuilder = beginComment();
            body.append(memberShare.toString());
            body.append("/");
            body.append(self.denominator.toString());
            body.append(" of ");
            body.append(splittable.toCoinsString());
            body.append(" (whales revenue share)");

            send(SendParameters{
                to: memberAddress,
                value: splittable / self.denominator * memberShare,
                mode: 0,
                bounce: false,
                body: body.toCell()
            });

            lookup = nativeDictGetNext(self.members, 257, lookup.key!!);
        }
    }

    receive(proposal: ExecuteProposal) {
        let ctx: Context = context();

        let proposalExpected: StateInit = initOf Proposal(myAddress(), self.minimumVotes(), self.members, proposal.messages);
        require(ctx.sender == contractAddress(proposalExpected), "Only proposals can be executed");

        let i: Int = 0;
        let found: ProposedMessage? = proposal.messages.get(0);
        while (found != null) {
            let proposedMessage: ProposedMessage = found!!;

            send(SendParameters{
                to: proposedMessage.to,
                value: proposedMessage.value,
                mode: proposedMessage.mode,
                bounce: proposedMessage.bounce,
                body: proposedMessage.body
            });

            i = i + 1;
            found = proposal.messages.get(i);
        }
    }

    receive(proposal: CreateProposal) {
        let ctx: Context = context();

        let parsedAddr: ParsedAddress = parseAddress(ctx.sender);
        let maybeMember: Int? = self.members.get(parsedAddr.hash);
        require(maybeMember != null, "You are not a member");
        require(ctx.value > PROPOSAL_MINIMUM_BALANCE * 2, "Not enough gas for proposal");

        let proposalInit: StateInit = initOf Proposal(myAddress(), self.minimumVotes(), self.members, proposal.messages);
        let proposalAddress: Address = contractAddress(proposalInit);
        send(SendParameters{
            to: proposalAddress,
            value: 0,
            mode: 64,
            bounce: false,
            code: proposalInit.code,
            data: proposalInit.data,
            body: Deploy{
                queryId: proposal.queryId
            }.toCell()
        });
    }

    receive("Topup DAO") {
        // do nothing
    }

    receive("Terminated") {
        // Do nothing
    }

    receive("Withdraw") {
        let ctx: Context = context();

        let parsedAddr: ParsedAddress = parseAddress(ctx.sender);
        let maybeMember: Int? = self.members.get(parsedAddr.hash);
        require(maybeMember != null, "You are not a member");

        require(myBalance() - self.withdrawFee > DAO_MINIMUM_BALANCE, "Not enough balance to withdraw");

        send(SendParameters{
            to: self.managable,
            value: self.withdrawFee,
            mode: 1,
            bounce: false,
            body: WithdrawStake{
                queryId: random(1, 18446744073709552000),
                gasLimit: 1000000000,
                stake: 0
            }.toCell()
        });
    }

    receive("Gift") {
        let ctx: Context = context();

        let value: Int = ctx.value - DAO_MINIMUM_BALANCE; // Processing fee
        if (value <= 0) {
            return;
        }

        self.splitAndSend(value);
    }

    receive(msg: WithdrawStakeResponse) {
        let ctx: Context = context();

        let value: Int = ctx.value - DAO_MINIMUM_BALANCE; // Processing fee
        if (value <= 0) {
            return;
        }

        self.splitAndSend(value);
    }

    receive(msg: WithdrawStakeDelayed) {
        // Do nothing
    }

    get fun memberShare(addr: Address): Int {
        let parsedAddr: ParsedAddress = parseAddress(addr);
        let maybeMember: Int? = self.members.get(parsedAddr.hash);
        require(maybeMember != null, "You are not a member");
        return maybeMember!!;
    }

    get fun membersCount(): Int {
        let count: Int = 0;
        let lookup: DictLookupResult = nativeDictGetMin(self.members, 257);
        while (lookup.found) {
            let memberSlice: Slice = lookup.value!!;
            let memberShare: Int = memberSlice.loadInt(257);

            count = count + 1;
            lookup = nativeDictGetNext(self.members, 257, lookup.key!!);
        }

        return count;
    }

    get fun minimumVotes(): Int {
        return max(mulDivCeil(self.membersCount(), 2, 3), 2);
    }
}