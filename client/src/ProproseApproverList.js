import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
function ProposeApproverList({ approverProposals, approveApproverProposal, quorum }) {
    return (
        <Container fluid>
            <Card className="bg-dark transfer-list" variant="primary">
            <Card.Header><h4>Approver Change Proposals</h4></Card.Header>
            <Card.Body>
                <Table size="sm" hover variant="dark">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Address</th>
                            <th>Add/Remove</th>
                            <th>Approvals</th>
                            <th>Approve</th>
                            <th>Passed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {approverProposals.map(aProposal => (
                            <tr key={aProposal.id}>
                                <td>{aProposal.id}</td>
                                <td>{aProposal.newApprover}</td>
                                <td>{aProposal.adding}</td>
                                <td>{aProposal.approvals}</td>
                                <td>
                                    <Button onClick={() => approveApproverProposal(aProposal.id)} disabled={aProposal.approvals >= quorum}>Approve</Button>
                                </td>
                                <td>{aProposal.passed ? 'yes' : 'no'}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </Card.Body>
        </Card></Container>

    )
}

export default ProposeApproverList;