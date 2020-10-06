import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/Table';

function ProposeApproverList({ approverProposals, approveApproverProposal, quorum }) {
    return (
        <div className="transfer-list" >
            <h2>Approver Change Proposals</h2>
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
                        <Button onClick={()=> approveApproverProposal(aProposal.id)} disabled={aProposal.approvals >= quorum}>Approve</Button>
                        </td>
                        <td>{aProposal.passed ? 'yes' : 'no'}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
           
        </div>
    )
}

export default QuorumList;