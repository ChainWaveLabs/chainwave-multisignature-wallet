import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Alert from 'react-bootstrap/Alert';
import logo from './logo.png';

function Header({ approvers, quorum, walletBalance }) {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Navbar.Brand href='#home'>
          <img alt='' src={logo} width='150' /> Multi Signature Wallet (Demo)
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#home'> Quorum: {quorum}</Nav.Link>

            <NavDropdown title='Approvers' id='basic-nav-dropdown'>
              {approvers.map((approver) => (
                <NavDropdown.Item
                  href={'https://kovan.etherscan.io/address/' + approver}
                  key={approver}
                >
                  {approver}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <NavDropdown title='Networks' id='basic-nav-dropdown'>
              <NavDropdown.Item href='https://chainwave-multisignature-wallet.netlify.app/'>
                MainNet
              </NavDropdown.Item>
              <NavDropdown.Item href='https://chainwave-multisig-wallet-kovan.netlify.app/'>
                Kovan
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href='https://github.com/ChainWaveLabs/chainwave-multisignature-wallet'>
              Github
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Alert variant='danger'>
        This is a prototype wallet for demonstration purposes only. Do not send
        funds to this wallet contract. Read more here:{' '}
        <Alert.Link href='https://chainwave.io/multi-signature-ethereum-wallet/'>
          multi signature ethereum wallet with governance
        </Alert.Link>
      </Alert>
    </header>
  );
}

export default Header;
