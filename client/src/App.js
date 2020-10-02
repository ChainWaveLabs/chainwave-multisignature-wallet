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

function App() {

  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [wallet, setWallet] = useState(undefined);
  const [approvers, setApprovers] = useState([]);
  const [quorum, setQuorum] = useState(undefined);
  const [transfers, setTransfers] = useState([]);
  const [quorumProposals, setQuorumProposals] = useState([]);

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const wallet = await getWallet(web3);
      const approvers = await wallet.methods.getApprovers().call();
      const quorum = await wallet.methods.quorum().call();
      const transfers = await wallet.methods.getTransfers().call();
      const quorumProposals = await wallet.methods.getQuorumProposals().call();

      setWeb3(web3);
      setAccounts(accounts);
      setWallet(wallet);
      setApprovers(approvers);
      setQuorum(quorum);
      setTransfers(transfers);
      setQuorumProposals(quorumProposals);
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
    setTransfers(quorumProposals);
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

          <ModifyQuorum proposeQuorum = {proposeQuorum}></ModifyQuorum>
          <QuorumList quorumProposals = {quorumProposals} approveQuorum = {approveQuorum}></QuorumList>

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
