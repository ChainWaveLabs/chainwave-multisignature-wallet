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




})