import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/Table';

function QuorumList({ quorumProposals, approveQuorum }) {
    return (
        <div className="transfer-list" >
            <h2>Quorum Change Proposals</h2>
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
                        <Button onClick={()=> approveQuorum(quorum.id)} disabled={quorum.approvals >= quorum}>Approve</Button>
                        </td>
                        
                        <td>{quorum.passed ? 'yes' : 'no'}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
           
        </div>
    )
}

export default QuorumList;