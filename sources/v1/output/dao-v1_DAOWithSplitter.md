# TACT Compilation Report
Contract: DAOWithSplitter
BOC Size: 2130 bytes

# Types
Total Types: 14

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## ChangeOwner
TLB: `change_owner#0f474d03 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{newOwner:address}`

## DictLookupResult
TLB: `_ key:Maybe int257 value:Maybe ^slice found:bool = DictLookupResult`
Signature: `DictLookupResult{key:Maybe int257,value:Maybe ^slice,found:bool}`

## ParsedAddress
TLB: `_ wc:int257 hash:int257 = ParsedAddress`
Signature: `ParsedAddress{wc:int257,hash:int257}`

## ProposedMessage
TLB: `_ to:address value:int257 mode:int257 bounce:bool body:^cell = ProposedMessage`
Signature: `ProposedMessage{to:address,value:int257,mode:int257,bounce:bool,body:^cell}`

## ExecuteProposal
TLB: `execute_proposal#17e7b8d3 messages:dict<int, ^ProposedMessage{to:address,value:int257,mode:int257,bounce:bool,body:^cell}> = ExecuteProposal`
Signature: `ExecuteProposal{messages:dict<int, ^ProposedMessage{to:address,value:int257,mode:int257,bounce:bool,body:^cell}>}`

## CreateProposal
TLB: `create_proposal#13ff04db queryId:uint64 messages:dict<int, ^ProposedMessage{to:address,value:int257,mode:int257,bounce:bool,body:^cell}> = CreateProposal`
Signature: `CreateProposal{queryId:uint64,messages:dict<int, ^ProposedMessage{to:address,value:int257,mode:int257,bounce:bool,body:^cell}>}`

## WithdrawStake
TLB: `withdraw_stake#da803efd queryId:uint64 gasLimit:coins stake:coins = WithdrawStake`
Signature: `WithdrawStake{queryId:uint64,gasLimit:coins,stake:coins}`

## WithdrawStakeResponse
TLB: `withdraw_stake_response#23d421e1 queryId:uint64 = WithdrawStakeResponse`
Signature: `WithdrawStakeResponse{queryId:uint64}`

## WithdrawStakeDelayed
TLB: `withdraw_stake_delayed#74bb3427 queryId:uint64 = WithdrawStakeDelayed`
Signature: `WithdrawStakeDelayed{queryId:uint64}`

# Get Methods
Total Get Methods: 3

## memberShare
Argument: addr

## membersCount

## minimumVotes
