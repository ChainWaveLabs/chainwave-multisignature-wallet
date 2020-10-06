import React, { useEffect, useState } from 'react';
import { getWeb3, getWallet } from './web3utils.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from './Header';
import logo from './logo.svg';
import './App.css';


import TransferList from './TransferList';
import CreateTransfer from './CreateTransfer';

import ModifyQuorum from './ModifyQuorum';
import QuorumList from './QuorumList';

import ProposeApproverModification from './ProposeApproverModification';
import ProposeApproverList from './ProproseApproverList';


function App() {

  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [wallet, setWallet] = useState(undefined);
  const [walletBalance, setWalletBalance] = useState(undefined);
  const [approvers, setApprovers] = useState([]);
  const [quorum, setQuorum] = useState(undefined);
  const [transfers, setTransfers] = useState([]);
  const [quorumProposals, setQuorumProposals] = useState([]);
  const [approverProposals, setApproverProposals] = useState([]);

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const wallet = await getWallet(web3);
      const walletBalance = await wallet.balance;
      const approvers = await wallet.methods.getApprovers().call();
      const quorum = await wallet.methods.quorum().call();
      const transfers = await wallet.methods.getTransfers().call();
      const quorumProposals = await wallet.methods.getQuorumProposals().call();
      const approverProposals = await wallet.methods.getApproverProposals().call();

      setWeb3(web3);
      setAccounts(accounts);
      setWallet(wallet);
      setWalletBalance(walletBalance)
      setApprovers(approvers);
      setQuorum(quorum);
      setTransfers(transfers);
      setQuorumProposals(quorumProposals);
      setApproverProposals(approverProposals);
    }

    init();
  }, []);

  //////////TRANSFERS

  const createTransfer = async transfer => {
    await wallet.methods
      .createTransfer(transfer.amount, transfer.to)
      .send({ from: accounts[0] });
    updateTransfers();
  }

  const approveTransfer = async transferId => {
    await wallet.methods
      .approveTransfer(transferId)
      .send({ from: accounts[0] });
    updateTransfers();
  }

  const updateTransfers = async () => {
    const transfers = await wallet.methods.getTransfers().call();
    setTransfers(transfers);
  }

  //////////QUORUM
 const updateQuorum = async () => {
    const quorumProposals = await wallet.methods.getQuorumProposals().call();
    setQuorumProposals(quorumProposals);
  }

  const proposeQuorum = async newQuorum => {
    console.log('quorumTest', newQuorum)
    await wallet.methods
      .proposeQuorum(newQuorum.newQuorum)
      .send({ from: accounts[0] });
    updateQuorum();
  }

  const approveQuorum = async quorumId => {
    await wallet.methods
      .approveQuorumProposal(quorumId)
      .send({ from: accounts[0] });
    updateQuorum();
  }

 

//////////APPROVERS
  const updateApprovers = async () => {
    const approvers = await wallet.methods.getApprovers().call();
    setApprovers(approvers);
  }

  const updateApproverProposals = async()=>{
    const approverProposals = await wallet.methods.getApproverProposals().call();
    setApproverProposals(approverProposals);
  }

  const proposeApprover = async newApproverProposal => {
    await wallet.methods
      .proposeApproverChange(newApproverProposal.newApprover, newApproverProposal.adding)
      .send({ from: accounts[0] });
    updateApproverProposals();
  }

  const approveApproverProposal = async approverProposalId => {
    await wallet.methods
      .approveTransfer(approverProposalId)
      .send({ from: accounts[0] });
    updateApprovers();
  }

  if (typeof web3 === 'undefined' ||
    typeof accounts === 'undefined' ||
    typeof wallet === 'undefined' ||
    approvers.length === 0 ||
    typeof quorum === 'undefined') {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <Header approvers={approvers} quorum={quorum} walletBalance ={walletBalance}></Header>
       {walletBalance}
        <Container fluid className="mb-3">
          <h2>Transfers</h2>
          <CreateTransfer createTransfer={createTransfer}></CreateTransfer>
          <TransferList transfers={transfers} quorum={quorum} approveTransfer={approveTransfer}></TransferList>
        </Container>

        <Container fluid className="mb-3">
        <h2>Quorum</h2>
          <ModifyQuorum proposeQuorum={proposeQuorum}></ModifyQuorum>
          <QuorumList quorumProposals={quorumProposals} approveQuorum={approveQuorum} quorum={quorum}></QuorumList>
        </Container>

        <Container fluid className="mb-3">
        <h2>Approvers</h2>
          <ProposeApproverModification proposeApprover={proposeApprover}></ProposeApproverModification>
          <ProposeApproverList approverProposals={approverProposals} approveApproverProposal={approveApproverProposal} quorum={quorum} ></ProposeApproverList>
        </Container>


        <a
          className="App-link"
          href="https://chainwave.io/blockchain-development-company"
          target="_blank"
          rel="dofollow">
          Blockchain Development by Chainwave
        </a>
      </header>

    </div>
  );
}

export default App;
