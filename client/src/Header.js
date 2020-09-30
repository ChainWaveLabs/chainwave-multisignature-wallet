import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

function Header({ approvers, quorum }) {
    return (
        <header>
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
                    </Nav>
   
                </Navbar.Collapse>
            </Navbar>
        </header>
    )

}



export default Header;
