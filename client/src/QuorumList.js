import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';


function QuorumList({ quorumProposals, approveQuorum, quorum }) {
    return (
        <Container fluid>
            <Card className="bg-dark transfer-list mb-3" variant="primary">
                <Card.Header>   <h4>Quorum Change Proposals</h4>  </Card.Header>
                <Card.Body>
                    <Table size="sm" hover variant="dark">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>New Quorum</th>
                                <th>Approvals</th>
                                <th>Approve</th>
                                <th>Passed</th>
                                <th>Ended</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quorumProposals.map(quorumItem => (
                                <tr key={quorumItem.id}>
                                    <td>{quorumItem.id}</td>
                                    <td>{quorumItem.quorum}</td>
                                    <td>{quorumItem.approvals}</td>
                                    <td>
                                        <Button onClick={() => approveQuorum(quorumItem.id)} disabled={quorumItem.approvals >= quorum || quorumItem.closed == true}>Approve</Button>
                                    </td>

                                    <td>{quorumItem.passed ? 'yes' : 'no'}</td>
                                    <td>{quorumItem.closed ? 'yes' : 'no'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

        </Container>
    )
}

export default QuorumList;