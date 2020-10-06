import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

function TransferList({ transfers, quorum, approveTransfer }) {
    return (
        <Container fluid className="transfer-list">
            <Card className="bg-dark" variant="primary">
                <Card.Header><h4>Transfers</h4></Card.Header>
                <Card.Body>
                    <Table size="sm" hover variant="dark">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Amount</th>
                                <th>To</th>
                                <th>Approvals</th>
                                <th>Approve</th>
                                <th>Sent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transfers.map(transfer => (
                                <tr key={transfer.id}>
                                    <td>{transfer.id}</td>
                                    <td>{transfer.amount}</td>
                                    <td>{transfer.to}</td>
                                    <td>{transfer.approvals}
                                    </td>
                                    <td>
                                        <Button onClick={() => approveTransfer(transfer.id)} disabled={transfer.approvals >= quorum}>Approve</Button>

                                    </td>

                                    <td>{transfer.sent ? 'yes' : 'no'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default TransferList;