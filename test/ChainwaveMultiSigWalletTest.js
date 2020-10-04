const { assert } = require("console");
const { isMainThread } = require("worker_threads");
const { expectRevert } = require("@openzeppelin/test-helpers");
const { web3 } = require("@openzeppelin/test-helpers/src/setup");
const balance = require("@openzeppelin/test-helpers/src/balance");

const ChainwaveMultiSigWallet = artifacts.require('ChainwaveMultiSigWallet');

contract('ChainwaveMultiSigWallet', (accounts) =>{
    let wallet;

    beforeEach(async () => {
        wallet = await ChainwaveMultiSigWallet.new([accounts[0],accounts[1],accounts[2]], 2);
        await web3.eth.sendTransaction({from: accounts[0], to: wallet.address, value:1000});
    })

    it('should have correct approvers and quorum', async()=>{
        const approvers = await wallet.getApprovers();
        const quorum = await wallet.quorum();

        assert(approvers.length === 3);
        assert(approvers[0] === accounts[0]);
        assert(approvers[1] === accounts[1]);
        assert(approvers[2] === accounts[2]);
        assert(quorum.toNumber() === 2);
    })

    it('should create a transfer successfully (happy path)', async()=>{
        // transaction reciept
        await wallet.createTransfer(100, accounts[3], {from:accounts[0]})
        const transfers = await wallet.getTransfers();


        assert(transfers.length === 1);
        assert(transfers[0].amount === '100'); 
        assert(transfers[0].to === accounts[3]); 
        assert(transfers[0].aprovals === '0'); 
        assert(transfers[0].sent === false); 
        assert(transfers[0].id === '0'); 


    })

    it('should FAIL on create of a transfer if by non-approver', async()=>{
      await expectRevert.unspecified(
         wallet.createTransfer(100, accounts[3], {from:accounts[4]})
       );
    });

    it('should increment approval', async() => {
        await wallet.createTransfer(100, accounts[3], {from:accounts[0]});

        await wallet.approveTransfer(0,{from: accounts[0]});

        const balance = await web3.eth.getBalance(wallet.address);

        const transfers = await wallet.getTransfers();
        assert(transfers[0].aprovals === '1'); 
        assert(transfers[0].sent === false); 
        assert(balance ==='1000');

    });
  
    it('should send transfer if quorum reached to recipient approval', async() => {
        
        const transferAmt = 100;
        const balanceOriginal = web3.utils.toBN(await web3.eth.getBalance(accounts[5]));
       
        await wallet.createTransfer(transferAmt, accounts[6], {from:accounts[0]});
        await wallet.approveTransfer(0,{from: accounts[0]});
        await wallet.approveTransfer(0,{from: accounts[2]});
        
        const balanceAfter =  web3.utils.toBN(await web3.eth.getBalance(accounts[5]));
        const transfers = await wallet.getTransfers();

        assert(balanceAfter.sub(balanceOriginal).toNumber()=== transferAmt);
    });

    it('should FAIL transfer if sender is not approved', async()=>{
        await wallet.createTransfer(100, accounts[3], {from:accounts[0]});

        await expectRevert.unspecified(
            wallet.approveTransfer(0, {from:accounts[4]})
          );
    })

    it('should FAIL transfer if transfer is already sent', async()=>{
               
        await wallet.createTransfer(100, accounts[6], {from:accounts[0]});
        await wallet.approveTransfer(0,{from: accounts[0]});
        await wallet.approveTransfer(0,{from: accounts[2]});

        await expectRevert(
            wallet.approveTransfer(0, {from:accounts[1]}), 'Error: Transfer has already been sent'
          );
    });

    //////////////////QUORUM MODIFICATIONS
    it('should create a quorum proposal successfully', async()=>{
        await wallet.proposeQuorum(1, {from:accounts[0]})
        const quorumProposals = await wallet.getQuorumProposals();

        assert(quorumProposals.length === 1);
        assert(quorumProposals[0].id === '0'); 
        assert(quorumProposals[0].quorum=== 1); 
        assert(quorumProposals[0].aprovals === '0'); 
        assert(quorumProposals[0].passed === false); 
    });

    it('should increment quorumProposal ', async()=>{
        await wallet.proposeQuorum(1, {from:accounts[0]})
        await wallet.approveQuorumProposal(0,{from: accounts[0]});

        const quorumProposals = await wallet.getQuorumProposals();
     
        assert(quorumProposals[0].aprovals === '1'); 
        assert(quorumProposals[0].passed === false); 
    })

    it('should FAIL to create a quorum proposal if by non-approver', async()=>{

        await expectRevert.unspecified(
            wallet.proposeQuorum(1,{from:accounts[4]})
          );
    })

    it('should UPDATE contract quorum upon quorumProposal quorum reached', async()=>{
        const quorumOriginal = await wallet.quorum();
        await wallet.proposeQuorum(1, {from:accounts[0]})
        await wallet.approveQuorumProposal(0,{from: accounts[0]});
        await wallet.approveQuorumProposal(0,{from: accounts[1]});
        const quorumAfter= await wallet.quorum();
        assert(quorumAfter.sub(quorumOriginal).toNumber()=== 1);
    })
    it('should FAIL Quorum proposal approval if sender is not approved', async()=>{
        await wallet.proposeQuorum(1, {from:accounts[0]})

        await expectRevert.unspecified(
            wallet.approveQuorumProposal(0, {from:accounts[4]})
          );
    })
    it('should FAIL Quorum Proposal if proposal is already passed', async()=>{
        await wallet.proposeQuorum(1, {from:accounts[0]})       
        await wallet.approveQuorumProposal(0,{from: accounts[0]});
        await wallet.approveQuorumProposal(0,{from: accounts[2]});

        await expectRevert(
            wallet.approveQuorumProposal(0, {from:accounts[1]}), 'Error: Quorum proposals has already been passed'
          );
    });

    ///////////////////// APPROVER MODIFICATIONS
    it('should create a approver proposal successfully', async()=>{

        await wallet.proposeApproverChange(accounts[4], true, {from:accounts[0]})
        const approverProposals = await wallet.getApproverProposals();

        assert(approverProposals.length === 1);
        assert(approverProposals[0].id === '0'); 
        assert(approverProposals[0].newApprover=== accounts[4]); 
        assert(approverProposals[0].aprovals === '0'); 
        assert(approverProposals[0].passed === false); 

    })
    it('should FAIL to create a Approver Proposal if by non-approver', async()=>{
        await expectRevert.unspecified(
            wallet.proposeApproverChange(accounts[4],true,{from:accounts[5]})
          );
    })
    it('should ADD a new approver to contract approvers upon quorum reached', async()=>{

        await wallet.proposeApproverChange(accounts[4], true, {from:accounts[0]})

        await wallet.approveApproverProposal(0, {from: accounts[0]});
        await wallet.approveApproverProposal(0, {from: accounts[1]});
        const approvers = await wallet.getApprovers();

        assert(approvers[3] === accounts[4]);


    })
    it('should REMOVE an existing approver from contract approvers upon quorum reached', async()=>{
       
        await wallet.proposeApproverChange(accounts[2], false, {from:accounts[0]})
        
        const approversOrig = await wallet.getApprovers();

        await wallet.approveApproverProposal(0, {from: accounts[0]});
        await wallet.approveApproverProposal(0, {from: accounts[1]});

        const approversEnd = await wallet.getApprovers();

        assert(approversOrig.length ===2);


    })
  




})