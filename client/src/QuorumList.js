import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';


function QuorumList({ quorumProposals, approveQuorum }) {
    return (
        <Container fluid>
            <Card className="bg-dark transfer-list" variant="primary">
                <Card.Header>   <h4>Quorum Change Proposals</h4>  </Card.Header>
                <Card.Body>
                    <Table size="sm" hover variant="dark">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Amount</th>
                                <th>Approvals</th>
                                <th>Approve</th>
                                <th>Passed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quorumProposals.map(quorum => (
                                <tr key={quorum.id}>
                                    <td>{quorum.id}</td>
                                    <td>{quorum.amount}</td>
                                    <td>{quorum.approvals}</td>
                                    <td>
                                        <Button onClick={() => approveQuorum(quorum.id)} disabled={quorum.approvals >= quorum}>Approve</Button>
                                    </td>

                                    <td>{quorum.passed ? 'yes' : 'no'}</td>
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