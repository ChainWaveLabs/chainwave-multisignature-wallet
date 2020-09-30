import React, { useEffect, useState } from 'react';
import { getWeb3, getWallet } from './web3utils.js';
import TransferList from './TransferList';
import Container from 'react-bootstrap/Container';

import logo from './logo.svg';
import './App.css';

import CreateTransfer from './CreateTransfer';

import Header from './Header';

function App() {

  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [wallet, setWallet] = useState(undefined);
  const [approvers, setApprovers] = useState([]);
  const [quorum, setQuorum] = useState(undefined);
  const [transfers, setTransfers] = useState([]);


  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const wallet = await getWallet(web3);
      const approvers = await wallet.methods.getApprovers().call();
      const quorum = await wallet.methods.quorum().call();
      const transfers = await wallet.methods.getTransfers().call();

      setWeb3(web3);
      setAccounts(accounts);
      setWallet(wallet);
      setApprovers(approvers);
      setQuorum(quorum);
      setTransfers(transfers);
    }

    init();
  }, []);

  const createTransfer = async transfer => {

    await wallet.methods
      .createTransfer(transfer.amount, transfer.to)
      .send({ from: accounts[0] });

    updateTransfers();
    
  }
  const updateTransfers = async () => {

    const transfers = await wallet.methods.getTransfers().call();
    setTransfers(transfers);

  }

  const approveTransfer = async transferId => {

    await wallet.methods
      .approveTransfer(transferId)
      .send({ from: accounts[0] });

    updateTransfers();
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
