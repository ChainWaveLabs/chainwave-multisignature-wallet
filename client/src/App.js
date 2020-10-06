import React, { useEffect, useState } from 'react';
import { getWeb3, getWallet } from './web3utils.js';
import Container from 'react-bootstrap/Container';
import Header from './Header';
import logo from './logo.svg';
import './App.css';

import TransferList from './TransferList';
import CreateTransfer from './CreateTransfer';

import ModifyQuorum from './ModifyQuorum';
import QuorumList from './QuorumList';

import ProposeApproverModification from './ProposeApproverModification';

import ProposeApproverList from './ProposeApproverModification';


function App() {

  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [wallet, setWallet] = useState(undefined);
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
      const approvers = await wallet.methods.getApprovers().call();
      const quorum = await wallet.methods.quorum().call();
      const transfers = await wallet.methods.getTransfers().call();
      const quorumProposals = await wallet.methods.getQuorumProposals().call();
      const approverProposals = await wallet.methods.getApproverProposals().call();

      setWeb3(web3);
      setAccounts(accounts);
      setWallet(wallet);
      setApprovers(approvers);
      setQuorum(quorum);
      setTransfers(transfers);
      setQuorumProposals(quorumProposals);
      setApproverProposals(approverProposals);
    }

    init();
  }, []);

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

  const proposeQuorum = async newQuorum => {
    await wallet.methods
      .proposeQuorum(newQuorum)
      .send({ from: accounts[0] });
    updateQuorum();
  }

  const approveQuorum = async quorumId => {
    await wallet.methods
      .approveQuorum(quorumId)
      .send({ from: accounts[0] });
    updateQuorum();
  }
 const updateQuorum = async () => {
    const quorumProposals = await wallet.methods.getQuorumProposals().call();
    setQuorum(quorumProposals);
  }

  const updateApprovers = async () => {
    const approvers = await wallet.methods.getApprovers().call();
    setApprovers(approvers);
  }

  const proposeApprover = async newApproverProposal => {
    await wallet.methods
    .proposeApproverChange(newApproverProposal.newApprover, newApproverProposal.adding)
    .send({ from: accounts[0] });
    updateApprovers();

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
      <Container>
        <header className="App-header">
          <Header approvers={approvers} quorum={quorum}></Header>

          {/* <ModifyQuorum proposeQuorum = {proposeQuorum}></ModifyQuorum>
          <QuorumList quorumProposals = {quorumProposals} approveQuorum = {approveQuorum}></QuorumList> */}

          <ProposeApproverModification proposeApprpver = {proposeApprover}></ProposeApproverModification>
          <ProposeApproverList approverProposals = {approverProposals} approveApproverProposal = {approveApproverProposal} quorum={quorum} ></ProposeApproverList>
          
          <CreateTransfer createTransfer={createTransfer}></CreateTransfer>
          <TransferList transfers={transfers} quorum={quorum} approveTransfer={approveTransfer}></TransferList>
          
          <a
            className="App-link"
            href="https://chainwave.io"
            target="_blank"
            rel="noopener noreferrer">
            by Chainwave
        </a>
        </header>
      </Container>

    </div>
  );
}

export default App;
