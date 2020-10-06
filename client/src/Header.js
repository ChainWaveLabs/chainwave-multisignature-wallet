import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function Header({ approvers, quorum, walletBalance}) {
    return (
        <header>
               <Alert variant="danger">This is a prototype wallet. Do not send funds to this wallet.
               Read more here: <Alert.Link href="https://chainwave.io/multi-signature-ethereum-wallet/">multi signature ethereum wallet with governance</Alert.Link>
                    </Alert>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="#home">Chainwave Multi Signature Wallet</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home"> Quorum: {quorum}</Nav.Link>
                        <NavDropdown title="Approvers" id="basic-nav-dropdown">
                            {approvers.map(approver => (
                                <NavDropdown.Item  key={approver}>{approver}</NavDropdown.Item>
                            ))}
                        </NavDropdown>

                        <Nav.Link href="#home"> Balance: {walletBalance}</Nav.Link>
                    </Nav>
   
                </Navbar.Collapse>
            </Navbar>
        </header>
    )

}



export default Header;
