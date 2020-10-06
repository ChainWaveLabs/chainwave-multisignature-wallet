import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

function ProposeApproverModification({ proposeApprover }) {
    const [approverProposal] = useState(undefined);

    const updateApproverProposal = (e, field) => {
        const value = e.target.value;
        setQuorum({ ...approverProposal, [field]: value })
    }

    const submit = e => {
        e.preventDefault();//prevents page reload
        proposeApprover(approverProposal)
    }

    return (
        <div>
            <h2>Propose Approver</h2>
            <Container fluid>
                <Form onSubmit={(e) => submit(e)}>
                <Row>
                    <Col>   
                        <Form.Group controlId="formAmount">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter address" onChange={e => updateApproverProposal(e, 'newApprover')} />
                            <Form.Text className="text-muted">
                                Address can be a new address or an address that's already an approver
                             </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="formTo">
                        <Form.Label>Add or Remove?</Form.Label>
                        <Form.Control type="checkbox" placeholder="Check to add, uncheck to remove"  onChange={e => updateApproverProposal(e, 'adding')} />
                    </Form.Group>
                    </Col>
                </Row>

                <Button variant="success" type="submit">
                    Submit
                </Button>
            </Form></Container>


     
        </div>
    )
}

export default ProposeApproverModification;